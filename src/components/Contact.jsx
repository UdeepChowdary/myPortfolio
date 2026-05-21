import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mlgvjknq';

const Contact = () => {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        const json = await res.json();
        setErrorMsg(json?.errors?.[0]?.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      console.error('Form submission network error:', err);
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container contact-container">
        <motion.div
          className="contact-content glass-panel"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <h2>Get In <span className="gradient-text">Touch</span></h2>
          <p>
            Have a project in mind? Reach out at{' '}
            <a href="mailto:udeepchowdary06@gmail.com" style={{ color: 'var(--accent-secondary)' }}>
              udeepchowdary06@gmail.com
            </a>{' '}
            or use the form below.
          </p>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                className="form-feedback success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className="feedback-icon">✅</span>
                <p>Message sent! I'll get back to you soon.</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => setStatus('idle')}
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="form-group">
                  <label htmlFor="contact-name" className="sr-only">Your Name</label>
                  <input id="contact-name" type="text" name="name" placeholder="Name" required disabled={status === 'loading'} />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email" className="sr-only">Your Email Address</label>
                  <input id="contact-email" type="email" name="email" placeholder="Email" required disabled={status === 'loading'} />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message" className="sr-only">Your Message</label>
                  <textarea id="contact-message" name="message" placeholder="Message" rows="5" required disabled={status === 'loading'} />
                </div>

                {status === 'error' && (
                  <motion.p
                    className="form-error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ⚠️ {errorMsg}
                  </motion.p>
                )}

                <button
                  type="submit"
                  className={`btn btn-primary ${status === 'loading' ? 'btn-loading' : ''}`}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className="spinner-wrap"><span className="spinner" /> Sending…</span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
