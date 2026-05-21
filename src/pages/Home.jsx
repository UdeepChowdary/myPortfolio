import React, { Suspense } from 'react';
import Hero from '../components/Hero';
import TechMarquee from '../components/TechMarquee';
import RevealOnScroll from '../components/RevealOnScroll';
import Skills from '../components/Skills';
import Footer from '../components/Footer';

// Below-the-fold components imported lazily
const GithubStats = React.lazy(() => import('../components/GithubStats'));
const Achievements = React.lazy(() => import('../components/Achievements'));
const Certifications = React.lazy(() => import('../components/Certifications'));
const Education = React.lazy(() => import('../components/Education'));
const Projects = React.lazy(() => import('../components/Projects'));
const Contact = React.lazy(() => import('../components/Contact'));

// Simple elegant loading placeholder
const LazyPlaceholder = () => (
  <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
    <div className="pulse-dot" style={{ marginRight: '10px' }} /> Loading Section...
  </div>
);

const Home = ({ onTerminalClick }) => (
  <>
    <Hero />
    <TechMarquee />
    <RevealOnScroll>
      <Skills />
    </RevealOnScroll>
    
    <Suspense fallback={<LazyPlaceholder />}>
      <RevealOnScroll>
        <GithubStats />
      </RevealOnScroll>
    </Suspense>

    <Suspense fallback={<LazyPlaceholder />}>
      <RevealOnScroll>
        <Achievements />
      </RevealOnScroll>
    </Suspense>

    <Suspense fallback={<LazyPlaceholder />}>
      <RevealOnScroll>
        <Certifications />
      </RevealOnScroll>
    </Suspense>

    <Suspense fallback={<LazyPlaceholder />}>
      <RevealOnScroll>
        <Education />
      </RevealOnScroll>
    </Suspense>

    <Suspense fallback={<LazyPlaceholder />}>
      <RevealOnScroll>
        <Projects />
      </RevealOnScroll>
    </Suspense>

    <Suspense fallback={<LazyPlaceholder />}>
      <RevealOnScroll>
        <Contact />
      </RevealOnScroll>
    </Suspense>
    
    <Footer onTerminalClick={onTerminalClick} />
  </>
);

export default Home;
