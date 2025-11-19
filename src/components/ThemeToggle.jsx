import React from 'react';

const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      <span className={theme === 'light' ? 'theme-icon moon' : 'theme-icon sun'}>
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
    </button>
  );
};

export default ThemeToggle;
