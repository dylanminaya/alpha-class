import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardPersonalization from '../../components/CardPersonalization/CardPersonalization';
import CardPreview from '../../components/CardPreview/CardPreview';
import DashboardNavbar from '../../components/DashboardNavbar/DashboardNavbar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import './Dashboard.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface User {
  email: string;
  role: string;
  name: string;
}

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface Budget {
  category: string;
  limit: number;
  spent: number;
}

interface Debt {
  name: string;
  amount: number;
  interest: number;
  minimumPayment: number;
  strategy: 'avalanche' | 'snowball';
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cardFrozen, setCardFrozen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [showCardPersonalization, setShowCardPersonalization] = useState(false);
  const [dashboardBackground, setDashboardBackground] = useState('linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)');
  const navigate = useNavigate();

  // Card themes definition
  const cardThemes = [
    {
      id: 'default',
      name: 'Default',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#ffffff',
      accentColor: '#00d4ff'
    },
    {
      id: 'midnight',
      name: 'Midnight',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      textColor: '#ffffff',
      accentColor: '#00d4ff',
      pattern: 'radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)'
    },
    {
      id: 'aurora',
      name: 'Aurora',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      textColor: '#ffffff',
      accentColor: '#00ffff',
      pattern: 'radial-gradient(circle at 80% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)'
    },
    {
      id: 'sunset',
      name: 'Sunset',
      background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)',
      textColor: '#ffffff',
      accentColor: '#ffffff',
      pattern: 'radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
    },
    {
      id: 'ocean',
      name: 'Ocean',
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
      textColor: '#ffffff',
      accentColor: '#00d4ff',
      pattern: 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 70%)'
    },
    {
      id: 'emerald',
      name: 'Emerald',
      background: 'linear-gradient(135deg, #2d5016 0%, #4a7c59 50%, #6b8e23 100%)',
      textColor: '#ffffff',
      accentColor: '#00ff88',
      pattern: 'radial-gradient(circle at 30% 70%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)'
    }
  ];

  const currentTheme = cardThemes.find(theme => theme.id === selectedTheme) || cardThemes[0];

  // Mock data for charts
  const monthlyExpenses = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Expenses',
        data: [2100, 1850, 2400, 2200, 2450, 2300],
        borderColor: 'rgba(0, 212, 255, 1)',
        backgroundColor: 'rgba(0, 212, 255, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Budget',
        data: [2500, 2500, 2500, 2500, 2500, 2500],
        borderColor: 'rgba(255, 0, 128, 0.5)',
        backgroundColor: 'rgba(255, 0, 128, 0.05)',
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  const categoryExpenses = {
    labels: ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Other'],
    datasets: [
      {
        data: [650, 450, 300, 400, 350, 200],
        backgroundColor: [
          'rgba(0, 212, 255, 0.8)',
          'rgba(255, 0, 128, 0.8)',
          'rgba(0, 255, 128, 0.8)',
          'rgba(255, 165, 0, 0.8)',
          'rgba(128, 0, 255, 0.8)',
          'rgba(255, 255, 0, 0.8)',
        ],
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
    ],
  };

  const debtProgress = {
    labels: ['Credit Card', 'Student Loan', 'Car Loan', 'Personal Loan'],
    datasets: [
      {
        label: 'Original Debt',
        data: [5000, 15000, 12000, 8000],
        backgroundColor: 'rgba(255, 0, 128, 0.3)',
        borderColor: 'rgba(255, 0, 128, 1)',
        borderWidth: 2,
      },
      {
        label: 'Remaining Debt',
        data: [3200, 12000, 8500, 6000],
        backgroundColor: 'rgba(0, 212, 255, 0.8)',
        borderColor: 'rgba(0, 212, 255, 1)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'rgba(255, 255, 255, 1)',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(0, 212, 255, 0.5)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 11,
          },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'rgba(255, 255, 255, 1)',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(0, 212, 255, 0.5)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: $${context.parsed.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');

    if (!isAuthenticated || !userData) {
      navigate('/login');
      return;
    }

    try {
      const userInfo = JSON.parse(userData);
      setUser(userInfo);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }

    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleCardFreeze = () => {
    setCardFrozen(!cardFrozen);
    // In a real app, this would make an API call
    console.log(`Card ${cardFrozen ? 'unfrozen' : 'frozen'}`);
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    // In a real app, this would update the card design
    console.log(`Theme changed to: ${theme}`);
  };

  const handleCardPersonalization = () => {
    setShowCardPersonalization(true);
  };

  const handleClosePersonalization = () => {
    setShowCardPersonalization(false);
  };

  const handleBackgroundChange = (background: string) => {
    setDashboardBackground(background);
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard" style={{ background: dashboardBackground }}>
             <DashboardNavbar 
         onBackgroundChange={handleBackgroundChange}
         currentBackground="lavender"
       />

      <main className="dashboard-main">
        {/* Quick Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Monthly Expenses</h3>
              <p className="stat-value">$2,450</p>
              <p className="stat-change positive">+12% vs last month</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>Budget Remaining</h3>
              <p className="stat-value">$550</p>
              <p className="stat-change">22% left</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Savings Rate</h3>
              <p className="stat-value">18%</p>
              <p className="stat-change positive">+3% vs target</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💳</div>
            <div className="stat-content">
              <h3>Card Status</h3>
              <p className="stat-value">{cardFrozen ? 'Frozen' : 'Active'}</p>
              <button 
                onClick={toggleCardFreeze}
                className={`freeze-btn ${cardFrozen ? 'frozen' : ''}`}
              >
                {cardFrozen ? 'Unfreeze' : 'Freeze'}
              </button>
            </div>
          </div>
        </div>

                 {/* Charts Section */}
         <div className="charts-grid">
           {/* Expense Trends */}
           <div className="chart-card">
             <h3>📈 Monthly Expense Trends</h3>
             <div className="chart-container">
               <Line data={monthlyExpenses} options={chartOptions} />
             </div>
           </div>

           {/* Category Breakdown */}
           <div className="chart-card">
             <h3>🍕 Expense Categories</h3>
             <div className="chart-container">
               <Doughnut data={categoryExpenses} options={doughnutOptions} />
             </div>
           </div>

           {/* Debt Management */}
           <div className="chart-card">
             <h3>💳 Debt Progress</h3>
             <div className="chart-container">
               <Bar data={debtProgress} options={chartOptions} />
             </div>
           </div>
         </div>

                                       {/* Quick Actions Section */}
           <div className="quick-actions-section">
             <div className="chart-card">
               <h3>⚡ Quick Actions</h3>
               <div className="quick-actions">
                 <button className="action-btn primary">
                   <span>➕</span>
                   Add Expense
                 </button>
                 <button className="action-btn secondary">
                   <span>📊</span>
                   View Reports
                 </button>
                 <button className="action-btn secondary">
                   <span>🎯</span>
                   Manage Budget
                 </button>
                 <button className="action-btn secondary" onClick={handleCardPersonalization}>
                   <span>💳</span>
                   Card Settings
                 </button>
               </div>
             </div>
           </div>

                   {/* Features Grid */}
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Quick Add from Mobile</h3>
              <p>Add expenses instantly with smart categorization and photo receipts</p>
              <div className="feature-stats">
                <span>Last 7 days: 12 expenses</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Smart Budget Management</h3>
              <p>Create flexible budgets with custom limits and intelligent alerts</p>
              <div className="feature-stats">
                <span>3 active budgets</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Card Personalization</h3>
              <p>Choose from multiple themes and preview your card in real-time</p>
              
                             {/* Theme Selector */}
               <div className="theme-selector">
                 {['default', 'midnight', 'aurora', 'sunset', 'ocean', 'emerald'].map((theme) => (
                   <button
                     key={theme}
                     className={`theme-btn ${selectedTheme === theme ? 'active' : ''}`}
                     onClick={() => handleThemeChange(theme)}
                   >
                     {theme}
                   </button>
                 ))}
               </div>
              
            </div>

                         <div className="feature-card">
               <div className="feature-icon">🔒</div>
               <h3>Freeze Card Functionality</h3>
               <p>Freeze or unfreeze your card instantly for security and peace of mind</p>
               <div className="freeze-status">
                 <span className={`status-indicator ${cardFrozen ? 'frozen' : 'active'}`}>
                   {cardFrozen ? '🔒 Frozen' : '✅ Active'}
                 </span>
               </div>
             </div>

             <div className="feature-card">
               <div className="feature-icon">📊</div>
               <h3>Debt Management</h3>
               <p>Plan repayments, compare strategies, and stay motivated to reach zero</p>
               <div className="feature-stats">
                 <span>4 active debts</span>
               </div>
             </div>

             <div className="feature-card">
               <div className="feature-icon">🎨</div>
               <h3>Expense Tracking</h3>
               <p>Track daily expenses, categorize automatically, and view historical insights</p>
               <div className="feature-stats">
                 <span>Monthly trend: +12%</span>
               </div>
             </div>
             
           </div>

        {/* Recent Transactions */}
        <div className="transactions-section">
          <h3>🕒 Recent Transactions</h3>
          <div className="transactions-list">
            <div className="transaction-item">
              <div className="transaction-icon">☕</div>
              <div className="transaction-details">
                <h4>Coffee Shop</h4>
                <p>Food & Beverages</p>
              </div>
              <div className="transaction-amount">
                <span className="amount">-$4.50</span>
                <span className="date">2 hours ago</span>
              </div>
            </div>

            <div className="transaction-item">
              <div className="transaction-icon">⛽</div>
              <div className="transaction-details">
                <h4>Gas Station</h4>
                <p>Transportation</p>
              </div>
              <div className="transaction-amount">
                <span className="amount">-$45.00</span>
                <span className="date">Yesterday</span>
              </div>
            </div>

            <div className="transaction-item">
              <div className="transaction-icon">🛒</div>
              <div className="transaction-details">
                <h4>Grocery Store</h4>
                <p>Food & Beverages</p>
              </div>
              <div className="transaction-amount">
                <span className="amount">-$120.30</span>
                <span className="date">2 days ago</span>
              </div>
            </div>

            <div className="transaction-item">
              <div className="transaction-icon">🎬</div>
              <div className="transaction-details">
                <h4>Movie Theater</h4>
                <p>Entertainment</p>
              </div>
              <div className="transaction-amount">
                <span className="amount">-$28.00</span>
                <span className="date">3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Card Personalization Modal */}
      {showCardPersonalization && (
        <div className="card-personalization-modal">
          <div className="modal-overlay" onClick={handleClosePersonalization}></div>
          <div className="modal-content">
            <div className="modal-header">
              <button className="close-btn" onClick={handleClosePersonalization}>
                ✕
              </button>
            </div>
            <CardPersonalization />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
