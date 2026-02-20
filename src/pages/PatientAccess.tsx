import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, KeyRound } from 'lucide-react';
import { getPatientByCode } from '../utils/store';

export default function PatientAccess() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const patient = getPatientByCode(code.toUpperCase().trim());
    if (patient) {
      navigate(`/paciente/${patient.accessCode}`);
    } else {
      setError('Código não encontrado. Verifique com seu psicólogo(a).');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-sage-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md border border-sage-200">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-sage-100 p-3 rounded-2xl">
              <UserCircle className="w-8 h-8 text-sage-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Área do Paciente</h2>
          <p className="text-gray-500 mt-2">
            Digite o código que seu psicólogo(a) forneceu para acessar seu espaço.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <KeyRound className="w-4 h-4 inline mr-1" />
              Código de Acesso
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Ex: ABC123"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200 outline-none transition-all text-center text-2xl tracking-widest font-mono"
              maxLength={6}
            />
          </div>

          {error && (
            <p className="text-rose-500 text-sm text-center bg-rose-50 py-2 rounded-xl">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-sage-500 hover:bg-sage-600 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all"
          >
            Acessar Meu Espaço
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
