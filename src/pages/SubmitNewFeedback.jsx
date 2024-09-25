import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header'; // Assuming you have a Header component
import Button from '../components/Button'; // Assuming you have a Button component
import { AiOutlineSearch, AiOutlineClose, AiOutlineDelete } from 'react-icons/ai'; // React Icons for search and close
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Assuming AuthContext stores participant info
import { getAllParticipants } from '../services/dbService';
import DB from '../utils/helpers';
import { toast, ToastContainer } from 'react-toastify';


const SubmitFeedback = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const feedbackData = location.state?.feedbackData;
  const { participant } = useContext(AuthContext);
  const [participants, setParticipants] = useState([]); // State to hold participants list
  const [query, setQuery] = useState(feedbackData?.to?.name ?? "");
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(feedbackData?.to?.id);
  const [feedbackText, setFeedbackText] = useState({
    q1: feedbackData?.questions?.q1?.answer || '',
    q2: feedbackData?.questions?.q2?.answer || '',
    q3: feedbackData?.questions?.q3?.answer || '',
  });
  const [charCount, setCharCount] = useState({
    q1: feedbackData?.questions.q1?.answer?.length || 0,
    q2: feedbackData?.questions.q2?.answer?.length || 0,
    q3: feedbackData?.questions.q3?.answer?.length || 0,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // console.log(feedbackData);

  // useEffect(() => {
  //   function handleOnBeforeUnload(event) {
  //     event.preventDefault();
  //     return (event.returnValue = "");

  //   }
  //   window.addEventListener('beforeunload', handleOnBeforeUnload);
  //   return window.removeEventListener('beforeunload', handleOnBeforeUnload);
  // }, []);
 
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

  const handleBackButton = () => {
    const confirmed = window.confirm("Are you sure you want to go back?");
    if (confirmed) {
      navigate(-1); // Go back to the previous page
    }
  };

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
    // Fetch participants from Firestore on component mount
    const fetchParticipants = async () => {
      const participantsList = await getAllParticipants();
      const currParticipant = participantsList.findIndex((obj) => obj.id === participant.id);
      participantsList.splice(currParticipant, 1);
      setParticipants(participantsList);
    };
    fetchParticipants();
    // setSelectedParticipant(feedbackData.to?.id);

  }, []);

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    setQuery(searchText);

    // Filter participants based on search query
    if (searchText) {
      const filtered = participants.filter(participant =>
        participant.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredParticipants(filtered);
    } else {
      setFilteredParticipants([]);
    }
  };

  const handleParticipantSelect = (participant) => {
    console.log(participant.id)
    setSelectedParticipant(participant);
    setQuery(participant.name); // autofill the search field with selected participant's name
    setFilteredParticipants([]); // clear the dropdown list after selection
  };

  const handleDelete = (feedback) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      DB.deleteFeedback(feedback);
      navigate("/participants/dashboard", { state: { feedbackDeleted: true } });
      // Proceed with delete action
      console.log("Feedback deleted");
      // Add your delete logic here, like an API call
    } else {
      // Cancelled
      console.log("Delete action cancelled");
    }
  };

  const handleSubmit = async (e) => {
    if (loading) {
      return;
    }
    e.preventDefault();
    if (!selectedParticipant) {
      setError('Please select a participant.');
      toast.error('Please select a participant.');
      return;
    }
    if (!feedbackText.q1 || !feedbackText.q2 || !feedbackText.q3) {
      setError('All the fields are mandatory.');
      toast.error('All the fields are mandatory.');
      return;
    }

    // Submit feedback logic here
    setLoading(true);
    console.log(feedbackText);
    let newFb = false;
    if (feedbackData) {
      newFb = await DB.updateFeedback(feedbackData.id, feedbackText)
    } else {

      newFb = await DB.addNewFeedback(participant, selectedParticipant, feedbackText);
    }
    if (!newFb) {
      setLoading(false);
      toast.error('Failed to submit feedback. Please try again.');
      console.log("Error@SubmitNewFeedback");
    } else {
      navigate("/participants/dashboard", { state: { feedbackSubmitted: true } });
      // navigate(-1, { state: { feedbackSubmitted: true } });
      console.log('Feedback submitted for:', selectedParticipant.name);
      console.log('Feedback:', feedbackText);
    }

  };

  return (<div className='relative'>
    <Header title='New' />
    <div className="container mx-auto px-4 py-8 mb-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">{feedbackData ? "Edit" : "Share"} your FeedFWD</h1>
        {feedbackData ? <button className="text-red-500 " onClick={() => handleDelete(feedbackData)}>
          <AiOutlineDelete size={24} />
        </button> : <button className="text-gray-800" onClick={() => handleBackButton()}>
          <AiOutlineClose size={24} />
        </button>}
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        {/* Search and Select Dropdown */}
        {<div className="relative mb-4">
          <input
            disabled={feedbackData}
            type="text"
            value={query}
            onChange={handleSearchChange}
            className="w-full p-3 border-2 border-yellow-400 rounded-2xl bg-white text-gray-900 focus:outline-black"
            placeholder="Search your Colleague..."
          />
          {(!feedbackData && query) && <button onClick={() => setQuery('')} className="absolute right-3 top-3"> <AiOutlineClose size={24} /></button>}

          {/* Participant Dropdown List */}
          {filteredParticipants.length > 0 && (
            <ul className="absolute w-full bg-white shadow-lg z-10 max-h-40 overflow-y-auto">
              {filteredParticipants.map(participant => (
                <li
                  key={participant.id}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleParticipantSelect(participant)}
                >
                  {participant.name}
                </li>
              ))}
            </ul>
          )}
        </div>}

        {/* Feedback Textarea */}
        <div className="mb-4">
          <strong >Stone: Give specific, honest feedback on something that they could improve.</strong>
          <textarea
            className="w-full mt-2 h-40 p-3 border-2 rounded-2xl border-yellow-400  bg-white text-gray-900 focus:outline-black resize-y"
            placeholder="Your Comments..."
            maxLength={250}
            value={feedbackText.q1}
            onChange={(e) => {
              setFeedbackText({
                ...feedbackText, q1: e.target.value
              })
              // setFeedbackText(e.target.value);
              setCharCount({
                ...charCount, q1: e.target.value.length,
              });
              // setCharCount(e.target.value.length);
            }}
          />
          <p className="text-right text-sm">{charCount.q1} / 250</p>

          {/* {error && <p className="text-red-500 mb-6">{error}</p>} */}
        </div>
        <div className="mb-4">
          <strong >Feather: Highlight something they did really well to boost their confidence.</strong>
          <textarea
            className="w-full mt-2 h-40 p-3 border-2 rounded-2xl border-yellow-400  bg-white text-gray-900 focus:outline-black resize-y"
            placeholder="Your Comments..."
            maxLength={250}
            value={feedbackText.q2}
            onChange={(e) => {
              setFeedbackText({
                ...feedbackText, q2: e.target.value,
              })
              // setFeedbackText(e.target.value);
              setCharCount({
                ...charCount, q2: e.target.value.length,
              });
              // setCharCount(e.target.value.length);
            }}
          />
          <p className="text-right text-sm">{charCount.q2} / 250</p>

          {/* {error && <p className="text-red-500 mb-6">{error}</p>} */}
        </div>
        <div className="mb-4">
          <strong >Ladder: Offer advice on how they can build on their strengths. </strong>
          <textarea
            className="w-full mt-2 h-40 p-3 border-2 rounded-2xl border-yellow-400  bg-white text-gray-900 focus:outline-black resize-y"
            placeholder="Your Comments..."
            maxLength={250}
            value={feedbackText.q3}
            onChange={(e) => {
              setFeedbackText({
                ...feedbackText, q3: e.target.value,
              })
              // setFeedbackText(e.target.value);
              setCharCount({
                ...charCount, q3: e.target.value.length,
              });
              // setCharCount(e.target.value.length);
            }}
          />
          <p className="text-right text-sm">{charCount.q3} / 250</p>

          {/* {error && <p className="text-red-500 mb-6">{error}</p>} */}
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />

        {/* Submit Button */}
        <div className='flex fixed p-4 bottom-0 left-0 w-full justify-between bg-white'>
          {feedbackData && <div className='w-full rounded-2xl mr-4 content-center text-center bg-black text-white' onClick={() => navigate(-1)}>
            Cancel
          </div>
          }
          <Button props={{ "type": "submit", "text": loading ? "Submitting..." : "Submit", bgColor: loading ? "bg-gray-700" : "bg-yellow-500" }} />
        </div>

      </form>
    </div>
  </div>
  );
};

export default SubmitFeedback;
