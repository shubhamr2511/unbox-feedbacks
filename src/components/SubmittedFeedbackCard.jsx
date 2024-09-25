import React, { useState } from 'react';
import { GrEdit } from 'react-icons/gr'; // Assuming you're using react-icons for the delete icon
import Button from './Button';

const SubmittedFeedbackCard = ({ feedback, onClick: onClick = () => { console.log("onClick SubmittedFeedback") } }) => {
  //   const [showPopup, setShowPopup] = useState(false); // State to manage the popup

  const handleDeleteClick = () => {
    // setShowPopup(true);
    onClick();
  };

  const handleConfirmDelete = () => {
    // setShowPopup(false);
    onClick(); // Call the delete function passed as prop
  };

  const handleCancelDelete = () => {
    // setShowPopup(false);
  };

  return (
    <div >
      <div className="flex justify-between items-center  py-4 px-4 bg-yellow-400 rounded-t-2xl">
        <div>
          <p className="text-sm">Anonymously Sent to</p>
          <strong className="text-sm ">{feedback.to.name}</strong>
        </div>

        {/* Delete icon at bottom right */}
        <GrEdit
          className="text-black cursor-pointer"
          size={24}
          onClick={handleDeleteClick}
        />
      </div>
      <div className="w-full bg-white shadow-lg  p-4 rounded-none mb-4 relative rounded-b-2xl">
        <p className="text-left ">
          <strong>Stone: {feedback?.questions?.q1?.question} </strong><br />
          {feedback?.questions?.q1?.answer}
        </p><br/>
        <p className="text-left ">
          <strong>Feather: {feedback?.questions?.q2?.question} </strong><br />
          {feedback?.questions?.q2?.answer} </p>
        <br />
        <p className="text-left ">
          <strong>Ladder: {feedback?.questions?.q3?.question} </strong><br />
          {feedback?.questions?.q3?.answer} </p>
      </div>
    </div>
  );
};

export default SubmittedFeedbackCard;
