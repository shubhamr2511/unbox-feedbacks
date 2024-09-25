import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { AiOutlineClose } from 'react-icons/ai'; // React Icons for search and close

import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import DB from '../utils/helpers';

const AddParticipant = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
        navigate("/admin/event", {state:{
          participantAdded:true
        }});
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

        {/* Email Field */}
        <div>
          <input
            type="email"
            className={`w-full p-3 border-2 rounded-none outline-none focus:border-black text-dark_grey border-yellow-500 placeholder-dark_grey ${
                errors.email ? 'border-red-500' : ''
            }`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          {errors.email && (
              <p className="text-red-500 mt-1 text-sm">{errors.email}</p>
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
        </div>
    </div>
  );
};

export default AddParticipant;
