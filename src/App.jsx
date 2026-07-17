import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ConsoleLayout from './layouts/ConsoleLayout';
import ComingSoon from './pages/ComingSoon';
import VerifyOTP from './pages/VerifyOTP';
import DashboardView from './pages/dashboard/DashboardView';
import DemandHeatMapView from './pages/demandHeatMap/DemandHeatMapView';
import VendorsView from './pages/vendors/VendorsView';
import KYCLifeCycleView from './pages/kycLifeCycle/KYCLifeCycleView';
import KYCLifeCycleFullDetails from './pages/kycLifeCycle/KYCLifeCycleFullDetails';
import CatalogView from './pages/Catalog/CatalogView';
import OrderView from './pages/order/OrderView';
import EwayBillView from './pages/ewayBill/EwayBillView';
import ReturnsView from './pages/returns /ReturnsView';
import CustomersView from './pages/customers/CustomersView';
import TostMessage from './components/basicComponents/TostMessage';
import LiveMapView from './pages/liveMap/LiveMapView';
import DriversView from './pages/drivers/DriversView';
import SettingView from './pages/setting/SettingView';
import SupportView from './pages/ Support/SupportView';
import BroadcastsView from './pages/broadcasts/BroadcastsView';
import ReferralsView from './pages/referrals/ReferralsView';
import UserManagementView from './pages/userManagement/UserManagementView';
import FinanceView from './pages/finance/FinanceView';

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


          <Route path="livemap" element={<LiveMapView />} />

          {/* VendorsView =================== */}
          <Route path="vendors" element={<VendorsView />} />
          {/* kyc ======================== */}
          <Route path="kyc" element={<KYCLifeCycleView />} />
          <Route path="kyc-full-details/:id" element={<KYCLifeCycleFullDetails />} />
          {/* Catalog ============================ */}
          <Route path="catalog" element={<CatalogView />} />
          {/* Order =================================== */}
          <Route path="orders" element={<OrderView />} />
          {/* eway =========================== */}
          <Route path="eway" element={<EwayBillView />} />
          {/* ========================ReturnsView */}
          <Route path="return" element={<ReturnsView />} />

          <Route path="logistics" element={<ComingSoon />} />
          {/* CustomersView ============================= */}
          <Route path="customers" element={<CustomersView />} />
          {/* drivers =================================== */}
          <Route path="drivers" element={<DriversView />} />
          {/* Support ============================ */}
          <Route path="support" element={<SupportView />} />

          <Route path="finance" element={<FinanceView />} />
          {/* broadcasts ========================== */}
          <Route path="broadcasts" element={<BroadcastsView />} />
          {/* referrals ============================ */}
          <Route path="promos" element={<ReferralsView />} />
          {/* userManagementView =========================== */}
          <Route path="users" element={<UserManagementView />} />
          <Route path="settings" element={<SettingView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
