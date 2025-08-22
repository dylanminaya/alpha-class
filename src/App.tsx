
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeatureCarousel from './components/FeatureCarousel'
import FeatureSections from './components/FeatureSections'
import Footer from './components/Footer'
import Login from './pages/Auth/Login/Login'
import Signup from './pages/Auth/Signup/Signup'
import './App.css'

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureCarousel />
        <FeatureSections />
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

export default App;
