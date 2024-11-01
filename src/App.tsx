import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import Auth from './pages/Auth';
import { MoodProvider } from './context/MoodContext';
import { AuthProvider } from './context/AuthContext';
import AuthRequired from './components/AuthRequired';
import './styles/main.css';

export default function App() {
  return (
    <AuthProvider>
      <MoodProvider>
        <Router>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/*"
                element={
                  <AuthRequired>
                    <MainContent />
                  </AuthRequired>
                }
              />
            </Routes>
          </div>
        </Router>
      </MoodProvider>
    </AuthProvider>
  );
}