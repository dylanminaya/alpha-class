import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  BarChart3,
  Calendar,
  Target,
  Download,
  FileText,
  Sparkles,
  Zap,
  Star
} from 'lucide-react';
import './Dashboard.css';
import ExpensesChart from './ExpensesChart';
import NotificationSystem from './NotificationSystem';
import ThemeToggle from './ThemeToggle';

interface Transaction {
  id?: string;
  type: 'income' | 'expense';
  amount: string;
  description: string;
  category: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    type: 'income',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [isExporting, setIsExporting] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  // Efecto para mostrar partículas flotantes
  useEffect(() => {
    const interval = setInterval(() => {
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 2000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount || '0'), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount || '0'), 0);

  const balance = totalIncome - totalExpenses;

  const handleAddTransaction = () => {
    if (newTransaction.amount && newTransaction.description && newTransaction.category) {
      const transaction: Transaction = {
        ...newTransaction,
        id: Date.now().toString()
      };
      setTransactions([transaction, ...transactions]);
      setNewTransaction({
        type: 'income',
        amount: '',
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowAddForm(false);
      // Mostrar efecto de éxito
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 2000);
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const exportToCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      const headers = ['Type', 'Amount', 'Description', 'Category', 'Date'];
      const csvContent = [
        headers.join(','),
        ...transactions.map(t => [
          t.type === 'income' ? 'Income' : 'Expense',
          t.amount,
          `"${t.description}"`,
          t.category,
          t.date
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
    }, 1000);
  };

  const exportToExcel = () => {
    setIsExporting(true);
    setTimeout(() => {
      const htmlContent = `
        <html>
          <head>
            <meta charset="utf-8">
            <title>Financial Transactions</title>
          </head>
          <body>
            <table border="1">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                ${transactions.map(t => `
                  <tr>
                    <td>${t.type === 'income' ? 'Income' : 'Expense'}</td>
                    <td>${t.amount}</td>
                    <td>${t.description}</td>
                    <td>${t.category}</td>
                    <td>${t.date}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.xls`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
    }, 1000);
  };

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Partículas flotantes decorativas */}
      <AnimatePresence>
        {showSparkles && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="floating-sparkle"
                initial={{ 
                  opacity: 0, 
                  scale: 0, 
                  x: Math.random() * 400 - 200, 
                  y: Math.random() * 400 - 200 
                }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1, 0],
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`
                }}
              >
                <Sparkles size={20} color="#4caf50" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Financial Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Manage your finances as a freelancer
            </motion.p>
          </div>
          <div className="header-controls">
            <NotificationSystem />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Balance Summary */}
      <div className="balance-summary">
        <motion.div
          className="main-balance"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="balance-icon"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Wallet size={32} />
          </motion.div>
          <div className="balance-info">
            <h3>Total Balance</h3>
            <motion.span
              className="balance-amount"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              €{balance.toFixed(2)}
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          className="balance-card income"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <TrendingUp size={24} />
          <div>
                         <span className="label">Income</span>
            <span className="amount">€{totalIncome.toFixed(2)}</span>
          </div>
        </motion.div>

        <motion.div
          className="balance-card expense"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <TrendingDown size={24} />
          <div>
                         <span className="label">Expenses</span>
            <span className="amount">€{totalExpenses.toFixed(2)}</span>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        className="action-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.button
          className="add-transaction-btn"
          onClick={toggleAddForm}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap size={18} />
                     {showAddForm ? 'Cancel' : 'Add Transaction'}
        </motion.button>

        <div className="export-buttons">
          <motion.button
            className="export-btn csv"
            onClick={exportToCSV}
            disabled={isExporting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText size={18} />
                         {isExporting ? 'Exporting...' : 'Export CSV'}
          </motion.button>

          <motion.button
            className="export-btn excel"
            onClick={exportToExcel}
            disabled={isExporting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={18} />
                         {isExporting ? 'Exporting...' : 'Export Excel'}
          </motion.button>
        </div>
      </motion.div>

      {/* Transaction Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            className="transaction-form"
            initial={{ opacity: 0, height: 0, scale: 0.9 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
                         <h3>New Transaction</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Type</label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as 'income' | 'expense'})}
                >
                                     <option value="income">Income</option>
                   <option value="expense">Expense</option>
                </select>
              </div>
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Transaction description"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                >
                                      <option value="">Select category</option>
                  <option value="Work">Work</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Investments">Investments</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                />
              </div>
              <div className="form-group">
                <button className="submit-btn" onClick={handleAddTransaction}>
                  <Star size={16} />
                  Add Transaction
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transactions Section */}
      <motion.div
        className="transactions-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2>Recent Transactions</h2>
        <div className="transactions-list">
          {transactions.length === 0 ? (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <BarChart3 size={48} />
              <p>No transactions yet</p>
              <span>Add your first transaction to get started</span>
            </motion.div>
          ) : (
            transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                className={`transaction-item ${transaction.type}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="transaction-icon">
                  {transaction.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                </div>
                <div className="transaction-details">
                  <h4>{transaction.description}</h4>
                  <span className="transaction-category">{transaction.category}</span>
                  <span className="transaction-date">{transaction.date}</span>
                </div>
                <div className="transaction-amount">
                  <span className={`amount ${transaction.type}`}>
                    {transaction.type === 'income' ? '+' : '-'}€{transaction.amount}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Expenses Chart by Category */}
      <motion.div
        className="chart-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <h2>Expense Analysis</h2>
        <ExpensesChart transactions={transactions} />
      </motion.div>

      {/* Planning Section */}
      <motion.div
        className="planning-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h2>Financial Planning</h2>
        <div className="planning-cards">
          <motion.div
            className="planning-card"
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <BarChart3 size={32} />
            <h3>Expense Analysis</h3>
            <p>Review your spending patterns and find savings opportunities</p>
            <button className="planning-btn">View Analysis</button>
          </motion.div>

          <motion.div
            className="planning-card"
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <Target size={32} />
            <h3>Financial Goals</h3>
            <p>Set and track your short and long-term financial objectives</p>
            <button className="planning-btn">Manage Goals</button>
          </motion.div>

          <motion.div
            className="planning-card"
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <Calendar size={32} />
            <h3>Monthly Budget</h3>
            <p>Create and maintain a monthly budget to control your finances</p>
            <button className="planning-btn">Create Budget</button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
