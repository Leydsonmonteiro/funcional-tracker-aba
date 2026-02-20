import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, UserCircle, Copy, Check, Trash2, X } from 'lucide-react';
import Layout from '../components/Layout';
import { getPatients, addPatient, deletePatient } from '../utils/store';
import type { Patient } from '../types';

export default function PatientList() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    startDate: new Date().toISOString().split('T')[0],
    targetBehaviors: [''],
    notes: '',
  });

  useEffect(() => {
    setPatients(getPatients());
  }, []);

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient = addPatient({
      ...form,
      targetBehaviors: form.targetBehaviors.filter(b => b.trim()),
    });
    setPatients(getPatients());
    setShowForm(false);
    setForm({ name: '', email: '', phone: '', birthDate: '', startDate: new Date().toISOString().split('T')[0], targetBehaviors: [''], notes: '' });
    // Mostrar código de acesso
    setCopiedCode(newPatient.accessCode);
    setTimeout(() => setCopiedCode(null), 10000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja remover este paciente e todos os seus dados?')) {
      deletePatient(id);
      setPatients(getPatients());
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <Layout title="Pacientes" showBack backTo="/psicologo/dashboard" variant="psychologist">
      <div className="space-y-4">
        {/* Barra de busca + botão */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar paciente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-vanilla-400 focus:ring-2 focus:ring-vanilla-200 outline-none"
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-vanilla-500 hover:bg-vanilla-600 text-white px-4 py-3 rounded-xl font-medium flex items-center gap-2 shadow-md"
          >
            {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {showForm ? 'Fechar' : 'Novo'}
          </button>
        </div>

        {/* Formulário de novo paciente */}
        {showForm && (
          <form onSubmit={handleAddPatient} className="bg-white rounded-2xl p-6 shadow-sm border border-vanilla-200 space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">Cadastrar Novo Paciente</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-vanilla-400 focus:ring-2 focus:ring-vanilla-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-vanilla-400 focus:ring-2 focus:ring-vanilla-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-vanilla-400 focus:ring-2 focus:ring-vanilla-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de nascimento</label>
                <input
                  type="date"
                  value={form.birthDate}
                  onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-vanilla-400 focus:ring-2 focus:ring-vanilla-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Início do tratamento</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-vanilla-400 focus:ring-2 focus:ring-vanilla-200 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comportamentos-alvo</label>
              {form.targetBehaviors.map((b, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={b}
                    onChange={(e) => {
                      const newBehaviors = [...form.targetBehaviors];
                      newBehaviors[i] = e.target.value;
                      setForm({ ...form, targetBehaviors: newBehaviors });
                    }}
                    placeholder={`Comportamento ${i + 1}`}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-vanilla-400 focus:ring-2 focus:ring-vanilla-200 outline-none"
                  />
                  {i === form.targetBehaviors.length - 1 && (
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, targetBehaviors: [...form.targetBehaviors, ''] })}
                      className="px-3 py-2 rounded-xl bg-vanilla-100 text-vanilla-700 hover:bg-vanilla-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Observações iniciais</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-vanilla-400 focus:ring-2 focus:ring-vanilla-200 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-vanilla-500 hover:bg-vanilla-600 text-white py-3 rounded-xl font-semibold shadow-md"
            >
              Cadastrar Paciente
            </button>
          </form>
        )}

        {/* Código de acesso recém-criado */}
        {copiedCode && (
          <div className="bg-sage-50 border border-sage-300 rounded-2xl p-4 text-center">
            <p className="text-sage-700 font-medium mb-2">Código de acesso do paciente:</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl font-bold tracking-widest text-sage-800">{copiedCode}</span>
              <button onClick={() => copyCode(copiedCode)} className="p-2 rounded-lg bg-sage-200 hover:bg-sage-300">
                <Copy className="w-4 h-4 text-sage-700" />
              </button>
            </div>
            <p className="text-sage-600 text-sm mt-2">Compartilhe este código com o paciente para que ele acesse o diário.</p>
          </div>
        )}

        {/* Lista de pacientes */}
        <div className="space-y-3">
          {filteredPatients.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <UserCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Nenhum paciente encontrado</p>
              <p className="text-sm">Clique em "Novo" para cadastrar um paciente.</p>
            </div>
          ) : (
            filteredPatients.map(patient => (
              <div
                key={patient.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => navigate(`/psicologo/paciente/${patient.id}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-vanilla-200 flex items-center justify-center">
                        <span className="text-vanilla-700 font-bold text-lg">
                          {patient.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{patient.name}</p>
                        <p className="text-xs text-gray-500">
                          Código: <span className="font-mono font-bold">{patient.accessCode}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyCode(patient.accessCode)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                      title="Copiar código"
                    >
                      {copiedCode === patient.accessCode ? <Check className="w-4 h-4 text-sage-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(patient.id)}
                      className="p-2 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-500"
                      title="Remover paciente"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {patient.targetBehaviors.length > 0 && patient.targetBehaviors[0] && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {patient.targetBehaviors.filter(b => b).map((b, i) => (
                      <span key={i} className="text-xs bg-vanilla-100 text-vanilla-700 px-2 py-1 rounded-lg">
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
