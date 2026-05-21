import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';

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
import GithubStats from './components/GithubStats';
import Certifications from './components/Certifications';
import NotFound from './components/NotFound';
import SpotlightBackground from './components/SpotlightBackground';
import Terminal from './components/Terminal';

const Home = ({ onTerminalClick }) => (
  <>
    <Hero />
    <TechMarquee />
    <RevealOnScroll>
      <Skills />
    </RevealOnScroll>
    <RevealOnScroll>
      <GithubStats />
    </RevealOnScroll>
    <RevealOnScroll>
      <Achievements />
    </RevealOnScroll>
    <RevealOnScroll>
      <Certifications />
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
    <Footer onTerminalClick={onTerminalClick} />
  </>
);

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="app"
    >
      <SpotlightBackground />

      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home onTerminalClick={() => setIsTerminalOpen(true)} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      <BackToTop />
    </motion.div>
  );
}

export default App;
