import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import ParticipantCard from '../components/ParticipantCard';
import { AuthContext } from '../context/AuthContext';
import { getLiveParticipants, setEventStatus, addParticipantsToFirestore } from '../services/dbService';
import DownloadCSV from '../components/DownloadCSV';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiTrash2 } from 'react-icons/fi';
import DB from "../utils/helpers";

function SingleEventDashboard() {
  // Mock participants data
  const navigate = useNavigate();
  const { event } = useContext(AuthContext);

  const [participants, setParticipants] = useState([

  ]);

  const location = useLocation();



  useEffect(() => {
    if (location.state?.participantAdded) {
      toast.success("New Participant Added Successfully!");
      window.history.replaceState({}, document.title);
    }

  }, [location.state]);


  useEffect(() => {
    // Call the function to set up the real-time listener
    const unsubscribe = getLiveParticipants((liveParticipants) => {
      if (liveParticipants) {
        // Sort feedbacks alphabetically by sender's name
        const sortedliveParticipants = liveParticipants.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setParticipants(sortedliveParticipants); // Update the state with the live participants' list
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);


  const caution = () => {
    const pp = [
      { "name": "Abhishek", "code": "9042", "fbReceived": 0, "fbSent": 0 },
      { "name": "Aditya", "code": "7836", "fbReceived": 0, "fbSent": 0 },
      { "name": "Amit", "code": "3388", "fbReceived": 0, "fbSent": 0 },
      { "name": "Aravind", "code": "1971", "fbReceived": 0, "fbSent": 0 },
      { "name": "Arnav", "code": "4880", "fbReceived": 0, "fbSent": 0 },
      { "name": "Ashwini", "code": "9322", "fbReceived": 0, "fbSent": 0 },
      { "name": "Atul", "code": "6643", "fbReceived": 0, "fbSent": 0 },
      { "name": "Chandrasekar", "code": "2723", "fbReceived": 0, "fbSent": 0 },
      { "name": "Chirag", "code": "6740", "fbReceived": 0, "fbSent": 0 },
      { "name": "DhruvD", "code": "9668", "fbReceived": 0, "fbSent": 0 },
      { "name": "DhruvK", "code": "5035", "fbReceived": 0, "fbSent": 0 },
      { "name": "Donnie", "code": "8702", "fbReceived": 0, "fbSent": 0 },
      { "name": "Emanda", "code": "9475", "fbReceived": 0, "fbSent": 0 },
      { "name": "Gowri", "code": "3624", "fbReceived": 0, "fbSent": 0 },
      { "name": "Hriday", "code": "2188", "fbReceived": 0, "fbSent": 0 },
      { "name": "Jitu", "code": "3992", "fbReceived": 0, "fbSent": 0 },
      { "name": "Kahraman", "code": "8446", "fbReceived": 0, "fbSent": 0 },
      { "name": "Kaimal", "code": "5444", "fbReceived": 0, "fbSent": 0 },
      { "name": "Karan", "code": "6256", "fbReceived": 0, "fbSent": 0 },
      { "name": "Kohli", "code": "8014", "fbReceived": 0, "fbSent": 0 },
      { "name": "Mandanna", "code": "9183", "fbReceived": 0, "fbSent": 0 },
      { "name": "Manjiri", "code": "1611", "fbReceived": 0, "fbSent": 0 },
      { "name": "Manoj", "code": "5596", "fbReceived": 0, "fbSent": 0 },
      { "name": "Maria", "code": "9210", "fbReceived": 0, "fbSent": 0 },
      { "name": "Naina", "code": "2386", "fbReceived": 0, "fbSent": 0 },
      { "name": "Naveen", "code": "6942", "fbReceived": 0, "fbSent": 0 },
      { "name": "Neel", "code": "2076", "fbReceived": 0, "fbSent": 0 },
      { "name": "Paul", "code": "3697", "fbReceived": 0, "fbSent": 0 },
      { "name": "Pradeep", "code": "9236", "fbReceived": 0, "fbSent": 0 },
      { "name": "Prasad", "code": "8425", "fbReceived": 0, "fbSent": 0 },
      { "name": "Priti", "code": "7219", "fbReceived": 0, "fbSent": 0 },
      { "name": "Raghavendra", "code": "6781", "fbReceived": 0, "fbSent": 0 },
      { "name": "Raghu", "code": "3924", "fbReceived": 0, "fbSent": 0 },
      { "name": "Raghuvinder", "code": "7460", "fbReceived": 0, "fbSent": 0 },
      { "name": "Rajendran", "code": "9920", "fbReceived": 0, "fbSent": 0 },
      { "name": "Rajesh", "code": "1331", "fbReceived": 0, "fbSent": 0 },
      { "name": "Ramesh", "code": "7889", "fbReceived": 0, "fbSent": 0 },
      { "name": "Ray", "code": "9431", "fbReceived": 0, "fbSent": 0 },
      { "name": "Reeza", "code": "6440", "fbReceived": 0, "fbSent": 0 },
      { "name": "Rishad", "code": "7771", "fbReceived": 0, "fbSent": 0 },
      { "name": "Ritwik", "code": "7698", "fbReceived": 0, "fbSent": 0 },
      { "name": "Saarang", "code": "8651", "fbReceived": 0, "fbSent": 0 },
      { "name": "Sachin", "code": "1334", "fbReceived": 0, "fbSent": 0 },
      { "name": "Santosh", "code": "5237", "fbReceived": 0, "fbSent": 0 },
      { "name": "Shailendra", "code": "5396", "fbReceived": 0, "fbSent": 0 },
      { "name": "Shaina", "code": "8519", "fbReceived": 0, "fbSent": 0 },
      { "name": "Shambhavi", "code": "6726", "fbReceived": 0, "fbSent": 0 },
      { "name": "Shwetha", "code": "4043", "fbReceived": 0, "fbSent": 0 },
      { "name": "Swarna", "code": "2634", "fbReceived": 0, "fbSent": 0 },
      { "name": "Vinayak", "code": "2043", "fbReceived": 0, "fbSent": 0 }
    ];
    addParticipantsToFirestore(pp);
  }
  // Event handler for emailing a participant
  const handleEmailClick = (participantId) => {
    // console.log("Send email");
    // Update the participants list, setting emailSent to true for the selected participant
    let temp = [...participants];
    for (let i = 0; i < temp.length; i++) {
      // console.log(temp[i].id);
      if (temp[i].id == participantId) {
        temp[i].emailSent = true;
        console.log(temp[i].name);
      }
    }

    setParticipants(temp);

    // setParticipants((prevParticipants) =>
    //   prevParticipants.map((participant) =>
    //     participant.id === participantId
    //       ? { ...participant, emailSent: true }
    //       : participant
    //   )
    // );
  };


  // Add cool down time
  const handleStartEvent = () => {
    if (window.confirm(`Do you want to ${event.isEnded ? "Start" : "Stop"} the Event?`)) {

      setEventStatus(!event.isEnded);
    }
  };

  const handleDelete = (participantId) => {

    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      DB.deleteParticipant(participantId);
      toast.success("Participant Deleted Successfully!")
      // Proceed with delete action
      console.log("Participant deleted");
      // Add your delete logic here, like an API call
    } else {
      // Cancelled
      console.log("Delete action cancelled");
    }
  }
  // Participant count
  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <Header title='Admin' />

      {/* Page Content */}
      <div className="container mx-auto p-4">
        {/* Participants Section */}
        <div className='flex items-baseline justify-between mb-6'>
          <h2 className="w-full text-xl font-bold  text-gray-900">{`Participants (${participants.length})`}</h2>
          {/* <div className='w-full'></div> */}
          {/* <span className='flex'> */}
          <Button props={{
            "text": "+ Add Participant", bgColor: "bg-yellow-500",
            "onClick": () => caution()
            // navigate('/admin/add-participant')
          }} />
          <div className='m-2'></div>
          <Button props={{ "text": event.isEnded ? "Start Event" : "Stop Event", bgColor: event.isEnded ? "bg-green-500" : "bg-red-500", "onClick": () => handleStartEvent() }} />

          {/* </span> */}
        </div>
        {/* Participants List */}
        {participants.length > 0 ? <div className=" mb-12">
          {/* <ParticipantCard
                name="Name"
                code="Code"
                submittedCount="Submitted"
                receivedCount="Received"
                // onEmailClick={() => handleEmailClick(participant.id)}
                /> */}
          {<div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">Code</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Received Count</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Submitted Count</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant) => (
                  <tr key={participant.id} className="border-t hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{participant.code}</td>
                    <td className="border border-gray-300 px-4 py-2">{participant.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{participant.fbReceived}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{participant.fbSent}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(participant.id)}
                      >
                        <FiTrash2 /> {/* Unicode for delete/trash icon */}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}
        </div> :
          <div className='text-center mt-16'>
            No Participants Yet...
          </div>}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <div className='fixed bottom-10 right-10 '>
        {participants.length > 0 && <DownloadCSV />}
      </div>
    </div>
  );
}

export default SingleEventDashboard