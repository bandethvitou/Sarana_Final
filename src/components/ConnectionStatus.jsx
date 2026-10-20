// src/components/ConnectionStatus.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ConnectionStatus() {
  const { checkBackendStatus, useFallback } = useAuth();
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isConnected = await checkBackendStatus();
        setStatus(isConnected ? 'online' : 'offline');
      } catch (error) {
        setStatus('offline');
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    online: { icon: '🟢', label: 'Connected', color: 'text-green-600' },
    offline: { icon: '🔴', label: 'Offline', color: 'text-red-600' },
    checking: { icon: '🟡', label: 'Checking...', color: 'text-yellow-600' },
  };

  const current = statusConfig[status] || statusConfig.checking;

  return (
    <div className={`flex items-center gap-1 text-sm ${current.color}`}>
      <span>{current.icon}</span>
      <span>{current.label}</span>
      {useFallback && status === 'offline' && (
        <span className="ml-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
          Fallback Mode
        </span>
      )}
    </div>
  );
}