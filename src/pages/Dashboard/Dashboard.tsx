import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Dashboard.css';

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
  type: 'income' | 'expense';
}

interface Card {
  id: number;
  name: string;
  number: string;
  balance: number;
  color: string;
  isFrozen: boolean;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data
  const expenses: Expense[] = [
    { id: 1, category: 'Alimentación', amount: 150.00, date: '2024-01-15', description: 'Supermercado', type: 'expense' },
    { id: 2, category: 'Transporte', amount: 45.00, date: '2024-01-14', description: 'Gasolina', type: 'expense' },
    { id: 3, category: 'Salario', amount: 2500.00, date: '2024-01-10', description: 'Pago mensual', type: 'income' },
    { id: 4, category: 'Entretenimiento', amount: 80.00, date: '2024-01-13', description: 'Cine', type: 'expense' },
    { id: 5, category: 'Servicios', amount: 120.00, date: '2024-01-12', description: 'Electricidad', type: 'expense' },
  ];

  const cards: Card[] = [
    { id: 1, name: 'Tarjeta Principal', number: '**** **** **** 1234', balance: 2500.00, color: '#ff6b6b', isFrozen: false },
    { id: 2, name: 'Tarjeta Secundaria', number: '**** **** **** 5678', balance: 1200.00, color: '#4ecdc4', isFrozen: false },
    { id: 3, name: 'Tarjeta de Crédito', number: '**** **** **** 9012', balance: 800.00, color: '#45b7d1', isFrozen: true },
  ];

  const totalIncome = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  const handleLogout = () => {
    logout();
  };

  const toggleCardFreeze = (cardId: number) => {
    // Toggle freeze status
    console.log('Toggle freeze for card:', cardId);
  };

  return (
    <div className="dashboard">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <header className="dashboard-header">
        <div className="header-content">
          <button 
            className="menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          
          <div className="logo-section">
            <h1>ALPHA</h1>
            <span className="tagline">Financial Control</span>
          </div>
          
          <div className="user-section">
            <div className="user-info">
              <span className="user-name">Bienvenido, {user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Resumen
        </button>
        <button 
          className={`nav-tab ${activeTab === 'expenses' ? 'active' : ''}`}
          onClick={() => setActiveTab('expenses')}
        >
          Gastos
        </button>
        <button 
          className={`nav-tab ${activeTab === 'cards' ? 'active' : ''}`}
          onClick={() => setActiveTab('cards')}
        >
          Tarjetas
        </button>
        <button 
          className={`nav-tab ${activeTab === 'budget' ? 'active' : ''}`}
          onClick={() => setActiveTab('budget')}
        >
          Presupuesto
        </button>
        <button 
          className={`nav-tab ${activeTab === 'debts' ? 'active' : ''}`}
          onClick={() => setActiveTab('debts')}
        >
          Deudas
        </button>
      </nav>

      <main className="dashboard-main">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Balance Total</h3>
                <div className="stat-value">${balance.toFixed(2)}</div>
                <div className="stat-trend positive">+12.5%</div>
              </div>
              
              <div className="stat-card">
                <h3>Ingresos</h3>
                <div className="stat-value">${totalIncome.toFixed(2)}</div>
                <div className="stat-trend positive">+8.3%</div>
              </div>
              
              <div className="stat-card">
                <h3>Gastos</h3>
                <div className="stat-value">${totalExpenses.toFixed(2)}</div>
                <div className="stat-trend negative">-5.2%</div>
              </div>
              
              <div className="stat-card">
                <h3>Tarjetas Activas</h3>
                <div className="stat-value">{cards.filter(c => !c.isFrozen).length}</div>
                <div className="stat-trend neutral">Estable</div>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Actividad Reciente</h3>
              <div className="activity-list">
                {expenses.slice(0, 5).map(expense => (
                  <div key={expense.id} className="activity-item">
                    <div className="activity-icon">
                      {expense.type === 'income' ? '💰' : '💸'}
                    </div>
                    <div className="activity-details">
                      <div className="activity-title">{expense.description}</div>
                      <div className="activity-category">{expense.category}</div>
                    </div>
                    <div className={`activity-amount ${expense.type}`}>
                      {expense.type === 'income' ? '+' : '-'}${expense.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="expenses-section">
            <div className="section-header">
              <h2>Control de Gastos</h2>
              <button className="add-btn">+ Nuevo Gasto</button>
            </div>
            
            <div className="expenses-grid">
              {expenses.map(expense => (
                <div key={expense.id} className="expense-card">
                  <div className="expense-header">
                    <span className="expense-category">{expense.category}</span>
                    <span className={`expense-type ${expense.type}`}>
                      {expense.type === 'income' ? 'Ingreso' : 'Gasto'}
                    </span>
                  </div>
                  <div className="expense-amount">
                    ${expense.amount.toFixed(2)}
                  </div>
                  <div className="expense-description">{expense.description}</div>
                  <div className="expense-date">{expense.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="cards-section">
            <div className="section-header">
              <h2>Gestión de Tarjetas</h2>
              <button className="add-btn">+ Nueva Tarjeta</button>
            </div>
            
            <div className="cards-grid">
              {cards.map(card => (
                <div key={card.id} className="card-item">
                  <div 
                    className="card-visual"
                    style={{ background: card.color }}
                  >
                    <div className="card-number">{card.number}</div>
                    <div className="card-name">{card.name}</div>
                    {card.isFrozen && <div className="frozen-indicator">❄️ CONGELADA</div>}
                  </div>
                  
                  <div className="card-info">
                    <div className="card-balance">
                      Balance: ${card.balance.toFixed(2)}
                    </div>
                    <div className="card-actions">
                      <button 
                        className={`freeze-btn ${card.isFrozen ? 'unfreeze' : 'freeze'}`}
                        onClick={() => toggleCardFreeze(card.id)}
                      >
                        {card.isFrozen ? 'Descongelar' : 'Congelar'}
                      </button>
                      <button className="customize-btn">Personalizar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="budget-section">
            <div className="section-header">
              <h2>Gestión de Presupuesto</h2>
              <button className="add-btn">+ Nuevo Presupuesto</button>
            </div>
            
            <div className="budget-overview">
              <div className="budget-card">
                <h3>Presupuesto Mensual</h3>
                <div className="budget-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(totalExpenses / 3000) * 100}%` }}
                    ></div>
                  </div>
                  <div className="budget-stats">
                    <span>Gastado: ${totalExpenses.toFixed(2)}</span>
                    <span>Meta: $3,000.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'debts' && (
          <div className="debts-section">
            <div className="section-header">
              <h2>Gestión de Deudas</h2>
              <button className="add-btn">+ Nueva Deuda</button>
            </div>
            
            <div className="debts-overview">
              <div className="debt-card">
                <h3>Deudas Pendientes</h3>
                <div className="debt-total">$0.00</div>
                <p>No tienes deudas registradas</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
