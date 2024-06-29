const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST endpoint to handle feedback submission
app.post('/send-feedback', (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'YourEmailServiceProvider', // e.g., 'gmail'
    auth: {
      user: 'your-email@example.com',
      pass: 'your-email-password'
    }
  });

  // Email content
  let mailOptions = {
    from: 'your-email@example.com',
    to: 'admin@example.com',
    subject: 'New Feedback Received',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Error sending feedback');
    } else {
      console.log('Email sent:', info.response);
      res.send('Feedback sent successfully');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
