import React, { useEffect } from 'react';
import './Notification.css'; 

type NotificationProps = {
  message: string;
  type: 'success' | 'error';
  duration?: number; 
  onClose: () => void; 
};

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  duration = 2000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer); 
  }, [duration, onClose]);

  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
