import React from 'react';
import { Link } from 'react-router-dom';

const EventNotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
      <p className="text-gray-600 mb-6"> Please check the link. The event you're looking for doesn't exist.</p>
      {/* <Link to="/" className="bg-gray-900 text-white px-4 py-2 rounded-md">
        Go back home
      </Link> */}
    </div>
  );
};

export default EventNotFound;
