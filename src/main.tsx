import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { AppContent } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <EmployeeProvider>
        <AppContent />
      </EmployeeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
