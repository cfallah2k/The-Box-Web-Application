import notificationService from './notificationService';

export interface CourseContent {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  lessons: Lesson[];
  thumbnail: string;
  category: string;
  level: string;
  rating: number;
  enrolledCount: number;
  price: number;
  isFree: boolean;
  lastUpdated: Date;
  size: number; // in bytes
}

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  videoUrl?: string;
  audioUrl?: string;
  transcript?: string;
  slides?: string;
  quiz?: Quiz;
  resources?: Resource[];
}

export interface Quiz {
  id: string;
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'audio' | 'link' | 'code';
  url: string;
  size: number;
}

export interface CacheStatus {
  totalSize: number;
  availableSpace: number;
  cachedCourses: string[];
  lastSync: Date;
  isOnline: boolean;
}

class OfflineService {
  private db: IDBDatabase | null = null;
  private readonly DB_NAME = 'TheBoxOfflineDB';
  private readonly DB_VERSION = 1;
  private readonly COURSES_STORE = 'courses';
  private readonly PROGRESS_STORE = 'progress';
  private readonly SETTINGS_STORE = 'settings';
  private readonly MAX_CACHE_SIZE = 500 * 1024 * 1024; // 500MB

  async initialize(): Promise<boolean> {
    try {
      this.db = await this.openDatabase();
      await this.createStores();
      return true;
    } catch (error) {
      console.error('Failed to initialize offline service:', error);
      return false;
    }
  }

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create courses store
        if (!db.objectStoreNames.contains(this.COURSES_STORE)) {
          const coursesStore = db.createObjectStore(this.COURSES_STORE, { keyPath: 'id' });
          coursesStore.createIndex('category', 'category', { unique: false });
          coursesStore.createIndex('instructor', 'instructor', { unique: false });
          coursesStore.createIndex('lastUpdated', 'lastUpdated', { unique: false });
        }

        // Create progress store
        if (!db.objectStoreNames.contains(this.PROGRESS_STORE)) {
          const progressStore = db.createObjectStore(this.PROGRESS_STORE, { keyPath: 'id' });
          progressStore.createIndex('courseId', 'courseId', { unique: false });
          progressStore.createIndex('userId', 'userId', { unique: false });
        }

        // Create settings store
        if (!db.objectStoreNames.contains(this.SETTINGS_STORE)) {
          const settingsStore = db.createObjectStore(this.SETTINGS_STORE, { keyPath: 'key' });
        }
      };
    });
  }

  private createStores(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      // Stores are created in onupgradeneeded
      resolve();
    });
  }

  async cacheCourse(course: CourseContent): Promise<boolean> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      // Check available space
      const cacheStatus = await this.getCacheStatus();
      if (course.size > cacheStatus.availableSpace) {
        await this.cleanupCache(course.size - cacheStatus.availableSpace);
      }

      // Cache course content
      const transaction = this.db.transaction([this.COURSES_STORE], 'readwrite');
      const store = transaction.objectStore(this.COURSES_STORE);
      
      await new Promise<void>((resolve, reject) => {
        const request = store.put(course);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      // Update settings
      await this.updateSetting('lastSync', new Date().toISOString());
      
      // Show notification
      await notificationService.showOfflineContentReady(1);
      
      return true;
    } catch (error) {
      console.error('Failed to cache course:', error);
      return false;
    }
  }

  async getCachedCourse(courseId: string): Promise<CourseContent | null> {
    if (!this.db) {
      return null;
    }

    try {
      const transaction = this.db.transaction([this.COURSES_STORE], 'readonly');
      const store = transaction.objectStore(this.COURSES_STORE);
      
      return new Promise((resolve, reject) => {
        const request = store.get(courseId);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Failed to get cached course:', error);
      return null;
    }
  }

  async getAllCachedCourses(): Promise<CourseContent[]> {
    if (!this.db) {
      return [];
    }

    try {
      const transaction = this.db.transaction([this.COURSES_STORE], 'readonly');
      const store = transaction.objectStore(this.COURSES_STORE);
      
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Failed to get cached courses:', error);
      return [];
    }
  }

  async removeCachedCourse(courseId: string): Promise<boolean> {
    if (!this.db) {
      return false;
    }

    try {
      const transaction = this.db.transaction([this.COURSES_STORE], 'readwrite');
      const store = transaction.objectStore(this.COURSES_STORE);
      
      await new Promise<void>((resolve, reject) => {
        const request = store.delete(courseId);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      return true;
    } catch (error) {
      console.error('Failed to remove cached course:', error);
      return false;
    }
  }

  async getCacheStatus(): Promise<CacheStatus> {
    if (!this.db) {
      return {
        totalSize: 0,
        availableSpace: 0,
        cachedCourses: [],
        lastSync: new Date(),
        isOnline: navigator.onLine,
      };
    }

    try {
      const cachedCourses = await this.getAllCachedCourses();
      const totalSize = cachedCourses.reduce((sum, course) => sum + course.size, 0);
      const availableSpace = this.MAX_CACHE_SIZE - totalSize;
      const lastSync = await this.getSetting('lastSync');

      return {
        totalSize,
        availableSpace: Math.max(0, availableSpace),
        cachedCourses: cachedCourses.map(course => course.id),
        lastSync: lastSync ? new Date(lastSync) : new Date(),
        isOnline: navigator.onLine,
      };
    } catch (error) {
      console.error('Failed to get cache status:', error);
      return {
        totalSize: 0,
        availableSpace: 0,
        cachedCourses: [],
        lastSync: new Date(),
        isOnline: navigator.onLine,
      };
    }
  }

  async cleanupCache(requiredSpace: number): Promise<boolean> {
    if (!this.db) {
      return false;
    }

    try {
      const cachedCourses = await this.getAllCachedCourses();
      const cacheStatus = await this.getCacheStatus();
      
      if (cacheStatus.availableSpace >= requiredSpace) {
        return true;
      }

      // Sort courses by last accessed (oldest first)
      const sortedCourses = cachedCourses.sort((a, b) => {
        const aLastAccessed = a.lastUpdated.getTime();
        const bLastAccessed = b.lastUpdated.getTime();
        return aLastAccessed - bLastAccessed;
      });

      let freedSpace = 0;
      const coursesToRemove: string[] = [];

      for (const course of sortedCourses) {
        if (freedSpace >= requiredSpace) {
          break;
        }
        coursesToRemove.push(course.id);
        freedSpace += course.size;
      }

      // Remove courses
      for (const courseId of coursesToRemove) {
        await this.removeCachedCourse(courseId);
      }

      return true;
    } catch (error) {
      console.error('Failed to cleanup cache:', error);
      return false;
    }
  }

  async saveProgress(progress: any): Promise<boolean> {
    if (!this.db) {
      return false;
    }

    try {
      const transaction = this.db.transaction([this.PROGRESS_STORE], 'readwrite');
      const store = transaction.objectStore(this.PROGRESS_STORE);
      
      await new Promise<void>((resolve, reject) => {
        const request = store.put(progress);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      return true;
    } catch (error) {
      console.error('Failed to save progress:', error);
      return false;
    }
  }

  async getProgress(courseId: string, userId: string): Promise<any | null> {
    if (!this.db) {
      return null;
    }

    try {
      const transaction = this.db.transaction([this.PROGRESS_STORE], 'readonly');
      const store = transaction.objectStore(this.PROGRESS_STORE);
      const index = store.index('courseId');
      
      return new Promise((resolve, reject) => {
        const request = index.get(courseId);
        request.onsuccess = () => {
          const results = request.result;
          const userProgress = results?.find((p: any) => p.userId === userId);
          resolve(userProgress || null);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Failed to get progress:', error);
      return null;
    }
  }

  private async updateSetting(key: string, value: string): Promise<void> {
    if (!this.db) {
      return;
    }

    try {
      const transaction = this.db.transaction([this.SETTINGS_STORE], 'readwrite');
      const store = transaction.objectStore(this.SETTINGS_STORE);
      
      await new Promise<void>((resolve, reject) => {
        const request = store.put({ key, value });
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Failed to update setting:', error);
    }
  }

  private async getSetting(key: string): Promise<string | null> {
    if (!this.db) {
      return null;
    }

    try {
      const transaction = this.db.transaction([this.SETTINGS_STORE], 'readonly');
      const store = transaction.objectStore(this.SETTINGS_STORE);
      
      return new Promise((resolve, reject) => {
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result?.value || null);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Failed to get setting:', error);
      return null;
    }
  }

  async syncWhenOnline(): Promise<void> {
    if (!navigator.onLine) {
      return;
    }

    try {
      // Sync progress
      const cachedCourses = await this.getAllCachedCourses();
      for (const course of cachedCourses) {
        // Here you would sync with the server
        console.log(`Syncing progress for course: ${course.id}`);
      }

      // Update last sync
      await this.updateSetting('lastSync', new Date().toISOString());
    } catch (error) {
      console.error('Failed to sync when online:', error);
    }
  }

  // Auto-sync when coming back online
  setupOnlineSync(): void {
    window.addEventListener('online', () => {
      this.syncWhenOnline();
    });
  }
}

// Create singleton instance
const offlineService = new OfflineService();
export default offlineService; 