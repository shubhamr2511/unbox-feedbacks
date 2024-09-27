import React from 'react';
import { Link } from 'react-router-dom';

const SessionEnded = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold mb-4">Your session is ended.</h1>
      <p className="text-gray-600 mb-6">Go Home To Login Again.</p>
      <Link to="/" className="bg-gray-900 text-white px-4 py-2 rounded-md">
        Go Back Home
      </Link>
    </div>
  );
};

export default SessionEnded;