import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Login from './pages/Auth/Login/Login'
import Signup from './pages/Auth/Signup/Signup'
import Pricing from './pages/Pricing/Pricing'
import Features from './pages/Features/Features'
import Support from './pages/Support/Support'
import About from './pages/About/About'
import Terms from './pages/Terms/Terms'
import Privacy from './pages/Privacy/Privacy'
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard'
import { useScrollToTop } from './hooks/useScrollToTop'
import './App.css'

function App() {
  useScrollToTop();
  
  return (
    <div className="app">
      <Routes>
        {/* Public routes with Navbar */}
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
            <Footer />
          </>
        } />
        <Route path="/login" element={
          <>
            <Navbar />
            <Login />
          </>
        } />
        <Route path="/signup" element={
          <>
            <Navbar />
            <Signup />
          </>
        } />
        <Route path="/pricing" element={
          <>
            <Navbar />
            <Pricing />
          </>
        } />
        
        <Route path="/features" element={
          <>
            <Navbar />
            <Features />
            <Footer />
          </>
        } />
        
        <Route path="/support" element={
          <>
            <Navbar />
            <Support />
            <Footer />
          </>
        } />
        
        <Route path="/about" element={
          <>
            <Navbar />
            <About />
            <Footer />
          </>
        } />
        
        <Route path="/terms" element={
          <>
            <Navbar />
            <Terms />
            <Footer />
          </>
        } />
        
        <Route path="/privacy" element={
          <>
            <Navbar />
            <Privacy />
            <Footer />
          </>
        } />
        
        {/* Admin routes without public Navbar */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  )
}

export default App
