import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ClipboardList, Microscope, BarChart3, Calendar, Copy, Check, FileText, Download } from 'lucide-react';
import Layout from '../components/Layout';
import { getPatient, getMolecularEntries, getMolarEntries, getPatientStats, exportPatientData } from '../utils/store';
import { FREQUENCY_LABELS } from '../types';
import type { Patient, MolecularEntry, MolarEntry } from '../types';

export default function PatientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [molecularEntries, setMolecularEntries] = useState<MolecularEntry[]>([]);
  const [molarEntries, setMolarEntries] = useState<MolarEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'molecular' | 'molar'>('molecular');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      setPatient(getPatient(id));
      setMolecularEntries(getMolecularEntries(id).sort((a, b) => b.date.localeCompare(a.date)));
      setMolarEntries(getMolarEntries(id).sort((a, b) => b.sessionDate.localeCompare(a.sessionDate)));
    }
  }, [id]);

  if (!patient) {
    return (
      <Layout title="Paciente" showBack backTo="/psicologo/pacientes" variant="psychologist">
        <p className="text-center text-gray-500 py-12">Paciente não encontrado.</p>
      </Layout>
    );
  }

  const stats = getPatientStats(patient.id);

  const copyCode = () => {
    navigator.clipboard.writeText(patient.accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleExport = () => {
    const data = exportPatientData(patient.id);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${patient.name.replace(/\s+/g, '_')}_dados.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout title={patient.name} showBack backTo="/psicologo/pacientes" variant="psychologist">
      <div className="space-y-6">
        {/* Info do paciente */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-vanilla-200 flex items-center justify-center">
                  <span className="text-vanilla-700 font-bold text-xl">{patient.name.charAt(0)}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
                  <p className="text-sm text-gray-500">Início: {patient.startDate}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleExport} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500" title="Exportar dados">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Código de acesso */}
          <div className="bg-vanilla-50 rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Código de acesso do paciente</p>
              <p className="text-lg font-mono font-bold text-vanilla-700 tracking-widest">{patient.accessCode}</p>
            </div>
            <button onClick={copyCode} className="p-2 rounded-lg bg-vanilla-200 hover:bg-vanilla-300">
              {copied ? <Check className="w-4 h-4 text-sage-600" /> : <Copy className="w-4 h-4 text-vanilla-700" />}
            </button>
          </div>

          {/* Estatísticas rápidas */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center p-3 bg-sage-50 rounded-xl">
              <p className="text-2xl font-bold text-sage-700">{stats.totalMolecular}</p>
              <p className="text-xs text-sage-600">Registros ABC</p>
            </div>
            <div className="text-center p-3 bg-sky-50 rounded-xl">
              <p className="text-2xl font-bold text-sky-700">{stats.totalMolar}</p>
              <p className="text-xs text-sky-600">Sessões</p>
            </div>
            <div className="text-center p-3 bg-coral-50 rounded-xl">
              <p className="text-2xl font-bold text-coral-500">{stats.avgIntensity.toFixed(1)}</p>
              <p className="text-xs text-coral-400">Intensidade Média</p>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate(`/psicologo/paciente/${patient.id}/molar`)}
            className="bg-vanilla-500 hover:bg-vanilla-600 text-white p-4 rounded-2xl font-semibold shadow-md flex flex-col items-center gap-2"
          >
            <Microscope className="w-6 h-6" />
            <span className="text-sm">Nova Análise Molar</span>
          </button>
          <button
            onClick={() => navigate(`/psicologo/paciente/${patient.id}/analytics`)}
            className="bg-sky-500 hover:bg-sky-600 text-white p-4 rounded-2xl font-semibold shadow-md flex flex-col items-center gap-2"
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-sm">Ver Análise de Dados</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('molecular')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'molecular' ? 'bg-white text-sage-700 shadow-sm' : 'text-gray-500'}`}
          >
            <ClipboardList className="w-4 h-4 inline mr-1" />
            Molecular ({molecularEntries.length})
          </button>
          <button
            onClick={() => setActiveTab('molar')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'molar' ? 'bg-white text-vanilla-700 shadow-sm' : 'text-gray-500'}`}
          >
            <Microscope className="w-4 h-4 inline mr-1" />
            Molar ({molarEntries.length})
          </button>
        </div>

        {/* Entradas Moleculares */}
        {activeTab === 'molecular' && (
          <div className="space-y-3">
            {molecularEntries.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum registro molecular ainda.</p>
                <p className="text-sm">O paciente precisa preencher o diário ABC.</p>
              </div>
            ) : (
              molecularEntries.map(entry => (
                <div key={entry.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-600">{entry.date} {entry.time}</span>
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
                    <div>
                      <span className="font-medium text-vanilla-700">Situação: </span>
                      <span className="text-gray-700">{entry.situation}</span>
                    </div>
                    <div>
                      <span className="font-medium text-sky-600">Antecedente: </span>
                      <span className="text-gray-700">{entry.antecedent}</span>
                    </div>
                    <div>
                      <span className="font-medium text-coral-500">Resposta: </span>
                      <span className="text-gray-700">{entry.response}</span>
                    </div>
                    <div>
                      <span className="font-medium text-lavender-500">Consequência: </span>
                      <span className="text-gray-700">{entry.consequence}</span>
                    </div>
                    {entry.privateEvent && (
                      <div>
                        <span className="font-medium text-rose-400">Evento Privado: </span>
                        <span className="text-gray-700">{entry.privateEvent}</span>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {FREQUENCY_LABELS[entry.frequency]}
                      </span>
                      {entry.behaviorFunction.map((f, i) => (
                        <span key={i} className="text-xs bg-vanilla-100 text-vanilla-700 px-2 py-0.5 rounded">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Entradas Molares */}
        {activeTab === 'molar' && (
          <div className="space-y-3">
            {molarEntries.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Microscope className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nenhuma análise molar registrada.</p>
                <p className="text-sm">Clique em "Nova Análise Molar" para registrar.</p>
              </div>
            ) : (
              molarEntries.map(entry => (
                <div
                  key={entry.id}
                  onClick={() => navigate(`/psicologo/paciente/${patient.id}/molar/${entry.id}`)}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-vanilla-600" />
                      <span className="font-medium text-gray-800">Sessão #{entry.sessionNumber}</span>
                    </div>
                    <span className="text-sm text-gray-500">{entry.sessionDate}</span>
                  </div>
                  {entry.functionalHypothesis && (
                    <p className="text-sm text-gray-600 line-clamp-2">{entry.functionalHypothesis}</p>
                  )}
                  {entry.crb1 && (
                    <div className="mt-2">
                      <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded">CRB1: {entry.crb1.substring(0, 50)}...</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
