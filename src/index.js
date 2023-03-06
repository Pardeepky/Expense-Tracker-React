import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './views/PublicPages/Login';
import Signup from './views/PublicPages/Signup';
import AuthProvider from './context-store/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<App />}>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
