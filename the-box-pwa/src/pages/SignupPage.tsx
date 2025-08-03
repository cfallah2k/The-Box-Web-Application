import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  EyeIcon, 
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'instructor',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        subscription: 'basic',
      });
      addToast({
        type: 'success',
        title: 'Account created successfully!',
        message: 'Welcome to The Box!'
      });
      navigate('/dashboard');
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Signup failed',
        message: 'Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
            <AcademicCapIcon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Join millions of learners worldwide
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="card p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name" className="label">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="name"
                name="name"
                type="text"
                required
                className="input pl-10"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="label">Email Address</label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input pl-10"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="role" className="label">I am a</label>
            <select
              id="role"
              name="role"
              className="input"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          <div>
            <label htmlFor="password" className="label">Password</label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="input pl-10 pr-10"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeToTerms" className="text-gray-700 dark:text-gray-300">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn btn-primary py-3 text-base font-medium"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <LoadingSpinner size="sm" />
                <span>Creating account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage; 