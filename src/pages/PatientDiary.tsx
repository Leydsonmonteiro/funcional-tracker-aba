import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, ClipboardList, History, Brain, CheckCircle2 } from 'lucide-react';
import { getPatientByCode, addMolecularEntry } from '../utils/store';
import { BEHAVIOR_FUNCTIONS } from '../types';

export default function PatientDiary() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const patient = getPatientByCode(code || '');
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    situation: '',
    antecedent: '',
    response: '',
    consequence: '',
    emotionIntensity: 5,
    frequency: 'happened_before' as const,
    behaviorFunction: [] as string[],
    observations: '',
    privateEvent: '',
    behaviorDuration: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
  });

  if (!patient) {
    return (
      <div className="min-h-screen bg-sage-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Código inválido.</p>
          <button onClick={() => navigate('/paciente')} className="mt-4 text-sage-600 underline">
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const toggleFunction = (fn: string) => {
    setForm(prev => ({
      ...prev,
      behaviorFunction: prev.behaviorFunction.includes(fn)
        ? prev.behaviorFunction.filter(f => f !== fn)
        : [...prev.behaviorFunction, fn],
    }));
  };

  const handleSubmit = () => {
    addMolecularEntry({
      patientId: patient.id,
      ...form,
    });
    setSubmitted(true);
  };

  const steps = [
    {
      title: 'Quando aconteceu?',
      subtitle: 'Registre a data e hora do evento.',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora (aproximada)</label>
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200 outline-none"
            />
          </div>
        </div>
      ),
    },
    {
      title: '1. O que aconteceu?',
      subtitle: 'Descreva, com suas próprias palavras, a situação brevemente.',
      content: (
        <textarea
          value={form.situation}
          onChange={(e) => setForm({ ...form, situation: e.target.value })}
          placeholder="Conte o que aconteceu de forma simples e honesta, como se contasse para alguém..."
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200 outline-none resize-none text-sm"
        />
      ),
    },
    {
      title: '2. O que estava acontecendo antes?',
      subtitle: 'Onde você estava, com quem, o que estava fazendo ou pensando, como estava se sentindo?',
      content: (
        <textarea
          value={form.antecedent}
          onChange={(e) => setForm({ ...form, antecedent: e.target.value })}
          placeholder="Ex: Eu estava em casa, sozinho(a), pensando em..."
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200 outline-none resize-none text-sm"
        />
      ),
    },
    {
      title: '3. O que você fez a respeito?',
      subtitle: 'Descreva o que você disse, fez ou pensou.',
      content: (
        <div className="space-y-4">
          <textarea
            value={form.response}
            onChange={(e) => setForm({ ...form, response: e.target.value })}
            placeholder="Descreva sua ação ou reação..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200 outline-none resize-none text-sm"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">O que você sentiu no corpo ou pensou na hora? (evento privado)</label>
            <textarea
              value={form.privateEvent}
              onChange={(e) => setForm({ ...form, privateEvent: e.target.value })}
              placeholder="Ex: Senti um aperto no peito, pensei que..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200 outline-none resize-none text-sm"
            />
          </div>
        </div>
      ),
    },
    {
      title: '4. O que aconteceu depois?',
      subtitle: 'O que mudou logo depois? Como você se sentiu? Houveram reações de outras pessoas?',
      content: (
        <textarea
          value={form.consequence}
          onChange={(e) => setForm({ ...form, consequence: e.target.value })}
          placeholder="Descreva o que aconteceu logo depois..."
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200 outline-none resize-none text-sm"
        />
      ),
    },
    {
      title: '5. Intensidade do sentimento',
      subtitle: 'Escolha um número que melhor representa a força desse sentimento.',
      content: (
        <div className="py-4">
          <input
            type="range"
            min="0"
            max="10"
            value={form.emotionIntensity}
            onChange={(e) => setForm({ ...form, emotionIntensity: parseInt(e.target.value) })}
            className="w-full accent-sage-500 h-3"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-400">0 — Nenhuma</span>
            <span className={`text-4xl font-bold ${
              form.emotionIntensity >= 7 ? 'text-rose-500' :
              form.emotionIntensity >= 4 ? 'text-warm-500' :
              'text-sage-500'
            }`}>
              {form.emotionIntensity}
            </span>
            <span className="text-xs text-gray-400">10 — Máxima</span>
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-gray-500">
              {form.emotionIntensity <= 3 ? 'Leve' : form.emotionIntensity <= 6 ? 'Moderado' : form.emotionIntensity <= 8 ? 'Forte' : 'Muito forte'}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: '6. Frequência',
      subtitle: 'Essa mesma situação tem acontecido com muita frequência?',
      content: (
        <div className="space-y-3">
          {[
            { value: 'first_time', label: 'Essa foi a primeira vez' },
            { value: 'happened_before', label: 'Não acontece, mas já aconteceu antes' },
            { value: '1_2_per_week', label: 'Acontece 1 a 2 vezes por semana' },
            { value: '3_plus_per_week', label: 'Acontece várias vezes, mais de 3 vezes por semana' },
          ].map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm({ ...form, frequency: opt.value as typeof form.frequency })}
              className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${
                form.frequency === opt.value
                  ? 'border-sage-400 bg-sage-50 text-sage-800'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: '7. O que esse comportamento trouxe pra você?',
      subtitle: 'Selecione todas as opções que se aplicam.',
      content: (
        <div className="space-y-3">
          {BEHAVIOR_FUNCTIONS.map(fn => (
            <button
              key={fn}
              type="button"
              onClick={() => toggleFunction(fn)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${
                form.behaviorFunction.includes(fn)
                  ? 'border-sage-400 bg-sage-50 text-sage-800'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              {fn}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: '8. Gostaria de acrescentar algo?',
      subtitle: 'Pensamentos, sentimentos ou observações sobre o que aconteceu.',
      content: (
        <div className="space-y-4">
          <textarea
            value={form.observations}
            onChange={(e) => setForm({ ...form, observations: e.target.value })}
            placeholder="Escreva livremente qualquer coisa que considere relevante..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200 outline-none resize-none text-sm"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quanto tempo durou? (opcional)</label>
            <input
              type="text"
              value={form.behaviorDuration}
              onChange={(e) => setForm({ ...form, behaviorDuration: e.target.value })}
              placeholder="Ex: 30 minutos, 2 horas..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200 outline-none text-sm"
            />
          </div>
        </div>
      ),
    },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-sage-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md text-center border border-sage-200">
          <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-sage-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registro enviado!</h2>
          <p className="text-gray-500 mb-6">
            Obrigado por preencher seu diário. Seu psicólogo(a) será notificado(a).
          </p>
          <p className="text-sage-600 text-sm mb-6 bg-sage-50 p-3 rounded-xl">
            Lembre-se: não há respostas certas ou erradas. O objetivo é compreender o que aconteceu.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => { setSubmitted(false); setStep(0); setForm({ ...form, situation: '', antecedent: '', response: '', consequence: '', emotionIntensity: 5, frequency: 'happened_before', behaviorFunction: [], observations: '', privateEvent: '', behaviorDuration: '', date: new Date().toISOString().split('T')[0], time: new Date().toTimeString().slice(0, 5) }); }}
              className="w-full bg-sage-500 hover:bg-sage-600 text-white py-3 rounded-xl font-semibold"
            >
              Novo Registro
            </button>
            <button
              onClick={() => navigate(`/paciente/${code}/historico`)}
              className="w-full border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50"
            >
              <History className="w-4 h-4 inline mr-2" />
              Ver Meu Histórico
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-sage-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sage-200">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-sage-500" />
            <span className="font-semibold text-gray-800">Diário ABC</span>
          </div>
          <button
            onClick={() => navigate(`/paciente/${code}/historico`)}
            className="p-2 rounded-xl hover:bg-sage-100 text-gray-500"
          >
            <History className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Barra de progresso */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Passo {step + 1} de {steps.length}</span>
            <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-sage-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Saudação */}
        {step === 0 && (
          <div className="bg-sage-50 rounded-2xl p-4 mb-4 border border-sage-200">
            <p className="text-sage-700 text-sm">
              Olá, <strong>{patient.name}</strong>! Este registro serve para ajudá-lo(a) a entender melhor como seus comportamentos acontecem.
              Lembre-se: <strong>não há respostas certas ou erradas</strong>, o objetivo é compreender o que aconteceu.
            </p>
          </div>
        )}

        {/* Conteúdo do passo */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">{steps[step].title}</h2>
          <p className="text-sm text-gray-500 mb-4">{steps[step].subtitle}</p>
          {steps[step].content}
        </div>

        {/* Navegação */}
        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
            >
              Anterior
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 py-3 rounded-xl bg-sage-500 text-white font-medium hover:bg-sage-600 shadow-md"
            >
              Próximo
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 rounded-xl bg-sage-600 text-white font-semibold hover:bg-sage-700 shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Enviar Registro
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
