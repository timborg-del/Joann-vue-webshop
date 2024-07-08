import { useEffect, useState } from 'react';
import '../pages/ContactMe.css'; // Import CSS file for Contact page styles

const ContactMe = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the transition after the component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      <div className={`contact-content ${isVisible ? 'visible' : ''}`}>
        <p>If you have any questions or inquiries, please feel free to reach out to me via the contact form below or just copy this email adress and send to: jo.salmonart@gmail.com</p>
        <form action="mailto:jo.salmonart@gmail.com" method="post" encType="text/plain">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows={4} required></textarea>
          
          <button className='contact-btn' type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactMe;

