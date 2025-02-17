import React from 'react';
import ContactForm from './ContactForm';

function Section({ id, title, content, isContactForm }) {
  return (
    <section id={id} className="section">
      <h2>{title}</h2>
      <p>{content}</p>
      {isContactForm && <ContactForm />}
    </section>
  );
}

export default Section;