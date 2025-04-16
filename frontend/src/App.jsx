import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AuthForm from './components/AuthForm';
import MedicalRecordForm from './Components/MedicalRecordForm';

import Profile from './Components/Profile';
import EmergencyInfo from './Components/EmergencyInfo';
import DiseaseHistory from './Components/DeseaseHistory';

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
