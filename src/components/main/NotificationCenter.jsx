// src/components/main/NotificationCenter.jsx
import React from 'react';
import { Bell, X, Check } from 'lucide-react';

const NotificationCenter = ({ 
  notifications = [], 
  isOpen, 
  onToggle, 
  onMarkAsRead, 
  onClearAll,
  onClose 
}) => {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button 
        onClick={onToggle}
        className="p-2 rounded-full hover:bg-gray-100 relative"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-sw-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button 
                  onClick={() => onMarkAsRead(notifications.map(n => n.id))}
                  className="text-sm text-sw-blue hover:text-sw-blue-dark"
                >
                  Mark all as read
                </button>
              )}
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          {notifications.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 transition-colors duration-150 ${
                    !notification.isRead ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {notification.timestamp}
                      </span>
                    </div>
                    {!notification.isRead && (
                      <button 
                        onClick={() => onMarkAsRead([notification.id])}
                        className="text-sw-blue hover:text-sw-blue-dark ml-2"
                        aria-label="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No notifications
            </div>
          )}

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t">
              <button 
                onClick={onClearAll}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Clear all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;