import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    try {
      const response = await fetch("https://formsubmit.co/ajax/udeepchowdary06@gmail.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            message,
            _subject: `New Portfolio Contact from ${name}`
        })
      });

      if (response.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container contact-container">
        <div className="contact-content glass-panel">
          <h2>Get In <span className="gradient-text">Touch</span></h2>
          <p>
            Have a project in mind? Reach out at <a href="mailto:udeepchowdary06@gmail.com" style={{ color: 'var(--accent-secondary)' }}>udeepchowdary06@gmail.com</a> or use the form below.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" name="name" placeholder="Name" required />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Email" required />
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <p className="success-message" style={{ color: 'var(--accent-primary)', marginTop: '1rem' }}>Message sent successfully!</p>}
            {status === 'error' && <p className="error-message" style={{ color: '#ff6b6b', marginTop: '1rem' }}>Oops! Something went wrong, please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
