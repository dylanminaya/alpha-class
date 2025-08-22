import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionManager from '../../../components/Admin/TransactionManager/TransactionManager';
import ClientManager from '../../../components/Admin/ClientManager/ClientManager';
import InvoiceManager from '../../../components/Admin/InvoiceManager/InvoiceManager';
import ExpenseManager from '../../../components/Admin/ExpenseManager/ExpenseManager';
import ReportsManager from '../../../components/Admin/ReportsManager/ReportsManager';
import SettingsManager from '../../../components/Admin/SettingsManager/SettingsManager';
import DashboardHome from '../../../components/Admin/DashboardHome/DashboardHome';
import AdminSidebar from '../../../components/Admin/AdminSidebar/AdminSidebar';
import './AdminDashboard.css';

type AdminView = 'dashboard' | 'transactions' | 'clients' | 'invoices' | 'expenses' | 'reports' | 'settings';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is admin
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'admin') {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'transactions':
        return <TransactionManager />;
      case 'clients':
        return <ClientManager />;
      case 'invoices':
        return <InvoiceManager />;
      case 'expenses':
        return <ExpenseManager />;
      case 'reports':
        return <ReportsManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <DashboardHome onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={handleLogout}
      />
      
      <div className={`admin-main ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
        <div className="admin-header">
          <button
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <div className="admin-header-right">
            <span className="admin-user">Admin User</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        
        <div className="admin-content-container">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
