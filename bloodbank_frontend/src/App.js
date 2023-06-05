import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home  from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/patient/dashboard';
import BloodRequest from './components/patient/bloodrequest';
import PatientBloodRequestHistory from './components/patient/bloodrequesthistory';
import DonorDashboard from './components/donor/dashboard';
import DonorBloodRequest from './components/donor/bloodrequest';
import DonorBloodRequestHistory from './components/donor/bloodrequesthistory';
import DonationRequest from './components/donor/donationrequest';
import DonationHistory from './components/donor/donationhistory';
import AdminLogin from './components/admin/adminlogin';
import AdminDashboard from './components/admin/admindashboard';
import DonorList from './components/admin/donorlist';
import PatientList from './components/admin/patientlist';
import AdminBloodRequest from './components/admin/adminbloodrequest';
import AdminBloodRequestHistory from './components/admin/adminbloodrequesthistory';
import BloodDonationList from './components/admin/adminblooddonatelist';
import Stockupdate from './components/admin/stockupdate';
import Testcom from './components/testcom';
import Calc from './components/Calc';
import Checkbox from './components/Checkbox';
import Sidedash from './components/Pages/Sidedash';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="login"  element={<Login />} />
          <Route path="signup"  element={<Signup />} />
          <Route path="patient/dashboard"  element={<Dashboard />} />
          <Route path="patient/blood/request"  element={<BloodRequest />} />
          <Route path="patient/blood/request/history"  element={<PatientBloodRequestHistory />} />

          <Route path="donor/dashboard"  element={<DonorDashboard />} />
          <Route path="donor/blood/request"  element={<DonorBloodRequest />} />
          <Route path="donor/blood/request/history"  element={<DonorBloodRequestHistory />} />
          <Route path="donor/blood/donation/request"  element={<DonationRequest />} />
          <Route path="donor/blood/donation/requesthistory"  element={<DonationHistory />} />

          <Route path="admin/login"  element={<AdminLogin />} />
          <Route path="admin/dashboard"  element={<AdminDashboard />} />
          <Route path="admin/donor/list"  element={<DonorList />} />
          <Route path="admin/patient/list"  element={<PatientList />} />
          <Route path="admin/blood/request/list"  element={<AdminBloodRequest />} />
          <Route path="admin/blood/request/history"  element={<AdminBloodRequestHistory />} />
          <Route path="admin/blood/donation/list"  element={<BloodDonationList />} />
          <Route path="admin/blood/stock/update"  element={<Stockupdate />} />
          <Route path="test" element={<Testcom />} />
          <Route path="calc" element={<Calc />} />
          <Route path="checkbox" element={<Checkbox />} />

          <Route path="sidedash" element={<Sidedash />} />
          
          


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
