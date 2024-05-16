import React from 'react'
import Navbar from './components/navbar';
import First from './components/first';
import About from './components/about';
import Login from './components/login';
import Four from './components/four';
import Newlogin from './components/newlogin';
import Create from './components/create.jsx'
import LocationGetter from './components/LocationGetter.jsx';
import Delete from './components/delete.jsx'
import { initializeApp } from "firebase/app";


import '../src/App.css';
import Third from './components/third';
import CropData from './components/cropdata.jsx';

const firebaseConfig = {
  apiKey: "AIzaSyAvl2v1enygI1jplM_denVHnwZLA3omV40",
  authDomain: "minimini-9d35a.firebaseapp.com",
  databaseURL: "https://minimini-9d35a-default-rtdb.firebaseio.com",
  projectId: "minimini-9d35a",
  storageBucket: "minimini-9d35a.appspot.com",
  messagingSenderId: "1072638438233",
  appId: "1:1072638438233:web:cec47e175f4945abb17a48",
  measurementId: "G-NV7ZSQ0Y5X"
};
const dapp = initializeApp(firebaseConfig);

const App = () => {
  return (
    <div >
      
      
    
  <First/>
     
     
    </div>
  )
};
export default App