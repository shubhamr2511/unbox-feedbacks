import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { listenToEvents, setEventId, setEventStatus } from '../services/dbService';

import EventCard from '../components/EventCard';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  function onCreateNew() {
    navigate("/admin/add-event");
  }
  const onToggleEvent = (id) => {
    if (window.confirm(`Do you want to ${event.isEnded ? "Start" : "Stop"} the Event?`)) {

      setEventStatus(!event.isEnded);
    }
  };
  function onDeleteEvent(id) {

  }

  useEffect(() => {
    const unsubscribe = listenToEvents((eventsData) => {
      if (eventsData) {
        setEvents(eventsData);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };


  }, []);



  return (
    <div>
      {/* Header */}
      <Header></Header>
      <div className='container mx-auto p-4'>

        <header className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Events</h1>
          <button
            onClick={onCreateNew}
            className="bg-green-500 text-white text-xl px-4 py-2 rounded-xl"
          >
            Create New
          </button>
        </header>

        {/* List of Events */}
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default EventListPage;
