import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, AlertTriangle, ClipboardList, TrendingUp } from 'lucide-react';
import Layout from '../components/Layout';
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../utils/store';
import type { Notification } from '../types';

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(getNotifications());
  }, []);

  const handleMarkAllRead = () => {
    markAllNotificationsRead();
    setNotifications(getNotifications());
  };

  const handleClick = (notif: Notification) => {
    markNotificationRead(notif.id);
    setNotifications(getNotifications());
    navigate(`/psicologo/paciente/${notif.patientId}`);
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'new_entry': return <ClipboardList className="w-5 h-5 text-sage-500" />;
      case 'missing_entry': return <AlertTriangle className="w-5 h-5 text-warm-500" />;
      case 'high_intensity': return <AlertTriangle className="w-5 h-5 text-rose-500" />;
      case 'pattern_detected': return <TrendingUp className="w-5 h-5 text-sky-500" />;
    }
  };

  const getBgColor = (type: Notification['type'], read: boolean) => {
    if (read) return 'bg-gray-50';
    switch (type) {
      case 'new_entry': return 'bg-sage-50 border-sage-200';
      case 'missing_entry': return 'bg-warm-50 border-warm-200';
      case 'high_intensity': return 'bg-rose-50 border-rose-200';
      case 'pattern_detected': return 'bg-sky-50 border-sky-200';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Layout title="Notificações" showBack backTo="/psicologo/dashboard" variant="psychologist">
      <div className="space-y-4">
        {/* Header com ação */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {unreadCount > 0 ? `${unreadCount} não lida(s)` : 'Todas lidas'}
          </p>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1 text-sm text-vanilla-600 hover:text-vanilla-700 font-medium"
            >
              <CheckCheck className="w-4 h-4" />
              Marcar todas como lidas
            </button>
          )}
        </div>

        {/* Lista de notificações */}
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Bell className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Nenhuma notificação</p>
            <p className="text-sm">As notificações aparecerão quando seus pacientes preencherem o diário.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => handleClick(notif)}
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer hover:shadow-sm transition-all ${getBgColor(notif.type, notif.read)}`}
              >
                <div className="mt-0.5">{getIcon(notif.type)}</div>
                <div className="flex-1">
                  <p className={`text-sm ${notif.read ? 'text-gray-500' : 'text-gray-800 font-medium'}`}>
                    {notif.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notif.date).toLocaleDateString('pt-BR')} às {new Date(notif.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {!notif.read && (
                  <div className="w-2.5 h-2.5 bg-vanilla-500 rounded-full mt-1.5 shrink-0" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
