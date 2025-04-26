import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Basculer vers le thème {theme === 'light' ? 'sombre' : 'clair'}
    </button>
  );
};

export default ThemeToggle;
