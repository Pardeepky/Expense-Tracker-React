import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthProvider from './context-store/AuthProvider';
import CompleteProfile from './views/PrivatePages/CompleteProfile';
import LoginScreen from './views/PublicPages/LoginScreen';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LoginScreen />} />
          <Route path='/home' element={<App />}>
            <Route path='/home/complete-profile' element={<CompleteProfile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
