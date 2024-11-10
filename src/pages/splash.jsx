import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../App.css';
import logo from "../assets/fflogo.gif";
import { useParams } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { listenToEventDetails, setEventId } from '../services/dbService';


function SplashScreen() {
    const { eventId } = useParams();
    const { setEvent } = useContext(AuthContext);

    const navigate = useNavigate();

    // Automatically navigate to login screen after 1 second
    useEffect(() => {
        

        const timer = setTimeout(() => {
             navigate('/participants');
        }, 4600);
        const unsubscribe = listenToEventDetails((event) => {
            console.log(event)
            if (event) {
                setEvent(event);
                setEventId(eventId);
            }
            else navigate('/event-not-found')  // Update state when new data is received
        }, eventId);
        return () => {
            // unsubscribe;
            clearTimeout(timer);
        }// Clean up the timer
    }, [navigate, eventId]);

    return (
        <div className="flex items-center justify-center h-screen px-4"> {/* 16px padding */}
            <img src={logo} alt="App Logo" className="max-w-full h-auto" />
        </div>
    );
}

export default SplashScreen;