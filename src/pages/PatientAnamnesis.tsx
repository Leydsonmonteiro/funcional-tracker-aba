import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Save, User, AlertCircle, Clock, BookOpen, Users, HeartPulse, Brain, Wine, MessageCircle, Heart, Briefcase, Sun, Sparkles, Scale, ShieldAlert, Target } from 'lucide-react';
import { getPatientByCode, getAnamnesis, createAnamnesis, updateAnamnesis, completeAnamnesis } from '../utils/store';
import type { AnamnesisData } from '../types';
import { ANAMNESIS_SECTIONS } from '../types';

const SECTION_ICONS: Record<string, React.ReactNode> = {
  'user': <User className="w-4 h-4" />,
  'alert-circle': <AlertCircle className="w-4 h-4" />,
  'clock': <Clock className="w-4 h-4" />,
  'book-open': <BookOpen className="w-4 h-4" />,
  'users': <Users className="w-4 h-4" />,
  'heart-pulse': <HeartPulse className="w-4 h-4" />,
  'brain': <Brain className="w-4 h-4" />,
  'wine': <Wine className="w-4 h-4" />,
  'message-circle': <MessageCircle className="w-4 h-4" />,
  'heart': <Heart className="w-4 h-4" />,
  'briefcase': <Briefcase className="w-4 h-4" />,
  'sun': <Sun className="w-4 h-4" />,
  'sparkles': <Sparkles className="w-4 h-4" />,
  'scale': <Scale className="w-4 h-4" />,
  'shield-alert': <ShieldAlert className="w-4 h-4" />,
  'target': <Target className="w-4 h-4" />,
};

interface FieldConfig {
  key: string;
  label: string;
  placeholder: string;
  type?: 'text' | 'textarea' | 'select' | 'date';
  options?: string[];
  required?: boolean;
}

function getSectionFields(sectionId: number): FieldConfig[] {
  switch (sectionId) {
    case 1: return [
      { key: 'fullName', label: 'Nome completo', placeholder: 'Seu nome completo', type: 'text', required: true },
      { key: 'preferredName', label: 'Nome social / como prefere ser chamado(a)', placeholder: 'Como gostaria de ser chamado(a)?', type: 'text' },
      { key: 'birthDate', label: 'Data de nascimento', placeholder: '', type: 'date' },
      { key: 'age', label: 'Idade', placeholder: 'Sua idade', type: 'text' },
      { key: 'gender', label: 'Sexo biológico', placeholder: '', type: 'select', options: ['Masculino', 'Feminino', 'Intersexo', 'Prefiro não informar'] },
      { key: 'genderIdentity', label: 'Identidade de gênero', placeholder: '', type: 'select', options: ['Cisgênero', 'Transgênero', 'Não-binário', 'Outro', 'Prefiro não informar'] },
      { key: 'pronouns', label: 'Pronomes', placeholder: '', type: 'select', options: ['Ele/dele', 'Ela/dela', 'Elu/delu', 'Outro'] },
      { key: 'maritalStatus', label: 'Estado civil', placeholder: '', type: 'select', options: ['Solteiro(a)', 'Casado(a)', 'União estável', 'Divorciado(a)', 'Viúvo(a)', 'Outro'] },
      { key: 'children', label: 'Possui filhos?', placeholder: '', type: 'select', options: ['Não', 'Sim, 1', 'Sim, 2', 'Sim, 3', 'Sim, 4 ou mais'] },
      { key: 'childrenAges', label: 'Idades dos filhos (se houver)', placeholder: 'Ex: 5 anos e 8 anos', type: 'text' },
      { key: 'education', label: 'Escolaridade', placeholder: '', type: 'select', options: ['Fundamental incompleto', 'Fundamental completo', 'Médio incompleto', 'Médio completo', 'Superior incompleto', 'Superior completo', 'Pós-graduação', 'Mestrado', 'Doutorado'] },
      { key: 'occupation', label: 'Profissão / Ocupação', placeholder: 'Sua profissão atual', type: 'text' },
      { key: 'workplace', label: 'Local de trabalho', placeholder: 'Onde trabalha atualmente', type: 'text' },
      { key: 'naturalFrom', label: 'Naturalidade', placeholder: 'Cidade e estado onde nasceu', type: 'text' },
      { key: 'currentCity', label: 'Cidade atual', placeholder: 'Onde mora atualmente', type: 'text' },
      { key: 'phone', label: 'Telefone', placeholder: '(00) 00000-0000', type: 'text' },
      { key: 'email', label: 'E-mail', placeholder: 'seu@email.com', type: 'text' },
      { key: 'emergencyContact', label: 'Contato de emergência (nome e parentesco)', placeholder: 'Nome - Parentesco', type: 'text' },
      { key: 'emergencyPhone', label: 'Telefone de emergência', placeholder: '(00) 00000-0000', type: 'text' },
      { key: 'healthInsurance', label: 'Convênio / Plano de saúde', placeholder: 'Nome do convênio ou particular', type: 'text' },
    ];
    case 2: return [
      { key: 'mainComplaint', label: 'Qual o principal motivo que o(a) trouxe à terapia?', placeholder: 'Descreva com suas palavras o que está sentindo ou vivenciando...', type: 'textarea', required: true },
      { key: 'ownWords', label: 'Se pudesse resumir em uma frase o que sente, o que diria?', placeholder: 'Tente expressar em uma frase...', type: 'textarea' },
      { key: 'whenStarted', label: 'Quando esse problema começou?', placeholder: 'Há quanto tempo isso acontece? Meses, anos?', type: 'textarea' },
      { key: 'whatTriggered', label: 'Houve algum evento que desencadeou ou piorou o problema?', placeholder: 'Algum acontecimento específico que marcou o início...', type: 'textarea' },
      { key: 'expectations', label: 'O que espera alcançar com a terapia?', placeholder: 'Quais são suas expectativas e desejos para o tratamento...', type: 'textarea' },
      { key: 'previousTreatments', label: 'Já fez terapia antes? Com qual abordagem? Por quanto tempo?', placeholder: 'Descreva experiências anteriores com psicoterapia...', type: 'textarea' },
      { key: 'previousDiagnoses', label: 'Já recebeu algum diagnóstico psicológico ou psiquiátrico?', placeholder: 'Liste diagnósticos anteriores, se houver...', type: 'textarea' },
      { key: 'currentMedications', label: 'Está tomando alguma medicação psiquiátrica atualmente?', placeholder: 'Nome da medicação, dosagem e há quanto tempo...', type: 'textarea' },
      { key: 'whySeekingNow', label: 'Por que está buscando ajuda agora, neste momento?', placeholder: 'O que motivou a busca por terapia neste momento específico...', type: 'textarea' },
    ];
    case 3: return [
      { key: 'symptomOnset', label: 'Quando os sintomas começaram exatamente?', placeholder: 'Tente ser o mais específico possível sobre o início...', type: 'textarea' },
      { key: 'symptomEvolution', label: 'Como os sintomas evoluíram ao longo do tempo?', placeholder: 'Melhoraram, pioraram, ficaram iguais? Houve fases?', type: 'textarea' },
      { key: 'worseningFactors', label: 'O que piora os sintomas?', placeholder: 'Situações, pessoas, horários, lugares que pioram...', type: 'textarea' },
      { key: 'improvementFactors', label: 'O que melhora os sintomas?', placeholder: 'O que ajuda a aliviar ou diminuir o que sente...', type: 'textarea' },
      { key: 'dailyImpact', label: 'Como isso afeta seu dia a dia?', placeholder: 'Impacto nas atividades cotidianas, autocuidado...', type: 'textarea' },
      { key: 'workImpact', label: 'Como isso afeta seu trabalho ou estudos?', placeholder: 'Impacto na produtividade, faltas, concentração...', type: 'textarea' },
      { key: 'relationshipImpact', label: 'Como isso afeta seus relacionamentos?', placeholder: 'Impacto na família, amigos, parceiro(a)...', type: 'textarea' },
      { key: 'previousAttempts', label: 'O que já tentou fazer para resolver?', placeholder: 'Estratégias que já usou, medicações, terapias...', type: 'textarea' },
      { key: 'symptomFrequency', label: 'Com que frequência os sintomas ocorrem?', placeholder: '', type: 'select', options: ['Diariamente', 'Várias vezes por semana', 'Semanalmente', 'Quinzenalmente', 'Mensalmente', 'Esporadicamente'] },
      { key: 'symptomIntensity', label: 'Qual a intensidade dos sintomas (0 = nenhuma, 10 = insuportável)?', placeholder: '', type: 'select', options: ['0 - Nenhuma', '1', '2', '3 - Leve', '4', '5 - Moderada', '6', '7 - Alta', '8', '9', '10 - Insuportável'] },
    ];
    case 4: return [
      { key: 'pregnancyComplications', label: 'Houve complicações na gestação ou parto da sua mãe com você?', placeholder: 'Descreva o que sabe sobre sua gestação e nascimento...', type: 'textarea' },
      { key: 'birthType', label: 'Tipo de parto', placeholder: '', type: 'select', options: ['Normal', 'Cesárea', 'Fórceps', 'Não sei informar'] },
      { key: 'developmentMilestones', label: 'Seu desenvolvimento foi considerado normal? (andar, falar, controle esfincteriano)', placeholder: 'Descreva o que sabe sobre seu desenvolvimento na infância...', type: 'textarea' },
      { key: 'childhoodBehavior', label: 'Como era seu comportamento na infância?', placeholder: 'Era uma criança quieta, agitada, tímida, sociável...', type: 'textarea' },
      { key: 'schoolPerformance', label: 'Como foi seu desempenho escolar?', placeholder: 'Notas, dificuldades, reprovações, relação com professores...', type: 'textarea' },
      { key: 'childhoodFriendships', label: 'Como eram suas amizades na infância?', placeholder: 'Tinha muitos amigos? Era isolado(a)? Sofreu bullying?', type: 'textarea' },
      { key: 'significantChildhoodEvents', label: 'Aconteceu algo marcante na sua infância?', placeholder: 'Eventos significativos, mudanças, perdas, separações...', type: 'textarea' },
      { key: 'adolescenceExperience', label: 'Como foi sua adolescência?', placeholder: 'Descreva como vivenciou essa fase...', type: 'textarea' },
      { key: 'puberty', label: 'Como foi a puberdade para você?', placeholder: 'Mudanças corporais, emocionais, sociais...', type: 'textarea' },
      { key: 'identityFormation', label: 'Como foi o processo de formação da sua identidade?', placeholder: 'Descobertas sobre si mesmo(a), valores, orientação...', type: 'textarea' },
      { key: 'significantLifeEvents', label: 'Quais os eventos mais significativos da sua vida?', placeholder: 'Acontecimentos que marcaram sua história...', type: 'textarea' },
      { key: 'majorLosses', label: 'Você passou por perdas importantes?', placeholder: 'Falecimentos, separações, perdas materiais significativas...', type: 'textarea' },
      { key: 'traumaticExperiences', label: 'Vivenciou alguma experiência traumática?', placeholder: 'Acidentes, violência, abuso, negligência... (responda apenas se se sentir confortável)', type: 'textarea' },
      { key: 'achievementsProud', label: 'Quais conquistas você tem orgulho?', placeholder: 'Realizações pessoais, profissionais, superações...', type: 'textarea' },
    ];
    case 5: return [
      { key: 'familyComposition', label: 'Quem compõe sua família? (pais, irmãos, cônjuge, filhos)', placeholder: 'Liste os membros da sua família e idades...', type: 'textarea', required: true },
      { key: 'fatherRelationship', label: 'Como é/era sua relação com seu pai?', placeholder: 'Descreva a relação, proximidade, conflitos...', type: 'textarea' },
      { key: 'motherRelationship', label: 'Como é/era sua relação com sua mãe?', placeholder: 'Descreva a relação, proximidade, conflitos...', type: 'textarea' },
      { key: 'siblingRelationship', label: 'Como é sua relação com irmãos (se houver)?', placeholder: 'Descreva a dinâmica com irmãos...', type: 'textarea' },
      { key: 'familyDynamics', label: 'Como é a dinâmica da sua família?', placeholder: 'Como se comunicam, resolvem conflitos, demonstram afeto...', type: 'textarea' },
      { key: 'parentalStyle', label: 'Como seus pais lidavam com disciplina e afeto?', placeholder: 'Eram rígidos, permissivos, afetuosos, distantes...', type: 'textarea' },
      { key: 'familyConflicts', label: 'Existem conflitos familiares significativos?', placeholder: 'Descreva conflitos atuais ou passados na família...', type: 'textarea' },
      { key: 'familyPsychiatricHistory', label: 'Alguém na família tem/teve problemas psicológicos ou psiquiátricos?', placeholder: 'Depressão, ansiedade, bipolaridade, esquizofrenia, etc...', type: 'textarea' },
      { key: 'familySubstanceUse', label: 'Alguém na família tem/teve problemas com álcool ou drogas?', placeholder: 'Descreva se houver histórico de uso de substâncias na família...', type: 'textarea' },
      { key: 'familySuicideHistory', label: 'Houve casos de suicídio ou tentativa na família?', placeholder: 'Descreva se houver (responda apenas se se sentir confortável)...', type: 'textarea' },
      { key: 'familyViolenceHistory', label: 'Houve situações de violência na família?', placeholder: 'Violência física, verbal, psicológica...', type: 'textarea' },
      { key: 'currentFamilyRelations', label: 'Como estão suas relações familiares atualmente?', placeholder: 'Descreva o estado atual dos relacionamentos familiares...', type: 'textarea' },
      { key: 'familySupport', label: 'Você sente que tem apoio da sua família?', placeholder: 'Descreva o nível de suporte que recebe...', type: 'textarea' },
    ];
    case 6: return [
      { key: 'currentDiseases', label: 'Possui alguma doença ou condição de saúde atual?', placeholder: 'Liste doenças diagnosticadas atualmente...', type: 'textarea' },
      { key: 'chronicConditions', label: 'Tem alguma condição crônica?', placeholder: 'Diabetes, hipertensão, asma, dor crônica, etc...', type: 'textarea' },
      { key: 'currentMedications', label: 'Quais medicações está tomando atualmente?', placeholder: 'Nome, dosagem e motivo de cada medicação...', type: 'textarea' },
      { key: 'allergies', label: 'Possui alergias?', placeholder: 'Medicamentos, alimentos, substâncias...', type: 'textarea' },
      { key: 'previousSurgeries', label: 'Já fez alguma cirurgia?', placeholder: 'Tipo de cirurgia e quando...', type: 'textarea' },
      { key: 'hospitalizations', label: 'Já foi hospitalizado(a)? Por qual motivo?', placeholder: 'Internações e motivos...', type: 'textarea' },
      { key: 'headInjuries', label: 'Já sofreu algum traumatismo craniano ou lesão na cabeça?', placeholder: 'Descreva se houve...', type: 'textarea' },
      { key: 'chronicPain', label: 'Sente dores crônicas?', placeholder: 'Localização, frequência e intensidade da dor...', type: 'textarea' },
      { key: 'sleepQuality', label: 'Como está a qualidade do seu sono?', placeholder: '', type: 'select', options: ['Muito boa', 'Boa', 'Regular', 'Ruim', 'Muito ruim'] },
      { key: 'sleepHours', label: 'Quantas horas dorme por noite em média?', placeholder: '', type: 'select', options: ['Menos de 4h', '4-5 horas', '5-6 horas', '6-7 horas', '7-8 horas', '8-9 horas', 'Mais de 9h'] },
      { key: 'sleepDisturbances', label: 'Tem dificuldades com o sono?', placeholder: 'Insônia, pesadelos, sonambulismo, apneia...', type: 'textarea' },
      { key: 'appetite', label: 'Como está seu apetite?', placeholder: '', type: 'select', options: ['Normal', 'Aumentado', 'Diminuído', 'Muito variável', 'Sem apetite'] },
      { key: 'dietDescription', label: 'Descreva sua alimentação habitual', placeholder: 'O que costuma comer no dia a dia...', type: 'textarea' },
      { key: 'physicalActivity', label: 'Pratica atividade física?', placeholder: '', type: 'select', options: ['Sim, regularmente', 'Sim, mas irregularmente', 'Raramente', 'Não pratico'] },
      { key: 'activityFrequency', label: 'Se pratica, qual atividade e com que frequência?', placeholder: 'Tipo de exercício e quantas vezes por semana...', type: 'textarea' },
      { key: 'lastMedicalCheckup', label: 'Quando foi seu último check-up médico?', placeholder: 'Data aproximada do último exame geral...', type: 'text' },
    ];
    case 7: return [
      { key: 'previousDiagnoses', label: 'Já recebeu algum diagnóstico de saúde mental?', placeholder: 'Depressão, ansiedade, TDAH, bipolaridade, etc...', type: 'textarea' },
      { key: 'previousTreatments', label: 'Já fez tratamento psicológico antes?', placeholder: 'Quando, por quanto tempo, qual abordagem...', type: 'textarea' },
      { key: 'previousTherapists', label: 'Quantos psicólogos já consultou?', placeholder: 'Número e experiência com cada um...', type: 'textarea' },
      { key: 'therapyApproach', label: 'Sabe qual abordagem terapêutica foi utilizada?', placeholder: 'TCC, psicanálise, humanista, comportamental...', type: 'textarea' },
      { key: 'whatWorked', label: 'O que funcionou nos tratamentos anteriores?', placeholder: 'O que ajudou, o que foi positivo...', type: 'textarea' },
      { key: 'whatDidntWork', label: 'O que não funcionou?', placeholder: 'O que não ajudou ou foi negativo...', type: 'textarea' },
      { key: 'psychiatricMedications', label: 'Já tomou ou toma medicação psiquiátrica?', placeholder: 'Antidepressivos, ansiolíticos, estabilizadores, antipsicóticos...', type: 'textarea' },
      { key: 'psychiatricHospitalizations', label: 'Já foi internado(a) em clínica psiquiátrica?', placeholder: 'Quando, por quanto tempo, motivo...', type: 'textarea' },
      { key: 'currentMoodDescription', label: 'Como descreveria seu humor na maior parte do tempo?', placeholder: 'Triste, ansioso, irritado, apático, instável...', type: 'textarea' },
      { key: 'anxietyLevel', label: 'Nível de ansiedade no dia a dia', placeholder: '', type: 'select', options: ['Nenhuma', 'Leve', 'Moderada', 'Alta', 'Muito alta / Incapacitante'] },
      { key: 'panicAttacks', label: 'Já teve crises de pânico?', placeholder: 'Descreva frequência e sintomas...', type: 'textarea' },
      { key: 'phobias', label: 'Tem medos intensos ou fobias?', placeholder: 'Descreva seus medos mais intensos...', type: 'textarea' },
      { key: 'obsessiveThoughts', label: 'Tem pensamentos repetitivos que não consegue controlar?', placeholder: 'Pensamentos intrusivos, obsessivos...', type: 'textarea' },
      { key: 'compulsiveBehaviors', label: 'Realiza comportamentos repetitivos para aliviar ansiedade?', placeholder: 'Rituais, verificações, lavagem de mãos...', type: 'textarea' },
      { key: 'eatingDisorders', label: 'Tem ou já teve problemas com alimentação?', placeholder: 'Compulsão, restrição, purgação...', type: 'textarea' },
      { key: 'bodyImageConcerns', label: 'Como se sente em relação ao seu corpo?', placeholder: 'Satisfação corporal, preocupações com aparência...', type: 'textarea' },
    ];
    case 8: return [
      { key: 'alcoholUse', label: 'Consome bebidas alcoólicas?', placeholder: '', type: 'select', options: ['Nunca', 'Socialmente', 'Semanalmente', 'Diariamente', 'Já consumi, parei'] },
      { key: 'alcoholFrequency', label: 'Se consome, com que frequência?', placeholder: 'Quantas vezes por semana/mês...', type: 'text' },
      { key: 'alcoholQuantity', label: 'Quantidade habitual', placeholder: 'Copos, latas, doses...', type: 'text' },
      { key: 'tobaccoUse', label: 'Fuma ou já fumou?', placeholder: '', type: 'select', options: ['Nunca fumei', 'Fumo atualmente', 'Já fumei, parei', 'Uso cigarro eletrônico'] },
      { key: 'tobaccoFrequency', label: 'Se fuma, quantos cigarros por dia?', placeholder: 'Quantidade diária...', type: 'text' },
      { key: 'cannabisUse', label: 'Usa ou já usou maconha/cannabis?', placeholder: '', type: 'select', options: ['Nunca', 'Já experimentei', 'Uso ocasional', 'Uso frequente', 'Já usei, parei'] },
      { key: 'otherDrugs', label: 'Usa ou já usou outras substâncias?', placeholder: 'Cocaína, ecstasy, LSD, medicamentos sem prescrição...', type: 'textarea' },
      { key: 'substanceHistory', label: 'Conte mais sobre seu histórico com substâncias', placeholder: 'Quando começou, por quê, como evoluiu...', type: 'textarea' },
      { key: 'previousTreatment', label: 'Já fez tratamento para dependência?', placeholder: 'Tipo de tratamento, quando, resultado...', type: 'textarea' },
      { key: 'caffeineUse', label: 'Consumo de cafeína (café, energéticos)', placeholder: 'Quantas xícaras/latas por dia...', type: 'text' },
    ];
    case 9: return [
      { key: 'socialNetwork', label: 'Como é sua rede social? Tem pessoas próximas?', placeholder: 'Descreva suas relações sociais...', type: 'textarea' },
      { key: 'closeFriends', label: 'Quantos amigos próximos você diria que tem?', placeholder: 'Pessoas com quem pode contar de verdade...', type: 'text' },
      { key: 'socialActivities', label: 'Participa de atividades sociais?', placeholder: 'Grupos, clubes, eventos, encontros...', type: 'textarea' },
      { key: 'communityInvolvement', label: 'Participa de alguma comunidade?', placeholder: 'Igreja, voluntariado, associações...', type: 'textarea' },
      { key: 'socialDifficulties', label: 'Tem dificuldades sociais?', placeholder: 'Timidez, ansiedade social, dificuldade de se expressar...', type: 'textarea' },
      { key: 'loneliness', label: 'Sente solidão?', placeholder: '', type: 'select', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
      { key: 'socialMediaUse', label: 'Como é seu uso de redes sociais?', placeholder: 'Tempo diário, impacto no humor, comparação social...', type: 'textarea' },
      { key: 'conflictResolution', label: 'Como costuma resolver conflitos?', placeholder: 'Evita, enfrenta, grita, se cala, negocia...', type: 'textarea' },
      { key: 'assertiveness', label: 'Consegue dizer "não" quando precisa?', placeholder: '', type: 'select', options: ['Sim, sem dificuldade', 'Na maioria das vezes', 'Tenho dificuldade', 'Raramente consigo', 'Nunca consigo'] },
      { key: 'trustInOthers', label: 'Confia nas pessoas?', placeholder: '', type: 'select', options: ['Sim, confio facilmente', 'Confio com cautela', 'Tenho dificuldade em confiar', 'Não confio em quase ninguém'] },
    ];
    case 10: return [
      { key: 'currentRelationship', label: 'Está em um relacionamento atualmente?', placeholder: '', type: 'select', options: ['Sim, namoro', 'Sim, casado(a)/união estável', 'Não, solteiro(a)', 'Relacionamento complicado', 'Separando'] },
      { key: 'relationshipDuration', label: 'Há quanto tempo está nesse relacionamento?', placeholder: 'Tempo de duração...', type: 'text' },
      { key: 'relationshipQuality', label: 'Como avalia a qualidade do relacionamento?', placeholder: '', type: 'select', options: ['Muito boa', 'Boa', 'Regular', 'Ruim', 'Muito ruim'] },
      { key: 'relationshipConflicts', label: 'Quais os principais conflitos no relacionamento?', placeholder: 'Descreva os pontos de atrito...', type: 'textarea' },
      { key: 'communicationPattern', label: 'Como é a comunicação no casal?', placeholder: 'Aberta, fechada, agressiva, passiva...', type: 'textarea' },
      { key: 'previousRelationships', label: 'Como foram seus relacionamentos anteriores?', placeholder: 'Padrões, duração, motivos de término...', type: 'textarea' },
      { key: 'relationshipPatterns', label: 'Percebe algum padrão que se repete nos seus relacionamentos?', placeholder: 'Escolhas semelhantes, mesmos problemas...', type: 'textarea' },
      { key: 'domesticViolence', label: 'Já vivenciou violência em relacionamento?', placeholder: 'Física, verbal, psicológica, sexual (responda se se sentir confortável)...', type: 'textarea' },
      { key: 'sexualOrientation', label: 'Orientação sexual', placeholder: '', type: 'select', options: ['Heterossexual', 'Homossexual', 'Bissexual', 'Pansexual', 'Assexual', 'Outro', 'Prefiro não informar'] },
      { key: 'sexualLife', label: 'Está satisfeito(a) com sua vida sexual?', placeholder: '', type: 'select', options: ['Sim', 'Parcialmente', 'Não', 'Não tenho vida sexual ativa', 'Prefiro não responder'] },
      { key: 'sexualDifficulties', label: 'Tem alguma dificuldade sexual?', placeholder: 'Descreva se houver (responda apenas se se sentir confortável)...', type: 'textarea' },
    ];
    case 11: return [
      { key: 'currentOccupation', label: 'Qual sua ocupação atual?', placeholder: 'Cargo, função, tipo de trabalho...', type: 'textarea' },
      { key: 'jobSatisfaction', label: 'Está satisfeito(a) com seu trabalho?', placeholder: '', type: 'select', options: ['Muito satisfeito(a)', 'Satisfeito(a)', 'Neutro', 'Insatisfeito(a)', 'Muito insatisfeito(a)', 'Desempregado(a)'] },
      { key: 'workEnvironment', label: 'Como é o ambiente de trabalho?', placeholder: 'Clima organizacional, pressão, suporte...', type: 'textarea' },
      { key: 'workRelationships', label: 'Como são seus relacionamentos no trabalho?', placeholder: 'Com colegas, chefes, subordinados...', type: 'textarea' },
      { key: 'workStress', label: 'Nível de estresse no trabalho', placeholder: '', type: 'select', options: ['Nenhum', 'Baixo', 'Moderado', 'Alto', 'Muito alto / Burnout'] },
      { key: 'careerGoals', label: 'Quais seus objetivos profissionais?', placeholder: 'Onde quer chegar, mudanças desejadas...', type: 'textarea' },
      { key: 'financialSituation', label: 'Como está sua situação financeira?', placeholder: '', type: 'select', options: ['Confortável', 'Estável', 'Apertada', 'Difícil', 'Muito difícil'] },
      { key: 'financialStress', label: 'Questões financeiras causam estresse?', placeholder: 'Descreva o impacto das finanças no seu bem-estar...', type: 'textarea' },
      { key: 'academicHistory', label: 'Descreva sua trajetória acadêmica', placeholder: 'Escolas, faculdade, cursos, dificuldades...', type: 'textarea' },
      { key: 'learningDifficulties', label: 'Tem ou teve dificuldades de aprendizagem?', placeholder: 'TDAH, dislexia, dificuldade de concentração...', type: 'textarea' },
    ];
    case 12: return [
      { key: 'typicalDay', label: 'Descreva um dia típico seu', placeholder: 'Do momento que acorda até dormir, o que faz...', type: 'textarea', required: true },
      { key: 'morningRoutine', label: 'Como é sua rotina matinal?', placeholder: 'O que faz ao acordar, horário, hábitos...', type: 'textarea' },
      { key: 'eveningRoutine', label: 'Como é sua rotina noturna?', placeholder: 'O que faz antes de dormir, horário...', type: 'textarea' },
      { key: 'hobbies', label: 'Quais são seus hobbies?', placeholder: 'Atividades que gosta de fazer por prazer...', type: 'textarea' },
      { key: 'leisure', label: 'O que faz para se divertir?', placeholder: 'Lazer, entretenimento, passeios...', type: 'textarea' },
      { key: 'relaxationTechniques', label: 'Usa alguma técnica de relaxamento?', placeholder: 'Meditação, respiração, yoga, mindfulness...', type: 'textarea' },
      { key: 'screenTime', label: 'Quanto tempo passa em telas por dia?', placeholder: '', type: 'select', options: ['Menos de 2h', '2-4 horas', '4-6 horas', '6-8 horas', 'Mais de 8h'] },
      { key: 'timeManagement', label: 'Como gerencia seu tempo?', placeholder: 'Organizado, procrastinador, sobrecarregado...', type: 'textarea' },
      { key: 'selfCareHabits', label: 'Quais seus hábitos de autocuidado?', placeholder: 'Cuidados com saúde, aparência, bem-estar...', type: 'textarea' },
    ];
    case 13: return [
      { key: 'religiousBelief', label: 'Tem alguma crença religiosa ou espiritual?', placeholder: '', type: 'select', options: ['Sim, praticante', 'Sim, não praticante', 'Agnóstico(a)', 'Ateu/Ateia', 'Espiritualista', 'Outro'] },
      { key: 'spiritualPractices', label: 'Pratica alguma atividade espiritual?', placeholder: 'Oração, meditação, rituais, cultos...', type: 'textarea' },
      { key: 'spiritualCommunity', label: 'Participa de alguma comunidade religiosa/espiritual?', placeholder: 'Igreja, templo, centro, grupo...', type: 'textarea' },
      { key: 'culturalBackground', label: 'Qual sua origem cultural?', placeholder: 'Tradições, costumes, herança cultural...', type: 'textarea' },
      { key: 'culturalValues', label: 'Quais valores culturais são importantes para você?', placeholder: 'Valores que guiam sua vida...', type: 'textarea' },
      { key: 'culturalConflicts', label: 'Seus valores culturais geram algum conflito?', placeholder: 'Conflitos entre valores pessoais e culturais/familiares...', type: 'textarea' },
      { key: 'meaningOfLife', label: 'O que dá sentido à sua vida?', placeholder: 'O que te motiva a seguir em frente...', type: 'textarea' },
    ];
    case 14: return [
      { key: 'legalInvolvement', label: 'Está envolvido(a) em alguma questão jurídica?', placeholder: '', type: 'select', options: ['Não', 'Sim, como parte', 'Sim, como testemunha', 'Sim, processo trabalhista', 'Sim, questão familiar'] },
      { key: 'currentProcesses', label: 'Se sim, descreva brevemente', placeholder: 'Tipo de processo, situação atual...', type: 'textarea' },
      { key: 'custodyIssues', label: 'Há questões de guarda de filhos?', placeholder: 'Descreva a situação se houver...', type: 'textarea' },
      { key: 'restrainingOrders', label: 'Existe alguma medida protetiva envolvida?', placeholder: 'Descreva se houver...', type: 'textarea' },
      { key: 'victimOfCrime', label: 'Foi vítima de algum crime?', placeholder: 'Descreva se se sentir confortável...', type: 'textarea' },
    ];
    case 15: return [
      { key: 'suicidalIdeation', label: 'Tem ou já teve pensamentos de tirar a própria vida?', placeholder: '', type: 'select', options: ['Nunca', 'No passado, não atualmente', 'Raramente', 'Às vezes', 'Frequentemente', 'Constantemente'] },
      { key: 'suicidalPlan', label: 'Se tem pensamentos suicidas, já pensou em como faria?', placeholder: 'Responda apenas se se sentir confortável...', type: 'textarea' },
      { key: 'previousAttempts', label: 'Já tentou suicídio?', placeholder: '', type: 'select', options: ['Nunca', 'Sim, uma vez', 'Sim, mais de uma vez'] },
      { key: 'selfHarmBehavior', label: 'Já se machucou intencionalmente?', placeholder: 'Cortes, queimaduras, bater em si mesmo(a)...', type: 'textarea' },
      { key: 'riskToOthers', label: 'Já pensou em machucar outra pessoa?', placeholder: '', type: 'select', options: ['Nunca', 'No passado', 'Raramente', 'Às vezes'] },
      { key: 'protectiveFactors', label: 'O que te impede de agir nesses pensamentos?', placeholder: 'Família, filhos, fé, medo, esperança...', type: 'textarea' },
      { key: 'reasonsForLiving', label: 'Quais são suas razões para viver?', placeholder: 'O que te mantém aqui, o que é importante...', type: 'textarea' },
      { key: 'safetyPlan', label: 'Tem alguém que pode ligar em momento de crise?', placeholder: 'Nome e telefone de pessoas de confiança, CVV 188...', type: 'textarea' },
    ];
    case 16: return [
      { key: 'therapyGoals', label: 'O que gostaria de alcançar com a terapia?', placeholder: 'Seus objetivos principais para o tratamento...', type: 'textarea', required: true },
      { key: 'shortTermGoals', label: 'O que gostaria de melhorar nos próximos 3 meses?', placeholder: 'Mudanças de curto prazo que deseja...', type: 'textarea' },
      { key: 'longTermGoals', label: 'Onde se vê daqui a 1 ano?', placeholder: 'Como imagina sua vida com as mudanças...', type: 'textarea' },
      { key: 'changeMotivation', label: 'De 0 a 10, qual sua motivação para mudar?', placeholder: '', type: 'select', options: ['0 - Nenhuma', '1', '2', '3', '4', '5 - Moderada', '6', '7', '8', '9', '10 - Máxima'] },
      { key: 'perceivedBarriers', label: 'O que pode dificultar seu progresso na terapia?', placeholder: 'Barreiras, medos, resistências...', type: 'textarea' },
      { key: 'supportSystems', label: 'Quem pode te apoiar durante o tratamento?', placeholder: 'Pessoas, grupos, recursos de apoio...', type: 'textarea' },
      { key: 'strengthsResources', label: 'Quais são seus pontos fortes?', placeholder: 'Qualidades, habilidades, recursos pessoais...', type: 'textarea' },
      { key: 'additionalInfo', label: 'Há algo mais que gostaria de compartilhar?', placeholder: 'Qualquer informação adicional que considere importante...', type: 'textarea' },
    ];
    default: return [];
  }
}

function getSectionDataKey(sectionId: number): keyof AnamnesisData {
  const keys: Record<number, keyof AnamnesisData> = {
    1: 'identification', 2: 'chiefComplaint', 3: 'currentHistory',
    4: 'personalHistory', 5: 'familyHistory', 6: 'physicalHealth',
    7: 'mentalHealth', 8: 'substanceUse', 9: 'socialLife',
    10: 'relationships', 11: 'professionalLife', 12: 'lifestyle',
    13: 'spirituality', 14: 'legalAspects', 15: 'riskAssessment', 16: 'goals',
  };
  return keys[sectionId];
}

export default function PatientAnamnesis() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(1);
  const [anamnesis, setAnamnesis] = useState<AnamnesisData | null>(null);
  const [saving, setSaving] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const patient = code ? getPatientByCode(code) : null;

  useEffect(() => {
    if (patient) {
      const existing = getAnamnesis(patient.id);
      if (existing) {
        setAnamnesis(existing);
        setCurrentSection(existing.currentSection || 1);
      } else {
        const newA = createAnamnesis(patient.id);
        setAnamnesis(newA);
      }
    }
  }, [patient]);

  if (!patient || !anamnesis) {
    return (
      <div className="min-h-screen bg-sage-50 flex items-center justify-center">
        <p className="text-gray-500">Paciente não encontrado.</p>
      </div>
    );
  }

  if (anamnesis.status === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-sage-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md text-center">
          <div className="bg-sage-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-sage-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Anamnese Concluída!</h2>
          <p className="text-gray-500 mb-6">Sua anamnese já foi preenchida e enviada ao seu psicólogo(a). Obrigado!</p>
          <button onClick={() => navigate(`/paciente/${code}/diario`)} className="w-full bg-sage-500 hover:bg-sage-600 text-white py-3 rounded-xl font-semibold">
            Ir para o Diário ABC
          </button>
        </div>
      </div>
    );
  }

  const fields = getSectionFields(currentSection);
  const sectionKey = getSectionDataKey(currentSection);
  const sectionData = (anamnesis[sectionKey] as Record<string, string>) || {};
  const section = ANAMNESIS_SECTIONS.find(s => s.id === currentSection)!;
  const progress = Math.round((currentSection / 16) * 100);

  const handleFieldChange = (key: string, value: string) => {
    const updated = { ...anamnesis, [sectionKey]: { ...sectionData, [key]: value } };
    setAnamnesis(updated);
  };

  const handleSave = () => {
    setSaving(true);
    updateAnamnesis(patient.id, { ...anamnesis, currentSection });
    setTimeout(() => setSaving(false), 500);
  };

  const handleNext = () => {
    handleSave();
    if (currentSection < 16) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    handleSave();
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleComplete = () => {
    handleSave();
    completeAnamnesis(patient.id);
    setAnamnesis({ ...anamnesis, status: 'completed' });
  };

  const handleGoToSection = (id: number) => {
    handleSave();
    setCurrentSection(id);
    setShowMenu(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-sage-100 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-sage-200 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-sage-600" />
              <h1 className="font-bold text-gray-900">Anamnese Psicológica</h1>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowMenu(!showMenu)} className="text-sage-600 text-sm font-medium bg-sage-50 px-3 py-1 rounded-lg">
                {currentSection}/16
              </button>
              <button onClick={handleSave} className="text-sage-600 bg-sage-50 p-2 rounded-lg">
                <Save className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Seção {currentSection} de 16</span>
            <span className="flex-1" />
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div className="bg-sage-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Section Menu Dropdown */}
      {showMenu && (
        <div className="fixed inset-0 z-30 bg-black/30" onClick={() => setShowMenu(false)}>
          <div className="absolute top-16 right-4 left-4 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-4 max-h-[70vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-gray-900 mb-3">Seções da Anamnese</h3>
            <div className="grid grid-cols-2 gap-2">
              {ANAMNESIS_SECTIONS.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleGoToSection(s.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-left text-sm transition-all ${
                    s.id === currentSection
                      ? 'bg-sage-500 text-white'
                      : s.id < currentSection
                      ? 'bg-sage-50 text-sage-700 hover:bg-sage-100'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {SECTION_ICONS[s.icon]}
                  <span className="truncate">{s.id}. {s.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        {saving && (
          <div className="bg-sage-100 text-sage-700 text-center py-2 rounded-xl mb-4 text-sm font-medium animate-pulse">
            Salvando...
          </div>
        )}

        {/* Welcome message on first section */}
        {currentSection === 1 && (
          <div className="bg-sage-50 border border-sage-200 rounded-2xl p-4 mb-6">
            <p className="text-sage-800 text-sm">
              Olá, <strong>{patient.name}</strong>! Esta anamnese é uma ferramenta importante para que seu psicólogo(a) 
              possa conhecê-lo(a) melhor. Responda com calma e honestidade. Suas respostas são <strong>confidenciais</strong>. 
              Você pode salvar e continuar depois a qualquer momento.
            </p>
          </div>
        )}

        {/* Section Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-sage-100 p-2 rounded-xl">
            {SECTION_ICONS[section.icon]}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
            <p className="text-sm text-gray-500">Seção {currentSection} de 16</p>
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-5">
          {fields.map(field => (
            <div key={field.key} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
                {field.required && <span className="text-rose-500 ml-1">*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  value={sectionData[field.key] || ''}
                  onChange={e => handleFieldChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200 outline-none transition-all text-sm resize-none"
                />
              ) : field.type === 'select' ? (
                <select
                  value={sectionData[field.key] || ''}
                  onChange={e => handleFieldChange(field.key, e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200 outline-none transition-all text-sm bg-white"
                >
                  <option value="">Selecione...</option>
                  {field.options?.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : field.type === 'date' ? (
                <input
                  type="date"
                  value={sectionData[field.key] || ''}
                  onChange={e => handleFieldChange(field.key, e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200 outline-none transition-all text-sm"
                />
              ) : (
                <input
                  type="text"
                  value={sectionData[field.key] || ''}
                  onChange={e => handleFieldChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200 outline-none transition-all text-sm"
                />
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-8 mb-4">
          {currentSection > 1 && (
            <button onClick={handlePrev} className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all">
              <ChevronLeft className="w-5 h-5" /> Anterior
            </button>
          )}
          {currentSection < 16 ? (
            <button onClick={handleNext} className="flex-1 flex items-center justify-center gap-2 bg-sage-500 hover:bg-sage-600 text-white py-3 rounded-xl font-semibold transition-all">
              Próximo <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={handleComplete} className="flex-1 flex items-center justify-center gap-2 bg-sage-600 hover:bg-sage-700 text-white py-3 rounded-xl font-semibold transition-all">
              <Check className="w-5 h-5" /> Concluir Anamnese
            </button>
          )}
        </div>

        {/* Risk warning */}
        {currentSection === 15 && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 mt-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-rose-500 mt-0.5" />
              <div>
                <p className="text-rose-800 text-sm font-medium">Se você está em crise ou pensando em se machucar:</p>
                <p className="text-rose-700 text-sm mt-1">
                  Ligue para o <strong>CVV — 188</strong> (24h) ou acesse <strong>www.cvv.org.br</strong>. 
                  Você não está sozinho(a).
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
