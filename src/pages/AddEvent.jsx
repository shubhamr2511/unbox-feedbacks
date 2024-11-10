import React, { useEffect, useState } from 'react';
import logo from "../assets/logo.png";
import { AiOutlineClose } from 'react-icons/ai'; // React Icons for search and close

import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import { DB } from '../utils/helpers';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import generateCode from '../utils/generateCode';
import { Timestamp } from 'firebase/firestore';
import { addEvent } from '../services/dbService';

const AddEvent = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    // const [code, setCode] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();



    // Validation function
    const validateForm = () => {
        const errors = {};
        if (!name) errors.name = 'Event Name is required';
        if (!desc) errors.desc = 'Description is required';
        return errors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            // Proceed to next step
            const code = generateCode(6);
            try {
                const data = {
                    "id":code,
                    "participantCount":0,
                    "isEnded":false,
                    "eventName":name,
                    "description":desc,
                    "createdAt":Timestamp.now()
                }

                const eventData = await addEvent(data);
                if (!eventData) {

                    toast.error("Error adding event.");
                    // throw "Error@@@";
                } else {

                    navigate(-1);
                }
            } catch (err) {
                alert('An error occurred. Please try again.');
                console.error(err);
            }
            
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className=" h-screen bg-white">
            <Header title='' />
            <div className=' container mx-auto p-4'>

                <form className="w-full space-y-6" onSubmit={handleSubmit}>
                    {/* Logo */}

                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Add New Event</h1>
                        <button className="text-gray-500 hover:text-gray-800" onClick={() => navigate(-1)}>
                            <AiOutlineClose size={24} />
                        </button>
                    </div>

                    {/* Name Field */}
                    <div>
                        <input
                            type="text"
                            className={`w-full p-3 border-2 rounded-2xl outline-none focus:border-black border-yellow-500 ${errors.name ? 'border-red-500' : ''
                                }`}
                            placeholder="Event Name"
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
                            type="text"
                            className={`w-full p-3 border-2 rounded-2xl outline-none focus:border-black border-yellow-500 ${errors.code ? 'border-red-500' : ''
                                }`}
                            placeholder="Event Description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        {errors.desc && (
                            <p className="text-red-500 mt-1 text-sm">{errors.desc}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    {/* <button
          type="submit"
          className="w-full bg-gray-900 text-white p-3 rounded-none"
          >
          Proceed
        </button> */}
                    <div className='fixed bottom-0 left-0 w-full p-4 bg-white'>

                        <Button props={{ "text": "Proceed", bgColor: "bg-yellow-500", "type": "submit" }} />
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

export default AddEvent;
