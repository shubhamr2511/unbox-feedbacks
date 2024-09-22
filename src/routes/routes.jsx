import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import ParticipantDashboard from '../pages/ParticipantDashboard.jsx';
import SubmitNewFeedback from '../pages/SubmitNewFeedback.jsx';
import AdminLogin from '../pages/AdminLogin.jsx';
import AdminEvents from '../pages/AdminEvents.jsx';
import SingleEventDashboard from '../pages/SingleEventDashboard.jsx';
import ParticipantDetails from '../pages/ParticipantDetails.jsx';
import SplashScreen from '../pages/splash.jsx';
import ParticipantLogin from '../pages/ParticipantLogin.jsx';
import ReceivedFeedbacks from '../pages/ReceivedFeedbacks.jsx';
import SubmittedFeedbacks from '../pages/SubmittedFeedbacks.jsx';
import AddParticipant from '../pages/AddParticipant.jsx';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Participant Routes */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/participants" element={<ParticipantLogin />} />
        <Route path="/participants/dashboard" element={<ParticipantDashboard />} />
        <Route path="/participants/submitted-feedbacks" element={< SubmittedFeedbacks/>} />
        <Route path="/participants/received-feedbacks" element={<ReceivedFeedbacks />} />

        <Route path="/participants/submit-feedback" element={<SubmitNewFeedback />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        {/* <Route path="/admin/events" element={<AdminEvents />} /> */}
        <Route path="/admin/event" element={<SingleEventDashboard />} />
        <Route path="/admin/add-participant" element={<AddParticipant/>}/>
        <Route path="/admin/events/participant/:participantId" element={<ParticipantDetails/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

// For protected routes

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import ParticipantLogin from '../pages/ParticipantLogin';
// import ParticipantDashboard from '../pages/ParticipantDashboard';
// import ReceivedFeedbacks from '../pages/ReceivedFeedbacks';
// import SubmittedFeedbacks from '../pages/SubmittedFeedbacks';
// import SubmitNewFeedback from '../pages/SubmitNewFeedback';
// import AdminLogin from '../pages/AdminLogin';
// import SingleEventDashboard from '../pages/SingleEventDashboard';
// import AddParticipant from '../pages/AddParticipant';
// import ParticipantDetails from '../pages/ParticipantDetails';
// import SplashScreen from '../pages/SplashScreen';

// import ProtectedParticipantRoute from './ProtectedParticipantRoute';
// import ProtectedAdminRoute from './ProtectedAdminRoute';

// const AppRouter = () => {
//   return (
//     <Routes>
//       {/* Participant Routes */}
//       <Route path="/" element={<SplashScreen />} />
//       <Route path="/participants" element={<ParticipantLogin />} />
      
//       <ProtectedParticipantRoute path="/participants/dashboard" element={<ParticipantDashboard />} />
//       <ProtectedParticipantRoute path="/participants/submitted-feedbacks" element={<SubmittedFeedbacks />} />
//       <ProtectedParticipantRoute path="/participants/received-feedbacks" element={<ReceivedFeedbacks />} />
//       <ProtectedParticipantRoute path="/participants/submit-feedback" element={<SubmitNewFeedback />} />

//       {/* Admin Routes */}
//       <Route path="/admin" element={<AdminLogin />} />
//       <ProtectedAdminRoute path="/admin/event" element={<SingleEventDashboard />} />
//       <ProtectedAdminRoute path="/admin/add-participant" element={<AddParticipant />} />
//       <ProtectedAdminRoute path="/admin/events/user/:userId" element={<ParticipantDetails />} />
//     </Routes>
//   );
// };

// export default AppRouter;
