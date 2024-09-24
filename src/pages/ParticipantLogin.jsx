import React, { useState, useContext, useEffect } from 'react';
import logo from "../assets/logo.png";

import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthContext';

import DB from '../utils/helpers';
import { getEventDetails } from '../services/dbService';
// import "../services/dbService";
// import { getEventDetailsById } from '../services/dbService';

const ParticipantLogin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const { participant, setParticipant } = useContext(AuthContext); // Auth context for managing participant data globally
  const [isEventEnded, setIsEventEnded] = useState(false); // State to track if the event is ended
  const [loading, setLoading] = useState(true); // State to track if the event details are loading
  
  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      const event = await getEventDetails(); // Fetch the event details
      if (event) {
        setIsEventEnded(event.isEnded); // Set the state based on the event's status
      }
      setLoading(false);
    };
    fetchEventDetails();
  }, []);
  
  // Validation function
  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = 'Full Name is required';
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    return errors;
  };

  
  
  // Handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Proceed to next step
      try {

        const participantData = await DB.addParticipant(name.trim(), email.trim().toLowerCase());
        if(!participantData){
          throw "Error@@@";
        } else {
        setParticipant(participantData);
        navigate('/participants/dashboard');
        }
      } catch (err){
        
        alert('An error occurred. Please try again.');
        console.error(err);
      }
      console.log('Form submitted: ', { name, email });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white px-8">
      <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img src={logo} alt="Logo" className="h-12" />
          
        </div>
        <h1 className="text-2xl text-center font-semibold">Leadership Program Feedback</h1>


        {/* Name Field */}
        {!isEventEnded && <div>
          <input
            type="text"
            className={`w-full p-3 border-2 rounded-none outline-none focus:border-black text-dark_grey border-yellow-500 ${
              errors.name ? 'border-red-500' : ''
            }`}
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading || isEventEnded}

          />
          {errors.name && (
            <p className="text-red-500 mt-1 text-sm">{errors.name}</p>
          )}
        </div>}

        {/* Email Field */}
        {!isEventEnded && <div>
          <input
    
            type="email"
            className={`w-full p-3 border-2 rounded-none outline-none focus:border-black text-dark_grey border-yellow-500 placeholder-dark_grey ${
              errors.email ? 'border-red-500' : ''
            }`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading || isEventEnded }
          />
          {errors.email && (
            <p className="text-red-500 mt-1 text-sm">{errors.email}</p>
          )}
        </div>}

        {/* Submit Button */}
        {(isEventEnded)? <p className="text-red-500 mt-1 text-lg text-center">Event Is Ended. Thank You For Participating.</p>:
          <Button props={{"text":"Proceed","type":"submit"}}/>}
        {/* <button
          type="submit"
          className="w-full bg-gray-900 text-white p-3 rounded-none"
          >
          Proceed
        </button> */}
      </form>
    </div>
  );
};

export default ParticipantLogin;
