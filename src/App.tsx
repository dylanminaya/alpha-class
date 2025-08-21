
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturesCarousel from './components/FeaturesCarousel/FeaturesCarousel'
import Footer from './components/Footer'
import Login from './pages/Auth/Login/Login'
import Signup from './pages/Auth/Signup/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
import Settings from './pages/Settings/Settings'
import Savings from './pages/Savings/Savings'
import Loans from './pages/Loans/Loans'
import Support from './pages/Support/Support'
import './App.css'

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component (redirects to dashboard if already authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={
        <>
          <Navbar />
          <main>
            <Hero />
            <FeaturesCarousel />
          </main>
          <Footer />
        </>
      } />
      
      {/* Auth routes */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      
      <Route path="/signup" element={
        <PublicRoute>
          <Signup />
        </PublicRoute>
      } />
      
              {/* Protected dashboard route */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Settings route */}
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        
        {/* Savings route */}
        <Route path="/savings" element={
          <ProtectedRoute>
            <Savings />
          </ProtectedRoute>
        } />
        
        {/* Loans route */}
        <Route path="/loans" element={
          <ProtectedRoute>
            <Loans />
          </ProtectedRoute>
        } />
        
        {/* Support route */}
        <Route path="/support" element={
          <ProtectedRoute>
            <Support />
          </ProtectedRoute>
        } />
        
        {/* Redirect to home for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App
