import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './views/PublicPages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <HashRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<App />}>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
  </React.StrictMode>
);
