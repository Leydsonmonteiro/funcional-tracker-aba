import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Microscope, Brain, BookOpen, Target, MessageSquare, Lightbulb } from 'lucide-react';
import Layout from '../components/Layout';
import { getPatient, getMolarEntries, addMolarEntry, updateMolarEntry } from '../utils/store';
import type { MolarEntry } from '../types';

export default function MolarForm() {
  const { id, entryId } = useParams<{ id: string; entryId?: string }>();
  const navigate = useNavigate();
  const patient = getPatient(id || '');
  const existingEntries = getMolarEntries(id);
  const [saved, setSaved] = useState(false);

  const [activeSection, setActiveSection] = useState(0);

  const [form, setForm] = useState<Omit<MolarEntry, 'id' | 'createdAt'>>({
    patientId: id || '',
    sessionDate: new Date().toISOString().split('T')[0],
    sessionNumber: existingEntries.length + 1,
    antecedentPro: '',
    responsePro: '',
    consequencePro: '',
    emotionIntensityPro: 5,
    recurrence: '',
    behaviorFunctionPro: '',
    observationsPro: '',
    phylogenesis: '',
    ontogenesis: '',
    culture: '',
    currentEnvironmentOM: '',
    selfRules: '',
    motivatingOperation: '',
    discriminativeStimulus: '',
    publicResponse: '',
    privateResponse: '',
    immediateConsequence: '',
    delayedConsequence: '',
    crb1: '',
    crb2: '',
    verbalBehavior: '',
    incongruence: '',
    functionalHypothesis: '',
    interventionPlan: '',
  });

  useEffect(() => {
    if (entryId) {
      const entry = existingEntries.find(e => e.id === entryId);
      if (entry) {
        const { id: _id, createdAt: _ca, ...rest } = entry;
        setForm(rest);
      }
    }
  }, [entryId]);

  const updateField = (field: string, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (entryId) {
      updateMolarEntry(entryId, form);
    } else {
      addMolarEntry(form);
    }
    setSaved(true);
    setTimeout(() => navigate(`/psicologo/paciente/${id}`), 1500);
  };

  const sections = [
    {
      title: 'Modelo ABC Profissional',
      icon: Microscope,
      color: 'text-vanilla-600',
      fields: [
        { key: 'sessionDate', label: 'Data da sessão', type: 'date' },
        { key: 'sessionNumber', label: 'Número da sessão', type: 'number' },
        { key: 'antecedentPro', label: '1. Descreva o antecedente (onde o paciente estava, com quem, o que fazia, pensava, sentia)', type: 'textarea', placeholder: 'Ex: onde o/a paciente estava, com quem, o que estava fazendo ou pensando, como estava se sentindo' },
        { key: 'responsePro', label: '2. O que ele/ela relata ter feito? (disse, fez ou pensou)', type: 'textarea', placeholder: 'Descreva o relato sobre o que o paciente disse, fez ou pensou' },
        { key: 'consequencePro', label: '3. Descreva a consequência (o que mudou, como se sentiu, reações de outros)', type: 'textarea', placeholder: 'O que mudou logo depois, como o paciente se sentiu, houveram reações importantes de outras pessoas?' },
        { key: 'emotionIntensityPro', label: '4. Intensidade da emoção relatada (0-10)', type: 'range' },
        { key: 'recurrence', label: '5. Essa situação já aconteceu antes?', type: 'textarea', placeholder: 'Descreva a recorrência dessa situação' },
        { key: 'behaviorFunctionPro', label: '6. O que esse comportamento trouxe para o paciente?', type: 'textarea', placeholder: 'Ex: alívio, atenção, evitou algo, conseguiu o que gostaria, sentiu pior, etc.' },
        { key: 'observationsPro', label: '7. Observações adicionais', type: 'textarea', placeholder: 'Pensamentos, sentimentos ou observações adicionais sobre o que aconteceu' },
      ],
    },
    {
      title: 'Análise Molar — Telescópio',
      icon: Brain,
      color: 'text-sky-600',
      fields: [
        { key: 'phylogenesis', label: 'Filogênese (Biológico)', type: 'textarea', placeholder: 'Histórico psiquiátrico na família, doenças crônicas, medicações, psicofarmacologia...' },
        { key: 'ontogenesis', label: 'Ontogênese (História de Vida)', type: 'textarea', placeholder: 'Como os pais lidavam com frustrações? Como o afeto era liberado? Padrões de coerção na infância...' },
        { key: 'culture', label: 'Cultura', type: 'textarea', placeholder: 'Regras sociais, religiosas ou corporativas que oprimem o cliente...' },
        { key: 'currentEnvironmentOM', label: 'Ambiente Atual como OM', type: 'textarea', placeholder: 'A vida atual é muito aversiva? Há privação crônica de reforçadores positivos?' },
        { key: 'selfRules', label: 'Autorregras Rígidas', type: 'textarea', placeholder: 'Quais autorregras tornam o cliente insensível à realidade? Ex: "Se eu falhar, serei rejeitado para sempre"' },
      ],
    },
    {
      title: 'Quádrupla Contingência — Microscópio',
      icon: Target,
      color: 'text-coral-500',
      fields: [
        { key: 'motivatingOperation', label: 'Operação Motivadora (OM)', type: 'textarea', placeholder: 'O que alterou o valor do reforço naquele momento? Ex: Sem dormir? Levou bronca? Carente?' },
        { key: 'discriminativeStimulus', label: 'Estímulo Discriminativo (SD)', type: 'textarea', placeholder: 'Qual o gatilho exato que sinalizou que a resposta funcionaria? Ex: A esposa cruzou os braços' },
        { key: 'publicResponse', label: 'Resposta Pública (Operante)', type: 'textarea', placeholder: 'O que a câmera filmaria? Gritou, saiu da sala, bebeu álcool...' },
        { key: 'privateResponse', label: 'Resposta Privada (Respondente/Encoberto)', type: 'textarea', placeholder: 'O que o corpo sentiu? Taquicardia, nó na garganta. O que a mente pensou?' },
        { key: 'immediateConsequence', label: 'Consequência Imediata', type: 'textarea', placeholder: 'Produziu R+ (ganhou atenção/prazer) ou R- (alívio/fuga do aversivo)?' },
        { key: 'delayedConsequence', label: 'Consequência Atrasada', type: 'textarea', placeholder: 'Qual o custo a longo prazo? Culpa, piora no relacionamento, ressaca...' },
      ],
    },
    {
      title: 'CRBs e Comportamento Verbal',
      icon: MessageSquare,
      color: 'text-lavender-500',
      fields: [
        { key: 'crb1', label: 'CRB1 — O problema em sessão', type: 'textarea', placeholder: 'Tenta fugir de assuntos difíceis? Tenta agradar? Chega atrasado?' },
        { key: 'crb2', label: 'CRB2 — A melhora em sessão', type: 'textarea', placeholder: 'Chora e se permite ser vulnerável? Discorda de forma assertiva?' },
        { key: 'verbalBehavior', label: 'Comportamento Verbal (Autoclíticos, Tatos, Mandos)', type: 'textarea', placeholder: 'Autoclíticos: "Não que eu me importe, mas..." Tatos distorcidos? Mandos disfarçados?' },
        { key: 'incongruence', label: 'Incongruência Verbal vs. Não Verbal', type: 'textarea', placeholder: 'Diz estar bem mas está com mandíbula tensa? O dado real está no corpo?' },
      ],
    },
    {
      title: 'Formulação e Intervenção',
      icon: Lightbulb,
      color: 'text-sage-600',
      fields: [
        { key: 'functionalHypothesis', label: 'Hipótese Funcional', type: 'textarea', placeholder: 'Integre os dados moleculares e molares para formular a hipótese funcional do caso...' },
        { key: 'interventionPlan', label: 'Plano de Intervenção', type: 'textarea', placeholder: 'Quais técnicas e estratégias serão utilizadas para alterar as contingências?' },
      ],
    },
  ];

  if (!patient) {
    return (
      <Layout title="Análise Molar" showBack variant="psychologist">
        <p className="text-center text-gray-500 py-12">Paciente não encontrado.</p>
      </Layout>
    );
  }

  return (
    <Layout
      title={entryId ? 'Editar Análise Molar' : 'Nova Análise Molar'}
      showBack
      backTo={`/psicologo/paciente/${id}`}
      variant="psychologist"
    >
      {saved && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
            <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Save className="w-8 h-8 text-sage-600" />
            </div>
            <p className="text-lg font-semibold text-gray-900">Análise salva com sucesso!</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Navegação de seções */}
        <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4">
          {sections.map((section, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveSection(idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                activeSection === idx
                  ? 'bg-vanilla-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.title.split('—')[0].trim()}
            </button>
          ))}
        </div>

        {/* Seção ativa */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className={`text-lg font-semibold mb-1 flex items-center gap-2 ${sections[activeSection].color}`}>
            {(() => { const Icon = sections[activeSection].icon; return <Icon className="w-5 h-5" />; })()}
            {sections[activeSection].title}
          </h3>
          <p className="text-sm text-gray-500 mb-6">Paciente: {patient.name}</p>

          <div className="space-y-4">
            {sections[activeSection].fields.map(field => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={(form as Record<string, unknown>)[field.key] as string || ''}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-vanilla-400 focus:ring-2 focus:ring-vanilla-200 outline-none resize-none text-sm"
                  />
                ) : field.type === 'range' ? (
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={(form as Record<string, unknown>)[field.key] as number}
                      onChange={(e) => updateField(field.key, parseInt(e.target.value))}
                      className="w-full accent-vanilla-500"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>0 (Nenhuma)</span>
                      <span className="text-lg font-bold text-vanilla-600">{(form as Record<string, unknown>)[field.key] as number}</span>
                      <span>10 (Máxima)</span>
                    </div>
                  </div>
                ) : field.type === 'date' ? (
                  <input
                    type="date"
                    value={(form as Record<string, unknown>)[field.key] as string}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-vanilla-400 focus:ring-2 focus:ring-vanilla-200 outline-none"
                  />
                ) : field.type === 'number' ? (
                  <input
                    type="number"
                    value={(form as Record<string, unknown>)[field.key] as number}
                    onChange={(e) => updateField(field.key, parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-vanilla-400 focus:ring-2 focus:ring-vanilla-200 outline-none"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Navegação entre seções */}
        <div className="flex justify-between gap-3">
          {activeSection > 0 && (
            <button
              type="button"
              onClick={() => setActiveSection(activeSection - 1)}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
            >
              Anterior
            </button>
          )}
          {activeSection < sections.length - 1 ? (
            <button
              type="button"
              onClick={() => setActiveSection(activeSection + 1)}
              className="flex-1 py-3 rounded-xl bg-vanilla-500 text-white font-medium hover:bg-vanilla-600 shadow-md"
            >
              Próximo
            </button>
          ) : (
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-sage-500 text-white font-semibold hover:bg-sage-600 shadow-md flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {entryId ? 'Atualizar Análise' : 'Salvar Análise'}
            </button>
          )}
        </div>
      </form>
    </Layout>
  );
}
