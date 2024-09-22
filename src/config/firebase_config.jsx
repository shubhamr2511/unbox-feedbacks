 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyBGTX1S9JmlNj3fqGvYMfyYVPuQX8t1hlM",
    authDomain: "unbox-feedbacks.firebaseapp.com",
    projectId: "unbox-feedbacks",
    storageBucket: "unbox-feedbacks.appspot.com",
    messagingSenderId: "666798067477",
    appId: "1:666798067477:web:b816967730f1a51a18a31c",
    measurementId: "G-G2FVY3LNYV"
  };
 // Initialize Firebase
 
 const app = initializeApp(firebaseConfig);
 // Export firestore database
 // It will be imported into your react app whenever it is needed
 export const db = getFirestore(app);

 