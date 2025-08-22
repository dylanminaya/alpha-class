import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpendingGraph from '../../components/SpendingGraph/SpendingGraph';
import './Admin.css';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: string;
}

interface Debt {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
}

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('expenses');
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', description: 'Grocery shopping', amount: 85.50, category: 'Food', date: '2024-01-15' },
    { id: '2', description: 'Gas station', amount: 45.00, category: 'Transport', date: '2024-01-14' },
    { id: '3', description: 'Netflix subscription', amount: 15.99, category: 'Entertainment', date: '2024-01-13' },
    { id: '4', description: 'Restaurant dinner', amount: 65.00, category: 'Food', date: '2024-01-12' },
    { id: '5', description: 'Uber ride', amount: 25.00, category: 'Transport', date: '2024-01-11' },
    { id: '6', description: 'Movie tickets', amount: 32.00, category: 'Entertainment', date: '2024-01-10' },
    { id: '7', description: 'Coffee shop', amount: 12.50, category: 'Food', date: '2024-01-09' },
    { id: '8', description: 'Bus fare', amount: 8.00, category: 'Transport', date: '2024-01-08' },
    { id: '9', description: 'Gym membership', amount: 50.00, category: 'Health', date: '2024-01-07' },
    { id: '10', description: 'Pharmacy', amount: 35.00, category: 'Health', date: '2024-01-06' },
    { id: '11', description: 'Online shopping', amount: 120.00, category: 'Shopping', date: '2024-01-05' },
    { id: '12', description: 'Electricity bill', amount: 85.00, category: 'Utilities', date: '2024-01-04' },
    { id: '13', description: 'Internet bill', amount: 60.00, category: 'Utilities', date: '2024-01-03' },
    { id: '14', description: 'Lunch at work', amount: 18.50, category: 'Food', date: '2024-01-02' },
    { id: '15', description: 'Parking fee', amount: 12.00, category: 'Transport', date: '2024-01-01' },
    // December 2023 data
    { id: '16', description: 'Christmas gifts', amount: 200.00, category: 'Shopping', date: '2023-12-25' },
    { id: '17', description: 'Holiday dinner', amount: 95.00, category: 'Food', date: '2023-12-24' },
    { id: '18', description: 'Flight tickets', amount: 350.00, category: 'Travel', date: '2023-12-20' },
    { id: '19', description: 'Hotel booking', amount: 180.00, category: 'Travel', date: '2023-12-19' },
    { id: '20', description: 'Ski rental', amount: 75.00, category: 'Entertainment', date: '2023-12-18' },
    // November 2023 data
    { id: '21', description: 'Black Friday shopping', amount: 300.00, category: 'Shopping', date: '2023-11-25' },
    { id: '22', description: 'Thanksgiving dinner', amount: 120.00, category: 'Food', date: '2023-11-23' },
    { id: '23', description: 'Car maintenance', amount: 150.00, category: 'Transport', date: '2023-11-15' },
    { id: '24', description: 'Doctor appointment', amount: 80.00, category: 'Health', date: '2023-11-10' },
    { id: '25', description: 'Phone bill', amount: 45.00, category: 'Utilities', date: '2023-11-05' },
  ]);
  
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: '1', category: 'Food', limit: 500, spent: 285.50, period: 'January 2024' },
    { id: '2', category: 'Transport', limit: 200, spent: 145.00, period: 'January 2024' },
    { id: '3', category: 'Entertainment', limit: 100, spent: 65.99, period: 'January 2024' },
  ]);
  
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', description: 'Credit card payment', amount: 250.00, dueDate: '2024-01-25', status: 'pending' },
    { id: '2', description: 'Student loan', amount: 500.00, dueDate: '2024-01-30', status: 'pending' },
    { id: '3', description: 'Car insurance', amount: 120.00, dueDate: '2024-01-20', status: 'overdue' },
  ]);
  
  const [cardFrozen, setCardFrozen] = useState(false);
  const [cardColor, setCardColor] = useState('#1e40af');
  const [cardDesign, setCardDesign] = useState('classic');

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalDebts = debts.reduce((sum, debt) => sum + debt.amount, 0);

  const handleFreezeCard = () => {
    setCardFrozen(!cardFrozen);
  };

  const handleCardColorChange = (color: string) => {
    setCardColor(color);
  };

  const handleCardDesignChange = (design: string) => {
    setCardDesign(design);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-user-info">
          <span>Welcome, Admin</span>
          <button className="btn secondary" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="admin-content">
        <nav className="admin-nav">
          <button 
            className={`nav-tab ${activeTab === 'expenses' ? 'active' : ''}`}
            onClick={() => setActiveTab('expenses')}
          >
            Expense Control
          </button>
          <button 
            className={`nav-tab ${activeTab === 'budget' ? 'active' : ''}`}
            onClick={() => setActiveTab('budget')}
          >
            Budget Management
          </button>
          <button 
            className={`nav-tab ${activeTab === 'debts' ? 'active' : ''}`}
            onClick={() => setActiveTab('debts')}
          >
            Debt Management
          </button>
          <button 
            className={`nav-tab ${activeTab === 'card' ? 'active' : ''}`}
            onClick={() => setActiveTab('card')}
          >
            Card Customization
          </button>
        </nav>

        <main className="admin-main">
          {/* Expense Control Tab */}
          {activeTab === 'expenses' && (
            <div className="tab-content">
              <div className="section-header">
                <h2>Expense Control</h2>
                <button className="btn primary">Add Expense</button>
              </div>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Expenses</h3>
                  <p className="stat-value">${totalExpenses.toFixed(2)}</p>
                </div>
                <div className="stat-card">
                  <h3>This Month</h3>
                  <p className="stat-value">${totalExpenses.toFixed(2)}</p>
                </div>
                <div className="stat-card">
                  <h3>Average Daily</h3>
                  <p className="stat-value">${(totalExpenses / 15).toFixed(2)}</p>
                </div>
              </div>

              <SpendingGraph data={expenses} />
              
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map(expense => (
                      <tr key={expense.id}>
                        <td>{expense.date}</td>
                        <td>{expense.description}</td>
                        <td>{expense.category}</td>
                        <td>${expense.amount.toFixed(2)}</td>
                        <td>
                          <button className="btn small">Edit</button>
                          <button className="btn small danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Budget Management Tab */}
          {activeTab === 'budget' && (
            <div className="tab-content">
              <div className="section-header">
                <h2>Budget Management</h2>
                <button className="btn primary">Create Budget</button>
              </div>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Budget</h3>
                  <p className="stat-value">${totalBudget.toFixed(2)}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Spent</h3>
                  <p className="stat-value">${totalSpent.toFixed(2)}</p>
                </div>
                <div className="stat-card">
                  <h3>Remaining</h3>
                  <p className="stat-value">${(totalBudget - totalSpent).toFixed(2)}</p>
                </div>
              </div>

              <div className="budget-grid">
                {budgets.map(budget => {
                  const percentage = (budget.spent / budget.limit) * 100;
                  return (
                    <div key={budget.id} className="budget-card">
                      <div className="budget-header">
                        <h3>{budget.category}</h3>
                        <span className="budget-period">{budget.period}</span>
                      </div>
                      <div className="budget-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                        <div className="budget-amounts">
                          <span>${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}</span>
                          <span className="percentage">{percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                      <div className="budget-actions">
                        <button className="btn small">Edit</button>
                        <button className="btn small danger">Delete</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Debt Management Tab */}
          {activeTab === 'debts' && (
            <div className="tab-content">
              <div className="section-header">
                <h2>Debt Management</h2>
                <button className="btn primary">Add Debt</button>
              </div>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Debt</h3>
                  <p className="stat-value">${totalDebts.toFixed(2)}</p>
                </div>
                <div className="stat-card">
                  <h3>Pending</h3>
                  <p className="stat-value">${debts.filter(d => d.status === 'pending').reduce((sum, d) => sum + d.amount, 0).toFixed(2)}</p>
                </div>
                <div className="stat-card">
                  <h3>Overdue</h3>
                  <p className="stat-value">${debts.filter(d => d.status === 'overdue').reduce((sum, d) => sum + d.amount, 0).toFixed(2)}</p>
                </div>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {debts.map(debt => (
                      <tr key={debt.id}>
                        <td>{debt.description}</td>
                        <td>${debt.amount.toFixed(2)}</td>
                        <td>{debt.dueDate}</td>
                        <td>
                          <span className={`status-badge ${debt.status}`}>
                            {debt.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn small">Mark Paid</button>
                          <button className="btn small">Edit</button>
                          <button className="btn small danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Card Customization Tab */}
          {activeTab === 'card' && (
            <div className="tab-content">
              <div className="section-header">
                <h2>Card Customization</h2>
              </div>
              
              <div className="card-customization">
                <div className="card-preview">
                  <div 
                    className="virtual-card"
                    style={{ 
                      backgroundColor: cardColor,
                      backgroundImage: cardDesign === 'gradient' ? 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)' : 'none'
                    }}
                  >
                    <div className="card-header">
                      <div className="card-logo">TrackIt</div>
                      <div className="card-status">
                        {cardFrozen ? (
                          <span className="frozen-badge">FROZEN</span>
                        ) : (
                          <span className="active-badge">ACTIVE</span>
                        )}
                      </div>
                    </div>
                    <div className="card-number">**** **** **** 1234</div>
                    <div className="card-footer">
                      <div className="card-holder">JOHN DOE</div>
                      <div className="card-expiry">12/25</div>
                    </div>
                  </div>
                </div>

                <div className="card-controls">
                  <div className="control-section">
                    <h3>Card Status</h3>
                    <button 
                      className={`btn ${cardFrozen ? 'danger' : 'success'}`}
                      onClick={handleFreezeCard}
                    >
                      {cardFrozen ? 'Unfreeze Card' : 'Freeze Card'}
                    </button>
                  </div>

                  <div className="control-section">
                    <h3>Card Color</h3>
                    <div className="color-options">
                      {['#1e40af', '#dc2626', '#059669', '#7c3aed', '#ea580c', '#0891b2'].map(color => (
                        <button
                          key={color}
                          className="color-option"
                          style={{ backgroundColor: color }}
                          onClick={() => handleCardColorChange(color)}
                        ></button>
                      ))}
                    </div>
                  </div>

                  <div className="control-section">
                    <h3>Card Design</h3>
                    <div className="design-options">
                      <button 
                        className={`design-option ${cardDesign === 'classic' ? 'active' : ''}`}
                        onClick={() => handleCardDesignChange('classic')}
                      >
                        Classic
                      </button>
                      <button 
                        className={`design-option ${cardDesign === 'gradient' ? 'active' : ''}`}
                        onClick={() => handleCardDesignChange('gradient')}
                      >
                        Gradient
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
