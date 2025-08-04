export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  data?: any;
  actions?: NotificationAction[];
  requireInteraction?: boolean;
  silent?: boolean;
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

class NotificationService {
  private isSupported: boolean;
  private permission: NotificationPermission;
  private registration: ServiceWorkerRegistration | null = null;

  constructor() {
    this.isSupported = 'Notification' in window && 'serviceWorker' in navigator;
    this.permission = this.isSupported ? Notification.permission : 'denied';
  }

  async initialize(): Promise<boolean> {
    if (!this.isSupported) {
      console.warn('Notifications not supported');
      return false;
    }

    try {
      this.registration = await navigator.serviceWorker.ready;
      return true;
    } catch (error) {
      console.error('Failed to initialize notification service:', error);
      return false;
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported) {
      return 'denied';
    }

    try {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission;
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return 'denied';
    }
  }

  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!this.registration || this.permission !== 'granted') {
      return null;
    }

    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          process.env.REACT_APP_VAPID_PUBLIC_KEY || ''
        ),
      });
      return subscription;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      return null;
    }
  }

  async unsubscribeFromPush(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      const subscription =
        await this.registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications:', error);
      return false;
    }
  }

  async showNotification(payload: NotificationPayload): Promise<boolean> {
    if (!this.isSupported || this.permission !== 'granted') {
      return false;
    }

    try {
      const notification = new Notification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/logo192.png',
        badge: payload.badge || '/logo192.png',
        image: payload.image,
        tag: payload.tag,
        data: payload.data,
        actions: payload.actions,
        requireInteraction: payload.requireInteraction || false,
        silent: payload.silent || false,
      });

      // Handle notification click
      notification.onclick = event => {
        event.preventDefault();
        this.handleNotificationClick(payload);
        notification.close();
      };

      // Action events must be handled in the service worker, not here.
      // if (payload.actions) {
      //   notification.onaction = (event) => {
      //     this.handleNotificationAction(event, payload);
      //   };
      // }

      return true;
    } catch (error) {
      console.error('Failed to show notification:', error);
      return false;
    }
  }

  async showCourseReminder(
    courseName: string,
    timeLeft: string
  ): Promise<boolean> {
    return this.showNotification({
      title: 'Course Reminder',
      body: `Don't forget to continue "${courseName}". You have ${timeLeft} left in your session.`,
      tag: 'course-reminder',
      icon: '/logo192.png',
      data: { type: 'course-reminder', courseName },
      actions: [
        { action: 'continue', title: 'Continue Learning' },
        { action: 'snooze', title: 'Remind Later' },
      ],
    });
  }

  async showAchievementUnlocked(
    achievementName: string,
    points: number
  ): Promise<boolean> {
    return this.showNotification({
      title: '🎉 Achievement Unlocked!',
      body: `You earned "${achievementName}" and ${points} points!`,
      tag: 'achievement',
      icon: '/logo192.png',
      data: { type: 'achievement', achievementName, points },
      requireInteraction: true,
      actions: [
        { action: 'view', title: 'View Achievement' },
        { action: 'share', title: 'Share' },
      ],
    });
  }

  async showNewCourseAvailable(
    courseName: string,
    instructor: string
  ): Promise<boolean> {
    return this.showNotification({
      title: 'New Course Available',
      body: `"${courseName}" by ${instructor} is now available!`,
      tag: 'new-course',
      icon: '/logo192.png',
      data: { type: 'new-course', courseName, instructor },
      actions: [
        { action: 'view', title: 'View Course' },
        { action: 'enroll', title: 'Enroll Now' },
      ],
    });
  }

  async showStreakReminder(currentStreak: number): Promise<boolean> {
    return this.showNotification({
      title: '🔥 Keep Your Streak Alive!',
      body: `You're on a ${currentStreak}-day learning streak. Don't break it!`,
      tag: 'streak-reminder',
      icon: '/logo192.png',
      data: { type: 'streak-reminder', currentStreak },
      actions: [
        { action: 'learn', title: 'Start Learning' },
        { action: 'snooze', title: 'Remind Later' },
      ],
    });
  }

  async showAITutorAvailable(): Promise<boolean> {
    return this.showNotification({
      title: '🤖 AI Tutor Available',
      body: 'Your AI tutor is ready to help with your questions!',
      tag: 'ai-tutor',
      icon: '/logo192.png',
      data: { type: 'ai-tutor' },
      actions: [
        { action: 'chat', title: 'Start Chat' },
        { action: 'dismiss', title: 'Not Now' },
      ],
    });
  }

  async showOfflineContentReady(courseCount: number): Promise<boolean> {
    return this.showNotification({
      title: '📱 Offline Content Ready',
      body: `${courseCount} courses are now available offline!`,
      tag: 'offline-content',
      icon: '/logo192.png',
      data: { type: 'offline-content', courseCount },
      actions: [
        { action: 'view', title: 'View Courses' },
        { action: 'dismiss', title: 'Dismiss' },
      ],
    });
  }

  private handleNotificationClick(payload: NotificationPayload): void {
    // Handle different notification types
    switch (payload.data?.type) {
      case 'course-reminder':
        window.open('/courses', '_blank');
        break;
      case 'achievement':
        window.open('/profile?tab=achievements', '_blank');
        break;
      case 'new-course':
        window.open('/courses', '_blank');
        break;
      case 'streak-reminder':
        window.open('/courses', '_blank');
        break;
      case 'ai-tutor':
        window.open('/ai-tutor', '_blank');
        break;
      case 'offline-content':
        window.open('/offline-courses', '_blank');
        break;
      default:
        window.focus();
        break;
    }
  }

  private shareAchievement(achievementName?: string): void {
    if (navigator.share && achievementName) {
      navigator.share({
        title: 'Achievement Unlocked!',
        text: `I just unlocked "${achievementName}" on The Box! 🎉`,
        url: window.location.origin,
      });
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  getPermissionStatus(): NotificationPermission {
    return this.permission;
  }
}

// Create singleton instance
const notificationService = new NotificationService();
export default notificationService;
