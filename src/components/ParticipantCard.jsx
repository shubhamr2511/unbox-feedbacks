import React from 'react';
import { FaPaperPlane, FaInbox } from 'react-icons/fa'; // For email, sent, and received icons
import { FiMail, FiCheck } from 'react-icons/fi'; // Import icons

const ParticipantCard = ({ name, email, submittedCount, receivedCount, onEmailClick, emailSent, }) => {
  return (
    <div className="w-full bg-white shadow-lg border-l-4 border-yellow-400 p-4 rounded-none mb-4">
      {/* Participant Name and Email Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-left text-lg font-bold text-gray-900">{name}</h2>
          <p className="text-left text-gray-700 text-sm">{email}</p>
        </div>
        
        
      </div>

      {/* Feedback Counts Row */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <FaPaperPlane className="text-gray-700 mr-2" />
          <span className="text-gray-700">Submitted: {submittedCount}</span>
        </div>
        <div className="flex items-center">
          <FaInbox className="text-gray-700 mr-2" />
          <span className="text-gray-700">Received: {receivedCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ParticipantCard;
