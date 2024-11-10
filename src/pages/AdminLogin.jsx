import { useState, useContext } from 'react';
import fflogo from "../assets/fflogo.png";
import logo from "../assets/logo.png";

import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { getEventDetails } from '../services/dbService';
import { AuthContext } from '../context/AuthContext';

const AdminLogin = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setAdmin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!username || !password) {
      setErrorMessage('Both fields are required.');
      return;
    }

    // if(username!="admin" || password!="Unbox@123") {
    //   setErrorMessage("Incorrect Password or Username.");
    //   return;
    // }

    try {
      const eventDetails = await getEventDetails(); 
      if (username.trim() === eventDetails.admin.username && password === eventDetails.admin.password) {
        setAdmin({ username }); // Store admin details in context
        navigate('/admin/events'); // Redirect to admin dashboard
        // Handle login logic here
        // Reset the form and error message after submission (for demo purposes)
        setErrorMessage('');
        setUsername('');
        setPassword('');
      } else {
        setErrorMessage('Invalid credentials');
      }

    } catch (err) {
      setErrorMessage('Error occurred during login');
      console.error(err);
    }


    // navigate('/admin/event');
  };


  return (
    <div className="flex justify-center items-center h-screen bg-white px-8">
      <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img src={logo} alt="Logo" className="h-10 " />
          
        </div>
        <div className="flex justify-center mb-12">
          <img src={fflogo} alt="Logo" className="h-10 " />
          
        </div>
        <div className='h-4'/>
         <h1 className="text-2xl text-center font-semibold">Admin</h1>


        {/* Username Field */}
        <div>
          <input
            type="text"
            className={`w-full p-3 border-2 rounded-2xl outline-none focus:border-black border-yellow-500
              }`}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div>
          <input
            type="password"
            className={`w-full p-3 border-2 rounded-2xl outline-none focus:border-black text-dark_grey border-yellow-500 
              }`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && (
          <div className=" text-red-700 p-2 mb-4">
            {errorMessage}
          </div>
        )}
        {/* Submit Button */}
        <Button props={{ "text": "Proceed", "type": "submit" }} />
        {/* <button
          type="submit"
          className="w-full bg-gray-900 text-white p-3 rounded-none"
        >
          Proceed
        </button> */}
      </form>
    </div>
  );
};

export default AdminLogin;
