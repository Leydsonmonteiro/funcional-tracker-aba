import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, Bell, BarChart3, ArrowLeft, Brain } from 'lucide-react';
import { getUnreadCount } from '../utils/store';

interface LayoutProps {
  children: ReactNode;
  title: string;
  showBack?: boolean;
  backTo?: string;
  variant?: 'psychologist' | 'patient';
}

export default function Layout({ children, title, showBack, backTo, variant = 'psychologist' }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const unreadCount = getUnreadCount();

  const isPsychologist = variant === 'psychologist';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className={`sticky top-0 z-50 shadow-sm ${isPsychologist ? 'bg-white/90 backdrop-blur-md border-b border-vanilla-200' : 'bg-white/90 backdrop-blur-md border-b border-sage-200'}`}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBack && (
              <button
                onClick={() => backTo ? navigate(backTo) : navigate(-1)}
                className="p-2 rounded-xl hover:bg-vanilla-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <Brain className={`w-6 h-6 ${isPsychologist ? 'text-vanilla-600' : 'text-sage-500'}`} />
              <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
            </div>
          </div>
          {isPsychologist && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => navigate('/psicologo/notificacoes')}
                className="relative p-2 rounded-xl hover:bg-vanilla-100 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation - Psychologist */}
      {isPsychologist && (
        <nav className="sticky bottom-0 bg-white border-t border-vanilla-200 shadow-lg">
          <div className="max-w-5xl mx-auto px-4 flex justify-around py-2">
            {[
              { icon: Home, label: 'Início', path: '/psicologo/dashboard' },
              { icon: Users, label: 'Pacientes', path: '/psicologo/pacientes' },
              { icon: Bell, label: 'Alertas', path: '/psicologo/notificacoes', badge: unreadCount },
            ].map(({ icon: Icon, label, path, badge }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-colors relative ${isActive ? 'text-vanilla-700' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{label}</span>
                  {badge && badge > 0 && (
                    <span className="absolute -top-0.5 right-2 bg-rose-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {badge > 9 ? '9+' : badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
