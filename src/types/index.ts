export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  startDate: string;
  accessCode: string;
  targetBehaviors: string[];
  active: boolean;
  notes: string;
}

// Análise Molecular - Diário ABC do Paciente
export interface MolecularEntry {
  id: string;
  patientId: string;
  date: string;
  time: string;
  // 1. Situação
  situation: string;
  // 2. Antecedente (O que estava acontecendo antes)
  antecedent: string;
  // 3. Resposta (O que fez)
  response: string;
  // 4. Consequência (O que aconteceu depois)
  consequence: string;
  // 5. Intensidade emocional (0-10)
  emotionIntensity: number;
  // 6. Frequência
  frequency: 'first_time' | 'happened_before' | '1_2_per_week' | '3_plus_per_week';
  // 7. Função do comportamento
  behaviorFunction: string[];
  // 8. Observações
  observations: string;
  // Dimensões do comportamento
  behaviorDuration?: string;
  privateEvent?: string;
  createdAt: string;
}

// Análise Molar - Registro do Psicólogo na Sessão
export interface MolarEntry {
  id: string;
  patientId: string;
  sessionDate: string;
  sessionNumber: number;
  // Antecedente do profissional
  antecedentPro: string;
  // Resposta relatada
  responsePro: string;
  // Consequência
  consequencePro: string;
  // Intensidade emocional (0-10)
  emotionIntensityPro: number;
  // Recorrência
  recurrence: string;
  // Função do comportamento
  behaviorFunctionPro: string;
  // Observações do profissional
  observationsPro: string;
  // Filogênese
  phylogenesis: string;
  // Ontogênese
  ontogenesis: string;
  // Cultura
  culture: string;
  // Ambiente atual como OM
  currentEnvironmentOM: string;
  // Autorregras
  selfRules: string;
  // Operação Motivadora
  motivatingOperation: string;
  // Estímulo Discriminativo
  discriminativeStimulus: string;
  // Resposta Pública
  publicResponse: string;
  // Resposta Privada
  privateResponse: string;
  // Consequência Imediata
  immediateConsequence: string;
  // Consequência Atrasada
  delayedConsequence: string;
  // CRBs
  crb1: string;
  crb2: string;
  // Comportamento Verbal
  verbalBehavior: string;
  // Incongruência
  incongruence: string;
  // Hipótese funcional
  functionalHypothesis: string;
  // Plano de intervenção
  interventionPlan: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  patientId: string;
  patientName: string;
  type: 'new_entry' | 'missing_entry' | 'high_intensity' | 'pattern_detected';
  message: string;
  date: string;
  read: boolean;
}

export type FrequencyLabel = {
  [key in MolecularEntry['frequency']]: string;
};

export const FREQUENCY_LABELS: FrequencyLabel = {
  'first_time': 'Primeira vez',
  'happened_before': 'Já aconteceu antes',
  '1_2_per_week': '1 a 2 vezes por semana',
  '3_plus_per_week': '3+ vezes por semana',
};

export const BEHAVIOR_FUNCTIONS = [
  'Me senti aliviado(a)',
  'Recebi atenção de alguém',
  'Evitei algo que me incomodava',
  'Consegui o que gostaria',
  'Me senti pior depois',
  'Mais de uma opção acima',
  'Nenhuma das opções',
];

export const CONSEQUENCE_TYPES = [
  { value: 'positive_reinforcement', label: 'Reforço Positivo (R+)', color: '#22c55e' },
  { value: 'negative_reinforcement', label: 'Reforço Negativo (R-)', color: '#0ea5e9' },
  { value: 'positive_punishment', label: 'Punição Positiva (P+)', color: '#f43f5e' },
  { value: 'negative_punishment', label: 'Punição Negativa (P-)', color: '#f97316' },
];
