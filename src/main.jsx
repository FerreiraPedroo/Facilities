import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

import './index.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';


import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <PrimeReactProvider>
    <App />
   </PrimeReactProvider>
  </BrowserRouter>
)
