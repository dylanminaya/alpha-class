import './AdminSidebar.css';

interface AdminSidebarProps {
  currentView: string;
  onViewChange: (view: 'dashboard' | 'transactions' | 'clients' | 'invoices' | 'expenses' | 'reports' | 'settings') => void;
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

const AdminSidebar = ({ currentView, onViewChange, isOpen, onLogout }: AdminSidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'transactions', label: 'Transactions', icon: '💰' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'invoices', label: 'Invoices', icon: '📄' },
    { id: 'expenses', label: 'Expenses', icon: '💸' },
    { id: 'reports', label: 'Reports', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-text">TrackIt</span>
          <span className="admin-badge">Admin</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${currentView === item.id ? 'active' : ''}`}
                onClick={() => onViewChange(item.id as any)}
                title={item.label}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-sidebar-btn" onClick={onLogout} title="Logout">
          <span className="nav-icon">🚪</span>
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
