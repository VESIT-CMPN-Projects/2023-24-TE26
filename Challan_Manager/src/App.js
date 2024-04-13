import './App.css';
import { Routes,Route } from 'react-router-dom';
import SearchLayout from './components/SearchLayout/SearchLayout';
import ChallanInfoCard from "./components/ChallanInfoCard/ChallanInfoCard"
import UploadProofCard from './components/UploadProofCard/UploadProofCard';
import ChallanVideoCard from './components/ChallanVideoCard/ChallanVideoCard';
import ViewChallanLayout from './components/ViewChallanLayout/ViewChallanLayout';
import ChallengeLayout from './components/ChallengeLayout/ChallengeLayout';
import ChallanForm from './components/Police/PoliceChallanForm/ChallanForm';
import PoliceDashboard from './components/Police/PoliceDashboard/PoliceDashboard';
import AdminLogin from './components/Admin/AdminLogin/AdminLogin';
import PoliceLogin from './components/Police/PoliceLogin/PoliceLogin';
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard';
import VehicleDetailsAdmin from './components/Admin/VehicleDetailsAdmin/VehicleDetailsAdmin';
import { PrivacyPolicy } from './components/PrivacyPolicy';

function App() {
  return (
      <Routes>
        <Route path = '/' element = {<SearchLayout/>}/>
        <Route path = '/challan' element = {<ChallanInfoCard/>}/>
        <Route path = '/upload' element = {<UploadProofCard/>}/>
        <Route path = '/privacy_policy' element = {<PrivacyPolicy/>}/>
        <Route path = '/video' element = {<ChallanVideoCard/>}/>
        <Route path = '/view' element = {<ViewChallanLayout/>}/>
        <Route path = '/view/:vehicleno' element = {<VehicleDetailsAdmin/>}/>
        <Route path = '/challenge' element = {<ChallengeLayout/>}/>
        <Route path = '/police/dashboard' element = {<PoliceDashboard/>}/>
        <Route path='/police/dashboard/challanform/:vehicle_no' element = {<ChallanForm/>}/>
        <Route path = '/police' element = {<PoliceLogin/>}/>
        <Route path = '/admin' element={<AdminLogin/>}/>
        <Route path = '/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path = '/admin/dashboard/:vehicleno' element={<VehicleDetailsAdmin/>}/>
      </Routes>
    
  );
}

export default App;
