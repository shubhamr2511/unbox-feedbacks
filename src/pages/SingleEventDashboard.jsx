import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import ParticipantCard from '../components/ParticipantCard';
import { AuthContext } from '../context/AuthContext';
import { getLiveParticipants, setEventStatus } from '../services/dbService';


function SingleEventDashboard() {
  // Mock participants data
  const navigate = useNavigate();
  const {event} = useContext(AuthContext);

  const [participants, setParticipants] = useState([
    // { id: 1, name: 'John Doe', email: 'john@example.com', submittedCount: 3, receivedCount: 5, emailSent: false },
    // { id: 2, name: 'Jane Smith', email: 'jane@example.com', submittedCount: 2, receivedCount: 4, emailSent: false },
    // { id: 3, name: 'Sam Wilson', email: 'sam@example.com', submittedCount: 1, receivedCount: 6, emailSent: false },
    // { id: 5, name: 'John Doe', email: 'john@example.com', submittedCount: 3, receivedCount: 5, emailSent: false },
    // { id: 6, name: 'Jane Smith', email: 'jane@example.com', submittedCount: 2, receivedCount: 4, emailSent: false },
    // { id: 7, name: 'Sam Wilson', email: 'sam@example.com', submittedCount: 1, receivedCount: 6, emailSent: false },

  ]);

  useEffect(() => {
    // Call the function to set up the real-time listener
    const unsubscribe = getLiveParticipants((liveParticipants) => {
      setParticipants(liveParticipants); // Update the state with the live participants' list
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
    setEventStatus(!event.isEnded);
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
            <Button props={{ "text": event.isEnded ? "Start Event" : "Stop Event", "onClick": () => handleStartEvent() }} />
          </span>
        </div>

        {/* Participants List */}
        <div className="space-y-4 mb-12">
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
        </div>
      </div>
      <div className='fixed bottom-0 left-0 w-full'>
        <Button props={{ "text": "+ Add New Participant", "onClick": () => navigate('/admin/add-participant') }} />
      </div>
    </div>
  );
}

export default SingleEventDashboard