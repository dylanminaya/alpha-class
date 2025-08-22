import { useState, useEffect } from 'react';
import './ExpenseManager.css';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
  receipt?: string;
  notes?: string;
  isTaxDeductible: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

interface ExpenseCategory {
  id: string;
  name: string;
  color: string;
  budget?: number;
}

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<ExpenseCategory[]>([
    { id: '1', name: 'Office Supplies', color: '#3b82f6' },
    { id: '2', name: 'Travel', color: '#10b981' },
    { id: '3', name: 'Software', color: '#8b5cf6' },
    { id: '4', name: 'Marketing', color: '#f59e0b' },
    { id: '5', name: 'Utilities', color: '#ef4444' },
    { id: '6', name: 'Equipment', color: '#06b6d4' },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'category'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Sample data
  useEffect(() => {
    const sampleExpenses: Expense[] = [
      {
        id: '1',
        description: 'Office printer ink cartridges',
        amount: 89.99,
        category: 'Office Supplies',
        date: new Date('2024-01-15'),
        notes: 'HP 63XL Black and Color ink',
        isTaxDeductible: true,
        status: 'approved'
      },
      {
        id: '2',
        description: 'Adobe Creative Suite subscription',
        amount: 52.99,
        category: 'Software',
        date: new Date('2024-01-10'),
        notes: 'Monthly subscription for design work',
        isTaxDeductible: true,
        status: 'approved'
      },
      {
        id: '3',
        description: 'Client lunch meeting',
        amount: 45.50,
        category: 'Marketing',
        date: new Date('2024-01-12'),
        notes: 'Business development lunch',
        isTaxDeductible: true,
        status: 'pending'
      }
    ];
    setExpenses(sampleExpenses);
  }, []);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      status: 'pending'
    };
    setExpenses(prev => [newExpense, ...prev]);
    setShowAddForm(false);
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses(prev => prev.map(expense => 
      expense.id === id ? { ...expense, ...updates } : expense
    ));
    setEditingExpense(null);
  };

  const deleteExpense = (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(prev => prev.filter(expense => expense.id !== id));
    }
  };

  const addCategory = (category: Omit<ExpenseCategory, 'id'>) => {
    const newCategory: ExpenseCategory = {
      ...category,
      id: Date.now().toString()
    };
    setCategories(prev => [...prev, newCategory]);
    setShowCategoryForm(false);
  };

  const getFilteredAndSortedExpenses = () => {
    let filtered = expenses;
    
    if (filterCategory !== 'all') {
      filtered = expenses.filter(expense => expense.category === filterCategory);
    }

    return filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = b.date.getTime() - a.date.getTime();
          break;
        case 'amount':
          comparison = b.amount - a.amount;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
      }
      return sortOrder === 'asc' ? -comparison : comparison;
    });
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  // Removed unused function

  const getTaxDeductibleTotal = () => {
    return expenses
      .filter(expense => expense.isTaxDeductible)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <div className="expense-manager">
      <div className="feature-header">
        <h1>💸 Expense Tracking</h1>
        <p>Track business expenses, categorize costs, and manage receipts</p>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-icon">💰</div>
          <div className="summary-content">
            <h3>Total Expenses</h3>
            <p className="summary-amount">${getTotalExpenses().toFixed(2)}</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">📊</div>
          <div className="summary-content">
            <h3>This Month</h3>
            <p className="summary-amount">${expenses
              .filter(expense => expense.date.getMonth() === new Date().getMonth())
              .reduce((total, expense) => total + expense.amount, 0)
              .toFixed(2)}</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">🧾</div>
          <div className="summary-content">
            <h3>Tax Deductible</h3>
            <p className="summary-amount">${getTaxDeductibleTotal().toFixed(2)}</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">⏳</div>
          <div className="summary-content">
            <h3>Pending</h3>
            <p className="summary-amount">{expenses.filter(e => e.status === 'pending').length}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-section">
        <div className="controls-left">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            ➕ Add Expense
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowCategoryForm(true)}
          >
            🏷️ Manage Categories
          </button>
        </div>
        <div className="controls-right">
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'amount' | 'category')}
            className="sort-select"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="category">Sort by Category</option>
          </select>
          <button 
            className="btn btn-icon"
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Expenses List */}
      <div className="expenses-section">
        <h2>📋 Expense Records</h2>
        <div className="expenses-list">
          {getFilteredAndSortedExpenses().map(expense => (
            <div key={expense.id} className="expense-item">
              <div className="expense-main">
                <div className="expense-info">
                  <h3>{expense.description}</h3>
                  <div className="expense-meta">
                    <span className={`category-tag category-${expense.category.toLowerCase().replace(' ', '-')}`}>
                      {expense.category}
                    </span>
                    <span className="expense-date">
                      {expense.date.toLocaleDateString()}
                    </span>
                    {expense.isTaxDeductible && (
                      <span className="tax-deductible">🧾 Tax Deductible</span>
                    )}
                  </div>
                  {expense.notes && (
                    <p className="expense-notes">{expense.notes}</p>
                  )}
                </div>
                <div className="expense-amount">
                  <span className="amount">${expense.amount.toFixed(2)}</span>
                  <span className={`status status-${expense.status}`}>
                    {expense.status}
                  </span>
                </div>
              </div>
              <div className="expense-actions">
                <button 
                  className="btn btn-small btn-secondary"
                  onClick={() => setEditingExpense(expense)}
                >
                  ✏️ Edit
                </button>
                <button 
                  className="btn btn-small btn-danger"
                  onClick={() => deleteExpense(expense.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Expense Form */}
      {showAddForm && (
        <ExpenseForm
          onSubmit={addExpense}
          categories={categories}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingExpense && (
        <ExpenseForm
          expense={editingExpense}
          onSubmit={(updates) => updateExpense(editingExpense.id, updates)}
          categories={categories}
          onCancel={() => setEditingExpense(null)}
        />
      )}

      {/* Category Management Form */}
      {showCategoryForm && (
        <CategoryForm
          onSubmit={addCategory}
          onCancel={() => setShowCategoryForm(false)}
        />
      )}
    </div>
  );
};

// Expense Form Component
interface ExpenseFormProps {
  expense?: Expense;
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
  categories: ExpenseCategory[];
  onCancel: () => void;
}

const ExpenseForm = ({ expense, onSubmit, categories, onCancel }: ExpenseFormProps) => {
  const [formData, setFormData] = useState({
    description: expense?.description || '',
    amount: expense?.amount || 0,
    category: expense?.category || categories[0]?.name || '',
    date: expense?.date ? expense.date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    notes: expense?.notes || '',
    isTaxDeductible: expense?.isTaxDeductible || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: new Date(formData.date),
      amount: Number(formData.amount),
      status: 'pending'
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{expense ? '✏️ Edit Expense' : '➕ Add New Expense'}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="expense-form">
          <div className="form-row">
            <div className="form-group">
              <label>Description *</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
                placeholder="What was this expense for?"
              />
            </div>
            <div className="form-group">
              <label>Amount *</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: Number(e.target.value) }))}
                required
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                required
              >
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional details about this expense..."
              rows={3}
            />
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={formData.isTaxDeductible}
                onChange={(e) => setFormData(prev => ({ ...prev, isTaxDeductible: e.target.checked }))}
              />
              Tax Deductible
            </label>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {expense ? 'Update Expense' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Category Form Component
interface CategoryFormProps {
  onSubmit: (category: Omit<ExpenseCategory, 'id'>) => void;
  onCancel: () => void;
}

const CategoryForm = ({ onSubmit, onCancel }: CategoryFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    color: '#3b82f6',
    budget: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>🏷️ Add New Category</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-group">
            <label>Category Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              placeholder="e.g., Office Supplies"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Color</label>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Monthly Budget (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseManager;






