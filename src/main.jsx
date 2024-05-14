import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import About from './components/about.jsx'
import './index.css'
import Four from './components/four.jsx'
import Login from './components/login.jsx'
import Create from '../src/components/create.jsx'
import CropData from './components/cropdata.jsx'
import LocationGetter from './components/LocationGetter.jsx'

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
    element: <div> <CropData/></div>,
  },
  {
    path: "neww",
    element: <div> <CropData/></div>,
  },
  
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
