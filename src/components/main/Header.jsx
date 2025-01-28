// src/components/main/Header.jsx
import React, { useState } from 'react';
import { LogOut, User, ChevronDown, Globe, LayoutDashboard } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import NotificationCenter from './NotificationCenter';

const Header = ({ user, notifications: initialNotifications = [], onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const isWelsh = location.pathname.includes('/cy');

  const toggleLanguage = () => {
    const newPath = isWelsh 
      ? location.pathname.replace('/cy', '/en')
      : location.pathname.replace('/en', '/cy');
    navigate(newPath);
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    onLogout();
  };

  // Get display name based on user role
  const getDisplayName = () => {
    if (user.role === 'staff') {
      return 'Sport Wales Staff';
    }
    return user.organisation || 'Partner User';
  };

  // Get role display text
  const getRoleDisplay = () => {
    if (user.role === 'staff') {
      return user.department || 'Staff Portal';
    }
    return 'Partner Portal';
  };

   // Add handleMarkAsRead function
   const handleMarkAsRead = (notificationIds) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notificationIds.includes(notification.id)
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // Add handleClearAll function if not already present
  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-1">
        <div className="flex px-10 justify-between h-16">
          {/* Logo and Title Section */}
          <div className="flex items-stretch space-x-8">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-sw-blue">
                  Sport Wales
                </span>
                <span className="text-xs text-gray-500">
                  Investment Portal
                </span>
              </div>
            </div>
  
            <div className="hidden md:flex items-center space-x-8">
              <span className="text-lg font-medium text-sw-blue border-b-2 border-sw-blue px-1">
                {user.role === 'staff' ? 'Staff Portal' : `${user.organisation} Portal`}
              </span>
            </div>
          </div>
  
          {/* Right side navigation items */}
          <div className="flex items-center space-x-6">
            {/* Notification Center */}
            <NotificationCenter 
              notifications={notifications}
              isOpen={showNotifications}
              onToggle={() => setShowNotifications(!showNotifications)}
              onMarkAsRead={handleMarkAsRead}
              onClearAll={handleClearAll}
              onClose={() => setShowNotifications(false)}
            />
            
            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-sw-blue/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-sw-blue" />
                </div>
                <div className="hidden md:block text-right">
                  <div className="text-sm font-medium text-gray-700">
                    {user.role === 'staff' ? user.name : user.organisation}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user.role === 'staff' ? user.department : 'Partner'}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
  
              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </button>
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </button>
                    <div className="border-t border-gray-100" />
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
  
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Globe className="w-5 h-5 text-sw-blue" />
              <span className="text-sm font-medium text-gray-700">
                {isWelsh ? 'English' : 'Cymraeg'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;