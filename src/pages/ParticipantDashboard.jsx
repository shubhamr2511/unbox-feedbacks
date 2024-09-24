import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { listenToParticipantDetails, updateFeedbackReceivedCount, updateFeedbackSentCount } from '../services/dbService';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const ParticipantDashboard = () => {
  // Mock data: Replace these with actual values from props or state
  const feedbackReceivedCount = 5;
  const feedbackSubmittedCount = 3;
  const navigate = useNavigate();
  const {participant, setParticipant} = useContext(AuthContext);
  

  const location = useLocation();



  useEffect(() => {
    if (location.state?.feedbackSubmitted) {
      toast.success("Your feedback was submitted anonymously!");
      window.history.replaceState({}, document.title);
    }
    if (location.state?.feedbackDeleted) {
      toast.success("Your feedback was Deleted!");
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (participant) {
      // Listen for real-time updates to fbSent for the logged-in participant
      const unsubscribe = listenToParticipantDetails(participant.id, (data) => {
        setParticipant(data);  // Update state when new data is received
      });

      // Cleanup listener on component unmount
      return () => unsubscribe;
    }
  }, [participant]);
  // Handlers for button clicks
  const handleReceivedClick = () => {
    console.log('Received button clicked');
    navigate("/participants/received-feedbacks");
    // Add logic to navigate or perform any action
  };
  
  const handleSubmittedClick = () => {
    navigate("/participants/submitted-feedbacks");
    console.log('Submitted button clicked');
    // Add logic to navigate or perform any action
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Component */}
      <Header title='Dashboard' />

      <div className=" py-6 mb-4">
        {/* Information about Feedback Received */}

        {/* Thick Black Line Separator */}

        {/* Information about Feedback Submitted */}
        <div className="mb-6 px-4">
          <p className="text-black mb-2">
          <strong>
              Welcome {participant.name} !
              </strong>
<br/><br/>
            <strong>
              Thank you for contributing to the feedback process! Your insights help foster a collaborative and supportive environment.
            </strong>
            <br />
            <br />You can view the feedback you've submitted here. Click on the 'Submitted' button to see the feedback you've provided to others<br />
            
            <br />
            <strong>
              Remember, your feedback is anonymous.
            </strong>
          </p>
          <Button props={{ "text": `Submitted (${participant.fbSent??0})`, "onClick": handleSubmittedClick }} />

        </div>
        <hr className="border-t-4 border-yellow-500 my-4" />

        <div className="mb-6 px-4">
          <p className="text-black mb-2">
            <strong>
              You've received feedback from your peers, designed to help you grow and improve.
            </strong>
            <br />
            <br />
            Click on the 'Received' button to view the anonymous feedback provided by others. Use this constructive feedback to reflect on your strengths and areas for improvements.
            <br />
            <br />

          </p>

          <Button props={{ "text": `Received (${participant.fbReceived??0})`, "onClick": handleReceivedClick }} />
        </div>
        <hr className="border-t-4 border-yellow-500 my-4" />
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
        <Button props={{"text":"+ Give New Feedback",bgColor:"bg-yellow-500", "onClick": ()=>navigate("/participants/submit-feedback")}}/>

      </div>
    </div>
  );
};

export default ParticipantDashboard;