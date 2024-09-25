import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { AiOutlineClose } from 'react-icons/ai'; // React Icons for search and close

import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import DB from '../utils/helpers';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddParticipant = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = 'Full Name is required';
    if (!code) errors.code = 'Code is required';
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Proceed to next step
      try {

        const participantData = await DB.addParticipant(name.trim(), code.trim().toLowerCase());
        if(!participantData){
          toast.error("Participant already exists with same code.");
          // throw "Error@@@";
        } else {
        navigate("/admin/event", {state:{
          participantAdded:true
        }});
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
    <div className="h-screen bg-white">
        <Header title=''/>
        <div className='p-4'>

      <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
        {/* Logo */}
    
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Add New Participant</h1>
        <button className="text-gray-500 hover:text-gray-800" onClick={() => navigate(-1)}>
          <AiOutlineClose size={24} />
        </button>
      </div>

        {/* Name Field */}
        <div>
          <input
            type="text"
            className={`w-full p-3 border-2 rounded-none outline-none focus:border-black text-dark_grey border-yellow-500 ${
                errors.name ? 'border-red-500' : ''
            }`}
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          {errors.name && (
              <p className="text-red-500 mt-1 text-sm">{errors.name}</p>
            )}
        </div>

        {/* Code Field */}
        <div>
          <input
            type="number"
            className={`w-full p-3 border-2 rounded-none outline-none focus:border-black text-dark_grey border-yellow-500 placeholder-dark_grey ${
                errors.code ? 'border-red-500' : ''
            }`}
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            />
          {errors.code && (
              <p className="text-red-500 mt-1 text-sm">{errors.code}</p>
            )}
        </div>

        {/* Submit Button */}
        {/* <button
          type="submit"
          className="w-full bg-gray-900 text-white p-3 rounded-none"
          >
          Proceed
        </button> */}
        <div className='fixed bottom-0 left-0 w-full'>

        <Button props={{"text":"Proceed", bgColor:"bg-yellow-500","type":"submit"}}/>
        </div>
      </form>
        </div><ToastContainer
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

export default AddParticipant;
