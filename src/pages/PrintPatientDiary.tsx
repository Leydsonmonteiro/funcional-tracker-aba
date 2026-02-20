import { Printer, ArrowLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PrintPatientDiary() {
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
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-sage-500 hover:bg-sage-600 text-white px-4 py-2 rounded-xl font-medium text-sm"
            >
              <Printer className="w-4 h-4" />
              Imprimir / Salvar PDF
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo imprimível */}
      <div className="max-w-4xl mx-auto p-6 print:p-0 print:max-w-none">
        
        {/* ========== PÁGINA 1: CAPA + INSTRUÇÕES ========== */}
        <div className="print-page bg-white rounded-2xl print:rounded-none shadow-sm print:shadow-none p-8 mb-6 print:mb-0 border print:border-0">
          {/* Cabeçalho decorativo */}
          <div className="text-center mb-8 pb-6 border-b-4 border-dashed" style={{ borderColor: '#e8c24e' }}>
            <div className="text-5xl mb-3">📓</div>
            <h1 className="text-3xl font-bold" style={{ color: '#b08530' }}>Meu Diário de Automonitoramento</h1>
            <p className="text-lg text-gray-500 mt-2 italic">Diário ABC — Análise do Comportamento</p>
          </div>

          {/* Dados do paciente */}
          <div className="bg-vanilla-50 print:bg-gray-50 rounded-xl p-5 mb-6 border-2" style={{ borderColor: '#faf0c4' }}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Nome do Paciente</p>
                <div className="border-b-2 border-gray-300 pb-1 min-h-[24px]"></div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Psicólogo(a) Responsável</p>
                <div className="border-b-2 border-gray-300 pb-1 min-h-[24px]"></div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Período</p>
                <div className="border-b-2 border-gray-300 pb-1 min-h-[24px]">___/___/___ a ___/___/___</div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Comportamento-alvo</p>
                <div className="border-b-2 border-gray-300 pb-1 min-h-[24px]"></div>
              </div>
            </div>
          </div>

          {/* Instruções lúdicas */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Como preencher seu diário
            </h2>
            <div className="space-y-3">
              <div className="flex gap-3 items-start p-3 rounded-xl" style={{ backgroundColor: '#fefdf5' }}>
                <span className="text-2xl flex-shrink-0">1️⃣</span>
                <div>
                  <p className="font-semibold text-gray-800">Situação — O que estava acontecendo?</p>
                  <p className="text-sm text-gray-600">Descreva onde você estava, com quem, o que estava fazendo. Ex: "Estava no trabalho, reunião com o chefe."</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-3 rounded-xl" style={{ backgroundColor: '#f0f9ff' }}>
                <span className="text-2xl flex-shrink-0">2️⃣</span>
                <div>
                  <p className="font-semibold text-gray-800">Antecedente (A) — O que aconteceu antes?</p>
                  <p className="text-sm text-gray-600">O que disparou o comportamento? Ex: "Meu chefe criticou meu relatório na frente de todos."</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-3 rounded-xl" style={{ backgroundColor: '#fff7ed' }}>
                <span className="text-2xl flex-shrink-0">3️⃣</span>
                <div>
                  <p className="font-semibold text-gray-800">Comportamento/Resposta (B) — O que você fez?</p>
                  <p className="text-sm text-gray-600">Descreva o que você fez, disse, pensou ou sentiu. Ex: "Fiquei calado, apertei as mãos, senti raiva."</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-3 rounded-xl" style={{ backgroundColor: '#faf5ff' }}>
                <span className="text-2xl flex-shrink-0">4️⃣</span>
                <div>
                  <p className="font-semibold text-gray-800">Consequência (C) — O que aconteceu depois?</p>
                  <p className="text-sm text-gray-600">O que aconteceu como resultado? Ex: "Meu chefe parou de falar, mas fiquei ruminando o dia todo."</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-3 rounded-xl" style={{ backgroundColor: '#fff1f2' }}>
                <span className="text-2xl flex-shrink-0">5️⃣</span>
                <div>
                  <p className="font-semibold text-gray-800">Evento Privado — O que sentiu por dentro?</p>
                  <p className="text-sm text-gray-600">Pensamentos, emoções, sensações corporais. Ex: "Coração acelerado, pensamento: 'sou incompetente'."</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-3 rounded-xl bg-gray-50">
                <span className="text-2xl flex-shrink-0">6️⃣</span>
                <div>
                  <p className="font-semibold text-gray-800">Intensidade — De 0 a 10, quanto te afetou?</p>
                  <p className="text-sm text-gray-600">0 = nenhum desconforto, 10 = desconforto máximo</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center p-4 rounded-xl border-2 border-dashed" style={{ borderColor: '#22c55e', backgroundColor: '#f0fdf4' }}>
            <p className="text-sage-700 font-medium text-sm">
              💡 <strong>Dica:</strong> Tente preencher logo após o evento acontecer. Quanto mais detalhes, melhor seu psicólogo(a) poderá te ajudar!
            </p>
          </div>
        </div>

        {/* ========== PÁGINAS DE REGISTRO (7 dias) ========== */}
        {[1, 2, 3, 4, 5, 6, 7].map(day => (
          <div key={day} className="print-page bg-white rounded-2xl print:rounded-none shadow-sm print:shadow-none p-6 mb-6 print:mb-0 border print:border-0" style={{ pageBreakBefore: 'always' }}>
            {/* Header do dia */}
            <div className="flex items-center justify-between mb-5 pb-3 border-b-2" style={{ borderColor: '#e8c24e' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: '#e8c24e' }}>
                  {day}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Dia {day}</h2>
                  <p className="text-sm text-gray-500">Data: ___/___/______</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Horário do registro</p>
                <p className="text-sm text-gray-600 font-mono">___:___</p>
              </div>
            </div>

            {/* Campos do registro */}
            <div className="space-y-4">
              {/* Situação */}
              <div className="rounded-xl p-4 border-l-4" style={{ borderColor: '#e8c24e', backgroundColor: '#fefdf5' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📍</span>
                  <h3 className="font-bold text-gray-800 text-sm">SITUAÇÃO — Onde você estava? Com quem? O que fazia?</h3>
                </div>
                <div className="space-y-2">
                  <div className="border-b border-gray-300 min-h-[20px]"></div>
                  <div className="border-b border-gray-300 min-h-[20px]"></div>
                </div>
              </div>

              {/* Antecedente */}
              <div className="rounded-xl p-4 border-l-4" style={{ borderColor: '#0ea5e9', backgroundColor: '#f0f9ff' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">⚡</span>
                  <h3 className="font-bold text-gray-800 text-sm">ANTECEDENTE (A) — O que aconteceu ANTES? O que disparou?</h3>
                </div>
                <div className="space-y-2">
                  <div className="border-b border-gray-300 min-h-[20px]"></div>
                  <div className="border-b border-gray-300 min-h-[20px]"></div>
                </div>
              </div>

              {/* Comportamento/Resposta */}
              <div className="rounded-xl p-4 border-l-4" style={{ borderColor: '#f97316', backgroundColor: '#fff7ed' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🎬</span>
                  <h3 className="font-bold text-gray-800 text-sm">COMPORTAMENTO (B) — O que você FEZ, DISSE, PENSOU ou SENTIU?</h3>
                </div>
                <div className="space-y-2">
                  <div className="border-b border-gray-300 min-h-[20px]"></div>
                  <div className="border-b border-gray-300 min-h-[20px]"></div>
                </div>
              </div>

              {/* Consequência */}
              <div className="rounded-xl p-4 border-l-4" style={{ borderColor: '#a855f7', backgroundColor: '#faf5ff' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🔄</span>
                  <h3 className="font-bold text-gray-800 text-sm">CONSEQUÊNCIA (C) — O que aconteceu DEPOIS?</h3>
                </div>
                <div className="space-y-2">
                  <div className="border-b border-gray-300 min-h-[20px]"></div>
                  <div className="border-b border-gray-300 min-h-[20px]"></div>
                </div>
              </div>

              {/* Evento Privado */}
              <div className="rounded-xl p-4 border-l-4" style={{ borderColor: '#f43f5e', backgroundColor: '#fff1f2' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">💭</span>
                  <h3 className="font-bold text-gray-800 text-sm">EVENTO PRIVADO — Pensamentos, emoções, sensações corporais</h3>
                </div>
                <div className="space-y-2">
                  <div className="border-b border-gray-300 min-h-[20px]"></div>
                  <div className="border-b border-gray-300 min-h-[20px]"></div>
                </div>
              </div>

              {/* Intensidade e Frequência */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🌡️</span>
                    <h3 className="font-bold text-gray-800 text-sm">INTENSIDADE EMOCIONAL</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <div key={n} className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center text-xs font-bold text-gray-600">
                          {n}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-400">Nenhum</span>
                    <span className="text-xs text-gray-400">Máximo</span>
                  </div>
                </div>

                <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🔁</span>
                    <h3 className="font-bold text-gray-800 text-sm">FREQUÊNCIA</h3>
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
                      Primeira vez
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
                      Já aconteceu antes
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
                      1-2x por semana
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
                      3+ vezes por semana
                    </label>
                  </div>
                </div>
              </div>

              {/* O que aconteceu depois? */}
              <div className="rounded-xl p-4 bg-sage-50 print:bg-gray-50 border border-sage-200 print:border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🤔</span>
                  <h3 className="font-bold text-gray-800 text-sm">COMO VOCÊ SE SENTIU DEPOIS? (marque)</h3>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
                    Me senti aliviado(a)
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
                    Recebi atenção de alguém
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
                    Evitei algo que me incomodava
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
                    Consegui o que gostaria
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
                    Me senti pior depois
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-4 h-4 rounded border-2 border-gray-400"></div>
                    Nenhuma das opções
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ========== PÁGINA FINAL: RESUMO SEMANAL ========== */}
        <div className="print-page bg-white rounded-2xl print:rounded-none shadow-sm print:shadow-none p-6 mb-6 print:mb-0 border print:border-0" style={{ pageBreakBefore: 'always' }}>
          <div className="text-center mb-6 pb-4 border-b-2" style={{ borderColor: '#e8c24e' }}>
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">Resumo da Semana</h2>
            <p className="text-sm text-gray-500">Preencha ao final da semana com seu psicólogo(a)</p>
          </div>

          <div className="space-y-5">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Quantos dias você preencheu o diário esta semana?</h3>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5, 6, 7].map(n => (
                  <div key={n} className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center text-lg font-bold text-gray-600">
                    {n}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-2">Qual situação mais se repetiu?</h3>
              <div className="border-b-2 border-gray-300 min-h-[20px] mb-1"></div>
              <div className="border-b-2 border-gray-300 min-h-[20px]"></div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-2">Qual comportamento mais se repetiu?</h3>
              <div className="border-b-2 border-gray-300 min-h-[20px] mb-1"></div>
              <div className="border-b-2 border-gray-300 min-h-[20px]"></div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-2">Qual consequência mais se repetiu?</h3>
              <div className="border-b-2 border-gray-300 min-h-[20px] mb-1"></div>
              <div className="border-b-2 border-gray-300 min-h-[20px]"></div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-2">Intensidade média da semana (0-10):</h3>
              <div className="flex items-center justify-between max-w-md">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                  <div key={n} className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center text-sm font-bold text-gray-600">
                    {n}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-2">O que você percebeu sobre seus padrões esta semana?</h3>
              <div className="space-y-2">
                <div className="border-b-2 border-gray-300 min-h-[20px]"></div>
                <div className="border-b-2 border-gray-300 min-h-[20px]"></div>
                <div className="border-b-2 border-gray-300 min-h-[20px]"></div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-2">Algo que gostaria de discutir na próxima sessão?</h3>
              <div className="space-y-2">
                <div className="border-b-2 border-gray-300 min-h-[20px]"></div>
                <div className="border-b-2 border-gray-300 min-h-[20px]"></div>
                <div className="border-b-2 border-gray-300 min-h-[20px]"></div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center p-4 rounded-xl border-2 border-dashed" style={{ borderColor: '#22c55e', backgroundColor: '#f0fdf4' }}>
            <p className="text-sage-700 font-medium text-sm">
              🌟 Parabéns por completar mais uma semana de automonitoramento! Cada registro é um passo importante para o seu autoconhecimento.
            </p>
          </div>

          <div className="mt-6 text-center text-xs text-gray-400">
            <p>Análise Funcional ABA — Diário de Automonitoramento ABC</p>
            <p>Baseado em Análise do Comportamento Aplicada</p>
          </div>
        </div>
      </div>
    </>
  );
}
