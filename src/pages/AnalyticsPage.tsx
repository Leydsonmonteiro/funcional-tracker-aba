import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { TrendingUp, TrendingDown, Minus, BarChart3, Activity, PieChart } from 'lucide-react';
import Layout from '../components/Layout';
import { getPatient, getMolecularEntries, getMolarEntries, getPatientStats } from '../utils/store';
import { FREQUENCY_LABELS } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default function AnalyticsPage() {
  const { id } = useParams<{ id: string }>();
  const patient = getPatient(id || '');
  const [period, setPeriod] = useState<'7' | '30' | 'all'>('30');

  if (!patient) {
    return (
      <Layout title="Análise de Dados" showBack variant="psychologist">
        <p className="text-center text-gray-500 py-12">Paciente não encontrado.</p>
      </Layout>
    );
  }

  const allMolecular = getMolecularEntries(patient.id).sort((a, b) => a.date.localeCompare(b.date));
  const molarEntries = getMolarEntries(patient.id);
  const stats = getPatientStats(patient.id);

  // Filtrar por período
  const filterByPeriod = () => {
    if (period === 'all') return allMolecular;
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period));
    return allMolecular.filter(e => new Date(e.date) >= daysAgo);
  };

  const molecular = filterByPeriod();

  // Dados para gráfico de intensidade ao longo do tempo
  const intensityData = {
    labels: molecular.map(e => e.date),
    datasets: [
      {
        label: 'Intensidade Emocional',
        data: molecular.map(e => e.emotionIntensity),
        borderColor: '#e8c24e',
        backgroundColor: 'rgba(232, 194, 78, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: molecular.map(e =>
          e.emotionIntensity >= 7 ? '#f43f5e' :
          e.emotionIntensity >= 4 ? '#f59e0b' : '#22c55e'
        ),
        pointRadius: 5,
      },
    ],
  };

  // Dados para gráfico de frequência diária
  const frequencyByDate: Record<string, number> = {};
  molecular.forEach(e => {
    frequencyByDate[e.date] = (frequencyByDate[e.date] || 0) + 1;
  });
  const frequencyData = {
    labels: Object.keys(frequencyByDate),
    datasets: [
      {
        label: 'Registros por Dia',
        data: Object.values(frequencyByDate),
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        borderColor: '#22c55e',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  // Dados para gráfico de funções do comportamento
  const functionCounts: Record<string, number> = {};
  molecular.forEach(e => {
    e.behaviorFunction.forEach(f => {
      functionCounts[f] = (functionCounts[f] || 0) + 1;
    });
  });
  const functionLabels = Object.keys(functionCounts);
  const functionColors = [
    '#22c55e', '#0ea5e9', '#f97316', '#a855f7', '#f43f5e', '#eab308', '#6b7280'
  ];
  const functionData = {
    labels: functionLabels.map(l => l.length > 20 ? l.substring(0, 20) + '...' : l),
    datasets: [
      {
        data: Object.values(functionCounts),
        backgroundColor: functionColors.slice(0, functionLabels.length),
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  // Dados para frequência de ocorrência
  const freqCounts: Record<string, number> = {};
  molecular.forEach(e => {
    freqCounts[e.frequency] = (freqCounts[e.frequency] || 0) + 1;
  });
  const freqData = {
    labels: Object.keys(freqCounts).map(k => FREQUENCY_LABELS[k as keyof typeof FREQUENCY_LABELS] || k),
    datasets: [
      {
        data: Object.values(freqCounts),
        backgroundColor: ['#86efac', '#7dd3fc', '#fde68a', '#fda4af'],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  // Calcular tendência
  const getTrend = () => {
    if (molecular.length < 3) return 'neutral';
    const recent = molecular.slice(-3);
    const older = molecular.slice(-6, -3);
    if (older.length === 0) return 'neutral';
    const recentAvg = recent.reduce((s, e) => s + e.emotionIntensity, 0) / recent.length;
    const olderAvg = older.reduce((s, e) => s + e.emotionIntensity, 0) / older.length;
    if (recentAvg < olderAvg - 0.5) return 'improving';
    if (recentAvg > olderAvg + 0.5) return 'worsening';
    return 'neutral';
  };

  const trend = getTrend();

  // Análise de padrões de consequência (R+, R-, P+, P-)
  const consequenceAnalysis = () => {
    let positiveReinforcement = 0;
    let negativeReinforcement = 0;
    let punishment = 0;
    let other = 0;

    molecular.forEach(e => {
      e.behaviorFunction.forEach(f => {
        if (f.includes('aliviado') || f.includes('Evitei')) negativeReinforcement++;
        else if (f.includes('atenção') || f.includes('Consegui')) positiveReinforcement++;
        else if (f.includes('pior')) punishment++;
        else other++;
      });
    });

    return { positiveReinforcement, negativeReinforcement, punishment, other };
  };

  const conseq = consequenceAnalysis();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 10 } },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { font: { size: 10 } },
      },
    },
  };

  return (
    <Layout title="Análise de Dados" showBack backTo={`/psicologo/paciente/${id}`} variant="psychologist">
      <div className="space-y-6">
        {/* Info do paciente */}
        <div className="bg-gradient-to-r from-sky-100 via-sky-50 to-white rounded-2xl p-5 border border-sky-200">
          <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
          <p className="text-sm text-gray-500">Análise de dados comportamentais</p>
        </div>

        {/* Filtro de período */}
        <div className="flex bg-gray-100 rounded-xl p-1">
          {[
            { value: '7', label: '7 dias' },
            { value: '30', label: '30 dias' },
            { value: 'all', label: 'Todos' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setPeriod(opt.value as typeof period)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === opt.value ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Indicadores resumo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-vanilla-600">{molecular.length}</p>
            <p className="text-xs text-gray-500">Registros ABC</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-sky-500">{molarEntries.length}</p>
            <p className="text-xs text-gray-500">Sessões Molar</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <p className={`text-2xl font-bold ${
              stats.avgIntensity >= 7 ? 'text-rose-500' :
              stats.avgIntensity >= 4 ? 'text-warm-500' : 'text-sage-500'
            }`}>
              {stats.avgIntensity.toFixed(1)}
            </p>
            <p className="text-xs text-gray-500">Intensidade Média</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="flex items-center justify-center gap-1">
              {trend === 'improving' && <TrendingDown className="w-5 h-5 text-sage-500" />}
              {trend === 'worsening' && <TrendingUp className="w-5 h-5 text-rose-500" />}
              {trend === 'neutral' && <Minus className="w-5 h-5 text-gray-400" />}
              <span className={`text-sm font-bold ${
                trend === 'improving' ? 'text-sage-600' :
                trend === 'worsening' ? 'text-rose-500' : 'text-gray-500'
              }`}>
                {trend === 'improving' ? 'Melhorando' : trend === 'worsening' ? 'Atenção' : 'Estável'}
              </span>
            </div>
            <p className="text-xs text-gray-500">Tendência</p>
          </div>
        </div>

        {/* Análise de Contingências */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-vanilla-600" />
            Análise de Contingências
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-sage-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-sage-700">{conseq.positiveReinforcement}</p>
              <p className="text-xs text-sage-600">Reforço Positivo (R+)</p>
              <p className="text-xs text-gray-400 mt-1">Atenção, ganho</p>
            </div>
            <div className="bg-sky-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-sky-700">{conseq.negativeReinforcement}</p>
              <p className="text-xs text-sky-600">Reforço Negativo (R-)</p>
              <p className="text-xs text-gray-400 mt-1">Alívio, fuga</p>
            </div>
            <div className="bg-rose-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-rose-600">{conseq.punishment}</p>
              <p className="text-xs text-rose-500">Punição</p>
              <p className="text-xs text-gray-400 mt-1">Sentiu pior</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-gray-600">{conseq.other}</p>
              <p className="text-xs text-gray-500">Outros</p>
              <p className="text-xs text-gray-400 mt-1">Sem classificação</p>
            </div>
          </div>
        </div>

        {molecular.length > 0 && (
          <>
            {/* Gráfico de Intensidade */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-coral-500" />
                Intensidade Emocional ao Longo do Tempo
              </h3>
              <div className="h-64">
                <Line data={intensityData} options={{
                  ...chartOptions,
                  scales: {
                    ...chartOptions.scales,
                    y: { ...chartOptions.scales.y, min: 0, max: 10 },
                  },
                }} />
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                {trend === 'improving'
                  ? 'A intensidade emocional está diminuindo — indicador positivo de progresso.'
                  : trend === 'worsening'
                  ? 'A intensidade emocional está aumentando — pode ser necessário revisar a intervenção.'
                  : 'A intensidade emocional está estável no período analisado.'}
              </p>
            </div>

            {/* Gráfico de Frequência */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-sage-500" />
                Frequência de Registros por Dia
              </h3>
              <div className="h-48">
                <Bar data={frequencyData} options={chartOptions} />
              </div>
            </div>

            {/* Gráficos de Pizza */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Funções do Comportamento */}
              {functionLabels.length > 0 && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-lavender-500" />
                    Funções do Comportamento
                  </h3>
                  <div className="h-48">
                    <Doughnut data={functionData} options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 12 } },
                      },
                    }} />
                  </div>
                </div>
              )}

              {/* Frequência de Ocorrência */}
              {Object.keys(freqCounts).length > 0 && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-warm-500" />
                    Frequência de Ocorrência
                  </h3>
                  <div className="h-48">
                    <Doughnut data={freqData} options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 12 } },
                      },
                    }} />
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {molecular.length === 0 && (
          <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Sem dados suficientes</p>
            <p className="text-sm">Os gráficos aparecerão quando o paciente começar a preencher o diário ABC.</p>
          </div>
        )}

        {/* Resumo para Formulação */}
        {molecular.length >= 3 && (
          <div className="bg-gradient-to-r from-vanilla-100 to-vanilla-50 rounded-2xl p-5 border border-vanilla-300">
            <h3 className="font-semibold text-gray-900 mb-3">Resumo para Formulação de Caso</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Total de registros:</strong> {molecular.length} entradas moleculares em {Object.keys(frequencyByDate).length} dias distintos.
              </p>
              <p>
                <strong>Intensidade média:</strong> {stats.avgIntensity.toFixed(1)}/10 —{' '}
                {stats.avgIntensity >= 7 ? 'alta, sugere sofrimento significativo' :
                 stats.avgIntensity >= 4 ? 'moderada' : 'baixa, possível progresso'}
              </p>
              <p>
                <strong>Função predominante:</strong>{' '}
                {functionLabels.length > 0
                  ? functionLabels.reduce((a, b) => functionCounts[a] > functionCounts[b] ? a : b)
                  : 'Não identificada'}
              </p>
              <p>
                <strong>Padrão de contingência:</strong>{' '}
                {conseq.negativeReinforcement > conseq.positiveReinforcement
                  ? 'Predominância de Reforço Negativo (R-) — comportamento mantido por fuga/esquiva de aversivos.'
                  : conseq.positiveReinforcement > conseq.negativeReinforcement
                  ? 'Predominância de Reforço Positivo (R+) — comportamento mantido por ganho/atenção.'
                  : 'Padrão misto de contingências.'}
              </p>
              <p>
                <strong>Tendência:</strong>{' '}
                {trend === 'improving' ? 'Melhora observada — intensidade emocional em declínio.' :
                 trend === 'worsening' ? 'Piora observada — considerar ajuste na intervenção.' :
                 'Estável — monitorar evolução.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
