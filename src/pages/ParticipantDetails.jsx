import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams } from "react-router-dom";
import FeedbackCard from '../components/FeedbackCard';
import ParticipantDetailWidget from '../components/ParticipantDetailWidget'; // FeedbackCard already created
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { getParticipantDetails, listenToReceivedFeedback, listenToSubmittedFeedback } from '../services/dbService';
import DB from '../utils/helpers';

const ParticipantDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('received');
  const participantId = useParams().participantId; 
  const [receivedFeedbacks, setReceivedFeedbacks] = useState([]); // State to hold received feedbacks
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState([]); // State to hold received feedbacks
  const [participant, setParticipant] = useState(null);
  console.log(participantId);

  useEffect(() => {
    const fetchParticipantDetails = async () => {
      const data = await getParticipantDetails(participantId); // Fetch participant details using participantId
      setParticipant(data); // Update state with fetched data
    };

    fetchParticipantDetails();
  }, [participantId]);
  useEffect(() => {
    // Start listening to live updates for received feedback
    const unsubscribe = listenToReceivedFeedback(participantId, (feedbacks) => {
      setReceivedFeedbacks(feedbacks); // Update state with live feedbacks
    });
    // Clean up the listener on unmount
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    // Start listening to live updates for received feedback
    const unsubscribe = listenToSubmittedFeedback(participantId, (feedbacks) => {
      setSubmittedFeedbacks(feedbacks); // Update state with live feedbacks
    });
    // Clean up the listener on unmount
    return () => unsubscribe;
  }, []);

  const handleDelete= () => {
    DB.deleteParticipant(participantId);
    navigate(-1);
  }


  // Tab switching handler
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <Header title='Details'/>

      {/* ParticipantCard at the top */}
      <div className="container mx-auto ">
        <ParticipantDetailWidget
          name={participant? participant.name:"Loading..."}
          email={participant? participant.email:"Loading..."}
         onDelete={()=>handleDelete()}
        />
      </div>

      {/* Tabs Navbar */}
      <div className="flex justify-between border-b-2 border-gray-300 mb-4">
        <button
          className={`w-1/2 text-center py-3 ${activeTab === 'received' ? 'border-b-4 border-black text-black' : 'text-gray-500'}`}
          onClick={() => handleTabSwitch('received')}
        >
          {`Received (${receivedFeedbacks.length})` }
        </button>
        <button
          className={`w-1/2 text-center py-3 ${activeTab === 'submitted' ? 'border-b-4 border-black text-black' : 'text-gray-500'}`}
          onClick={() => handleTabSwitch('submitted')}
        >
          {`Submitted (${submittedFeedbacks.length})` }
        </button>
      </div>

      {/* Feedback List */}
      <div className="container mx-auto p-4">
        {activeTab === 'received' ? (
          <div className="transition-all duration-300 ease-in-out">
            {receivedFeedbacks.length > 0 ? (
              receivedFeedbacks.map((feedback) => (
                <FeedbackCard key={feedback.id} feedbackText={feedback.text} from={feedback.from} />
              ))
            ) : (
              <p className="text-gray-600">No feedback received yet.</p>
            )}
          </div>
        ) : (
          <div className="transition-all duration-300 ease-in-out">
            {submittedFeedbacks.length > 0 ? (
              submittedFeedbacks.map((feedback) => (
                <FeedbackCard key={feedback.id} feedbackText={feedback.text}  to={feedback.to} />
              ))
            ) : (
              <p className="text-gray-600">No feedback submitted yet.</p>
            )}
          </div>
        )}
      </div>
      <div className='flex fixed bottom-0 left-0 w-full'>
<Button props={{"text":"Close", onClick:()=>navigate(-1)}}/>
<p className='mr-1'></p>
<Button props={{"text":"Send Email"}}/>
      </div>
    </div>
  );
};

export default ParticipantDetails;
