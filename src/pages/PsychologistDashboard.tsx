import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ClipboardList, AlertTriangle, CheckCircle2, TrendingUp, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import { getPatients, getMolecularEntries, getMolarEntries, getUnreadCount, hasPatientFilledToday } from '../utils/store';

export default function PsychologistDashboard() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(getPatients());
  const [molecularEntries, setMolecularEntries] = useState(getMolecularEntries());
  const [molarEntries, setMolarEntries] = useState(getMolarEntries());
  const unreadCount = getUnreadCount();

  useEffect(() => {
    setPatients(getPatients());
    setMolecularEntries(getMolecularEntries());
    setMolarEntries(getMolarEntries());
  }, []);

  const activePatients = patients.filter(p => p.active);
  const patientsFilledToday = activePatients.filter(p => hasPatientFilledToday(p.id));
  const patientsMissing = activePatients.filter(p => !hasPatientFilledToday(p.id));

  // Intensidades altas recentes (últimos 3 dias)
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  const highIntensityRecent = molecularEntries.filter(
    e => e.emotionIntensity >= 7 && new Date(e.createdAt) >= threeDaysAgo
  );

  return (
    <Layout title="Dashboard" variant="psychologist">
      <div className="space-y-6">
        {/* Saudação */}
        <div className="bg-gradient-to-r from-vanilla-200 via-vanilla-100 to-white rounded-2xl p-6 border border-vanilla-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Bom dia!</h2>
          <p className="text-gray-600">Aqui está o resumo dos seus pacientes hoje.</p>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: 'Pacientes Ativos', value: activePatients.length, color: 'bg-vanilla-100 text-vanilla-700', iconColor: 'text-vanilla-500' },
            { icon: ClipboardList, label: 'Registros Moleculares', value: molecularEntries.length, color: 'bg-sage-100 text-sage-700', iconColor: 'text-sage-500' },
            { icon: TrendingUp, label: 'Sessões (Molar)', value: molarEntries.length, color: 'bg-sky-100 text-sky-700', iconColor: 'text-sky-500' },
            { icon: AlertTriangle, label: 'Alertas Não Lidos', value: unreadCount, color: 'bg-rose-100 text-rose-700', iconColor: 'text-rose-500' },
          ].map(({ icon: Icon, label, value, color, iconColor }) => (
            <div key={label} className={`${color} rounded-2xl p-4`}>
              <Icon className={`w-6 h-6 ${iconColor} mb-2`} />
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs opacity-70">{label}</p>
            </div>
          ))}
        </div>

        {/* Preenchimento hoje */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-vanilla-600" />
            Preenchimento de Hoje
          </h3>
          {activePatients.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhum paciente cadastrado ainda.</p>
          ) : (
            <div className="space-y-3">
              {patientsFilledToday.map(p => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/psicologo/paciente/${p.id}`)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-sage-50 border border-sage-200 cursor-pointer hover:bg-sage-100 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-sage-500 shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{p.name}</p>
                    <p className="text-xs text-sage-600">Preencheu o diário hoje</p>
                  </div>
                </div>
              ))}
              {patientsMissing.map(p => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/psicologo/paciente/${p.id}`)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-rose-50 border border-rose-200 cursor-pointer hover:bg-rose-100 transition-colors"
                >
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{p.name}</p>
                    <p className="text-xs text-rose-500">Ainda não preencheu hoje</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alertas de intensidade alta */}
        {highIntensityRecent.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              Intensidade Alta (Últimos 3 dias)
            </h3>
            <div className="space-y-2">
              {highIntensityRecent.slice(0, 5).map(entry => {
                const patient = patients.find(p => p.id === entry.patientId);
                return (
                  <div
                    key={entry.id}
                    onClick={() => navigate(`/psicologo/paciente/${entry.patientId}`)}
                    className="flex items-center justify-between p-3 rounded-xl bg-rose-50 cursor-pointer hover:bg-rose-100 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{patient?.name || 'Paciente'}</p>
                      <p className="text-xs text-gray-500">{entry.date} — {entry.situation?.substring(0, 50)}...</p>
                    </div>
                    <span className="bg-rose-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {entry.emotionIntensity}/10
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Ações rápidas */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/psicologo/pacientes')}
            className="bg-vanilla-500 hover:bg-vanilla-600 text-white p-4 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <Users className="w-6 h-6 mx-auto mb-2" />
            Gerenciar Pacientes
          </button>
          <button
            onClick={() => navigate('/psicologo/notificacoes')}
            className="bg-coral-500 hover:bg-coral-400 text-white p-4 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all relative"
          >
            <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
            Ver Notificações
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 bg-white text-coral-500 text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
}
