import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

interface User {
  email: string;
  role: string;
  name: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Alpha Class Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user?.name || 'Admin'}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Expense Overview</h3>
            <div className="card-content">
              <div className="stat">
                <span className="stat-value">$2,450</span>
                <span className="stat-label">This Month</span>
              </div>
              <div className="stat">
                <span className="stat-value">$18,200</span>
                <span className="stat-label">Total</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Budget Status</h3>
            <div className="card-content">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }}></div>
              </div>
              <p>75% of monthly budget used</p>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Recent Transactions</h3>
            <div className="card-content">
              <div className="transaction-list">
                <div className="transaction-item">
                  <span className="transaction-name">Coffee Shop</span>
                  <span className="transaction-amount">-$4.50</span>
                </div>
                <div className="transaction-item">
                  <span className="transaction-name">Gas Station</span>
                  <span className="transaction-amount">-$45.00</span>
                </div>
                <div className="transaction-item">
                  <span className="transaction-name">Grocery Store</span>
                  <span className="transaction-amount">-$120.30</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Quick Actions</h3>
            <div className="card-content">
              <button className="action-btn">Add Expense</button>
              <button className="action-btn">View Reports</button>
              <button className="action-btn">Manage Budget</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
