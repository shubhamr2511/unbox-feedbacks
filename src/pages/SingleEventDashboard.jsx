import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import ParticipantCard from '../components/ParticipantCard';
import { AuthContext } from '../context/AuthContext';
import { getLiveParticipants, setEventStatus } from '../services/dbService';
import DownloadCSV from '../components/DownloadCSV';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function SingleEventDashboard() {
  // Mock participants data
  const navigate = useNavigate();
  const {event} = useContext(AuthContext);

  const [participants, setParticipants] = useState([

  ]);

  const location = useLocation();



  useEffect(() => {
    if (location.state?.participantAdded) {
      toast.success("New Participant Added Successfully!");
      window.history.replaceState({}, document.title);
    }
   
  }, [location.state]);


  useEffect(() => {
    // Call the function to set up the real-time listener
    const unsubscribe = getLiveParticipants((liveParticipants) => {
      if (liveParticipants) {
        // Sort feedbacks alphabetically by sender's name
        const sortedliveParticipants = liveParticipants.sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        setParticipants(sortedliveParticipants); // Update the state with the live participants' list
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  // Event handler for emailing a participant
  const handleEmailClick = (participantId) => {
    // console.log("Send email");
    // Update the participants list, setting emailSent to true for the selected participant
    let temp = [...participants];
    for (let i = 0; i < temp.length; i++) {
      // console.log(temp[i].id);
      if (temp[i].id == participantId) {
        temp[i].emailSent = true;
        console.log(temp[i].name);
      }
    }

    setParticipants(temp);

    // setParticipants((prevParticipants) =>
    //   prevParticipants.map((participant) =>
    //     participant.id === participantId
    //       ? { ...participant, emailSent: true }
    //       : participant
    //   )
    // );
  };


  // Add cool down time
  const handleStartEvent = () => {
    if (window.confirm(`Do you want to ${event.isEnded?"Start":"Stop"} the Event?`)) {

      setEventStatus(!event.isEnded);
    }
  };
  // Participant count
  const participantCount = participants.length;

  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <Header title='Admin' />

      {/* Page Content */}
      <div className="container mx-auto p-4">
        {/* Participants Section */}
        <div className='flex items-baseline justify-between mb-6'>
          <h2 className="text-xl font-bold  text-gray-900">{`Participants (${event.participantCount})`}</h2>
          <span>
            <Button props={{ "text": event.isEnded ? "Start Event" : "Stop Event", bgColor: event.isEnded? "bg-green-500":"bg-red-500", "onClick": () => handleStartEvent() }} />
          </span>
        </div>
      {participants.length>0 &&  <DownloadCSV/>}
        {/* Participants List */}
       {participants.length>0? <div className="space-y-4 mb-12">
          {participants.map((participant) => (
            <div key={participant.id} onClick={() => navigate(`/admin/events/participant/${participant.id}`)}>
              <ParticipantCard
                name={participant.name}
                email={participant.email}
                submittedCount={participant.fbSent}
                receivedCount={participant.fbReceived}
                onEmailClick={() => handleEmailClick(participant.id)}
              />
            </div>
          ))}
        </div>:
        <div className='text-center mt-16'>
          No Participants Yet...
          </div>}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <div className='fixed bottom-0 left-0 w-full'>
        <Button props={{ "text": "+ Add New Participant", bgColor:"bg-yellow-500", "onClick": () => navigate('/admin/add-participant') }} />
      </div>
    </div>
  );
}

export default SingleEventDashboard