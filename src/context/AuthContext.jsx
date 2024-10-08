import React, { createContext, useState, useEffect } from 'react';
import { listenToEventDetails } from '../services/dbService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [participant, setParticipant] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [event, setEvent] = useState(null);

  // Store participant/admin in localStorage for session persistence
  useEffect(() => {
    const storedParticipant = localStorage.getItem('participant');
    const storedAdmin = localStorage.getItem('admin');
    const storedEvent = localStorage.getItem('event');
    
    if (storedParticipant) {
      setParticipant(JSON.parse(storedParticipant));
    }

    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }

    if (storedEvent) {
      setEvent(JSON.parse(storedEvent));
    }
  }, []);

  useEffect(() => {
    if (participant) {
      localStorage.setItem('participant', JSON.stringify(participant));
    } else {
      localStorage.removeItem('participant');
    }

    if (admin) {
      localStorage.setItem('admin', JSON.stringify(admin));
    } else {
      localStorage.removeItem('admin');
    }

    if (event) {
      localStorage.setItem('event', JSON.stringify(event));
    } else {
      localStorage.removeItem('event');
    }
  }, [participant, admin, event]);

  useEffect(() => {
      // Listen for real-time updates to fbSent for the logged-in participant
      const unsubscribe = listenToEventDetails((event) => {
          setEvent(event);  // Update state when new data is received
      });
      // Cleanup listener on component unmount
      return () => unsubscribe;
  }, [participant]);


  return (
    <AuthContext.Provider value={{ participant, setParticipant, admin, setAdmin, event, setEvent }}>
      {children}
    </AuthContext.Provider>
  );
};
