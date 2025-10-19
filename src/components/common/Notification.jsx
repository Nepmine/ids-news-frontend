import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

export const Notification = ({ type = 'info', message, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-500',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-500',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-500',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-500',
    },
  };

  const { icon: Icon, bgColor, borderColor, textColor, iconColor } = config[type];

  return (
    <div
      className={`fixed top-4 right-4 z-50 ${bgColor} border ${borderColor} rounded-lg shadow-lg p-4 flex items-start space-x-3 max-w-md animate-slide-in`}
    >
      <Icon className={`w-6 h-6 ${iconColor} flex-shrink-0 mt-0.5`} />
      <p className={`${textColor} flex-1`}>{message}</p>
      <button onClick={onClose} className={`${textColor} hover:opacity-70`}>
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

// NotificationContainer Component
export const NotificationContainer = () => {
  const [notifications, setNotifications] = React.useState([]);

  // Expose global notification function
  React.useEffect(() => {
    window.showNotification = (type, message, duration) => {
      const id = Date.now();
      setNotifications((prev) => [...prev, { id, type, message, duration }]);
    };
  }, []);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          duration={notification.duration}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};