import React, { Suspense } from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Approach from '../components/Approach';
import About from '../components/About';
import Skills from '../components/Skills';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';

const JourneyTimeline = React.lazy(() => import('../components/JourneyTimeline'));
const GithubStats     = React.lazy(() => import('../components/GithubStats'));
const Contact         = React.lazy(() => import('../components/Contact'));

const LazyPlaceholder = () => (
  <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
    <div className="pulse-dot" style={{ marginRight: '10px', backgroundColor: 'var(--red)' }} /> LOADING...
  </div>
);

const Home = ({ onTerminalClick }) => (
  <>
    {/* 01 HERO */}
    <Hero onTerminalClick={onTerminalClick} />

    {/* 02 SELECTED WORK */}
    <ErrorBoundary>
      <Projects />
    </ErrorBoundary>

    {/* 03 APPROACH */}
    <ErrorBoundary>
      <Approach />
    </ErrorBoundary>

    {/* 04 ABOUT */}
    <ErrorBoundary>
      <About />
    </ErrorBoundary>

    {/* 05 CAPABILITIES */}
    <ErrorBoundary>
      <Skills />
    </ErrorBoundary>

    {/* 06 JOURNEY */}
    <ErrorBoundary>
      <Suspense fallback={<LazyPlaceholder />}>
        <JourneyTimeline />
      </Suspense>
    </ErrorBoundary>

    {/* 07 OPEN SOURCE */}
    <ErrorBoundary>
      <Suspense fallback={<LazyPlaceholder />}>
        <GithubStats />
      </Suspense>
    </ErrorBoundary>

    {/* 08 CONTACT */}
    <ErrorBoundary>
      <Suspense fallback={<LazyPlaceholder />}>
        <Contact />
      </Suspense>
    </ErrorBoundary>

    {/* 09 FOOTER */}
    <Footer onTerminalClick={onTerminalClick} />
  </>
);

export default Home;
