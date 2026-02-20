import { useNavigate } from 'react-router-dom';
import { Brain, UserCircle, Stethoscope, BarChart3, ClipboardList, Bell } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-vanilla-50 via-white to-vanilla-100">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-vanilla-200 p-4 rounded-2xl">
            <Brain className="w-12 h-12 text-vanilla-700" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Análise Funcional <span className="text-vanilla-600">ABA</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Sistema inteligente para análise funcional do comportamento. 
          Integre análise molecular e molar, monitore o progresso dos seus pacientes 
          e tome decisões clínicas baseadas em dados.
        </p>

        {/* Botões de acesso */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => navigate('/psicologo/login')}
            className="flex items-center justify-center gap-3 bg-vanilla-500 hover:bg-vanilla-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Stethoscope className="w-6 h-6" />
            Sou Psicólogo(a)
          </button>
          <button
            onClick={() => navigate('/paciente')}
            className="flex items-center justify-center gap-3 bg-sage-500 hover:bg-sage-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <UserCircle className="w-6 h-6" />
            Sou Paciente
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 text-left">
          {[
            {
              icon: ClipboardList,
              title: 'Diário ABC Molecular',
              description: 'Pacientes registram situações, antecedentes, respostas e consequências diariamente com interface intuitiva.',
              color: 'bg-sage-100 text-sage-600',
            },
            {
              icon: Stethoscope,
              title: 'Análise Molar Completa',
              description: 'Registre filogênese, ontogênese, cultura, CRBs, operações motivadoras e hipóteses funcionais na sessão.',
              color: 'bg-vanilla-100 text-vanilla-700',
            },
            {
              icon: BarChart3,
              title: 'Dashboard de Dados',
              description: 'Gráficos de intensidade, frequência, padrões de consequência e evolução dos CRBs ao longo do tempo.',
              color: 'bg-sky-100 text-sky-600',
            },
          ].map(({ icon: Icon, title, description, color }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          ))}
        </div>

        {/* Notification feature */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <Bell className="w-6 h-6 text-coral-500" />
            <h3 className="font-semibold text-gray-900 text-lg">Notificações em Tempo Real</h3>
          </div>
          <p className="text-gray-600 max-w-xl mx-auto">
            Receba alertas quando seus pacientes preencherem o diário, quando a intensidade emocional estiver alta, 
            ou quando padrões comportamentais forem detectados.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 text-sm">
        <p>Análise Funcional ABA — Baseado em Análise do Comportamento Aplicada</p>
      </footer>
    </div>
  );
}
