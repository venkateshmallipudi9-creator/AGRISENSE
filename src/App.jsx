import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import PestDetectionPage from './pages/PestDetectionPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import WeatherPage from './pages/WeatherPage';
import FarmIntelligencePage from './pages/FarmIntelligencePage';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <Routes>

            {/* ================= PUBLIC ROUTES ================= */}

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />


            {/* ================= PROTECTED ROUTES ================= */}

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/pest-detection"
              element={
                <ProtectedRoute>
                  <PestDetectionPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/weather"
              element={
                <ProtectedRoute>
                  <WeatherPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/farm-intelligence"
              element={
                <ProtectedRoute>
                  <FarmIntelligencePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <AboutPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <ContactPage />
                </ProtectedRoute>
              }
            />


            {/* ================= DEFAULT ROUTES ================= */}

            <Route
              path="/"
              element={<Navigate to="/login" replace />}
            />

            <Route
              path="*"
              element={<Navigate to="/home" replace />}
            />

          </Routes>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;