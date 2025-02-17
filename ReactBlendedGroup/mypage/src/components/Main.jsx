import React from 'react';
import Section from './Section';
import ContactForm from './ContactForm';

function Main() {
  return (
    <main>
      <Section id="home" title="Home" content="This is the home section. Scroll down to explore more!" />
      <Section id="about" title="About" content="This is the about section. Learn more about this page here." />
      <Section id="contact" title="Contact" content="Feel free to reach out via the form below:" isContactForm />
    </main>
  );
}

export default Main;