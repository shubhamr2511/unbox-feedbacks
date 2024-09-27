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

  const navigate = useNavigate();
  const { participant, setParticipant } = useContext(AuthContext);


  const location = useLocation();

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
    const handleBackButton = (event) => {
      event.preventDefault();
      const confirmed = window.confirm("Are you sure you want to go back?");
      if (confirmed) {
        navigate(-1); // Proceed with the back action
      }
    };
    // Listen for popstate event to detect browser back button press
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

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
        console.log(data);
        if (data) { setParticipant(data) };  // Update state when new data is received
      });

      // Cleanup listener on component unmount
      return () => unsubscribe;
    }
  }, []);
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
          <p className="text-black mb-2 mt-10 text-center">
          </p>
          <p className='text-gray-800 text-2xl text-center font-extrabold'>
            Welcome {participant.name} !
          </p>
          <br /><br />
          <p className='text-xl text-center font-extrabold'>
            Thank you for contributing to the FeedFWD process! <br /> <br />
            Your insights help foster a collaborative and supportive environment.
          </p>
          <br />
          <br />

          <p className='text-green-600 text-center'>
            (Remember, your feedback is anonymous.)
          </p >
          <Button props={{ "text": "+ Create New Feedback", textSize: "text-2xl", textColor: "text-white", bgColor: "bg-green-500", "onClick": () => navigate("/participants/submit-feedback") }} />

        </div>

        <div className=" flex mb-6 mt-16 px-4">

          <Button props={{ "text": `Submitted (${participant.fbSent ?? 0})`, "onClick": handleSubmittedClick }} />
          <div className='w-4'></div>
          <Button props={{ "text": `Received (${participant.fbReceived ?? 0})`, "onClick": handleReceivedClick }} />
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
      <div className='fixed bottom-0 left-0 w-full'>

      </div>
    </div>
  );
};

export default ParticipantDashboard;