import { useState, useEffect } from 'react';
import './TransactionManager.css';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  client?: string;
}

const TransactionManager = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [formData, setFormData] = useState<Partial<Transaction>>({
    type: 'income',
    amount: 0,
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    client: ''
  });

  // Initialize with demo data
  useEffect(() => {
    const demoTransactions: Transaction[] = [
      {
        id: '1',
        type: 'income',
        amount: 2500,
        description: 'Website Development Project',
        category: 'Web Development',
        date: '2024-01-15',
        client: 'Tech Startup Inc.'
      },
      {
        id: '2',
        type: 'expense',
        amount: 150,
        description: 'Software License',
        category: 'Software',
        date: '2024-01-14',
      },
      {
        id: '3',
        type: 'income',
        amount: 1800,
        description: 'Mobile App Consultation',
        category: 'Consulting',
        date: '2024-01-13',
        client: 'Mobile Solutions LLC'
      },
      {
        id: '4',
        type: 'expense',
        amount: 75,
        description: 'Office Supplies',
        category: 'Office',
        date: '2024-01-12',
      },
      {
        id: '5',
        type: 'income',
        amount: 3200,
        description: 'E-commerce Platform',
        category: 'Web Development',
        date: '2024-01-11',
        client: 'Retail Company'
      },
      {
        id: '6',
        type: 'expense',
        amount: 200,
        description: 'Marketing Tools',
        category: 'Marketing',
        date: '2024-01-10',
      },
      {
        id: '7',
        type: 'income',
        amount: 1500,
        description: 'Logo Design',
        category: 'Design',
        date: '2024-01-09',
        client: 'Brand Studio'
      },
      {
        id: '8',
        type: 'expense',
        amount: 300,
        description: 'Professional Training',
        category: 'Education',
        date: '2024-01-08',
      },
      {
        id: '9',
        type: 'income',
        amount: 2200,
        description: 'API Integration',
        category: 'Development',
        date: '2024-01-07',
        client: 'FinTech Startup'
      },
      {
        id: '10',
        type: 'expense',
        amount: 120,
        description: 'Cloud Hosting',
        category: 'Infrastructure',
        date: '2024-01-06',
      }
    ];
    setTransactions(demoTransactions);
  }, []);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netIncome = totalIncome - totalExpenses;

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setFormData({
      type: 'income',
      amount: 0,
      description: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      client: ''
    });
    setIsModalOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setFormData(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description || !formData.category || !formData.amount || formData.amount <= 0) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingTransaction) {
      // Update existing transaction
      setTransactions(transactions.map(t => 
        t.id === editingTransaction.id 
          ? { ...formData, id: editingTransaction.id } as Transaction
          : t
      ));
    } else {
      // Add new transaction
      const newTransaction: Transaction = {
        ...formData,
        id: Date.now().toString(),
      } as Transaction;
      setTransactions([newTransaction, ...transactions]);
    }

    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className="transaction-manager">
      <div className="transaction-header">
        <h1>Transaction Management</h1>
        <button className="add-btn" onClick={handleAddTransaction}>
          ➕ Add Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card income">
          <h3>Total Income</h3>
          <div className="amount">${totalIncome.toLocaleString()}</div>
        </div>
        <div className="summary-card expense">
          <h3>Total Expenses</h3>
          <div className="amount">${totalExpenses.toLocaleString()}</div>
        </div>
        <div className={`summary-card net ${netIncome >= 0 ? 'positive' : 'negative'}`}>
          <h3>Net Income</h3>
          <div className="amount">${netIncome.toLocaleString()}</div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="transactions-table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Description</th>
              <th>Category</th>
              <th>Client</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className={transaction.type}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>
                  <span className={`type-badge ${transaction.type}`}>
                    {transaction.type === 'income' ? '💰' : '💸'} {transaction.type}
                  </span>
                </td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>{transaction.client || '-'}</td>
                <td className={`amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEditTransaction(transaction)}
                    >
                      ✏️
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                ✕
              </button>
            </div>

            <form className="transaction-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="type">Transaction Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount ($)</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="client">Client (Optional)</label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingTransaction ? 'Update' : 'Add'} Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionManager;






