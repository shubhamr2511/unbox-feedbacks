import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';



const ParticipantDashboard = () => {
  // Mock data: Replace these with actual values from props or state
  const feedbackReceivedCount = 5;
  const feedbackSubmittedCount = 3;
  const navigate = useNavigate();

  // Handlers for button clicks
  const handleReceivedClick = () => {
    console.log('Received button clicked');
    navigate("/participants/recieved-feedbacks");
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

      <div className=" py-4">
        {/* Information about Feedback Received */}

        {/* Thick Black Line Separator */}

        {/* Information about Feedback Submitted */}
        <div className="mb-6 px-4">
          <p className="text-black mb-2">
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
          <Button props={{ "text": `Submitted (${feedbackSubmittedCount})`, "onClick": handleSubmittedClick }} />

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

          <Button props={{ "text": `Recieved (${feedbackReceivedCount})`, "onClick": handleReceivedClick }} />
        </div>
        <hr className="border-t-4 border-yellow-500 my-4" />
      </div>
      <div className='fixed bottom-0 left-0 w-full'>
        <Button props={{"text":"+ Give New Feedback", "onClick": ()=>navigate("/participants/submit-feedback")}}/>

      </div>
    </div>
  );
};

export default ParticipantDashboard;