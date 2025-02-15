import React, { useState } from "react";

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [feedback, setFeedback] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFeedback(`Thank you, ${formData.name}! We have received your message.`);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section id="contact" className="section">
            <h2>Contact</h2>
            <p>Feel free to reach out via the form below:</p>
            <form onSubmit={handleSubmit}>
                <input type="text" id="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                <input type="email" id="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                <textarea id="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
                <button type="submit">Send</button>
            </form>
            <p>{feedback}</p>
        </section>
    )
}

export default ContactForm;
