import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';

// Initialize root element & render App Component in Strict Mode
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
