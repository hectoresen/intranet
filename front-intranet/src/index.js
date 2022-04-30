import React from 'react';
import App from './App';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Router>
        <App />
    </Router>
  </StrictMode>
);