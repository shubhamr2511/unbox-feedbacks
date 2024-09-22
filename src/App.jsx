// import React from 'react';
// import AppRoutes from './routes/routes.jsx'; // Import the routes
// import { AuthProvider } from './context/AuthContext.jsx';
// const App = () => {
//   console.log("App running")
//   return (
//     <div >
      
//       <AppRoutes /> 
//       {/* Render all routes */}
//     </div>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';  // Import AuthContext provider
import AppRouter from './routes/AppRouter';  // Import the AppRouter with your defined routes

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRouter />
      </Router>
    </AuthProvider>
  );
};

export default App;

/*
particpant
on every screen
on login - 
  0. if event ended show event ended screen.
  1. check db if email exists
    yes: return that doc
    no: create a new doc, update participants count
  2.store in auth context

*/


///src
//  ├── /assets               # Static files (images, fonts, etc.)
//  ├── /components           # Reusable components
//  │   ├── Header.js
//  │   ├── Footer.js
//  │   ├── Button.js
//  │   ├── FormInput.js      # Custom input field component
//  ├── /hooks                # Custom hooks
//  │   ├── useFormValidation.js
//  │   ├── useFirestore.js
//  ├── /pages                # Different pages of the app
//  │   ├── Login.js
//  │   ├── Dashboard.js
//  │   ├── SubmitFeedback.js
//  │   └── AdminDashboard.js
//  ├── /services             # API/DB interaction services
//  │   ├── firestoreService.js
//  ├── /config               # Config files (e.g., Firestore config)
//  │   ├── firebaseConfig.js
//  ├── /utils                # Utility functions and helpers
//  │   ├── validateForm.js
//  │   ├── constants.js
//  ├── /context              # React context for global state
//  │   ├── AuthContext.js
//  ├── /router               # Routing setup
//  │   ├── AppRouter.js
//  ├── /styles               # Global and Tailwind styles
//  │   ├── tailwind.css
//  ├── App.js                # Main app component
//  ├── index.js              # React DOM rendering
//  └── main.jsx              # Vite entry file

