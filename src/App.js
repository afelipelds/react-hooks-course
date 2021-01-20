import React, { useState } from 'react';
import Header from './components/Header';
import Characters from './components/Characters';
import { useThemeContext } from './context/ThemeContext';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const {darkColorMode, lightColorMode} = useThemeContext();
  
  const handleClick = () => {
    setDarkMode(!darkMode);
  }
    
  return (
    <div className={`App ${darkMode ? darkColorMode : lightColorMode}`}>
      
      <Header />

      <div>
        <button type="button" onClick={handleClick}>
          { darkMode ? 'Change to LightMode' : 'Change to DarkMode' }
        </button>
      </div>

      <Characters />

    </div>
  );
}

export default App;
