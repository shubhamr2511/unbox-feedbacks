
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import SubmittedFeedbackCard from '../components/SubmittedFeedbackCard';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from '../context/AuthContext';
import { listenToSubmittedFeedback } from '../services/dbService';
import DB from '../utils/helpers';

const SubmittedFeedbacks = () => {
    const navigate = useNavigate();
    const { participant } = useContext(AuthContext); // Logged-in participant from context
    const [submittedFeedbacks, setSubmittedFeedbacks] = useState([]); // State to hold submitted feedbacks

    const location = useLocation();

    useEffect(() => {
        if (location.state?.feedbackSubmitted) {
        toast.success("Your feedback was submitted anonymously!");
          window.history.replaceState({}, document.title);
        }
    }, [location.state]);
    useEffect(() => {
        if (!participant) return;

        // Start listening to live updates for received feedback
        const unsubscribe = listenToSubmittedFeedback(participant.id, (feedbacks) => {
            setSubmittedFeedbacks(feedbacks); // Update state with live feedbacks
        });

        // Clean up the listener on unmount
        return () => unsubscribe;
    }, [participant]);

    

    const handleOnClick = (feedback) => {
        // DB.deleteFeedback(feedback);
        navigate("/participants/submit-feedback", { state: { feedbackData: feedback } });
    }
    return (
        <div className="bg-white min-h-screen">
            <Header title='Submitted' />
            <div className=" py-2 mb-8">

                <div className="p-4">
                    {submittedFeedbacks.length > 0 ? submittedFeedbacks.map((feedback) => {
                        return <SubmittedFeedbackCard key={feedback.id} feedback={feedback} onClick={() => handleOnClick(feedback)}></SubmittedFeedbackCard>
                    }) : <p className="text-gray-600 text-center m-6">No feedback submitted yet.</p>}
                    <Button props={{ "text": "+ Give New Feedback", "onClick": () => navigate("/participants/submit-feedback") }} />


                </div>
                <div className='fixed bottom-0 left-0 w-full'>

                    <Button props={{
                        "text": "X Close", bgColor: "bg-yellow-500", "onClick":
                            () => navigate(-1)
                    }} />
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
}

export default SubmittedFeedbacks