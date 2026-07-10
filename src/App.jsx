import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ConsoleLayout from './layouts/ConsoleLayout';
import MissionControl from './pages/MissionControl';
import ComingSoon from './pages/ComingSoon';
import VerifyOTP from './pages/VerifyOTP';
import DashboardView from './pages/dashboard/DashboardView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Admin Console — nested under layout */}
        <Route path="/" element={<ConsoleLayout />}>

        {/* dashboard ============================================ */}

        <Route path="dashboard" element={<DashboardView />} />



          <Route path="console" element={<MissionControl />} />
          {/* Placeholder routes for future pages */}
          <Route path="pipeline" element={<ComingSoon />} />
          <Route path="livemap" element={<ComingSoon />} />
          <Route path="vendors" element={<ComingSoon />} />
          <Route path="kyc" element={<ComingSoon />} />
          <Route path="catalog" element={<ComingSoon />} />
          <Route path="orders" element={<ComingSoon />} />
          <Route path="eway" element={<ComingSoon />} />
          <Route path="override" element={<ComingSoon />} />
          <Route path="logistics" element={<ComingSoon />} />
          <Route path="customers" element={<ComingSoon />} />
          <Route path="drivers" element={<ComingSoon />} />
          <Route path="support" element={<ComingSoon />} />
          <Route path="finance" element={<ComingSoon />} />
          <Route path="broadcasts" element={<ComingSoon />} />
          <Route path="promos" element={<ComingSoon />} />
          <Route path="users" element={<ComingSoon />} />
          <Route path="settings" element={<ComingSoon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
