import { v4 as uuidv4 } from 'uuid';
import type { Patient, MolecularEntry, MolarEntry, Notification } from '../types';

const KEYS = {
  patients: 'aba_patients',
  molecular: 'aba_molecular_entries',
  molar: 'aba_molar_entries',
  notifications: 'aba_notifications',
  psychologistPin: 'aba_psychologist_pin',
};

function get<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function set<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// PIN do psicólogo
export function getPsychologistPin(): string | null {
  return localStorage.getItem(KEYS.psychologistPin);
}

export function setPsychologistPin(pin: string): void {
  localStorage.setItem(KEYS.psychologistPin, pin);
}

// Pacientes
export function getPatients(): Patient[] {
  return get<Patient[]>(KEYS.patients, []);
}

export function getPatient(id: string): Patient | undefined {
  return getPatients().find(p => p.id === id);
}

export function getPatientByCode(code: string): Patient | undefined {
  return getPatients().find(p => p.accessCode === code);
}

export function addPatient(patient: Omit<Patient, 'id' | 'accessCode' | 'active'>): Patient {
  const patients = getPatients();
  const newPatient: Patient = {
    ...patient,
    id: uuidv4(),
    accessCode: generateAccessCode(),
    active: true,
  };
  patients.push(newPatient);
  set(KEYS.patients, patients);
  return newPatient;
}

export function updatePatient(id: string, updates: Partial<Patient>): void {
  const patients = getPatients();
  const idx = patients.findIndex(p => p.id === id);
  if (idx !== -1) {
    patients[idx] = { ...patients[idx], ...updates };
    set(KEYS.patients, patients);
  }
}

export function deletePatient(id: string): void {
  const patients = getPatients().filter(p => p.id !== id);
  set(KEYS.patients, patients);
  // Remover entradas associadas
  const molecular = getMolecularEntries().filter(e => e.patientId !== id);
  set(KEYS.molecular, molecular);
  const molar = getMolarEntries().filter(e => e.patientId !== id);
  set(KEYS.molar, molar);
}

// Entradas Moleculares
export function getMolecularEntries(patientId?: string): MolecularEntry[] {
  const entries = get<MolecularEntry[]>(KEYS.molecular, []);
  if (patientId) return entries.filter(e => e.patientId === patientId);
  return entries;
}

export function addMolecularEntry(entry: Omit<MolecularEntry, 'id' | 'createdAt'>): MolecularEntry {
  const entries = getMolecularEntries();
  const newEntry: MolecularEntry = {
    ...entry,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  entries.push(newEntry);
  set(KEYS.molecular, entries);

  // Gerar notificação
  const patient = getPatient(entry.patientId);
  if (patient) {
    const notif: Notification = {
      id: uuidv4(),
      patientId: entry.patientId,
      patientName: patient.name,
      type: entry.emotionIntensity >= 8 ? 'high_intensity' : 'new_entry',
      message: entry.emotionIntensity >= 8
        ? `${patient.name} registrou uma intensidade emocional alta (${entry.emotionIntensity}/10)`
        : `${patient.name} preencheu o diário ABC`,
      date: new Date().toISOString(),
      read: false,
    };
    addNotification(notif);
  }

  return newEntry;
}

export function deleteMolecularEntry(id: string): void {
  const entries = getMolecularEntries().filter(e => e.id !== id);
  set(KEYS.molecular, entries);
}

// Entradas Molares
export function getMolarEntries(patientId?: string): MolarEntry[] {
  const entries = get<MolarEntry[]>(KEYS.molar, []);
  if (patientId) return entries.filter(e => e.patientId === patientId);
  return entries;
}

export function addMolarEntry(entry: Omit<MolarEntry, 'id' | 'createdAt'>): MolarEntry {
  const entries = getMolarEntries();
  const newEntry: MolarEntry = {
    ...entry,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  entries.push(newEntry);
  set(KEYS.molar, entries);
  return newEntry;
}

export function updateMolarEntry(id: string, updates: Partial<MolarEntry>): void {
  const entries = getMolarEntries();
  const idx = entries.findIndex(e => e.id === id);
  if (idx !== -1) {
    entries[idx] = { ...entries[idx], ...updates };
    set(KEYS.molar, entries);
  }
}

export function deleteMolarEntry(id: string): void {
  const entries = getMolarEntries().filter(e => e.id !== id);
  set(KEYS.molar, entries);
}

// Notificações
export function getNotifications(): Notification[] {
  return get<Notification[]>(KEYS.notifications, []);
}

export function addNotification(notification: Notification): void {
  const notifications = getNotifications();
  notifications.unshift(notification);
  set(KEYS.notifications, notifications);
}

export function markNotificationRead(id: string): void {
  const notifications = getNotifications();
  const idx = notifications.findIndex(n => n.id === id);
  if (idx !== -1) {
    notifications[idx].read = true;
    set(KEYS.notifications, notifications);
  }
}

export function markAllNotificationsRead(): void {
  const notifications = getNotifications().map(n => ({ ...n, read: true }));
  set(KEYS.notifications, notifications);
}

export function getUnreadCount(): number {
  return getNotifications().filter(n => !n.read).length;
}

// Utilitários
function generateAccessCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Verificar se paciente preencheu hoje
export function hasPatientFilledToday(patientId: string): boolean {
  const today = new Date().toISOString().split('T')[0];
  const entries = getMolecularEntries(patientId);
  return entries.some(e => e.date === today);
}

// Estatísticas
export function getPatientStats(patientId: string) {
  const molecular = getMolecularEntries(patientId);
  const molar = getMolarEntries(patientId);

  const totalMolecular = molecular.length;
  const totalMolar = molar.length;

  const avgIntensity = totalMolecular > 0
    ? molecular.reduce((sum, e) => sum + e.emotionIntensity, 0) / totalMolecular
    : 0;

  // Últimos 7 dias
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);
  const recentEntries = molecular.filter(e => new Date(e.date) >= last7Days);
  const daysWithEntries = new Set(recentEntries.map(e => e.date)).size;

  // Frequência de funções do comportamento
  const functionCounts: Record<string, number> = {};
  molecular.forEach(e => {
    e.behaviorFunction.forEach(f => {
      functionCounts[f] = (functionCounts[f] || 0) + 1;
    });
  });

  // Intensidade ao longo do tempo
  const intensityOverTime = molecular
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(e => ({ date: e.date, intensity: e.emotionIntensity }));

  // Frequência ao longo do tempo
  const frequencyByDate: Record<string, number> = {};
  molecular.forEach(e => {
    frequencyByDate[e.date] = (frequencyByDate[e.date] || 0) + 1;
  });

  return {
    totalMolecular,
    totalMolar,
    avgIntensity,
    daysWithEntries,
    functionCounts,
    intensityOverTime,
    frequencyByDate,
    recentEntries,
  };
}

// Exportar dados
export function exportPatientData(patientId: string): string {
  const patient = getPatient(patientId);
  const molecular = getMolecularEntries(patientId);
  const molar = getMolarEntries(patientId);
  return JSON.stringify({ patient, molecular, molar }, null, 2);
}
