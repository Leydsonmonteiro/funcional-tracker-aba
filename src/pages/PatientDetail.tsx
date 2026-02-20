import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ClipboardList, Microscope, BarChart3, Calendar, Copy, Check, FileText, Download, Link2, Share2, Eye, Brain, ChevronDown, ChevronUp } from 'lucide-react';
import Layout from '../components/Layout';
import { getPatient, getMolecularEntries, getMolarEntries, getPatientStats, exportPatientData, getAnamnesis, getShareableLink } from '../utils/store';
import { FREQUENCY_LABELS, ANAMNESIS_SECTIONS } from '../types';
import type { Patient, MolecularEntry, MolarEntry, AnamnesisData } from '../types';

function AnamnesisViewer({ anamnesis }: { anamnesis: AnamnesisData }) {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const sectionKeys: Record<number, keyof AnamnesisData> = {
    1: 'identification', 2: 'chiefComplaint', 3: 'currentHistory',
    4: 'personalHistory', 5: 'familyHistory', 6: 'physicalHealth',
    7: 'mentalHealth', 8: 'substanceUse', 9: 'socialLife',
    10: 'relationships', 11: 'professionalLife', 12: 'lifestyle',
    13: 'spirituality', 14: 'legalAspects', 15: 'riskAssessment', 16: 'goals',
  };

  const fieldLabels: Record<string, string> = {
    fullName: 'Nome completo', preferredName: 'Nome social', birthDate: 'Data de nascimento',
    age: 'Idade', gender: 'Sexo', genderIdentity: 'Identidade de gênero', pronouns: 'Pronomes',
    maritalStatus: 'Estado civil', children: 'Filhos', childrenAges: 'Idades dos filhos',
    education: 'Escolaridade', occupation: 'Profissão', workplace: 'Local de trabalho',
    naturalFrom: 'Naturalidade', currentCity: 'Cidade atual', address: 'Endereço',
    phone: 'Telefone', email: 'E-mail', emergencyContact: 'Contato de emergência',
    emergencyPhone: 'Telefone de emergência', referredBy: 'Encaminhado por', healthInsurance: 'Convênio',
    mainComplaint: 'Queixa principal', ownWords: 'Em suas palavras', whenStarted: 'Quando começou',
    whatTriggered: 'O que desencadeou', expectations: 'Expectativas', previousTreatments: 'Tratamentos anteriores',
    previousDiagnoses: 'Diagnósticos anteriores', currentMedications: 'Medicações atuais',
    whySeekingNow: 'Por que busca ajuda agora', symptomOnset: 'Início dos sintomas',
    symptomEvolution: 'Evolução dos sintomas', worseningFactors: 'Fatores de piora',
    improvementFactors: 'Fatores de melhora', dailyImpact: 'Impacto no dia a dia',
    workImpact: 'Impacto no trabalho', relationshipImpact: 'Impacto nos relacionamentos',
    previousAttempts: 'Tentativas anteriores', symptomFrequency: 'Frequência dos sintomas',
    symptomIntensity: 'Intensidade dos sintomas', pregnancyComplications: 'Complicações na gestação',
    birthType: 'Tipo de parto', developmentMilestones: 'Marcos do desenvolvimento',
    childhoodBehavior: 'Comportamento na infância', schoolPerformance: 'Desempenho escolar',
    childhoodFriendships: 'Amizades na infância', significantChildhoodEvents: 'Eventos marcantes na infância',
    adolescenceExperience: 'Adolescência', puberty: 'Puberdade', identityFormation: 'Formação de identidade',
    adultTransition: 'Transição para vida adulta', significantLifeEvents: 'Eventos significativos',
    majorLosses: 'Perdas importantes', traumaticExperiences: 'Experiências traumáticas',
    achievementsProud: 'Conquistas', familyComposition: 'Composição familiar',
    fatherRelationship: 'Relação com o pai', motherRelationship: 'Relação com a mãe',
    siblingRelationship: 'Relação com irmãos', familyDynamics: 'Dinâmica familiar',
    parentalStyle: 'Estilo parental', familyConflicts: 'Conflitos familiares',
    familyPsychiatricHistory: 'Histórico psiquiátrico familiar', familySubstanceUse: 'Uso de substâncias na família',
    familySuicideHistory: 'Histórico de suicídio na família', familyViolenceHistory: 'Violência na família',
    currentFamilyRelations: 'Relações familiares atuais', familySupport: 'Apoio familiar',
    currentDiseases: 'Doenças atuais', chronicConditions: 'Condições crônicas',
    allergies: 'Alergias', previousSurgeries: 'Cirurgias anteriores', hospitalizations: 'Internações',
    headInjuries: 'Traumatismo craniano', chronicPain: 'Dor crônica', sleepQuality: 'Qualidade do sono',
    sleepHours: 'Horas de sono', sleepDisturbances: 'Distúrbios do sono', appetite: 'Apetite',
    dietDescription: 'Alimentação', physicalActivity: 'Atividade física', activityFrequency: 'Frequência de atividade',
    lastMedicalCheckup: 'Último check-up', pendingExams: 'Exames pendentes',
    previousTherapists: 'Psicólogos anteriores', therapyDuration: 'Duração da terapia',
    therapyApproach: 'Abordagem terapêutica', whatWorked: 'O que funcionou', whatDidntWork: 'O que não funcionou',
    psychiatricMedications: 'Medicações psiquiátricas', psychiatricHospitalizations: 'Internações psiquiátricas',
    suicidalIdeation: 'Ideação suicida', suicideAttempts: 'Tentativas de suicídio', selfHarm: 'Autolesão',
    currentMoodDescription: 'Humor atual', anxietyLevel: 'Nível de ansiedade', panicAttacks: 'Crises de pânico',
    phobias: 'Fobias', obsessiveThoughts: 'Pensamentos obsessivos', compulsiveBehaviors: 'Comportamentos compulsivos',
    eatingDisorders: 'Transtornos alimentares', bodyImageConcerns: 'Imagem corporal',
    alcoholUse: 'Uso de álcool', alcoholFrequency: 'Frequência de álcool', alcoholQuantity: 'Quantidade de álcool',
    tobaccoUse: 'Tabagismo', tobaccoFrequency: 'Frequência de tabaco', cannabisUse: 'Uso de cannabis',
    otherDrugs: 'Outras drogas', substanceHistory: 'Histórico de substâncias',
    previousTreatment: 'Tratamento anterior', currentAbstinence: 'Abstinência atual',
    caffeineUse: 'Uso de cafeína', medicationMisuse: 'Uso indevido de medicação',
    socialNetwork: 'Rede social', closeFriends: 'Amigos próximos', socialActivities: 'Atividades sociais',
    communityInvolvement: 'Envolvimento comunitário', socialDifficulties: 'Dificuldades sociais',
    loneliness: 'Solidão', socialMediaUse: 'Uso de redes sociais', conflictResolution: 'Resolução de conflitos',
    assertiveness: 'Assertividade', trustInOthers: 'Confiança nos outros',
    currentRelationship: 'Relacionamento atual', relationshipDuration: 'Duração do relacionamento',
    relationshipQuality: 'Qualidade do relacionamento', relationshipConflicts: 'Conflitos no relacionamento',
    communicationPattern: 'Padrão de comunicação', previousRelationships: 'Relacionamentos anteriores',
    relationshipPatterns: 'Padrões de relacionamento', attachmentStyle: 'Estilo de apego',
    jealousy: 'Ciúmes', domesticViolence: 'Violência doméstica', sexualOrientation: 'Orientação sexual',
    sexualLife: 'Vida sexual', sexualDifficulties: 'Dificuldades sexuais', sexualTrauma: 'Trauma sexual',
    currentOccupation: 'Ocupação atual', jobSatisfaction: 'Satisfação no trabalho',
    workEnvironment: 'Ambiente de trabalho', workRelationships: 'Relacionamentos no trabalho',
    workStress: 'Estresse no trabalho', careerGoals: 'Objetivos profissionais',
    financialSituation: 'Situação financeira', financialStress: 'Estresse financeiro',
    unemploymentHistory: 'Histórico de desemprego', academicHistory: 'Histórico acadêmico',
    learningDifficulties: 'Dificuldades de aprendizagem', currentStudies: 'Estudos atuais',
    typicalDay: 'Dia típico', morningRoutine: 'Rotina matinal', eveningRoutine: 'Rotina noturna',
    hobbies: 'Hobbies', leisure: 'Lazer', physicalExercise: 'Exercício físico',
    relaxationTechniques: 'Técnicas de relaxamento', screenTime: 'Tempo de tela',
    timeManagement: 'Gestão do tempo', selfCareHabits: 'Hábitos de autocuidado',
    religiousBelief: 'Crença religiosa', spiritualPractices: 'Práticas espirituais',
    spiritualCommunity: 'Comunidade espiritual', culturalBackground: 'Origem cultural',
    culturalValues: 'Valores culturais', culturalConflicts: 'Conflitos culturais',
    meaningOfLife: 'Sentido da vida', copingThroughFaith: 'Enfrentamento pela fé',
    legalInvolvement: 'Envolvimento jurídico', currentProcesses: 'Processos atuais',
    custodyIssues: 'Questões de guarda', restrainingOrders: 'Medidas protetivas',
    criminalHistory: 'Histórico criminal', victimOfCrime: 'Vítima de crime',
    suicidalPlan: 'Plano suicida', suicidalIntent: 'Intenção suicida',
    selfHarmBehavior: 'Comportamento de autolesão', riskToOthers: 'Risco para terceiros',
    accessToMeans: 'Acesso a meios', protectiveFactors: 'Fatores de proteção',
    reasonsForLiving: 'Razões para viver', safetyPlan: 'Plano de segurança',
    therapyGoals: 'Objetivos da terapia', shortTermGoals: 'Objetivos de curto prazo',
    longTermGoals: 'Objetivos de longo prazo', changeMotivation: 'Motivação para mudança',
    perceivedBarriers: 'Barreiras percebidas', supportSystems: 'Sistemas de apoio',
    strengthsResources: 'Pontos fortes', additionalInfo: 'Informações adicionais',
  };

  return (
    <div className="space-y-2">
      {ANAMNESIS_SECTIONS.map(section => {
        const data = anamnesis[sectionKeys[section.id]] as Record<string, string> | undefined;
        const isExpanded = expandedSection === section.id;
        const hasData = data && Object.values(data).some(v => v && v.trim());

        return (
          <div key={section.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <button
              onClick={() => setExpandedSection(isExpanded ? null : section.id)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${hasData ? 'bg-sage-100 text-sage-700' : 'bg-gray-100 text-gray-400'}`}>
                  {section.id}
                </span>
                <span className={`text-sm font-medium ${hasData ? 'text-gray-800' : 'text-gray-400'}`}>{section.title}</span>
                {hasData && <span className="text-xs bg-sage-100 text-sage-600 px-1.5 py-0.5 rounded">preenchido</span>}
              </div>
              {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {isExpanded && data && (
              <div className="px-3 pb-3 border-t border-gray-100">
                <div className="space-y-2 pt-3">
                  {Object.entries(data).map(([key, value]) => {
                    if (!value || !value.trim()) return null;
                    return (
                      <div key={key} className="text-sm">
                        <span className="font-medium text-vanilla-700">{fieldLabels[key] || key}: </span>
                        <span className="text-gray-700">{value}</span>
                      </div>
                    );
                  })}
                  {!Object.values(data).some(v => v && v.trim()) && (
                    <p className="text-sm text-gray-400 italic">Seção não preenchida</p>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function PatientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [molecularEntries, setMolecularEntries] = useState<MolecularEntry[]>([]);
  const [molarEntries, setMolarEntries] = useState<MolarEntry[]>([]);
  const [anamnesis, setAnamnesis] = useState<AnamnesisData | null>(null);
  const [activeTab, setActiveTab] = useState<'molecular' | 'molar' | 'anamnesis'>('molecular');
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (id) {
      setPatient(getPatient(id));
      setMolecularEntries(getMolecularEntries(id).sort((a, b) => b.date.localeCompare(a.date)));
      setMolarEntries(getMolarEntries(id).sort((a, b) => b.sessionDate.localeCompare(a.sessionDate)));
      const a = getAnamnesis(id);
      if (a) setAnamnesis(a);
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
  const shareLink = getShareableLink(patient.accessCode);

  const copyCode = () => {
    navigator.clipboard.writeText(patient.accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
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
          <div className="bg-vanilla-50 rounded-xl p-3 flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-500">Código de acesso do paciente</p>
              <p className="text-lg font-mono font-bold text-vanilla-700 tracking-widest">{patient.accessCode}</p>
            </div>
            <button onClick={copyCode} className="p-2 rounded-lg bg-vanilla-200 hover:bg-vanilla-300">
              {copied ? <Check className="w-4 h-4 text-sage-600" /> : <Copy className="w-4 h-4 text-vanilla-700" />}
            </button>
          </div>

          {/* Link compartilhável */}
          <div className="bg-sage-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Link2 className="w-3 h-3" /> Link para enviar ao paciente
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs font-mono text-sage-700 truncate flex-1">{shareLink}</p>
              <button onClick={copyLink} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sage-200 hover:bg-sage-300 text-sage-700 text-xs font-medium whitespace-nowrap">
                {copiedLink ? <><Check className="w-3 h-3" /> Copiado!</> : <><Share2 className="w-3 h-3" /> Copiar Link</>}
              </button>
            </div>
          </div>

          {/* Estatísticas rápidas */}
          <div className="grid grid-cols-4 gap-2 mt-4">
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
              <p className="text-xs text-coral-400">Intensidade</p>
            </div>
            <div className="text-center p-3 bg-lavender-50 rounded-xl">
              <p className="text-2xl font-bold text-lavender-500">{anamnesis ? (anamnesis.status === 'completed' ? '100%' : 'Em andamento') : '0%'}</p>
              <p className="text-xs text-lavender-400">Anamnese</p>
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
          <button
            onClick={() => setActiveTab('anamnesis')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'anamnesis' ? 'bg-white text-lavender-500 shadow-sm' : 'text-gray-500'}`}
          >
            <Brain className="w-4 h-4 inline mr-1" />
            Anamnese
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
                    <div><span className="font-medium text-vanilla-700">Situação: </span><span className="text-gray-700">{entry.situation}</span></div>
                    <div><span className="font-medium text-sky-600">Antecedente: </span><span className="text-gray-700">{entry.antecedent}</span></div>
                    <div><span className="font-medium text-coral-500">Resposta: </span><span className="text-gray-700">{entry.response}</span></div>
                    <div><span className="font-medium text-lavender-500">Consequência: </span><span className="text-gray-700">{entry.consequence}</span></div>
                    {entry.privateEvent && (
                      <div><span className="font-medium text-rose-400">Evento Privado: </span><span className="text-gray-700">{entry.privateEvent}</span></div>
                    )}
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{FREQUENCY_LABELS[entry.frequency]}</span>
                      {entry.behaviorFunction.map((f, i) => (
                        <span key={i} className="text-xs bg-vanilla-100 text-vanilla-700 px-2 py-0.5 rounded">{f}</span>
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

        {/* Anamnese */}
        {activeTab === 'anamnesis' && (
          <div>
            {anamnesis ? (
              <div>
                <div className={`flex items-center gap-2 mb-4 p-3 rounded-xl ${anamnesis.status === 'completed' ? 'bg-sage-50' : 'bg-warm-50'}`}>
                  {anamnesis.status === 'completed' ? (
                    <>
                      <Check className="w-5 h-5 text-sage-600" />
                      <span className="text-sage-700 font-medium text-sm">Anamnese concluída em {new Date(anamnesis.completedAt).toLocaleDateString('pt-BR')}</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-5 h-5 text-warm-600" />
                      <span className="text-warm-700 font-medium text-sm">Anamnese em andamento — Seção {anamnesis.currentSection}/16</span>
                    </>
                  )}
                </div>
                <AnamnesisViewer anamnesis={anamnesis} />
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Anamnese ainda não iniciada.</p>
                <p className="text-sm mt-1">Envie o link ao paciente para que ele preencha.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
