import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_URL || 'https://formspree.io/f/mlgvjknq';

const Contact = () => {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.target;
    const nameInput = form.elements.name;
    const emailInput = form.elements.email;
    const messageInput = form.elements.message;
    const gotchaInput = form.elements._gotcha;
    
    // Honeypot anti-spam check
    if (gotchaInput && gotchaInput.value) {
      console.warn('Bot submission detected and blocked.');
      setStatus('success');
      form.reset();
      return;
    }

    const data = {
      name: nameInput ? nameInput.value : '',
      email: emailInput ? emailInput.value : '',
      message: messageInput ? messageInput.value : '',
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
                {/* Honeypot field - visually hidden to humans, skipped in tab navigation, filled by bots */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="contact-gotcha">Do not fill this out if you are human</label>
                  <input id="contact-gotcha" type="text" name="_gotcha" tabIndex="-1" autoComplete="off" />
                </div>

                <div className="form-group">
                  <input id="contact-name" type="text" name="name" placeholder="Name" required disabled={status === 'loading'} />
                  <label htmlFor="contact-name" className="form-label">Name</label>
                </div>
                <div className="form-group">
                  <input id="contact-email" type="email" name="email" placeholder="Email" required disabled={status === 'loading'} />
                  <label htmlFor="contact-email" className="form-label">Email</label>
                </div>
                <div className="form-group">
                  <textarea id="contact-message" name="message" placeholder="Message" rows="5" required disabled={status === 'loading'} />
                  <label htmlFor="contact-message" className="form-label">Message</label>
                </div>

                {status === 'error' && (
                  <motion.p
                    role="alert"
                    aria-live="assertive"
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
