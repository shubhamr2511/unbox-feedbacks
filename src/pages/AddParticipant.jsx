import React, { useEffect, useState } from 'react';
import logo from "../assets/logo.png";
import { AiOutlineClose } from 'react-icons/ai'; // React Icons for search and close
import Papa from "papaparse";

import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import { DB } from '../utils/helpers';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import generateCode from '../utils/generateCode';

const AddParticipant = () => {
  const [name, setName] = useState('');
  // const [code, setCode] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [uploading, setUploading] = useState(false);



  // Validation function
  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = 'Full Name is required';
    // if (!code) errors.code = 'Code is required';
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if(participants.length > 0) {
      for (const name of participants) {
        const code = generateCode(6, true);
        try {
          
          const participantData = DB.addParticipant(name.trim(), code.trim());
          if (!participantData) {
            toast.error("Participant already exists with same code.");
            // throw "Error@@@";
          } else {
            // 
            // "/admin/event", {state:{
              //   participantAdded:true
              // }});
            }
          } catch (err) {
            alert('An error occurred. Please try again.');
            console.error(err);
          }
      }
      navigate(-1);
      setParticipants([]);
    } else {

      if (Object.keys(validationErrors).length === 0) {
        // Proceed to next step
        const code = generateCode(4);
        try {
          
          const participantData = await DB.addParticipant(name.trim(), code.trim());
          if (!participantData) {
            toast.error("Participant already exists with same code.");
            // throw "Error@@@";
          } else {
            navigate(-1);
            // "/admin/event", {state:{
              //   participantAdded:true
              // }});
            }
          } catch (err) {
            alert('An error occurred. Please try again.');
            console.error(err);
          }
        } else {
          setErrors(validationErrors);
        }
      }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: false,
        skipEmptyLines: true,
        complete: (results) => {
          const names = results.data.map((row) => row[0].trim());
          setParticipants(names);
        },
      });
    }
  };

  return (
    <div className=" h-screen bg-white">
      <Header title='' />
      <div className=' container mx-auto p-4'>

        <form className="w-full space-y-6" onSubmit={handleSubmit}>
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
              disabled={participants.length > 0}
              className={`w-full p-3 border-2 rounded-2xl outline-none focus:border-black border-yellow-500 ${errors.name ? 'border-red-500' : ''
                }`}
              placeholder="User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 mt-1 text-sm">{errors.name}</p>
            )}
          </div>

          <h1 className="text-2xl font-semibold">Or upload CSV</h1>

          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="w-full border-yellow-500  p-3 border-2 rounded-2xl mb-4"
          />

          {participants.length > 0 && (
            <div>
              <p className="mb-2">{participants.length} participants ready to be added.</p>
              {/* <button
            onClick={handleAddParticipants}
            className="bg-blue-500 text-white p-2 rounded"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add Participants"}
          </button> */}
              <div className='flex flex-wrap space-x-2 w-full space-y-2'>
                {participants.map((pat) => {
                  console.log(pat);
                  return <div className='bg-gray-300 mx-2 px-2 py-2 rounded-md ' key={pat} >{pat}</div>
                })}
              </div>
            </div>
          )}
          {/* Code Field */}
          {/* <div>
          <input
            type="number"
            className={`w-full p-3 border-2 rounded-2xl outline-none focus:border-black border-yellow-500 ${
                errors.code ? 'border-red-500' : ''
            }`}
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            />
          {errors.code && (
              <p className="text-red-500 mt-1 text-sm">{errors.code}</p>
            )}
        </div> */}

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

export default AddParticipant;
