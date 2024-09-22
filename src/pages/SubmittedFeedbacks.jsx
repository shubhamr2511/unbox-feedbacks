
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import SubmittedFeedbackCard from '../components/SubmittedFeedbackCard';

import { AuthContext } from '../context/AuthContext';
import { listenToSubmittedFeedback } from '../services/dbService';
import DB from '../utils/helpers';

const SubmittedFeedbacks = () => {
    const navigate = useNavigate();
    const { participant } = useContext(AuthContext); // Logged-in participant from context
    const [submittedFeedbacks, setSubmittedFeedbacks] = useState([]); // State to hold submitted feedbacks

    useEffect(() => {
        if (!participant) return;
    
        // Start listening to live updates for received feedback
        const unsubscribe = listenToSubmittedFeedback(participant.id, (feedbacks) => {
            setSubmittedFeedbacks(feedbacks); // Update state with live feedbacks
        });
    
        // Clean up the listener on unmount
        return () => unsubscribe;
      }, [participant]);

      const handleDelete = (feedback) => {
        DB.deleteFeedback(feedback);
      }

    const data = [
        {
            "id":"sdasdsdfsd",
            "text":"This is an example feedback received.",
            "name":"John Doe",
        },
        {
            "id":"sdasddssdfsd",
            "text": "Great job on the project!",
            "name":"John Doe",
        },
        {
            "id":"sdasasadsdfsd",
            "text": "I really appreciate your dedication to ensure goals are met, but sometimes this has a negative effect on morale\nI think the team could really benefit from more structured meetings.",
            "name":"John Doe",
        }
         ];
    return (
        <div className="bg-white min-h-screen">
                  <Header title='Submitted' />

        <div className="p-4">
        {submittedFeedbacks.length>0? submittedFeedbacks.map((feedback)=>{
            return <SubmittedFeedbackCard key={feedback.id} feedbackText={feedback.text} recipientName={feedback.to.name} onDelete={()=>handleDelete(feedback)}></SubmittedFeedbackCard>
        }):<p className="text-gray-600 text-center m-6">No feedback submitted yet.</p>}
                <Button props={{"text":"+ Give New Feedback", "onClick": ()=>navigate("/participants/submit-feedback")}}/>


        </div>
        <div className='fixed bottom-0 left-0 w-full'>

        <Button props={{"text":"X Close", "onClick":
           ()=> navigate(-1)}}/>
        </div>
      </div>

    );
}

export default SubmittedFeedbacks