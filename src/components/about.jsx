// About.jsx
import React from 'react';
import '../components/about.css'; // Import the CSS file for styles
import backgroundImage from '../assets/fimg.jpg';
import Navbar from './navbar';

const About = () => {
  return (
    <div>
      <Navbar></Navbar>
    <div className="about-page-container">
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-row items-center justify-center">
          <div className="mr-8">
            <img src={backgroundImage} alt="About" className="about-image" /> {/* Add class for image styling */}
          </div>
          <div>
            <p className="about-text">
              "Welcome to Terra farm assist, your ultimate destination for all things terrace farming!<br/>
               We are passionate about promoting sustainable agriculture and empowering farmers to harness<br/>
                the potential of terrace farming techniques. Our platform is dedicated to providing comprehensive<br/>
                 resources, expert guidance, and a supportive community to help you embark on your terrace <br/>
                 farming journey with confidence. Whether you're a seasoned farmer or a curious enthusiast,<br/>
                  join us as we cultivate a greener future, one terrace at a time."
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
