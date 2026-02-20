import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Plus, Brain } from 'lucide-react';
import { getPatientByCode, getMolecularEntries } from '../utils/store';
import { FREQUENCY_LABELS } from '../types';
import type { MolecularEntry } from '../types';

export default function PatientHistory() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const patient = getPatientByCode(code || '');
  const [entries, setEntries] = useState<MolecularEntry[]>([]);

  useEffect(() => {
    if (patient) {
      setEntries(getMolecularEntries(patient.id).sort((a, b) => b.date.localeCompare(a.date)));
    }
  }, [patient]);

  if (!patient) {
    return (
      <div className="min-h-screen bg-sage-50 flex items-center justify-center">
        <p className="text-gray-500">Código inválido.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-sage-100">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sage-200">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(`/paciente/${code}/diario`)} className="p-2 rounded-xl hover:bg-sage-100">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-sage-500" />
              <span className="font-semibold text-gray-800">Meu Histórico</span>
            </div>
          </div>
          <button
            onClick={() => navigate(`/paciente/${code}/diario`)}
            className="bg-sage-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Novo
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        {entries.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Nenhum registro ainda</p>
            <p className="text-sm">Comece preenchendo seu primeiro diário ABC.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">{entries.length} registro(s) encontrado(s)</p>
            {entries.map(entry => (
              <div key={entry.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">{entry.date} às {entry.time}</span>
                  </div>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    entry.emotionIntensity >= 7 ? 'bg-rose-100 text-rose-600' :
                    entry.emotionIntensity >= 4 ? 'bg-warm-100 text-warm-600' :
                    'bg-sage-100 text-sage-600'
                  }`}>
                    {entry.emotionIntensity}/10
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <span className="font-medium text-gray-700 block mb-1">Situação</span>
                    <span className="text-gray-600">{entry.situation}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-sky-50 rounded-xl p-3">
                      <span className="font-medium text-sky-700 block mb-1 text-xs">Antes</span>
                      <span className="text-gray-600 text-xs">{entry.antecedent}</span>
                    </div>
                    <div className="bg-coral-50 rounded-xl p-3">
                      <span className="font-medium text-coral-600 block mb-1 text-xs">Resposta</span>
                      <span className="text-gray-600 text-xs">{entry.response}</span>
                    </div>
                  </div>
                  <div className="bg-lavender-50 rounded-xl p-3">
                    <span className="font-medium text-lavender-600 block mb-1 text-xs">Depois</span>
                    <span className="text-gray-600 text-xs">{entry.consequence}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {FREQUENCY_LABELS[entry.frequency]}
                  </span>
                  {entry.behaviorFunction.map((f, i) => (
                    <span key={i} className="text-xs bg-sage-100 text-sage-700 px-2 py-0.5 rounded">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
