import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import ParticipantDashboard from './pages/ParticipantDashboard.jsx';
import SubmitNewFeedback from './pages/SubmitNewFeedback.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminEvents from './pages/AdminEvents.jsx';
import SingleEventDashboard from './pages/SingleEventDashboard.jsx';
import ParticipantDetails from './pages/ParticipantDetails.jsx';
import SplashScreen from './pages/splash.jsx';
import ParticipantLogin from './pages/ParticipantLogin.jsx';
import ReceivedFeedbacks from './pages/RecievedFeedbacks.jsx';
import SubmittedFeedbacks from './pages/SubmittedFeedbacks.jsx';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Participant Routes */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/participants" element={<ParticipantLogin />} />
        <Route path="/participants/dashboard" element={<ParticipantDashboard />} />
        <Route path="/participants/submitted-feedbacks" element={< SubmittedFeedbacks/>} />
        <Route path="/participants/recieved-feedbacks" element={<ReceivedFeedbacks />} />

        <Route path="/participants/submit-feedback" element={<SubmitNewFeedback />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        {/* <Route path="/admin/events" element={<AdminEvents />} /> */}
        <Route path="/admin/event/" element={<SingleEventDashboard />} />
        <Route path="/admin/events/user/:userId" element={<ParticipantDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
