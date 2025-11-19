import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import About from './components/About';
import Achievements from './components/Achievements';
import FeaturedProject from './components/FeaturedProject';
import CardList from './components/CardList';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="App">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <Header />
      <main>
        <About />
        <Achievements />
        <FeaturedProject />
        <CardList />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

