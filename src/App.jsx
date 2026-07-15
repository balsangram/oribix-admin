import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ConsoleLayout from './layouts/ConsoleLayout';
import ComingSoon from './pages/ComingSoon';
import VerifyOTP from './pages/VerifyOTP';
import DashboardView from './pages/dashboard/DashboardView';
import DemandHeatMapView from './pages/demandHeatMap/DemandHeatMapView';
import VendorsView from './pages/vendors/VendorsView';
import KYCLifeCycleView from './pages/kycLifeCycle/KYCLifeCycleView';
import CatalogView from './pages/Catalog/CatalogView';
import OrderView from './pages/order/OrderView';
import EwayBillView from './pages/ewayBill/EwayBillView';
import ReturnsView from './pages/returns /ReturnsView';
import CustomersView from './pages/customers/CustomersView';
import TostMessage from './components/basicComponents/TostMessage';

function App() {
  return (
    <BrowserRouter>
      <TostMessage />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Admin Console — nested under layout */}
        <Route path="/" element={<ConsoleLayout />}>

        {/* dashboard ============================================ */}

        <Route path="dashboard" element={<DashboardView />} />

{/* OrderPipeLineView ============== */}
          <Route path="demand-heat-map" element={<DemandHeatMapView/>} />


          <Route path="livemap" element={<ComingSoon />} />

          {/* VendorsView =================== */}
          <Route path="vendors" element={<VendorsView />} />
          {/* kyc ======================== */}
          <Route path="kyc" element={<KYCLifeCycleView />} />
          {/* Catalog ============================ */}
          <Route path="catalog" element={<CatalogView />} />
          {/* Order =================================== */}
          <Route path="orders" element={<OrderView />} />
          {/* eway =========================== */}
          <Route path="eway" element={<EwayBillView />} />
          {/* ========================ReturnsView */}
          <Route path="override" element={<ReturnsView />} />
          <Route path="logistics" element={<ComingSoon />} />
          {/* CustomersView ============================= */}
          <Route path="customers" element={<CustomersView />} />
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
