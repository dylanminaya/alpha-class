import React, { useState, useEffect } from 'react';
import { Bell, X, AlertCircle, CheckCircle, Info } from 'lucide-react';
import './NotificationSystem.css';

interface Notification {
  id: string;
  type: 'payment' | 'reminder' | 'success' | 'info';
  title: string;
  message: string;
  date: Date;
  read: boolean;
}

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Generate sample notifications
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        type: 'payment',
        title: 'Payment Reminder',
        message: 'Your internet bill is due in 3 days',
        date: new Date(),
        read: false,
      },
      {
        id: '2',
        type: 'reminder',
        title: 'Financial Goal',
        message: 'You are €150 away from reaching your monthly savings goal',
        date: new Date(Date.now() - 86400000),
        read: false,
      },
      {
        id: '3',
        type: 'success',
        title: 'Successful Transaction',
        message: 'Your income of €500 was added successfully',
        date: new Date(Date.now() - 172800000),
        read: true,
      },
    ];

    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'payment':
        return <AlertCircle size={20} />;
      case 'reminder':
        return <Bell size={20} />;
      case 'success':
        return <CheckCircle size={20} />;
      case 'info':
        return <Info size={20} />;
      default:
        return <Bell size={20} />;
    }
  };

  const getNotificationClass = (type: Notification['type']) => {
    switch (type) {
      case 'payment':
        return 'notification-payment';
      case 'reminder':
        return 'notification-reminder';
      case 'success':
        return 'notification-success';
      case 'info':
        return 'notification-info';
      default:
        return '';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="notification-system">
      {/* Notification button */}
      <button
        className="notification-toggle"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {/* Notification panel */}
      {showNotifications && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            <div className="notification-actions">
              {unreadCount > 0 && (
                <button 
                  className="mark-all-read-btn"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </button>
              )}
              <button 
                className="close-notifications-btn"
                onClick={() => setShowNotifications(false)}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <Bell size={32} />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`notification-item ${getNotificationClass(notification.type)} ${
                    !notification.read ? 'unread' : ''
                  }`}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="notification-time">
                      {formatDate(notification.date)}
                    </span>
                  </div>
                  <div className="notification-actions">
                    {!notification.read && (
                      <button
                        className="mark-read-btn"
                        onClick={() => markAsRead(notification.id)}
                        title="Mark as read"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                    <button
                      className="delete-notification-btn"
                      onClick={() => deleteNotification(notification.id)}
                                              title="Delete"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;
