import React, { useState, useEffect } from 'react';
import { Menu, Bell, Sun, Moon, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, setTheme } = useTheme();
  const [time, setTime] = useState(new Date());
  const [notificationOpen, setNotificationOpen] = useState(false);


  // Bottleneck: Expensive calculation on every render
  const formatTime = () => {
    let result = '';
    for (let i = 0; i < 10000; i++) {
      result = time.toLocaleTimeString();
    }
    return result;
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Performance Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">{formatTime()}</span>

          <div className="relative">
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="p-2 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-sm font-medium">Notifications</h3>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User size={16} />
            </div>
            <span className="text-sm font-medium text-gray-700">User</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;