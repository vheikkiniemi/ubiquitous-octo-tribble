import React, { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback(`Thank you, ${name}! We have received your message.`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <form id="contactForm" onSubmit={handleSubmit}>
      <input type="text" id="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" id="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <textarea id="message" placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
      <button type="submit">Send</button>
      <p id="formFeedback">{feedback}</p>
    </form>
  );
}

export default ContactForm;