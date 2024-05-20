import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import './Contact.css'; // Import the CSS file

const Contact = () => {
  const form = useRef();
  const [messageSent, setMessageSent] = useState(false); // State to track if the message is sent

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ujxnd0o",
        "template_w5lo0es",
        form.current,
        "qNawo2WvYCuXCAm0q"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          setMessageSent(true); // Set the state to true on success
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="contact-form">
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" required />
        <label>Email</label>
        <input type="email" name="user_email" required />
        <label>Message</label>
        <textarea name="message" required />
        <input type="submit" value="Send" />
      </form>
      {messageSent && <p className="success-message">Your message has been sent successfully!</p>} {/* Display success message */}
    </div>
  );
};

export default Contact;
