import React from 'react';
import AppRoutes from './routes.jsx'; // Import the routes

const App = () => {
  console.log("App running")
  return (
    <div >
      {/* Test timefsdfsdfsd */}
      <AppRoutes /> 
      {/* Render all routes */}
    </div>
  );
};

export default App;


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

