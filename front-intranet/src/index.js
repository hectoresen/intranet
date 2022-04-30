import React from 'react';
import App from './App';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider} from 'react-redux';
import { store } from './redux/store';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './index.scss';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>
);