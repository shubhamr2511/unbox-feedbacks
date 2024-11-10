import { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getLiveParticipants, listenToEventDetails, setEventStatus } from '../services/dbService';
import DownloadCSV from '../components/DownloadCSV';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiTrash2 } from 'react-icons/fi';
import { DB } from "../utils/helpers";
import { baseUrl } from '../config/constants';

function SingleEventDashboard() {
  // Mock participants data
  const { eventId } = useParams();
  const navigate = useNavigate();
  // const { event } = useContext(AuthContext);
  const [event, setEvent] = useState(null);


  const [participants, setParticipants] = useState([

  ]);

  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const confirmationMessage = "Are you sure you want to leave this page?";
      event.returnValue = confirmationMessage; // Standard for most browsers
      return confirmationMessage; // For older browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      const confirmed = window.confirm("Are you sure you want to go back?");
      if (confirmed) {
        navigate(-1); // Proceed with the back action
      }
    };
    // Listen for popstate event to detect browser back button press
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);


  useEffect(() => {
    if (location.state?.participantAdded) {
      toast.success("New Participant Added Successfully!");
      window.history.replaceState({}, document.title);
    }

  }, [location.state]);


  useEffect(() => {
    const unsubscribe = listenToEventDetails((event) => {
      console.log(event)
      if (event) setEvent(event);  // Update state when new data is received
    }, eventId);
    // Cleanup listener on component unmount
    return () => unsubscribe;

  }, [eventId]);


  useEffect(() => {
    // Call the function to set up the real-time listener
    if (event) {
      const unsubscribe = getLiveParticipants((liveParticipants) => {
        if (liveParticipants) {
          // Sort feedbacks alphabetically by sender's name
          const sortedliveParticipants = liveParticipants.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setParticipants(sortedliveParticipants); // Update the state with the live participants' list
        }
      },);

      // Clean up the listener when the component unmounts
      return () => {
        unsubscribe();
      };
    }
  }, [event]);


  // Add cool down time
  const handleStartEvent = () => {
    if (window.confirm(`Do you want to ${event.isEnded ? "Start" : "Stop"} the Event?`)) {

      setEventStatus(!event.isEnded, event.id);
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
      {event && <div className="container mx-auto p-4">
        {/* Participants Section */}
        <div className='flex items-center justify-start mb-6'>
          <div className='items-center'>

            <h2 className="w-full text-xl font-bold  text-gray-900">{event.eventName}  <span className='underline cursor-pointer font-thin text-gray-400'
           onClick={(e) => {
            e.stopPropagation(); 
            navigator.clipboard.writeText(baseUrl+event.id);
            toast.success("Event link copied to clipboard! Share this link to participants.");
          }}
          >{event.id} </span> </h2>
            <h2 className="w-full  text-gray-900">{`Participants (${participants.length})`}</h2>
          </div>
      
          {/* <div className='w-full'></div> */}
          {/* <span className='flex'> */}
          <div className='bg-yellow-500 p-4 rounded-lg cursor-pointer m-4' onClick={() => navigate('/admin/add-participant')}>
            + Add Participant
          </div>
          <div className={`${event.isEnded ? "bg-green-500" : "bg-red-500"} p-4 rounded-lg cursor-pointer`} onClick={ () => handleStartEvent()}>
            {event.isEnded ? "Start Event" : "Stop Event"}
          </div>
          {/* <Button props={{
            "text": "+ Add Participant", bgColor: "bg-yellow-500",
            "onClick":
              // () => caution()
              () => navigate('/admin/add-participant')
          }} /> */}
          <div className='m-2'></div>
          {/* <Button props={{ "text": event.isEnded ? "Start Event" : "Stop Event", bgColor: event.isEnded ? "bg-green-500" : "bg-red-500", "onClick": () => handleStartEvent() }} /> */}

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
      </div>}
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