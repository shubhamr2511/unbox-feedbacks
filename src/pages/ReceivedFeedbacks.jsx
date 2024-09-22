
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import MyFeedbackCard from '../components/MyFeedbackCard';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { listenToReceivedFeedback } from '../services/dbService';

const ReceivedFeedbacks = () => {
    const navigate = useNavigate();
    const { participant } = useContext(AuthContext); // Logged-in participant from context
    const [receivedFeedbacks, setReceivedFeedbacks] = useState([]); // State to hold received feedbacks


    useEffect(() => {
        if (!participant) return;
    
        // Start listening to live updates for received feedback
        const unsubscribe = listenToReceivedFeedback(participant.id, (feedbacks) => {
          setReceivedFeedbacks(feedbacks); // Update state with live feedbacks
        });
    
        // Clean up the listener on unmount
        return () => unsubscribe;
      }, [participant]);

    return (
        <div className="bg-white min-h-screen">
            <Header title='Received' />

            <div className="p-4">
                {receivedFeedbacks.length>0? receivedFeedbacks.map((feedback) => {
                    return <MyFeedbackCard key={feedback.id} feedbackText={feedback.text}></MyFeedbackCard>
                }):<p className="text-gray-600 w-full text-center mt-6">No feedback received yet.</p>}
            </div>
            <div className='fixed bottom-0 left-0 w-full'>

                <Button props={{
                    "text": "X Close", "onClick":
                        () => navigate(-1)
                }} />
            </div>
        </div>

    );
}

export default ReceivedFeedbacks