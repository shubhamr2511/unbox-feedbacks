import React from 'react';

const MyFeedbackCard = ({ feedback }) => {
  // console.log(feedback);
  return (
    <div>
      <div className='bg-yellow-400 px-4 py-2'>

        <strong>Feedback #{feedback.count + 1}</strong>
      </div>
      <div className="w-full bg-white shadow-lg  p-4 rounded-none mb-4">
        {/* <strong>Anonymous</strong> */}
        <p className="text-left ">
          <strong>{feedback?.questions?.q1?.question} </strong><br />
          {feedback?.questions?.q1?.answer}
        </p><br />
        <p className="text-left ">
          <strong>{feedback?.questions?.q2?.question} </strong><br />
          {feedback?.questions?.q2?.answer} </p>
        <br />
        <p className="text-left ">
          <strong>{feedback?.questions?.q3?.question} </strong><br />
          {feedback?.questions?.q3?.answer} </p>
      </div>
    </div>
  );
};

export default MyFeedbackCard;
