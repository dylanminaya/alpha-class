
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import FinancialCharts from './components/FinancialCharts'
import BudgetPlanner from './components/BudgetPlanner'
import Profile from './components/Profile'
import Login from './pages/Auth/Login/Login'
import Signup from './pages/Auth/Signup/Signup'
import StarBackground from './components/StarBackground'
import { ThemeProvider } from './contexts/ThemeContext'
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

// Dashboard page component
function DashboardPage() {
  return (
    <>
      <Navbar />
      <main>
        <Dashboard />
      </main>
      <Footer />
    </>
  );
}

// Financial Charts page component
function ChartsPage() {
  return (
    <>
      <Navbar />
      <main>
        <FinancialCharts />
      </main>
      <Footer />
    </>
  );
}

// Budget Planner page component
function BudgetPage() {
  return (
    <>
      <Navbar />
      <main>
        <BudgetPlanner />
      </main>
      <Footer />
    </>
  );
}

// Profile page component
function ProfilePage() {
  return (
    <>
      <Navbar />
      <main>
        <Profile />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <StarBackground />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/charts" element={<ChartsPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
