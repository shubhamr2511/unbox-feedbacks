
import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import MyFeedbackCard from '../components/MyFeedbackCard';
import { useNavigate } from 'react-router-dom';

const ReceivedFeedbacks = () => {
    
    const data = [
        "This is an example feedback received.",
        "Great job on the project!",
        "I really appreciate your dedication to ensure goals are met, but sometimes this has a negative effect on morale\nI think the team could really benefit from more structured meetings."
    ];
    const navigate = useNavigate();
    return (
        <div className="bg-white min-h-screen">
                  <Header title='Recieved' />

        <div className="p-4">
        {data.map((feedback)=>{
            return <MyFeedbackCard key={feedback} feedbackText={feedback}></MyFeedbackCard>
        })}
        </div>
        <div className='fixed bottom-0 left-0 w-full'>

        <Button props={{"text":"X Close", "onClick":
           ()=> navigate(-1)}}/>
        </div>
      </div>

    );
}

export default ReceivedFeedbacks