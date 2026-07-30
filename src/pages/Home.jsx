import React, { Suspense } from 'react';
import Hero from '../components/Hero';
import TechMarquee from '../components/TechMarquee';
import RevealOnScroll from '../components/RevealOnScroll';
import Skills from '../components/Skills';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';

// Below-the-fold components imported lazily
const Projects = React.lazy(() => import('../components/Projects'));
const JourneyTimeline = React.lazy(() => import('../components/JourneyTimeline'));
const GithubStats = React.lazy(() => import('../components/GithubStats'));
const Certifications = React.lazy(() => import('../components/Certifications'));
const Contact = React.lazy(() => import('../components/Contact'));

// Simple elegant loading placeholder
const LazyPlaceholder = () => (
  <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
    <div className="pulse-dot" style={{ marginRight: '10px' }} /> Loading Section...
  </div>
);

const Home = ({ onTerminalClick }) => (
  <>
    {/* 1. Hero & Marquee */}
    <Hero />
    <TechMarquee />

    {/* 2. Featured Projects (Recruiter High-Priority) */}
    <ErrorBoundary>
      <Suspense fallback={<LazyPlaceholder />}>
        <RevealOnScroll>
          <Projects />
        </RevealOnScroll>
      </Suspense>
    </ErrorBoundary>

    {/* 3. Technical Skills */}
    <RevealOnScroll>
      <Skills />
    </RevealOnScroll>
    
    {/* 4. Journey & Milestones */}
    <ErrorBoundary>
      <Suspense fallback={<LazyPlaceholder />}>
        <RevealOnScroll>
          <JourneyTimeline />
        </RevealOnScroll>
      </Suspense>
    </ErrorBoundary>

    {/* 5. GitHub Activity & Contributions */}
    <ErrorBoundary>
      <Suspense fallback={<LazyPlaceholder />}>
        <RevealOnScroll>
          <GithubStats />
        </RevealOnScroll>
      </Suspense>
    </ErrorBoundary>

    {/* 6. Certifications */}
    <ErrorBoundary>
      <Suspense fallback={<LazyPlaceholder />}>
        <RevealOnScroll>
          <Certifications />
        </RevealOnScroll>
      </Suspense>
    </ErrorBoundary>

    {/* 7. Contact */}
    <ErrorBoundary>
      <Suspense fallback={<LazyPlaceholder />}>
        <RevealOnScroll>
          <Contact />
        </RevealOnScroll>
      </Suspense>
    </ErrorBoundary>
    
    <Footer onTerminalClick={onTerminalClick} />
  </>
);

export default Home;
