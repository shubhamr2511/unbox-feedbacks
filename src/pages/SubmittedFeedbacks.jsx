
import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import SubmittedFeedbackCard from '../components/SubmittedFeedbackCard';

const SubmittedFeedbacks = () => {
    
    const data = [
        {
            "id":"sdasdsdfsd",
            "text":"This is an example feedback received.",
            "name":"John Doe",
        },
        {
            "id":"sdasddssdfsd",
            "text": "Great job on the project!",
            "name":"John Doe",
        },
        {
            "id":"sdasasadsdfsd",
            "text": "I really appreciate your dedication to ensure goals are met, but sometimes this has a negative effect on morale\nI think the team could really benefit from more structured meetings.",
            "name":"John Doe",
        }
         ];
    const navigate = useNavigate();
    return (
        <div className="bg-white min-h-screen">
                  <Header title='Submitted' />

        <div className="p-4">
        {data.map((feedback)=>{
            return <SubmittedFeedbackCard key={feedback.id} feedbackText={feedback.text} recipientName={feedback.name}></SubmittedFeedbackCard>
        })}
                <Button props={{"text":"+ Give New Feedback", "onClick": ()=>navigate("/participants/submit-feedback")}}/>


        </div>
        <div className='fixed bottom-0 left-0 w-full'>

        <Button props={{"text":"X Close", "onClick":
           ()=> navigate(-1)}}/>
        </div>
      </div>

    );
}

export default SubmittedFeedbacks