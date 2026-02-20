import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Lock, Eye, EyeOff } from 'lucide-react';
import { getPsychologistPin, setPsychologistPin } from '../utils/store';

export default function PsychologistLogin() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const existingPin = getPsychologistPin();
  const isFirstAccess = !existingPin;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isFirstAccess) {
      if (pin.length < 4) {
        setError('O PIN deve ter pelo menos 4 dígitos.');
        return;
      }
      if (pin !== confirmPin) {
        setError('Os PINs não coincidem.');
        return;
      }
      setPsychologistPin(pin);
      navigate('/psicologo/dashboard');
    } else {
      if (pin === existingPin) {
        navigate('/psicologo/dashboard');
      } else {
        setError('PIN incorreto. Tente novamente.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vanilla-50 via-white to-vanilla-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md border border-vanilla-200">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-vanilla-200 p-3 rounded-2xl">
              <Brain className="w-8 h-8 text-vanilla-700" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isFirstAccess ? 'Criar Acesso' : 'Área do Psicólogo'}
          </h2>
          <p className="text-gray-500 mt-2">
            {isFirstAccess
              ? 'Crie um PIN para proteger seus dados clínicos.'
              : 'Digite seu PIN para acessar o sistema.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Lock className="w-4 h-4 inline mr-1" />
              {isFirstAccess ? 'Criar PIN' : 'Seu PIN'}
            </label>
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Digite seu PIN"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vanilla-400 focus:ring-2 focus:ring-vanilla-200 outline-none transition-all text-center text-2xl tracking-widest"
                maxLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isFirstAccess && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar PIN
              </label>
              <input
                type={showPin ? 'text' : 'password'}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                placeholder="Confirme seu PIN"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vanilla-400 focus:ring-2 focus:ring-vanilla-200 outline-none transition-all text-center text-2xl tracking-widest"
                maxLength={8}
              />
            </div>
          )}

          {error && (
            <p className="text-rose-500 text-sm text-center bg-rose-50 py-2 rounded-xl">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-vanilla-500 hover:bg-vanilla-600 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all"
          >
            {isFirstAccess ? 'Criar e Entrar' : 'Entrar'}
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm py-2"
        >
          Voltar ao início
        </button>
      </div>
    </div>
  );
}
