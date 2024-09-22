import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai'; // Assuming you're using react-icons for the delete icon
import Button from './Button';

const FeedbackCard = ({ feedbackText, from=undefined, to=undefined, onDelete = () => { console.log("onDelete") } }) => {
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
        <div className="w-full bg-white shadow-lg border-l-4 border-yellow-400 p-4 rounded-none mb-4 relative">
            <p className="text-left text-gray-900">
                {feedbackText}
            </p>

            {/* Small text at bottom left with recipient name */}
            <div className="flex justify-between items-center mt-4">
                <div>
                 {to && <div className='flex'>
                    <p className="text-sm text-gray-500 mr-1">Sent to</p>
                    <strong className="text-sm text-gray-700">{to.name}</strong>
                    </div>
                    }
                    {
                      from &&  <div className='flex'>
                     <p className="text-sm text-gray-500 mr-1">From</p>
                    <strong className="text-sm text-gray-700">{from.name}</strong>
                    </div>
                    }
                    </div>

                {/* Delete icon at bottom right */}
                {/* <AiFillDelete 
          className="text-red-500 hover:text-red-500 cursor-pointer"
          size={24}
          onClick={handleDeleteClick}
        /> */}
            </div>

            {/* Confirmation popup for delete */}
            {/* {showPopup && (
        <div className="absolute top-0 left-0 w-full h-full bg-white flex items-center justify-center">
          <div className="bg-white p-4 rounded-none">
            <p className="mb-4 text-center">Are you sure?</p>
            <div className="flex justify-around">
              <Button props={{"onClick":handleConfirmDelete, "text":"Yes"}}/>
              <Button props={{"onClick":handleCancelDelete, "text":"No"}}/>
            </div>
          </div>
        </div>
      )} */}
        </div>
    );
};

export default FeedbackCard;
