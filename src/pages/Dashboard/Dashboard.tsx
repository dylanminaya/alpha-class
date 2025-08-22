import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import ExpenseChart from '../../components/Charts/ExpenseChart';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('graficos');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Mock data for dashboard
  const stats = [
    { label: 'Usuarios Totales', value: '2,847', change: '+12%', icon: '👥' },
    { label: 'Ingresos Mensuales', value: '$45,230', change: '+8%', icon: '💰' },
    { label: 'Transacciones', value: '1,234', change: '+15%', icon: '💳' },
    { label: 'Crecimiento', value: '23.5%', change: '+3%', icon: '📈' }
  ];

  const recentTransactions = [
    { id: 1, user: 'Juan Pérez', amount: '$1,250', type: 'Ingreso', date: '2024-01-20' },
    { id: 2, user: 'María García', amount: '$890', type: 'Gasto', date: '2024-01-20' },
    { id: 3, user: 'Carlos López', amount: '$2,100', type: 'Ingreso', date: '2024-01-19' },
    { id: 4, user: 'Ana Martínez', amount: '$650', type: 'Gasto', date: '2024-01-19' },
    { id: 5, user: 'Pedro Rodríguez', amount: '$1,800', type: 'Ingreso', date: '2024-01-18' }
  ];

  const users = [
    { id: 1, name: 'Juan Pérez', email: 'juan@email.com', status: 'Activo', joinDate: '2024-01-15' },
    { id: 2, name: 'María García', email: 'maria@email.com', status: 'Activo', joinDate: '2024-01-10' },
    { id: 3, name: 'Carlos López', email: 'carlos@email.com', status: 'Inactivo', joinDate: '2024-01-05' },
    { id: 4, name: 'Ana Martínez', email: 'ana@email.com', status: 'Activo', joinDate: '2023-12-20' }
  ];

  const loans = [
    { id: 1, user: 'Juan Pérez', amount: '$5,000', status: 'Aprobado', date: '2024-01-18' },
    { id: 2, user: 'María García', amount: '$3,500', status: 'Pendiente', date: '2024-01-19' },
    { id: 3, user: 'Carlos López', amount: '$7,200', status: 'Rechazado', date: '2024-01-17' }
  ];

  const cards = [
    { id: 1, user: 'Juan Pérez', cardNumber: '**** 1234', type: 'Débito', status: 'Activa' },
    { id: 2, user: 'María García', cardNumber: '**** 5678', type: 'Crédito', status: 'Bloqueada' },
    { id: 3, user: 'Carlos López', cardNumber: '**** 9012', type: 'Débito', status: 'Activa' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'graficos':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>📊 Análisis y Gráficos</h2>
              <p>Visualización de datos financieros</p>
            </div>
            
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-info">
                    <h3>{stat.value}</h3>
                    <p>{stat.label}</p>
                    <span className="stat-change positive">{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="charts-section">
              <div className="chart-card">
                <h3>Ingresos vs Gastos</h3>
                <ExpenseChart type="bar" title="Ingresos vs Gastos" />
              </div>

              <div className="chart-card">
                <h3>Gastos por Categoría</h3>
                <ExpenseChart type="doughnut" title="Gastos por Categoría" />
              </div>
            </div>
          </div>
        );

      case 'usuarios':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>👥 Gestión de Usuarios</h2>
              <p>Administrar usuarios del sistema</p>
            </div>
            
            <div className="users-table">
              <div className="table-header">
                <span>Nombre</span>
                <span>Email</span>
                <span>Estado</span>
                <span>Fecha de Registro</span>
              </div>
              {users.map(user => (
                <div key={user.id} className="table-row">
                  <span>{user.name}</span>
                  <span>{user.email}</span>
                  <span className={`status ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                  <span>{user.joinDate}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'transacciones':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>💳 Transacciones</h2>
              <p>Historial de transacciones del sistema</p>
            </div>
            
            <div className="transactions-table">
              <div className="table-header">
                <span>Usuario</span>
                <span>Monto</span>
                <span>Tipo</span>
                <span>Fecha</span>
              </div>
              {recentTransactions.map(transaction => (
                <div key={transaction.id} className="table-row">
                  <span>{transaction.user}</span>
                  <span className={transaction.type === 'Ingreso' ? 'amount-positive' : 'amount-negative'}>
                    {transaction.amount}
                  </span>
                  <span className={`type ${transaction.type.toLowerCase()}`}>
                    {transaction.type}
                  </span>
                  <span>{transaction.date}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'prestamos':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>💰 Préstamos</h2>
              <p>Gestión de solicitudes de préstamos</p>
            </div>
            
            <div className="loans-table">
              <div className="table-header">
                <span>Usuario</span>
                <span>Monto</span>
                <span>Estado</span>
                <span>Fecha</span>
              </div>
              {loans.map(loan => (
                <div key={loan.id} className="table-row">
                  <span>{loan.user}</span>
                  <span className="amount-positive">{loan.amount}</span>
                  <span className={`loan-status ${loan.status.toLowerCase()}`}>
                    {loan.status}
                  </span>
                  <span>{loan.date}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tarjetas':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>💎 Tarjetas</h2>
              <p>Administración de tarjetas de usuarios</p>
            </div>
            
            <div className="cards-table">
              <div className="table-header">
                <span>Usuario</span>
                <span>Número</span>
                <span>Tipo</span>
                <span>Estado</span>
              </div>
              {cards.map(card => (
                <div key={card.id} className="table-row">
                  <span>{card.user}</span>
                  <span>{card.cardNumber}</span>
                  <span className={`card-type ${card.type.toLowerCase()}`}>
                    {card.type}
                  </span>
                  <span className={`card-status ${card.status.toLowerCase()}`}>
                    {card.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={setIsSidebarCollapsed}
      />
      
      <div className={`dashboard-main ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Panel de Administración</h1>
            <p>Bienvenido, {user?.name}</p>
          </div>
        </div>

        <div className="dashboard-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
