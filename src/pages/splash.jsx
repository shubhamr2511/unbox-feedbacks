import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../App.css';
import logo from "../assets/fflogo.gif";


function SplashScreen() {
    const navigate = useNavigate();

    // Automatically navigate to login screen after 1 second
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/participants');
        }, 4600); // 1 second delay

        return () => clearTimeout(timer); // Clean up the timer
    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen px-4"> {/* 16px padding */}
            <img src={logo} alt="App Logo" className="max-w-full h-auto" />
        </div>
    );
}

export default SplashScreen;