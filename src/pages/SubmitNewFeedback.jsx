import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header'; // Assuming you have a Header component
import Button from '../components/Button'; // Assuming you have a Button component
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'; // React Icons for search and close
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Assuming AuthContext stores participant info
import { getAllParticipants } from '../services/dbService';
import DB from '../utils/helpers';
import { toast, ToastContainer } from 'react-toastify';


const participants = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Michael Johnson' },
  // Add more participants as needed
];

const SubmitFeedback = () => {
  const {participant} = useContext(AuthContext);
  const [participants, setParticipants] = useState([]); // State to hold participants list
  const [query, setQuery] = useState('');
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch participants from Firestore on component mount
    const fetchParticipants = async () => {
      const participantsList = await getAllParticipants();
      const currParticipant = participantsList.findIndex((obj) => obj.id === participant.id);
      participantsList.splice(currParticipant, 1);
      setParticipants(participantsList);
    };
    fetchParticipants();
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

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!selectedParticipant) {
      setError('Please select a participant.');
      return;
    }
    if (!feedbackText) {
      setError('Please enter your feedback.');
      return;
    }

    // Submit feedback logic here
    const newFb = await DB.addNewFeedback(participant, selectedParticipant, feedbackText);
    if(!newFb) {
      toast.error('Failed to submit feedback. Please try again.');
      console.log("Error@SubmitNewFeedback");
    } else {
      navigate(-1);
      toast.success('Your feedback submitted Anonymously.');
      console.log('Feedback submitted for:', selectedParticipant.name);
      console.log('Feedback:', feedbackText);

    }

  };

  return (<div className='relative'>
    <Header title='New'/>
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Share your feedback</h1>
        <button className="text-gray-500 hover:text-gray-800" onClick={() => navigate(-1)}>
          <AiOutlineClose size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        {/* Search and Select Dropdown */}
        <div className="relative mb-4">
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            className="w-full p-3 border-2 border-yellow-400 rounded-none bg-white text-gray-900 focus:outline-black"
            placeholder="Search participant..."
          />
          {query && <button onClick={() => setQuery('')} className="absolute right-3 top-3"> <AiOutlineClose size={24} /></button>}

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
        </div>

        {/* Feedback Textarea */}
        <div className="mb-4">
          <textarea
            className="w-full h-60 p-3 border-2 border-yellow-400 rounded-none bg-white text-gray-900 focus:outline-black resize-y"
            placeholder="Write your feedback..."
            maxLength={250}
            value={feedbackText}
            onChange={(e) => {
              setFeedbackText(e.target.value);
              setCharCount(e.target.value.length);
            }}
          />
          <p className="text-right text-sm">{charCount} / 250</p>
          
          {error && <p className="text-red-500 mb-6">{error}</p>}
        </div>

        {/* Submit Button */}
        <div className='fixed bottom-0 left-0 w-full'>

        <Button props={{ "type":  "submit", "text": loading? "Submitting...":"Submit Feedback", bgColor:loading?"bg-gray-700":undefined }} />
        </div>
     
      </form>
    </div>
  </div>
  );
};

export default SubmitFeedback;
