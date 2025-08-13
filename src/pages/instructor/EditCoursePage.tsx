import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  thumbnail: string;
  lessons: Lesson[];
  requirements: string[];
  outcomes: string[];
}

interface Lesson {
  id: string;
  title: string;
  duration: number;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  content: string;
}

const EditCoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockCourse: Course = {
        id: courseId || '1',
        title: 'Advanced React Development',
        description:
          'Master advanced React concepts including hooks, context, and performance optimization.',
        category: 'Programming',
        difficulty: 'advanced',
        price: 99.99,
        thumbnail: '/api/placeholder/400/300',
        lessons: [
          {
            id: '1',
            title: 'Introduction to Advanced React',
            duration: 45,
            type: 'video',
            content: 'Overview of advanced React concepts',
          },
          {
            id: '2',
            title: 'Custom Hooks Deep Dive',
            duration: 60,
            type: 'video',
            content: 'Creating and using custom hooks',
          },
        ],
        requirements: ['Basic React knowledge', 'JavaScript fundamentals'],
        outcomes: [
          'Master advanced React patterns',
          'Build scalable applications',
        ],
      };

      setCourse(mockCourse);
      setLoading(false);
    };

    loadCourse();
  }, [courseId]);

  const handleSave = async () => {
    if (!course) return;

    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSaving(false);

    // Navigate back to course details
    navigate(`/instructor/course/${course.id}`);
  };

  const updateCourse = (field: keyof Course, value: any) => {
    if (!course) return;
    setCourse({ ...course, [field]: value });
  };

  const addLesson = () => {
    if (!course) return;
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: 'New Lesson',
      duration: 30,
      type: 'video',
      content: '',
    };
    setCourse({ ...course, lessons: [...course.lessons, newLesson] });
  };

  const removeLesson = (lessonId: string) => {
    if (!course) return;
    setCourse({
      ...course,
      lessons: course.lessons.filter(lesson => lesson.id !== lessonId),
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Course not found
          </h2>
          <button
            onClick={() => navigate('/instructor-dashboard')}
            className="text-blue-600 hover:text-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Course</h1>
          <p className="text-gray-600">
            Update your course information and content
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  value={course.title}
                  onChange={e => updateCourse('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={course.category}
                  onChange={e => updateCourse('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Programming">Programming</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={course.difficulty}
                  onChange={e => updateCourse('difficulty', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={course.price}
                  onChange={e =>
                    updateCourse('price', parseFloat(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={course.description}
                onChange={e => updateCourse('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Requirements
            </h2>
            <div className="space-y-2">
              {course.requirements.map((requirement, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={requirement}
                    onChange={e => {
                      const newRequirements = [...course.requirements];
                      newRequirements[index] = e.target.value;
                      updateCourse('requirements', newRequirements);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => {
                      const newRequirements = course.requirements.filter(
                        (_, i) => i !== index
                      );
                      updateCourse('requirements', newRequirements);
                    }}
                    className="px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  updateCourse('requirements', [...course.requirements, ''])
                }
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                + Add Requirement
              </button>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Learning Outcomes
            </h2>
            <div className="space-y-2">
              {course.outcomes.map((outcome, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={outcome}
                    onChange={e => {
                      const newOutcomes = [...course.outcomes];
                      newOutcomes[index] = e.target.value;
                      updateCourse('outcomes', newOutcomes);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => {
                      const newOutcomes = course.outcomes.filter(
                        (_, i) => i !== index
                      );
                      updateCourse('outcomes', newOutcomes);
                    }}
                    className="px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  updateCourse('outcomes', [...course.outcomes, ''])
                }
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                + Add Outcome
              </button>
            </div>
          </div>

          {/* Lessons */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Lessons</h2>
              <button
                onClick={addLesson}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Lesson
              </button>
            </div>

            <div className="space-y-4">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Lesson Title
                      </label>
                      <input
                        type="text"
                        value={lesson.title}
                        onChange={e => {
                          const newLessons = [...course.lessons];
                          newLessons[index] = {
                            ...lesson,
                            title: e.target.value,
                          };
                          updateCourse('lessons', newLessons);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        value={lesson.duration}
                        onChange={e => {
                          const newLessons = [...course.lessons];
                          newLessons[index] = {
                            ...lesson,
                            duration: parseInt(e.target.value),
                          };
                          updateCourse('lessons', newLessons);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <select
                        value={lesson.type}
                        onChange={e => {
                          const newLessons = [...course.lessons];
                          newLessons[index] = {
                            ...lesson,
                            type: e.target.value as any,
                          };
                          updateCourse('lessons', newLessons);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="video">Video</option>
                        <option value="text">Text</option>
                        <option value="quiz">Quiz</option>
                        <option value="assignment">Assignment</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => removeLesson(lesson.id)}
                      className="px-3 py-1 text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove Lesson
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => navigate(`/instructor/course/${course.id}`)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCoursePage;
