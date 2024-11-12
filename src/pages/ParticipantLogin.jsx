import React, { useState, useContext, useEffect } from 'react';
import fflogo from "../assets/fflogo.png";
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthContext';

import {DB} from '../utils/helpers';
import { getEventDetails } from '../services/dbService';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../services/dbService";
// import { getEventDetailsById } from '../services/dbService';

const ParticipantLogin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
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
    if (!code) errors.code = '4-digit Code is required';
    return errors;
  };

  
  
  // Handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Proceed to next step
      try {

        const participantData = await DB.loginParticipant(name.trim(), code.trim());
        if(!participantData){
          toast.error("Invalid Credentials!")
        } else {
        setParticipant(participantData);
        navigate('/participants/dashboard');
        }
      } catch (err){
        
        alert('An error occurred. Please try again.');
        console.error(err);
      }
      console.log('Form submitted: ', { name, code });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white px-8">
      <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img src={logo} alt="Logo" className="h-10 " />
          
        </div>
        <div className="flex justify-center mb-12">
          <img src={fflogo} alt="Logo" className="h-10 " />
          
        </div>
        <div className='h-4'>

        </div>
        {/* <h1 className="text-2xl text-center font-semibold">Leadership Program Feedback</h1> */}


        {/* Name Field */}
        {!isEventEnded && <div>
          <input
            type="text"
            className={`w-full p-5 border-2 rounded-2xl outline-none focus:border-black border-yellow-500 ${
              errors.name ? 'border-red-500' : ''
            }`}
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading || isEventEnded}

          />
          {errors.name && (
            <p className="text-red-500 mt-1 text-sm">{errors.name}</p>
          )}
        </div>}

        {/* Code Field */}
        {!isEventEnded && <div>
          <input
            type="text"
            maxLength="6"
            className={`w-full p-5 border-2 rounded-2xl outline-none 
              // pattern="[0-9]*"
               focus:border-black border-yellow-500  ${
              errors.code ? 'border-red-500' : ''
            }`}
            
            placeholder="6-digit Code"
            value={code}
            onChange={(e) => {
              // e.target.value = e.target.value.replace(/\D/g, '');
              return setCode(e.target.value);
            }}
            disabled={loading || isEventEnded }
          />
          {errors.code && (
            <p className="text-red-500 mt-1 text-sm">{errors.code}</p>
          )}
        </div>}

        {/* Submit Button */}
        {(isEventEnded)? <p className="text-red-500 mt-1 text-lg text-center">Event has ended. Thank you for participating.</p>:
          <Button props={{"text":"Proceed","type":"submit"}}/>}
        {/* <button
          type="submit"
          className="w-full bg-gray-900 text-white p-5 rounded-2xl"
          >
          Proceed
        </button> */}
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default ParticipantLogin;
