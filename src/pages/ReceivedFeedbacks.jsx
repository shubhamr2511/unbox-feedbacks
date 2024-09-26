
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
        const handleBeforeUnload = (event) => {
          const confirmationMessage = "Are you sure you want to leave this page?";
          event.returnValue = confirmationMessage; // Standard for most browsers
          return confirmationMessage; // For older browsers
        };
    
        window.addEventListener("beforeunload", handleBeforeUnload);
    
        return () => {
          window.removeEventListener("beforeunload", handleBeforeUnload);
        };
      }, []);

    useEffect(() => {
        if (!participant) return;

        // Start listening to live updates for received feedback
        const unsubscribe = listenToReceivedFeedback(participant.id, (feedbacks) => {
            for (let i = 0; i < feedbacks.length; i++) {
                feedbacks[i] = { count: i, ...feedbacks[i] };
            }
            setReceivedFeedbacks(feedbacks); // Update state with live feedbacks
        });


        // Clean up the listener on unmount
        return () => unsubscribe;
    }, [participant]);

    return (
        <div className="bg-white min-h-screen">
            <Header title='Received' />

            <div className="p-4 mb-20">
                {receivedFeedbacks.length > 0 ? receivedFeedbacks.map((feedback) => {
                    return <MyFeedbackCard key={feedback.id} feedback={feedback}></MyFeedbackCard>
                }) : <p className="text-gray-600 w-full text-center mt-6">No feedback received yet.</p>}
            </div>
            <div className='fixed bottom-0 left-0 w-full p-4 bg-white'>

                <Button props={{
                    "text": "X Close", "onClick":
                        () => navigate(-1), bgColor: "bg-yellow-500"
                }} />
            </div>
        </div>

    );
}

export default ReceivedFeedbacks