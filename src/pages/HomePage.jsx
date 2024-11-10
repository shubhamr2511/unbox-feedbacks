import React, { useState, useContext, useEffect } from 'react';
import fflogo from "../assets/fflogo.png";
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from '../config/constants';
// import "../services/dbService";
// import { getEventDetailsById } from '../services/dbService';

const HomePage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState({});// Auth context for managing participant data globally
 const [loading, setLoading] = useState(true); // State to track if the event details are loading
  
  // Validation function
  const validateForm = () => {
    const errors = {};
    if (!code) errors.code = '6-digit Code is required';
    if(code.length<6) errors.code = 'Code should have exactly 6 digits.'
    return errors;
  };

  
  
  // Handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Proceed to next step
     navigate(code);
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
        <p className='text-gray-800 text-2xl text-center font-extrabold'>
            Enter event code to join!
          </p>

        {/* Code Field */}
         <div>
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
           
          />
          {errors.code && (
            <p className="text-red-500 mt-1 text-sm">{errors.code}</p>
          )}
        </div>

        {/* Submit Button */}
       
          <Button props={{"text":"Proceed","type":"submit"}}/>
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

export default HomePage;
