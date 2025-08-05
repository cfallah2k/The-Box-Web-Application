import {
  AcademicCapIcon,
  ArrowLeftIcon,
  CheckIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  PencilIcon,
  PlusIcon,
  StarIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface CourseSection {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  duration: number;
  isPublished: boolean;
}

interface CourseData {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  thumbnail: string;
  language: string;
  maxStudents: number;
  isPublished: boolean;
  sections: CourseSection[];
  tags: string[];
  enrolledStudents: number;
  rating: number;
}

const EditCoursePage: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const [courseData, setCourseData] = useState<CourseData>({
    id: courseId || '1',
    title: 'Advanced React Development',
    description: 'Master React with hooks, context, and advanced patterns.',
    category: 'Programming',
    level: 'intermediate',
    price: 99.99,
    thumbnail: '',
    language: 'English',
    maxStudents: 100,
    isPublished: true,
    sections: [
      {
        id: '1',
        title: 'Introduction to React Hooks',
        description: 'Learn the basics of React hooks',
        type: 'video',
        duration: 45,
        isPublished: true,
      },
      {
        id: '2',
        title: 'Context API Deep Dive',
        description: 'Master React Context for state management',
        type: 'video',
        duration: 60,
        isPublished: true,
      },
    ],
    tags: ['React', 'JavaScript', 'Frontend'],
    enrolledStudents: 45,
    rating: 4.7,
  });

  const [newSection, setNewSection] = useState<Partial<CourseSection>>({
    title: '',
    description: '',
    type: 'video',
    duration: 0,
  });

  const categories = [
    'Programming',
    'Design',
    'Business',
    'Marketing',
    'Data Science',
  ];
  const languages = ['English', 'Spanish', 'French', 'German'];

  const handleInputChange = (field: keyof CourseData, value: any) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const handleSectionAdd = () => {
    if (newSection.title && newSection.description) {
      const section: CourseSection = {
        id: Date.now().toString(),
        title: newSection.title!,
        description: newSection.description!,
        type: newSection.type || 'video',
        duration: newSection.duration || 0,
        isPublished: false,
      };
      setCourseData(prev => ({
        ...prev,
        sections: [...prev.sections, section],
      }));
      setNewSection({ title: '', description: '', type: 'video', duration: 0 });
    }
  };

  const handleSectionDelete = (sectionId: string) => {
    setCourseData(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId),
    }));
  };

  const handleTagAdd = (tag: string) => {
    if (tag && !courseData.tags.includes(tag)) {
      setCourseData(prev => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  };

  const handleTagRemove = (tag: string) => {
    setCourseData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  const handleSave = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/instructor/courses');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-responsive py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/instructor/courses')}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Edit Course
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Update your course content and settings
              </p>
            </div>
          </div>
          <button onClick={handleSave} className="btn-primary">
            <CheckIcon className="w-4 h-4" />
            Save Changes
          </button>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <AcademicCapIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {courseData.enrolledStudents}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enrolled Students
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <DocumentTextIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {courseData.sections.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sections
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <StarIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {courseData.rating}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rating
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <CurrencyDollarIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${courseData.price}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Price
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course Title
              </label>
              <input
                type="text"
                value={courseData.title}
                onChange={e => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={courseData.category}
                onChange={e => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price (USD)
              </label>
              <div className="relative">
                <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={courseData.price}
                  onChange={e =>
                    handleInputChange('price', parseFloat(e.target.value) || 0)
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select
                value={courseData.language}
                onChange={e => handleInputChange('language', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {languages.map(language => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Course Description
            </label>
            <textarea
              value={courseData.description}
              onChange={e => handleInputChange('description', e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add a tag"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      handleTagAdd(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = document.querySelector(
                      'input[placeholder="Add a tag"]'
                    ) as HTMLInputElement;
                    if (input?.value) {
                      handleTagAdd(input.value);
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {courseData.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm flex items-center space-x-1"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => handleTagRemove(tag)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Course Sections */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Course Sections
            </h3>
            <div className="space-y-4">
              {courseData.sections.map((section, index) => (
                <div
                  key={section.id}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {section.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {section.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">
                            {section.type}
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">
                            {section.duration} min
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              section.isPublished
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {section.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSectionDelete(section.id)}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Section */}
            <div className="mt-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                Add New Section
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={newSection.title}
                    onChange={e =>
                      setNewSection(prev => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Enter section title"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Section Type
                  </label>
                  <select
                    value={newSection.type}
                    onChange={e =>
                      setNewSection(prev => ({
                        ...prev,
                        type: e.target.value as any,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="video">Video</option>
                    <option value="text">Text</option>
                    <option value="quiz">Quiz</option>
                    <option value="assignment">Assignment</option>
                  </select>
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newSection.description}
                    onChange={e =>
                      setNewSection(prev => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="Describe this section..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <button
                onClick={handleSectionAdd}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-2"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Add Section</span>
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-3">
            <input
              type="checkbox"
              id="published"
              checked={courseData.isPublished}
              onChange={e => handleInputChange('isPublished', e.target.checked)}
              className="rounded"
            />
            <label
              htmlFor="published"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Publish course
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCoursePage;
