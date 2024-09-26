import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { listenToEventDetails } from '../services/dbService';

const ProtectedParticipantRoute = ({ children }) => {
  const { event, setEvent, participant } = useContext(AuthContext);

  // useEffect(() => {
  //   if (participant) {
  //     // Listen for real-time updates to fbSent for the logged-in participant
  //     const unsubscribe = listenToEventDetails((event) => {
        

  //         setEvent(event);  // Update state when new data is received
  //     });

  //     // Cleanup listener on component unmount
  //     return () => unsubscribe;
  //   }
  // }, [participant]);

  
  if (!participant) {
    return <Navigate to="/participants" />;
  }

  // console.log(event?.name);
  if (event?.isEnded) {
    return <Navigate to="/participants" />;
  }

  return children;
};

export default ProtectedParticipantRoute;
