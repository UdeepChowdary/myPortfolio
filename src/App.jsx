import React from 'react';
import { motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import RevealOnScroll from './components/RevealOnScroll';
import TechMarquee from './components/TechMarquee';
import Education from './components/Education';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="app"
    >
      <div className="bg-grid" />
      <div className="bg-grid-vignette" />
      <div className="bg-glow"></div>

      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <RevealOnScroll>
          <Skills />
        </RevealOnScroll>
        <RevealOnScroll>
          <Achievements />
        </RevealOnScroll>
        <RevealOnScroll>
          <Education />
        </RevealOnScroll>
        <RevealOnScroll>
          <Projects />
        </RevealOnScroll>
        <RevealOnScroll>
          <Contact />
        </RevealOnScroll>
        <Footer />
      </main>
      <BackToTop />
    </motion.div>
  );
}

export default App;
