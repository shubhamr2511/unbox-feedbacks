import React from 'react';

const MyFeedbackCard = ({ feedbackText }) => {
  return (
    <div className="w-full bg-white shadow-lg border-l-4 border-yellow-400 p-4 rounded-none mb-4">
      <p className="text-left text-gray-900">
        {feedbackText}
      </p>
    </div>
  );
};

export default MyFeedbackCard;
