import React from 'react';
import './Contact.css';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    window.location.href = `mailto:udeepchowdary06@gmail.com?subject=Portfolio Contact from ${name}&body=${message} (from ${email})`;
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
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
