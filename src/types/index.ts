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
  anamnesisCompleted?: boolean;
}

// Anamnese Psicológica Completa
export interface AnamnesisData {
  id: string;
  patientId: string;
  completedAt: string;
  status: 'in_progress' | 'completed';
  currentSection: number;

  // SEÇÃO 1: IDENTIFICAÇÃO
  identification: {
    fullName: string;
    preferredName: string;
    birthDate: string;
    age: string;
    gender: string;
    genderIdentity: string;
    pronouns: string;
    maritalStatus: string;
    children: string;
    childrenAges: string;
    education: string;
    occupation: string;
    workplace: string;
    naturalFrom: string;
    currentCity: string;
    address: string;
    phone: string;
    email: string;
    emergencyContact: string;
    emergencyPhone: string;
    referredBy: string;
    healthInsurance: string;
  };

  // SEÇÃO 2: QUEIXA PRINCIPAL E DEMANDA
  chiefComplaint: {
    mainComplaint: string;
    ownWords: string;
    whenStarted: string;
    whatTriggered: string;
    expectations: string;
    previousTreatments: string;
    previousDiagnoses: string;
    currentMedications: string;
    whySeekingNow: string;
  };

  // SEÇÃO 3: HISTÓRIA DA QUEIXA ATUAL
  currentHistory: {
    symptomOnset: string;
    symptomEvolution: string;
    worseningFactors: string;
    improvementFactors: string;
    dailyImpact: string;
    workImpact: string;
    relationshipImpact: string;
    previousAttempts: string;
    symptomFrequency: string;
    symptomIntensity: string;
  };

  // SEÇÃO 4: HISTÓRIA PESSOAL - DESENVOLVIMENTO
  personalHistory: {
    pregnancyComplications: string;
    birthType: string;
    developmentMilestones: string;
    childhoodBehavior: string;
    schoolPerformance: string;
    childhoodFriendships: string;
    significantChildhoodEvents: string;
    adolescenceExperience: string;
    puberty: string;
    identityFormation: string;
    adultTransition: string;
    significantLifeEvents: string;
    majorLosses: string;
    traumaticExperiences: string;
    achievementsProud: string;
  };

  // SEÇÃO 5: HISTÓRIA FAMILIAR
  familyHistory: {
    familyComposition: string;
    fatherRelationship: string;
    motherRelationship: string;
    siblingRelationship: string;
    familyDynamics: string;
    parentalStyle: string;
    familyConflicts: string;
    familyPsychiatricHistory: string;
    familySubstanceUse: string;
    familySuicideHistory: string;
    familyViolenceHistory: string;
    currentFamilyRelations: string;
    familySupport: string;
  };

  // SEÇÃO 6: SAÚDE FÍSICA
  physicalHealth: {
    currentDiseases: string;
    chronicConditions: string;
    currentMedications: string;
    allergies: string;
    previousSurgeries: string;
    hospitalizations: string;
    headInjuries: string;
    chronicPain: string;
    sleepQuality: string;
    sleepHours: string;
    sleepDisturbances: string;
    appetite: string;
    dietDescription: string;
    physicalActivity: string;
    activityFrequency: string;
    lastMedicalCheckup: string;
    pendingExams: string;
  };

  // SEÇÃO 7: SAÚDE MENTAL
  mentalHealth: {
    previousDiagnoses: string;
    previousTreatments: string;
    previousTherapists: string;
    therapyDuration: string;
    therapyApproach: string;
    whatWorked: string;
    whatDidntWork: string;
    psychiatricMedications: string;
    psychiatricHospitalizations: string;
    suicidalIdeation: string;
    suicideAttempts: string;
    selfHarm: string;
    currentMoodDescription: string;
    anxietyLevel: string;
    panicAttacks: string;
    phobias: string;
    obsessiveThoughts: string;
    compulsiveBehaviors: string;
    eatingDisorders: string;
    bodyImageConcerns: string;
  };

  // SEÇÃO 8: USO DE SUBSTÂNCIAS
  substanceUse: {
    alcoholUse: string;
    alcoholFrequency: string;
    alcoholQuantity: string;
    tobaccoUse: string;
    tobaccoFrequency: string;
    cannabisUse: string;
    otherDrugs: string;
    substanceHistory: string;
    previousTreatment: string;
    currentAbstinence: string;
    caffeineUse: string;
    medicationMisuse: string;
  };

  // SEÇÃO 9: VIDA SOCIAL E RELACIONAL
  socialLife: {
    socialNetwork: string;
    closeFriends: string;
    socialActivities: string;
    communityInvolvement: string;
    socialDifficulties: string;
    loneliness: string;
    socialMediaUse: string;
    conflictResolution: string;
    assertiveness: string;
    trustInOthers: string;
  };

  // SEÇÃO 10: RELACIONAMENTOS AFETIVOS
  relationships: {
    currentRelationship: string;
    relationshipDuration: string;
    relationshipQuality: string;
    relationshipConflicts: string;
    communicationPattern: string;
    previousRelationships: string;
    relationshipPatterns: string;
    attachmentStyle: string;
    jealousy: string;
    domesticViolence: string;
    sexualOrientation: string;
    sexualLife: string;
    sexualDifficulties: string;
    sexualTrauma: string;
  };

  // SEÇÃO 11: VIDA PROFISSIONAL E ACADÊMICA
  professionalLife: {
    currentOccupation: string;
    jobSatisfaction: string;
    workEnvironment: string;
    workRelationships: string;
    workStress: string;
    careerGoals: string;
    financialSituation: string;
    financialStress: string;
    unemploymentHistory: string;
    academicHistory: string;
    learningDifficulties: string;
    currentStudies: string;
  };

  // SEÇÃO 12: ROTINA E ESTILO DE VIDA
  lifestyle: {
    typicalDay: string;
    morningRoutine: string;
    eveningRoutine: string;
    hobbies: string;
    leisure: string;
    physicalExercise: string;
    relaxationTechniques: string;
    screenTime: string;
    timeManagement: string;
    selfCareHabits: string;
  };

  // SEÇÃO 13: ESPIRITUALIDADE E CULTURA
  spirituality: {
    religiousBelief: string;
    spiritualPractices: string;
    spiritualCommunity: string;
    culturalBackground: string;
    culturalValues: string;
    culturalConflicts: string;
    meaningOfLife: string;
    copingThroughFaith: string;
  };

  // SEÇÃO 14: ASPECTOS JURÍDICOS
  legalAspects: {
    legalInvolvement: string;
    currentProcesses: string;
    custodyIssues: string;
    restrainingOrders: string;
    criminalHistory: string;
    victimOfCrime: string;
  };

  // SEÇÃO 15: AVALIAÇÃO DE RISCO
  riskAssessment: {
    suicidalIdeation: string;
    suicidalPlan: string;
    suicidalIntent: string;
    previousAttempts: string;
    selfHarmBehavior: string;
    riskToOthers: string;
    accessToMeans: string;
    protectiveFactors: string;
    reasonsForLiving: string;
    safetyPlan: string;
  };

  // SEÇÃO 16: OBJETIVOS E EXPECTATIVAS
  goals: {
    therapyGoals: string;
    shortTermGoals: string;
    longTermGoals: string;
    changeMotivation: string;
    perceivedBarriers: string;
    supportSystems: string;
    strengthsResources: string;
    additionalInfo: string;
  };
}

// Análise Molecular - Diário ABC do Paciente
export interface MolecularEntry {
  id: string;
  patientId: string;
  date: string;
  time: string;
  situation: string;
  antecedent: string;
  response: string;
  consequence: string;
  emotionIntensity: number;
  frequency: 'first_time' | 'happened_before' | '1_2_per_week' | '3_plus_per_week';
  behaviorFunction: string[];
  observations: string;
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
  antecedentPro: string;
  responsePro: string;
  consequencePro: string;
  emotionIntensityPro: number;
  recurrence: string;
  behaviorFunctionPro: string;
  observationsPro: string;
  phylogenesis: string;
  ontogenesis: string;
  culture: string;
  currentEnvironmentOM: string;
  selfRules: string;
  motivatingOperation: string;
  discriminativeStimulus: string;
  publicResponse: string;
  privateResponse: string;
  immediateConsequence: string;
  delayedConsequence: string;
  crb1: string;
  crb2: string;
  verbalBehavior: string;
  incongruence: string;
  functionalHypothesis: string;
  interventionPlan: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  patientId: string;
  patientName: string;
  type: 'new_entry' | 'missing_entry' | 'high_intensity' | 'pattern_detected' | 'anamnesis_completed';
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

// Seções da anamnese para navegação
export const ANAMNESIS_SECTIONS = [
  { id: 1, title: 'Identificação', icon: 'user' },
  { id: 2, title: 'Queixa Principal', icon: 'alert-circle' },
  { id: 3, title: 'História Atual', icon: 'clock' },
  { id: 4, title: 'História Pessoal', icon: 'book-open' },
  { id: 5, title: 'História Familiar', icon: 'users' },
  { id: 6, title: 'Saúde Física', icon: 'heart-pulse' },
  { id: 7, title: 'Saúde Mental', icon: 'brain' },
  { id: 8, title: 'Substâncias', icon: 'wine' },
  { id: 9, title: 'Vida Social', icon: 'message-circle' },
  { id: 10, title: 'Relacionamentos', icon: 'heart' },
  { id: 11, title: 'Vida Profissional', icon: 'briefcase' },
  { id: 12, title: 'Rotina e Estilo de Vida', icon: 'sun' },
  { id: 13, title: 'Espiritualidade', icon: 'sparkles' },
  { id: 14, title: 'Aspectos Jurídicos', icon: 'scale' },
  { id: 15, title: 'Avaliação de Risco', icon: 'shield-alert' },
  { id: 16, title: 'Objetivos e Expectativas', icon: 'target' },
];
