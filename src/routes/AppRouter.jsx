import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ParticipantLogin from '../pages/ParticipantLogin';
import ParticipantDashboard from '../pages/ParticipantDashboard';
import ReceivedFeedbacks from '../pages/ReceivedFeedbacks';
import SubmittedFeedbacks from '../pages/SubmittedFeedbacks';
import SubmitNewFeedback from '../pages/SubmitNewFeedback';
import AdminLogin from '../pages/AdminLogin';
import SingleEventDashboard from '../pages/SingleEventDashboard';
import AddParticipant from '../pages/AddParticipant';
import ParticipantDetails from '../pages/ParticipantDetails';
import SplashScreen from '../pages/splash';

import ProtectedParticipantRoute from './ProtectedParticipantRoute';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<SplashScreen />} />
      <Route path="/participants" element={<ParticipantLogin />} />
      <Route path="/admin" element={<AdminLogin />} />
      {/* Participant Routes */}
      <Route
        path="/participants/dashboard"
        element={
          <ProtectedParticipantRoute>
            <ParticipantDashboard />
          </ProtectedParticipantRoute>
        }
      />
      <Route
        path="/participants/submitted-feedbacks"
        element={
          <ProtectedParticipantRoute>
            <SubmittedFeedbacks />
          </ProtectedParticipantRoute>
        }
      />
      <Route
        path="/participants/received-feedbacks"
        element={
          <ProtectedParticipantRoute>
            <ReceivedFeedbacks />
          </ProtectedParticipantRoute>
        }
      />
      <Route
        path="/participants/submit-feedback"
        element={
          <ProtectedParticipantRoute>
            <SubmitNewFeedback />
          </ProtectedParticipantRoute>
        }
      />
      {/* Admin Routes */}
      <Route
        path="/admin/event"
        element={
          <ProtectedAdminRoute>
            <SingleEventDashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/add-participant"
        element={
          <ProtectedAdminRoute>
            <AddParticipant />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/events/participant/:participantId"
        element={
          <ProtectedAdminRoute>
            <ParticipantDetails />
          </ProtectedAdminRoute>
        }
      />
       {/* 404 route */}
       <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
