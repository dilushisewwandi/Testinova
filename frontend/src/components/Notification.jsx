import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-[#1A3FFF]',
          textColor: 'text-white',
          icon: '✓'
        };
      case 'error':
        return {
          bgColor: 'bg-red-500',
          textColor: 'text-white',
          icon: '✕'
        };
      default:
        return {
          bgColor: 'bg-[#1A3FFF]',
          textColor: 'text-white',
          icon: 'ℹ'
        };
    }
  };

  const { bgColor, textColor, icon } = getStyles();

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${bgColor} ${textColor} max-w-sm opacity-95 transition-opacity duration-300`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-lg mr-3">{icon}</span>
          <span className="font-medium">{message}</span>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-blue-100 focus:outline-none transition-colors duration-200 text-xl leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;