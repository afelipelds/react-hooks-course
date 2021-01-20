import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ThemeContext from './context/ThemeContext';

const COLOR_MODE = {
  darkColorMode: 'dark-mode',
  lightColorMode: 'light-mode',
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeContext.Provider value={COLOR_MODE}>
      <App />
    </ThemeContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
