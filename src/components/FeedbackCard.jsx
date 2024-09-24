import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai'; // Assuming you're using react-icons for the delete icon
import Button from './Button';

const FeedbackCard = ({ feedback: feedback, recieved=true, onDelete = () => { console.log("onDelete") } }) => {
  //   const [showPopup, setShowPopup] = useState(false); // State to manage the popup

  const handleDeleteClick = () => {
    // setShowPopup(true);
    onDelete();
  };

  const handleConfirmDelete = () => {
    // setShowPopup(false);
    onDelete(); // Call the delete function passed as prop
  };

  const handleCancelDelete = () => {
    // setShowPopup(false);
  };

  return (
    <div>
<div className="flex justify-between items-center  py-2 px-4 bg-yellow-400">
<div>
            {!recieved && <div className='flex'>
              <p className="text-sm  mr-1">Sent to</p>
              <strong className="text-sm ">{feedback.to.name}</strong>
            </div>
            }
            {
              recieved && <div className='flex'>
                <p className="text-sm mr-1">From</p>
                <strong className="text-sm ">{feedback.from.name}</strong>
              </div>
            }
          </div>

        {/* Delete icon at bottom right */}
        
      </div>
      <div className="w-full bg-white shadow-lg p-4 rounded-none mb-4 relative">
        <p className="text-left ">
          <strong>Q1. {feedback?.questions?.q1?.question} </strong><br />
          {feedback?.questions?.q1?.answer}
        </p><br />
        <p className="text-left ">
          <strong>Q2. {feedback?.questions?.q2?.question} </strong><br />
          {feedback?.questions?.q2?.answer} </p>
        <br />
        <p className="text-left ">
          <strong>Q3. {feedback?.questions?.q3?.question} </strong><br />
          {feedback?.questions?.q3?.answer} </p>
        {/* Small text at bottom left with recipient name */}
        <div className="flex justify-between items-center mt-4">
         

        </div>


      </div>
    </div>
  );
};

export default FeedbackCard;
