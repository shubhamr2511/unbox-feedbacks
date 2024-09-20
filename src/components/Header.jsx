import React from 'react';
import logo from "../assets/logo.png";


const Header = ({title = "Text"}) => {
  return (
    <header className="bg-white border-b-4 shadow-lg border-yellow-500 sticky top-0 ">
      <div className="container mx-auto px-8 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-6" />
          <span className='w-full'></span>
          <h1>{title}</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
