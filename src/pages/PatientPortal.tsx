import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ClipboardList, Brain, History, User, CheckCircle2, AlertCircle, Printer } from 'lucide-react';
import { getPatientByCode, getAnamnesis, getMolecularEntries, hasPatientFilledToday } from '../utils/store';
import type { Patient } from '../types';

export default function PatientPortal() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (code) {
      const p = getPatientByCode(code);
      if (p) setPatient(p);
    }
  }, [code]);

  if (!patient) {
    return (
      <div className="min-h-screen bg-sage-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Código não encontrado</h2>
          <p className="text-gray-500 mb-4">Verifique o código com seu psicólogo(a).</p>
          <button onClick={() => navigate('/paciente')} className="text-sage-600 font-medium">Voltar</button>
        </div>
      </div>
    );
  }

  const anamnesis = getAnamnesis(patient.id);
  const filledToday = hasPatientFilledToday(patient.id);
  const totalEntries = getMolecularEntries(patient.id).length;
  const anamnesisStatus = anamnesis?.status === 'completed' ? 'completed' : anamnesis ? 'in_progress' : 'not_started';

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-sage-100">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-sage-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-sage-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Olá, {patient.name.split(' ')[0]}!</h1>
          <p className="text-gray-500 mt-1">Bem-vindo(a) ao seu espaço terapêutico</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className={`p-4 rounded-2xl ${filledToday ? 'bg-sage-50 border border-sage-200' : 'bg-warm-50 border border-warm-200'}`}>
            <div className="flex items-center gap-2 mb-1">
              {filledToday ? <CheckCircle2 className="w-4 h-4 text-sage-600" /> : <AlertCircle className="w-4 h-4 text-warm-600" />}
              <span className="text-xs font-medium text-gray-600">Diário de hoje</span>
            </div>
            <p className={`text-sm font-bold ${filledToday ? 'text-sage-700' : 'text-warm-700'}`}>
              {filledToday ? 'Preenchido!' : 'Pendente'}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-lavender-50 border border-lavender-200">
            <div className="flex items-center gap-2 mb-1">
              <ClipboardList className="w-4 h-4 text-lavender-500" />
              <span className="text-xs font-medium text-gray-600">Total de registros</span>
            </div>
            <p className="text-sm font-bold text-lavender-600">{totalEntries} registros</p>
          </div>
        </div>

        {/* Menu de ações */}
        <div className="space-y-3">
          {/* Anamnese */}
          <button
            onClick={() => navigate(`/paciente/${code}/anamnese`)}
            className={`w-full p-5 rounded-2xl text-left transition-all shadow-sm ${
              anamnesisStatus === 'completed'
                ? 'bg-white border border-sage-200 hover:shadow-md'
                : 'bg-gradient-to-r from-lavender-500 to-lavender-600 text-white hover:shadow-lg'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                anamnesisStatus === 'completed' ? 'bg-sage-100' : 'bg-white/20'
              }`}>
                <Brain className={`w-6 h-6 ${anamnesisStatus === 'completed' ? 'text-sage-600' : 'text-white'}`} />
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${anamnesisStatus === 'completed' ? 'text-gray-900' : 'text-white'}`}>
                  Anamnese Psicológica
                </h3>
                <p className={`text-sm ${anamnesisStatus === 'completed' ? 'text-gray-500' : 'text-white/80'}`}>
                  {anamnesisStatus === 'completed'
                    ? 'Concluída — clique para revisar'
                    : anamnesisStatus === 'in_progress'
                    ? `Em andamento — seção ${anamnesis?.currentSection}/16`
                    : 'Preencha sua anamnese completa'}
                </p>
              </div>
              {anamnesisStatus === 'completed' && <CheckCircle2 className="w-6 h-6 text-sage-500" />}
            </div>
          </button>

          {/* Diário ABC */}
          <button
            onClick={() => navigate(`/paciente/${code}/diario`)}
            className={`w-full p-5 rounded-2xl text-left transition-all shadow-sm ${
              filledToday
                ? 'bg-white border border-gray-200 hover:shadow-md'
                : 'bg-gradient-to-r from-sage-500 to-sage-600 text-white hover:shadow-lg'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                filledToday ? 'bg-sage-100' : 'bg-white/20'
              }`}>
                <ClipboardList className={`w-6 h-6 ${filledToday ? 'text-sage-600' : 'text-white'}`} />
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${filledToday ? 'text-gray-900' : 'text-white'}`}>
                  Diário ABC — Automonitoramento
                </h3>
                <p className={`text-sm ${filledToday ? 'text-gray-500' : 'text-white/80'}`}>
                  {filledToday ? 'Já preencheu hoje — pode adicionar mais' : 'Registre o que aconteceu hoje'}
                </p>
              </div>
              {filledToday && <CheckCircle2 className="w-6 h-6 text-sage-500" />}
            </div>
          </button>

          {/* Histórico */}
          <button
            onClick={() => navigate(`/paciente/${code}/historico`)}
            className="w-full p-5 rounded-2xl bg-white border border-gray-200 text-left hover:shadow-md transition-all shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-vanilla-100 flex items-center justify-center">
                <History className="w-6 h-6 text-vanilla-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">Meu Histórico</h3>
                <p className="text-sm text-gray-500">Veja todos os seus registros anteriores</p>
              </div>
            </div>
          </button>
        </div>

        {/* Versão Impressa */}
        <button
          onClick={() => navigate('/paciente/imprimir/diario')}
          className="w-full p-4 rounded-2xl bg-white border border-gray-200 text-left hover:shadow-md transition-all shadow-sm mt-3"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <Printer className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">Versão para Imprimir</h3>
              <p className="text-sm text-gray-500">Baixe o diário em PDF para preencher no papel</p>
            </div>
          </div>
        </button>

        {/* Dica */}
        <div className="mt-6 bg-sage-50 border border-sage-200 rounded-2xl p-4">
          <p className="text-sage-800 text-sm text-center">
            Preencher o diário diariamente ajuda seu psicólogo(a) a entender melhor seus padrões 
            e oferecer um tratamento mais eficaz.
          </p>
        </div>

        <button onClick={() => navigate('/')} className="w-full text-center text-gray-400 text-sm mt-6 py-2">
          Voltar ao início
        </button>
      </div>
    </div>
  );
}
