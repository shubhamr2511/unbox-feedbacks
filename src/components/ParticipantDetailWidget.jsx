import React from 'react';
import { FaPaperPlane, FaInbox } from 'react-icons/fa'; // For email, sent, and received icons
import { FiMail, FiCheck, FiDelete, FiTrash, FiTrash2 } from 'react-icons/fi'; // Import icons

const ParticipantDetailWidget = ({ name, email, onDelete }) => {
  return (
      <div className="flex w-full p-4 justify-between items-center">
        <div>
          <h2 className="text-left text-lg font-bold text-gray-900">{name}</h2>
          <p className="text-left text-gray-700">{email}</p>
        </div>   
                <FiTrash2 onClick={onDelete} className="mr-2 size-6" />
        
      </div>
  );
};

export default ParticipantDetailWidget;
