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
  type: 'income' | 'expense';
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
  interestRate: number;
  dueDate: string;
  status: 'active' | 'paid';
}

interface Card {
  id: string;
  cardNumber: string;
  cardType: string;
  expiryDate: string;
  isFrozen: boolean;
  balance: number;
}

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('expenses');
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', description: 'Grocery shopping', amount: 150.00, category: 'Food', date: '2024-01-15', type: 'expense' },
    { id: '2', description: 'Salary', amount: 3000.00, category: 'Income', date: '2024-01-01', type: 'income' },
    { id: '3', description: 'Gas station', amount: 45.00, category: 'Transportation', date: '2024-01-14', type: 'expense' },
    { id: '4', description: 'Netflix subscription', amount: 15.99, category: 'Entertainment', date: '2024-01-10', type: 'expense' },
    { id: '5', description: 'Freelance work', amount: 500.00, category: 'Income', date: '2024-01-12', type: 'income' },
    { id: '6', description: 'Restaurant dinner', amount: 85.50, category: 'Food', date: '2024-02-05', type: 'expense' },
    { id: '7', description: 'Movie tickets', amount: 32.00, category: 'Entertainment', date: '2024-02-12', type: 'expense' },
    { id: '8', description: 'Uber ride', amount: 25.00, category: 'Transportation', date: '2024-02-18', type: 'expense' },
    { id: '9', description: 'Salary', amount: 3000.00, category: 'Income', date: '2024-02-01', type: 'income' },
    { id: '10', description: 'Shopping mall', amount: 120.00, category: 'Shopping', date: '2024-02-20', type: 'expense' },
    { id: '11', description: 'Gym membership', amount: 50.00, category: 'Health', date: '2024-03-01', type: 'expense' },
    { id: '12', description: 'Salary', amount: 3000.00, category: 'Income', date: '2024-03-01', type: 'income' },
    { id: '13', description: 'Coffee shop', amount: 45.00, category: 'Food', date: '2024-03-10', type: 'expense' },
    { id: '14', description: 'Concert tickets', amount: 150.00, category: 'Entertainment', date: '2024-03-15', type: 'expense' },
    { id: '15', description: 'Car maintenance', amount: 200.00, category: 'Transportation', date: '2024-03-20', type: 'expense' },
  ]);

  const [budgets, setBudgets] = useState<Budget[]>([
    { id: '1', category: 'Food', limit: 500, spent: 150, period: 'Monthly' },
    { id: '2', category: 'Entertainment', limit: 200, spent: 15.99, period: 'Monthly' },
    { id: '3', category: 'Transportation', limit: 300, spent: 45, period: 'Monthly' },
    { id: '4', category: 'Shopping', limit: 400, spent: 0, period: 'Monthly' },
  ]);

  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', description: 'Student Loan', amount: 25000, interestRate: 4.5, dueDate: '2024-06-15', status: 'active' },
    { id: '2', description: 'Credit Card', amount: 1500, interestRate: 18.99, dueDate: '2024-02-01', status: 'active' },
    { id: '3', description: 'Car Loan', amount: 15000, interestRate: 6.2, dueDate: '2024-12-01', status: 'active' },
  ]);

  const [cards, setCards] = useState<Card[]>([
    { id: '1', cardNumber: '**** **** **** 1234', cardType: 'Visa', expiryDate: '12/25', isFrozen: false, balance: 2500 },
    { id: '2', cardNumber: '**** **** **** 5678', cardType: 'Mastercard', expiryDate: '08/26', isFrozen: false, balance: 1800 },
  ]);

  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: '', type: 'expense' as const });
  const [newBudget, setNewBudget] = useState({ category: '', limit: '', period: 'Monthly' });
  const [newDebt, setNewDebt] = useState({ description: '', amount: '', interestRate: '', dueDate: '' });

  const addExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.category) {
      const expense: Expense = {
        id: Date.now().toString(),
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        date: new Date().toISOString().split('T')[0],
        type: newExpense.type,
      };
      setExpenses([...expenses, expense]);
      setNewExpense({ description: '', amount: '', category: '', type: 'expense' });
    }
  };

  const addBudget = () => {
    if (newBudget.category && newBudget.limit) {
      const budget: Budget = {
        id: Date.now().toString(),
        category: newBudget.category,
        limit: parseFloat(newBudget.limit),
        spent: 0,
        period: newBudget.period,
      };
      setBudgets([...budgets, budget]);
      setNewBudget({ category: '', limit: '', period: 'Monthly' });
    }
  };

  const addDebt = () => {
    if (newDebt.description && newDebt.amount && newDebt.interestRate && newDebt.dueDate) {
      const debt: Debt = {
        id: Date.now().toString(),
        description: newDebt.description,
        amount: parseFloat(newDebt.amount),
        interestRate: parseFloat(newDebt.interestRate),
        dueDate: newDebt.dueDate,
        status: 'active',
      };
      setDebts([...debts, debt]);
      setNewDebt({ description: '', amount: '', interestRate: '', dueDate: '' });
    }
  };

  const toggleCardFreeze = (cardId: string) => {
    setCards(cards.map(card => 
      card.id === cardId ? { ...card, isFrozen: !card.isFrozen } : card
    ));
  };

  const handleLogout = () => {
    navigate('/');
  };

  const totalIncome = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const netIncome = totalIncome - totalExpenses;
  const totalDebt = debts.filter(d => d.status === 'active').reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="header-top">
          <h1>Admin Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Net Income</h3>
            <p className={netIncome >= 0 ? 'positive' : 'negative'}>${netIncome.toFixed(2)}</p>
          </div>
          <div className="stat-card">
            <h3>Total Debt</h3>
            <p className="negative">${totalDebt.toFixed(2)}</p>
          </div>
          <div className="stat-card">
            <h3>Active Cards</h3>
            <p>{cards.filter(c => !c.isFrozen).length}</p>
          </div>
        </div>
      </header>

      <nav className="admin-nav">
        <button 
          className={activeTab === 'expenses' ? 'active' : ''} 
          onClick={() => setActiveTab('expenses')}
        >
          Expense Control
        </button>
        <button 
          className={activeTab === 'budgets' ? 'active' : ''} 
          onClick={() => setActiveTab('budgets')}
        >
          Budget Management
        </button>
        <button 
          className={activeTab === 'debts' ? 'active' : ''} 
          onClick={() => setActiveTab('debts')}
        >
          Debt Management
        </button>
        <button 
          className={activeTab === 'cards' ? 'active' : ''} 
          onClick={() => setActiveTab('cards')}
        >
          Card Information
        </button>
        <button 
          className={activeTab === 'analytics' ? 'active' : ''} 
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </nav>

      <main className="admin-content">
        {activeTab === 'expenses' && (
          <div className="tab-content">
            <h2>Expense Control</h2>
            
            <SpendingGraph expenses={expenses} />
            
            <div className="add-form">
              <h3>Add New Transaction</h3>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Description"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                />
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Income">Income</option>
                </select>
                <select
                  value={newExpense.type}
                  onChange={(e) => setNewExpense({...newExpense, type: e.target.value as 'income' | 'expense'})}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
                <button onClick={addExpense}>Add</button>
              </div>
            </div>
            <div className="expenses-list">
              <h3>Transaction History</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map(expense => (
                    <tr key={expense.id} className={expense.type}>
                      <td>{expense.date}</td>
                      <td>{expense.description}</td>
                      <td>{expense.category}</td>
                      <td>{expense.type}</td>
                      <td className={expense.type === 'income' ? 'positive' : 'negative'}>
                        ${expense.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'budgets' && (
          <div className="tab-content">
            <h2>Budget Management</h2>
            <div className="add-form">
              <h3>Create New Budget</h3>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Category"
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({...newBudget, category: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Limit"
                  value={newBudget.limit}
                  onChange={(e) => setNewBudget({...newBudget, limit: e.target.value})}
                />
                <select
                  value={newBudget.period}
                  onChange={(e) => setNewBudget({...newBudget, period: e.target.value})}
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Yearly">Yearly</option>
                </select>
                <button onClick={addBudget}>Create</button>
              </div>
            </div>
            <div className="budgets-grid">
              {budgets.map(budget => {
                const percentage = (budget.spent / budget.limit) * 100;
                return (
                  <div key={budget.id} className="budget-card">
                    <h3>{budget.category}</h3>
                    <p>Limit: ${budget.limit.toFixed(2)}</p>
                    <p>Spent: ${budget.spent.toFixed(2)}</p>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{width: `${Math.min(percentage, 100)}%`}}
                      ></div>
                    </div>
                    <p className={percentage > 80 ? 'warning' : ''}>
                      {percentage.toFixed(1)}% used
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'debts' && (
          <div className="tab-content">
            <h2>Debt Management</h2>
            <div className="add-form">
              <h3>Add New Debt</h3>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Description"
                  value={newDebt.description}
                  onChange={(e) => setNewDebt({...newDebt, description: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={newDebt.amount}
                  onChange={(e) => setNewDebt({...newDebt, amount: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Interest Rate %"
                  value={newDebt.interestRate}
                  onChange={(e) => setNewDebt({...newDebt, interestRate: e.target.value})}
                />
                <input
                  type="date"
                  value={newDebt.dueDate}
                  onChange={(e) => setNewDebt({...newDebt, dueDate: e.target.value})}
                />
                <button onClick={addDebt}>Add</button>
              </div>
            </div>
            <div className="debts-list">
              <h3>Active Debts</h3>
              <table>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Interest Rate</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {debts.map(debt => (
                    <tr key={debt.id}>
                      <td>{debt.description}</td>
                      <td>${debt.amount.toFixed(2)}</td>
                      <td>{debt.interestRate}%</td>
                      <td>{debt.dueDate}</td>
                      <td>
                        <span className={`status ${debt.status}`}>
                          {debt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="tab-content">
            <h2>Card Information</h2>
            <div className="cards-grid">
              {cards.map(card => (
                <div key={card.id} className={`card-item ${card.isFrozen ? 'frozen' : ''}`}>
                  <div className="card-header">
                    <h3>{card.cardType}</h3>
                    <span className={`status ${card.isFrozen ? 'frozen' : 'active'}`}>
                      {card.isFrozen ? 'Frozen' : 'Active'}
                    </span>
                  </div>
                  <div className="card-number">{card.cardNumber}</div>
                  <div className="card-details">
                    <p>Expires: {card.expiryDate}</p>
                    <p>Balance: ${card.balance.toFixed(2)}</p>
                  </div>
                  <button 
                    className={`btn ${card.isFrozen ? 'unfreeze' : 'freeze'}`}
                    onClick={() => toggleCardFreeze(card.id)}
                  >
                    {card.isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="tab-content">
            <h2>Financial Analytics</h2>
            <SpendingGraph expenses={expenses} />
            
            <div className="analytics-summary">
              <div className="summary-card">
                <h3>Monthly Overview</h3>
                <div className="summary-stats">
                  <div className="stat">
                    <span className="label">Total Income:</span>
                    <span className="value positive">${totalIncome.toFixed(2)}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Total Expenses:</span>
                    <span className="value negative">${totalExpenses.toFixed(2)}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Net Income:</span>
                    <span className={`value ${netIncome >= 0 ? 'positive' : 'negative'}`}>
                      ${netIncome.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
