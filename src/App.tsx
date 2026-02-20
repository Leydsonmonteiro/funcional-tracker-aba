import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PsychologistLogin from './pages/PsychologistLogin';
import PsychologistDashboard from './pages/PsychologistDashboard';
import PatientList from './pages/PatientList';
import PatientDetail from './pages/PatientDetail';
import MolarForm from './pages/MolarForm';
import PatientAccess from './pages/PatientAccess';
import PatientPortal from './pages/PatientPortal';
import PatientAnamnesis from './pages/PatientAnamnesis';
import PatientDiary from './pages/PatientDiary';
import PatientHistory from './pages/PatientHistory';
import NotificationsPage from './pages/NotificationsPage';
import AnalyticsPage from './pages/AnalyticsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/psicologo/login" element={<PsychologistLogin />} />
      <Route path="/psicologo/dashboard" element={<PsychologistDashboard />} />
      <Route path="/psicologo/pacientes" element={<PatientList />} />
      <Route path="/psicologo/paciente/:id" element={<PatientDetail />} />
      <Route path="/psicologo/paciente/:id/molar" element={<MolarForm />} />
      <Route path="/psicologo/paciente/:id/molar/:entryId" element={<MolarForm />} />
      <Route path="/psicologo/paciente/:id/analytics" element={<AnalyticsPage />} />
      <Route path="/psicologo/notificacoes" element={<NotificationsPage />} />
      <Route path="/paciente" element={<PatientAccess />} />
      <Route path="/paciente/:code" element={<PatientPortal />} />
      <Route path="/paciente/:code/anamnese" element={<PatientAnamnesis />} />
      <Route path="/paciente/:code/diario" element={<PatientDiary />} />
      <Route path="/paciente/:code/historico" element={<PatientHistory />} />
    </Routes>
  );
}
