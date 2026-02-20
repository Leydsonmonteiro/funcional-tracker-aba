import { Printer, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PrintSessionForm() {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Botões de ação - não aparecem na impressão */}
      <div className="print:hidden bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Voltar</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-vanilla-500 hover:bg-vanilla-600 text-white px-4 py-2 rounded-xl font-medium text-sm"
          >
            <Printer className="w-4 h-4" />
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      {/* Conteúdo imprimível */}
      <div className="max-w-4xl mx-auto p-6 print:p-0 print:max-w-none">

        {/* ========== PÁGINA 1: MODELO ABC PROFISSIONAL ========== */}
        <div className="print-page bg-white rounded-2xl print:rounded-none shadow-sm print:shadow-none p-6 mb-6 print:mb-0 border print:border-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-5 pb-4 border-b-2" style={{ borderColor: '#b08530' }}>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#b08530' }}>Formulário de Coleta — Sessão</h1>
              <p className="text-sm text-gray-500">Análise Funcional do Comportamento — Modelo ABC Profissional</p>
            </div>
            <div className="text-3xl">🧠</div>
          </div>

          {/* Dados da sessão */}
          <div className="rounded-xl p-4 mb-5 border-2" style={{ borderColor: '#faf0c4', backgroundColor: '#fefdf5' }}>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Paciente</p>
                <div className="border-b-2 border-gray-300 pb-1 min-h-[22px]"></div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Data da Sessão</p>
                <div className="border-b-2 border-gray-300 pb-1 min-h-[22px]">___/___/______</div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Sessão Nº</p>
                <div className="border-b-2 border-gray-300 pb-1 min-h-[22px]"></div>
              </div>
            </div>
          </div>

          {/* SEÇÃO 1: ABC Profissional */}
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full text-white text-sm flex items-center justify-center font-bold" style={{ backgroundColor: '#b08530' }}>1</span>
              Modelo ABC — Análise da Contingência
            </h2>

            <div className="space-y-3">
              <div className="rounded-xl p-4 border-l-4" style={{ borderColor: '#0ea5e9', backgroundColor: '#f0f9ff' }}>
                <h3 className="font-bold text-sm text-gray-800 mb-2">ANTECEDENTE (A) — Estímulo discriminativo / Contexto</h3>
                <p className="text-xs text-gray-500 mb-2 italic">Descreva o contexto, estímulos presentes, operação motivadora</p>
                <div className="space-y-2">
                  <div className="border-b border-gray-300 min-h-[18px]"></div>
                  <div className="border-b border-gray-300 min-h-[18px]"></div>
                  <div className="border-b border-gray-300 min-h-[18px]"></div>
                </div>
              </div>

              <div className="rounded-xl p-4 border-l-4" style={{ borderColor: '#f97316', backgroundColor: '#fff7ed' }}>
                <h3 className="font-bold text-sm text-gray-800 mb-2">COMPORTAMENTO / RESPOSTA (B) — Pública e Privada</h3>
                <p className="text-xs text-gray-500 mb-2 italic">Descreva a resposta observável e os eventos privados (pensamentos, emoções, sensações)</p>
                <div className="space-y-2">
                  <div className="border-b border-gray-300 min-h-[18px]"></div>
                  <div className="border-b border-gray-300 min-h-[18px]"></div>
                  <div className="border-b border-gray-300 min-h-[18px]"></div>
                </div>
              </div>

              <div className="rounded-xl p-4 border-l-4" style={{ borderColor: '#a855f7', backgroundColor: '#faf5ff' }}>
                <h3 className="font-bold text-sm text-gray-800 mb-2">CONSEQUÊNCIA (C) — Imediata e Atrasada</h3>
                <p className="text-xs text-gray-500 mb-2 italic">Consequência imediata e a longo prazo, tipo de consequência</p>
                <div className="space-y-2">
                  <div className="border-b border-gray-300 min-h-[18px]"></div>
                  <div className="border-b border-gray-300 min-h-[18px]"></div>
                </div>
                <div className="mt-2 flex flex-wrap gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-gray-700">
                    <div className="w-3.5 h-3.5 rounded border-2 border-gray-400"></div>R+
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-gray-700">
                    <div className="w-3.5 h-3.5 rounded border-2 border-gray-400"></div>R-
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-gray-700">
                    <div className="w-3.5 h-3.5 rounded border-2 border-gray-400"></div>P+
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-gray-700">
                    <div className="w-3.5 h-3.5 rounded border-2 border-gray-400"></div>P-
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-gray-700">
                    <div className="w-3.5 h-3.5 rounded border-2 border-gray-400"></div>Extinção
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Intensidade e Recorrência */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
              <h3 className="font-bold text-sm text-gray-800 mb-2">Intensidade Emocional (0-10)</h3>
              <div className="flex items-center justify-between">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                  <div key={n} className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center text-[10px] font-bold text-gray-600">
                    {n}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
              <h3 className="font-bold text-sm text-gray-800 mb-2">Recorrência do Comportamento</h3>
              <div className="border-b border-gray-300 min-h-[18px]"></div>
            </div>
          </div>

          {/* Função do Comportamento */}
          <div className="rounded-xl p-4 bg-gray-50 border border-gray-200 mb-5">
            <h3 className="font-bold text-sm text-gray-800 mb-2">Função do Comportamento (hipótese)</h3>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
                Fuga/Esquiva (R-)
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
                Atenção social (R+)
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
                Acesso a tangíveis (R+)
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
                Estimulação sensorial
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
                Controle aversivo
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
                Outra: ______________
              </label>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
            <h3 className="font-bold text-sm text-gray-800 mb-2">Observações do Profissional</h3>
            <div className="space-y-2">
              <div className="border-b border-gray-300 min-h-[18px]"></div>
              <div className="border-b border-gray-300 min-h-[18px]"></div>
            </div>
          </div>
        </div>

        {/* ========== PÁGINA 2: ANÁLISE MOLAR ========== */}
        <div className="print-page bg-white rounded-2xl print:rounded-none shadow-sm print:shadow-none p-6 mb-6 print:mb-0 border print:border-0" style={{ pageBreakBefore: 'always' }}>
          <div className="flex items-center justify-between mb-5 pb-4 border-b-2" style={{ borderColor: '#b08530' }}>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#b08530' }}>Análise Molar — Telescópio</h1>
              <p className="text-sm text-gray-500">Variáveis distais e contextuais do comportamento</p>
            </div>
            <div className="text-3xl">🔭</div>
          </div>

          <div className="mb-4 rounded-xl p-4 border-2" style={{ borderColor: '#faf0c4', backgroundColor: '#fefdf5' }}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Paciente</p>
                <div className="border-b-2 border-gray-300 pb-1 min-h-[22px]"></div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Data</p>
                <div className="border-b-2 border-gray-300 pb-1 min-h-[22px]">___/___/______</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Filogênese */}
            <div className="rounded-xl p-4 border-l-4 border-blue-400 bg-blue-50 print:bg-gray-50">
              <h3 className="font-bold text-sm text-gray-800 mb-1">FILOGÊNESE — Variáveis da espécie</h3>
              <p className="text-xs text-gray-500 mb-2 italic">Predisposições genéticas, temperamento, vulnerabilidades biológicas, histórico familiar genético</p>
              <div className="space-y-2">
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
              </div>
            </div>

            {/* Ontogênese */}
            <div className="rounded-xl p-4 border-l-4 border-green-400 bg-green-50 print:bg-gray-50">
              <h3 className="font-bold text-sm text-gray-800 mb-1">ONTOGÊNESE — História de aprendizagem</h3>
              <p className="text-xs text-gray-500 mb-2 italic">Experiências de vida, condicionamentos, modelos parentais, reforçamentos/punições passados, traumas</p>
              <div className="space-y-2">
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
              </div>
            </div>

            {/* Cultura */}
            <div className="rounded-xl p-4 border-l-4 border-purple-400 bg-purple-50 print:bg-gray-50">
              <h3 className="font-bold text-sm text-gray-800 mb-1">CULTURA — Práticas culturais e regras sociais</h3>
              <p className="text-xs text-gray-500 mb-2 italic">Normas sociais, valores culturais, regras da comunidade, pressões sociais, crenças religiosas</p>
              <div className="space-y-2">
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
              </div>
            </div>

            {/* Ambiente Atual */}
            <div className="rounded-xl p-4 border-l-4 border-amber-400 bg-amber-50 print:bg-gray-50">
              <h3 className="font-bold text-sm text-gray-800 mb-1">AMBIENTE ATUAL — Variáveis contextuais presentes</h3>
              <p className="text-xs text-gray-500 mb-2 italic">Contexto de vida atual, estressores, recursos disponíveis, rede de apoio</p>
              <div className="space-y-2">
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
              </div>
            </div>

            {/* Autorregras */}
            <div className="rounded-xl p-4 border-l-4 border-rose-400 bg-rose-50 print:bg-gray-50">
              <h3 className="font-bold text-sm text-gray-800 mb-1">AUTORREGRAS — Regras verbais do cliente</h3>
              <p className="text-xs text-gray-500 mb-2 italic">Crenças, regras pessoais, "deverias", pensamentos automáticos, descrições de contingências</p>
              <div className="space-y-2">
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== PÁGINA 3: QUÁDRUPLA CONTINGÊNCIA + CRBs ========== */}
        <div className="print-page bg-white rounded-2xl print:rounded-none shadow-sm print:shadow-none p-6 mb-6 print:mb-0 border print:border-0" style={{ pageBreakBefore: 'always' }}>
          <div className="flex items-center justify-between mb-5 pb-4 border-b-2" style={{ borderColor: '#b08530' }}>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#b08530' }}>Quádrupla Contingência + CRBs</h1>
              <p className="text-sm text-gray-500">Análise molecular detalhada e comportamentos clinicamente relevantes</p>
            </div>
            <div className="text-3xl">🔬</div>
          </div>

          <div className="mb-4 rounded-xl p-4 border-2" style={{ borderColor: '#faf0c4', backgroundColor: '#fefdf5' }}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Paciente</p>
                <div className="border-b-2 border-gray-300 pb-1 min-h-[22px]"></div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Data</p>
                <div className="border-b-2 border-gray-300 pb-1 min-h-[22px]">___/___/______</div>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full text-white text-sm flex items-center justify-center font-bold" style={{ backgroundColor: '#b08530' }}>2</span>
            Quádrupla Contingência
          </h2>

          <div className="space-y-3 mb-6">
            <div className="rounded-xl p-4 border-l-4 border-amber-500 bg-amber-50 print:bg-gray-50">
              <h3 className="font-bold text-sm text-gray-800 mb-1">OPERAÇÃO MOTIVADORA (OM)</h3>
              <p className="text-xs text-gray-500 mb-2 italic">O que alterou o valor reforçador? Privação, saciação, estados emocionais, eventos contextuais</p>
              <div className="space-y-2">
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
              </div>
            </div>

            <div className="rounded-xl p-4 border-l-4 border-sky-500 bg-sky-50 print:bg-gray-50">
              <h3 className="font-bold text-sm text-gray-800 mb-1">ESTÍMULO DISCRIMINATIVO (SD)</h3>
              <p className="text-xs text-gray-500 mb-2 italic">Estímulo que sinaliza disponibilidade de reforço. O que sinalizou a oportunidade?</p>
              <div className="space-y-2">
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4 border-l-4 border-orange-500 bg-orange-50 print:bg-gray-50">
                <h3 className="font-bold text-sm text-gray-800 mb-1">RESPOSTA PÚBLICA</h3>
                <p className="text-xs text-gray-500 mb-2 italic">Comportamento observável</p>
                <div className="space-y-2">
                  <div className="border-b border-gray-300 min-h-[18px]"></div>
                  <div className="border-b border-gray-300 min-h-[18px]"></div>
                </div>
              </div>
              <div className="rounded-xl p-4 border-l-4 border-pink-500 bg-pink-50 print:bg-gray-50">
                <h3 className="font-bold text-sm text-gray-800 mb-1">RESPOSTA PRIVADA</h3>
                <p className="text-xs text-gray-500 mb-2 italic">Pensamentos, emoções, sensações</p>
                <div className="space-y-2">
                  <div className="border-b border-gray-300 min-h-[18px]"></div>
                  <div className="border-b border-gray-300 min-h-[18px]"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4 border-l-4 border-violet-500 bg-violet-50 print:bg-gray-50">
                <h3 className="font-bold text-sm text-gray-800 mb-1">CONSEQUÊNCIA IMEDIATA</h3>
                <div className="space-y-2">
                  <div className="border-b border-gray-300 min-h-[18px]"></div>
                  <div className="border-b border-gray-300 min-h-[18px]"></div>
                </div>
              </div>
              <div className="rounded-xl p-4 border-l-4 border-indigo-500 bg-indigo-50 print:bg-gray-50">
                <h3 className="font-bold text-sm text-gray-800 mb-1">CONSEQUÊNCIA ATRASADA</h3>
                <div className="space-y-2">
                  <div className="border-b border-gray-300 min-h-[18px]"></div>
                  <div className="border-b border-gray-300 min-h-[18px]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* CRBs */}
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full text-white text-sm flex items-center justify-center font-bold" style={{ backgroundColor: '#b08530' }}>3</span>
            CRBs e Comportamento Verbal
          </h2>

          <div className="space-y-3">
            <div className="rounded-xl p-4 border-l-4 border-rose-500 bg-rose-50 print:bg-gray-50">
              <h3 className="font-bold text-sm text-gray-800 mb-1">CRB1 — Comportamentos-problema na sessão</h3>
              <p className="text-xs text-gray-500 mb-2 italic">Comportamentos clinicamente relevantes problemáticos observados na sessão</p>
              <div className="space-y-2">
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
              </div>
            </div>

            <div className="rounded-xl p-4 border-l-4 border-emerald-500 bg-emerald-50 print:bg-gray-50">
              <h3 className="font-bold text-sm text-gray-800 mb-1">CRB2 — Comportamentos de melhora na sessão</h3>
              <p className="text-xs text-gray-500 mb-2 italic">Comportamentos clinicamente relevantes de progresso observados na sessão</p>
              <div className="space-y-2">
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
              </div>
            </div>

            <div className="rounded-xl p-4 border-l-4 border-cyan-500 bg-cyan-50 print:bg-gray-50">
              <h3 className="font-bold text-sm text-gray-800 mb-1">COMPORTAMENTO VERBAL — Tatos, mandos, intraverbais</h3>
              <p className="text-xs text-gray-500 mb-2 italic">Análise do comportamento verbal do cliente: tatos distorcidos, mandos disfarçados, intraverbais</p>
              <div className="space-y-2">
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
              </div>
            </div>

            <div className="rounded-xl p-4 border-l-4 border-amber-500 bg-amber-50 print:bg-gray-50">
              <h3 className="font-bold text-sm text-gray-800 mb-1">INCONGRUÊNCIA VERBAL/NÃO-VERBAL</h3>
              <div className="space-y-2">
                <div className="border-b border-gray-300 min-h-[18px]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== PÁGINA 4: FORMULAÇÃO E INTERVENÇÃO ========== */}
        <div className="print-page bg-white rounded-2xl print:rounded-none shadow-sm print:shadow-none p-6 mb-6 print:mb-0 border print:border-0" style={{ pageBreakBefore: 'always' }}>
          <div className="flex items-center justify-between mb-5 pb-4 border-b-2" style={{ borderColor: '#b08530' }}>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#b08530' }}>Formulação de Caso e Intervenção</h1>
              <p className="text-sm text-gray-500">Hipótese funcional e plano de intervenção</p>
            </div>
            <div className="text-3xl">💡</div>
          </div>

          <div className="mb-4 rounded-xl p-4 border-2" style={{ borderColor: '#faf0c4', backgroundColor: '#fefdf5' }}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Paciente</p>
                <div className="border-b-2 border-gray-300 pb-1 min-h-[22px]"></div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Data</p>
                <div className="border-b-2 border-gray-300 pb-1 min-h-[22px]">___/___/______</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl p-5 border-2 border-dashed" style={{ borderColor: '#e8c24e', backgroundColor: '#fefdf5' }}>
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-xl">🎯</span> HIPÓTESE FUNCIONAL
              </h3>
              <p className="text-xs text-gray-500 mb-3 italic">Descreva a hipótese funcional integrando os dados moleculares e molares coletados</p>
              <div className="space-y-2">
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
              </div>
            </div>

            <div className="rounded-xl p-5 border-2 border-dashed" style={{ borderColor: '#22c55e', backgroundColor: '#f0fdf4' }}>
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-xl">📋</span> PLANO DE INTERVENÇÃO
              </h3>
              <p className="text-xs text-gray-500 mb-3 italic">Estratégias terapêuticas, técnicas, objetivos para as próximas sessões</p>
              <div className="space-y-2">
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
              </div>
            </div>

            <div className="rounded-xl p-5 bg-gray-50 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-xl">📝</span> TAREFAS PARA O PACIENTE
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded border-2 border-gray-400 flex-shrink-0 mt-0.5"></div>
                  <div className="border-b border-gray-300 min-h-[18px] flex-1"></div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded border-2 border-gray-400 flex-shrink-0 mt-0.5"></div>
                  <div className="border-b border-gray-300 min-h-[18px] flex-1"></div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded border-2 border-gray-400 flex-shrink-0 mt-0.5"></div>
                  <div className="border-b border-gray-300 min-h-[18px] flex-1"></div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded border-2 border-gray-400 flex-shrink-0 mt-0.5"></div>
                  <div className="border-b border-gray-300 min-h-[18px] flex-1"></div>
                </div>
              </div>
            </div>

            <div className="rounded-xl p-5 bg-gray-50 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-xl">📊</span> EVOLUÇÃO / COMPARAÇÃO COM SESSÃO ANTERIOR
              </h3>
              <p className="text-xs text-gray-500 mb-2 italic">Mudanças observadas, CRB1 diminuiu/aumentou, CRB2 diminuiu/aumentou, intensidade emocional</p>
              <div className="space-y-2">
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
                <div className="border-b border-gray-300 min-h-[18px]"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
                <h3 className="font-bold text-sm text-gray-800 mb-2">Próxima sessão</h3>
                <div className="border-b-2 border-gray-300 pb-1 min-h-[22px]">___/___/______</div>
              </div>
              <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
                <h3 className="font-bold text-sm text-gray-800 mb-2">Assinatura do Profissional</h3>
                <div className="border-b-2 border-gray-300 pb-1 min-h-[22px]"></div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-gray-400">
            <p>Análise Funcional ABA — Formulário de Coleta em Sessão</p>
            <p>Baseado em Análise do Comportamento Aplicada</p>
          </div>
        </div>
      </div>
    </>
  );
}
