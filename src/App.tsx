import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesSlider from './components/FeaturesSlider';
import Footer from './components/Footer';
import Login from './pages/Auth/Login/Login';
import Signup from './pages/Auth/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css';

// Financial emojis for rain effect
const financialEmojis = ['💰', '💳', '📊', '📈', '📉', '🧮', '💎', '🏦', '💵', '💴', '💶', '💷', '🪙', '💸', '📋', '📝', '💼', '🎯', '⚡', '🚀'];

// Emoji Rain Component
function EmojiRain() {
  return (
    <div className="emoji-rain">
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} className="emoji">
          {financialEmojis[Math.floor(Math.random() * financialEmojis.length)]}
        </div>
      ))}
    </div>
  );
}

// Home page component
function HomePage() {
  return (
    <>
      <EmojiRain />
      <Navbar />
      <main>
        <Hero />
        <FeaturesSlider />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute adminOnly>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
