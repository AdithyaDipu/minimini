import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import About from './components/about.jsx'
import './index.css'
import Four from './components/four.jsx'
import Login from './components/login.jsx'
import Create from '../src/components/create.jsx'
import CropData from './components/cropdata.jsx'
import Delete from './components/delete.jsx'
import LocationGetter from './components/LocationGetter.jsx'
import AdminLogin from './components/adminlogin.jsx'
import Logout from './components/logout.jsx'
import { initializeApp } from "firebase/app";
import { AuthProvider } from './components/AuthContext.jsx';


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

const app = initializeApp(firebaseConfig);

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Newlogin from './components/newlogin.jsx'
import Third from './components/third.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <div><App/></div>,
  },
  {
    path: "about",
    element: <div><About/></div>,
  },
  {
    path: "login",
    element: <div><Login/></div>,
  },
  {
    path: "crt",
    element: <div><LocationGetter/></div>,
  },
  {
    path: "dev1",
    element: <div><Newlogin/></div>,
  },
  {
    path: "back",
    element: <div><Login/></div>,
  },
  {
    path: "nxt",
    element: <div> <Create/> </div>,
  },
  {
    path: "dh",
    element: <div><Third/></div>,
  },
  {
    path: "mid",
    element: <div> <Delete/></div>,
  },
  {
    path: "neww",
    element: <div> <CropData/></div>,
  },
  {
    path: "admin",
    element: <div> <AdminLogin/></div>,
  },
  {
    path: "logout",
    element: <div> <Logout/></div>,
  },
  
  
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router = {router} />
    </AuthProvider>
    
  </React.StrictMode>,
)
