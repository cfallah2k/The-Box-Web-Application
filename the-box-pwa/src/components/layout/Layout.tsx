import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${theme}`}>
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 