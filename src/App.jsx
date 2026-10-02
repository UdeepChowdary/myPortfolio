import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';

import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import NotFound from './components/NotFound';
import Home from './pages/Home';

const Terminal = React.lazy(() => import('./components/Terminal'));

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,          // smoothness — lower = silkier, 0.08 is cinematic
        duration: 1.4,       // scroll animation duration in seconds
        smoothWheel: true,   // smooth mouse wheel
        wheelMultiplier: 0.9,// slightly reduce wheel speed for more control
        touchMultiplier: 1.5,// natural touch feel
        infinite: false,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="app"
      >
        {/* Abstract background grid overlay */}
        <div className="global-bg-texture"></div>

        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home onTerminalClick={() => setIsTerminalOpen(true)} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Suspense fallback={null}>
          <Terminal 
            isOpen={isTerminalOpen} 
            onClose={() => setIsTerminalOpen(false)} 
            onOpen={() => setIsTerminalOpen(true)} 
          />
        </Suspense>
        <BackToTop />
      </motion.div>
    </ReactLenis>
  );
}

export default App;
