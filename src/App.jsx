import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import NotFound from './components/NotFound';
import SpotlightBackground from './components/SpotlightBackground';
import Home from './pages/Home';

const Terminal = React.lazy(() => import('./components/Terminal'));

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
      <Suspense fallback={null}>
        <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      </Suspense>
      <BackToTop />
    </motion.div>
  );
}

export default App;
