import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import AuthForm from './components/AuthForm.jsx';
import MedicalRecordForm from './Components/MedicalRecordForm.jsx';

import Profile from './Components/Profile.jsx';
import EmergencyInfo from './Components/EmergencyInfo.jsx';
import DiseaseHistory from './Components/DeseaseHistory.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/medical-record" element={<MedicalRecordForm />} />
          <Route path="/emergency" element={<EmergencyInfo />} />
          <Route path="/deaseas-history" element={<DiseaseHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
