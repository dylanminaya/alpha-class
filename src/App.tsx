
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Login from './pages/Auth/Login/Login'
import Signup from './pages/Auth/Signup/Signup'
import './App.css'

// Home page component
function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
