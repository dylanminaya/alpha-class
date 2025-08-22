import { useState, useEffect } from 'react';
import './DashboardHome.css';

interface DashboardHomeProps {
  onNavigate: (view: 'dashboard' | 'transactions' | 'clients' | 'invoices' | 'expenses' | 'reports' | 'settings') => void;
}

interface FinancialData {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  pendingInvoices: number;
  overdueInvoices: number;
  activeClients: number;
  thisMonthRevenue: number;
  lastMonthRevenue: number;
}

interface Alert {
  id: string;
  type: 'warning' | 'danger' | 'info';
  title: string;
  message: string;
  date: string;
}

const DashboardHome = ({ onNavigate }: DashboardHomeProps) => {
  const [financialData, setFinancialData] = useState<FinancialData>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    pendingInvoices: 0,
    overdueInvoices: 0,
    activeClients: 0,
    thisMonthRevenue: 0,
    lastMonthRevenue: 0,
  });

  const [alerts, setAlerts] = useState<Alert[]>([]);


  useEffect(() => {
    // Simulate loading financial data
    const loadFinancialData = () => {
      const data: FinancialData = {
        totalIncome: 65400,
        totalExpenses: 18000,
        balance: 47400,
        monthlyIncome: 13200,
        monthlyExpenses: 3600,
        pendingInvoices: 8,
        overdueInvoices: 3,
        activeClients: 15,
        thisMonthRevenue: 13200,
        lastMonthRevenue: 12500,
      };
      setFinancialData(data);
    };

    // Simulate loading alerts
    const loadAlerts = () => {
      const alertsData: Alert[] = [
        {
          id: '1',
          type: 'danger',
          title: 'Overdue Invoices',
          message: '3 invoices are overdue. Total amount: $8,750',
          date: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'warning',
          title: 'Pending Payments',
          message: '5 invoices are pending payment. Follow up required.',
          date: new Date().toISOString(),
        },
        {
          id: '3',
          type: 'info',
          title: 'Monthly Goal',
          message: 'You are 85% towards your monthly revenue goal of $15,000',
          date: new Date().toISOString(),
        },
      ];
      setAlerts(alertsData);
    };

    loadFinancialData();
    loadAlerts();
  }, []);

  const revenueGrowth = financialData.lastMonthRevenue > 0 
    ? ((financialData.thisMonthRevenue - financialData.lastMonthRevenue) / financialData.lastMonthRevenue * 100)
    : 0;

  return (
    <div className="dashboard-home">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's your financial summary for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
      </div>

      {/* Financial Summary Cards */}
      <div className="financial-summary">
        <div className="summary-card balance">
          <div className="card-header">
            <h3>Current Balance</h3>
            <span className="card-icon">💰</span>
          </div>
          <div className="card-value">${financialData.balance.toLocaleString()}</div>
          <div className="card-subtitle">
            Income: ${financialData.totalIncome.toLocaleString()} | 
            Expenses: ${financialData.totalExpenses.toLocaleString()}
          </div>
        </div>

        <div className="summary-card income">
          <div className="card-header">
            <h3>This Month Income</h3>
            <span className="card-icon">📈</span>
          </div>
          <div className="card-value">${financialData.monthlyIncome.toLocaleString()}</div>
          <div className={`card-change ${revenueGrowth >= 0 ? 'positive' : 'negative'}`}>
            {revenueGrowth >= 0 ? '↗' : '↘'} {Math.abs(revenueGrowth).toFixed(1)}% from last month
          </div>
        </div>

        <div className="summary-card expenses">
          <div className="card-header">
            <h3>This Month Expenses</h3>
            <span className="card-icon">💸</span>
          </div>
          <div className="card-value">${financialData.monthlyExpenses.toLocaleString()}</div>
          <div className="card-subtitle">
            {((financialData.monthlyExpenses / financialData.monthlyIncome) * 100).toFixed(1)}% of income
          </div>
        </div>

        <div className="summary-card clients">
          <div className="card-header">
            <h3>Active Clients</h3>
            <span className="card-icon">👥</span>
          </div>
          <div className="card-value">{financialData.activeClients}</div>
          <div className="card-subtitle">
            {financialData.pendingInvoices} pending invoices
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="alerts-section">
          <h2>🚨 Alerts & Notifications</h2>
          <div className="alerts-grid">
            {alerts.map(alert => (
              <div key={alert.id} className={`alert alert-${alert.type}`}>
                <div className="alert-header">
                  <strong>{alert.title}</strong>
                  <span className="alert-date">
                    {new Date(alert.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="alert-message">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>⚡ Quick Actions</h2>
        <div className="action-grid">
          <button 
            className="action-card"
            onClick={() => onNavigate('invoices')}
          >
            <span className="action-icon">📄</span>
            <h3>Create Invoice</h3>
            <p>Generate and send invoices to clients</p>
          </button>

          <button 
            className="action-card"
            onClick={() => onNavigate('expenses')}
          >
            <span className="action-icon">💸</span>
            <h3>Add Expense</h3>
            <p>Record business expenses and receipts</p>
          </button>

          <button 
            className="action-card"
            onClick={() => onNavigate('clients')}
          >
            <span className="action-icon">👥</span>
            <h3>Manage Clients</h3>
            <p>Add or update client information</p>
          </button>

          <button 
            className="action-card"
            onClick={() => onNavigate('reports')}
          >
            <span className="action-icon">📊</span>
            <h3>View Reports</h3>
            <p>Generate financial and tax reports</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>📋 Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon income">💰</span>
            <div className="activity-content">
              <div className="activity-title">Payment received from TechCorp</div>
              <div className="activity-subtitle">Invoice #INV-2024-045 • $2,500</div>
            </div>
            <div className="activity-date">2 hours ago</div>
          </div>

          <div className="activity-item">
            <span className="activity-icon expense">💸</span>
            <div className="activity-content">
              <div className="activity-title">Software subscription renewed</div>
              <div className="activity-subtitle">Adobe Creative Suite • $60</div>
            </div>
            <div className="activity-date">1 day ago</div>
          </div>

          <div className="activity-item">
            <span className="activity-icon invoice">📄</span>
            <div className="activity-content">
              <div className="activity-title">Invoice sent to StartupXYZ</div>
              <div className="activity-subtitle">Web development project • $3,200</div>
            </div>
            <div className="activity-date">2 days ago</div>
          </div>

          <div className="activity-item">
            <span className="activity-icon client">👤</span>
            <div className="activity-content">
              <div className="activity-title">New client added</div>
              <div className="activity-subtitle">Digital Marketing Agency</div>
            </div>
            <div className="activity-date">3 days ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;


