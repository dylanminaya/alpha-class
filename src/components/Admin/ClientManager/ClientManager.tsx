import { useState, useEffect } from 'react';
import './ClientManager.css';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company?: string;
  notes?: string;
  dateAdded: string;
  totalInvoiced: number;
  totalPaid: number;
  activeProjects: number;
  status: 'active' | 'inactive';
}

interface Project {
  id: string;
  clientId: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'paused';
  startDate: string;
  endDate?: string;
  totalAmount: number;
  paidAmount: number;
}

const ClientManager = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'details'>('list');
  const [formData, setFormData] = useState<Partial<Client>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    notes: '',
    status: 'active'
  });

  // Initialize with demo data
  useEffect(() => {
    const demoClients: Client[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john@techstartup.com',
        phone: '+1 (555) 123-4567',
        address: '123 Tech Ave, San Francisco, CA 94105',
        company: 'Tech Startup Inc.',
        notes: 'Prefers weekly progress updates. Payment terms: Net 30.',
        dateAdded: '2024-01-15',
        totalInvoiced: 15750,
        totalPaid: 12500,
        activeProjects: 2,
        status: 'active'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@retailco.com',
        phone: '+1 (555) 987-6543',
        address: '456 Commerce St, New York, NY 10001',
        company: 'Retail Company LLC',
        notes: 'E-commerce platform specialist. Quick turnaround required.',
        dateAdded: '2024-02-01',
        totalInvoiced: 23400,
        totalPaid: 23400,
        activeProjects: 1,
        status: 'active'
      },
      {
        id: '3',
        name: 'Mike Chen',
        email: 'mike@designstudio.com',
        phone: '+1 (555) 456-7890',
        address: '789 Creative Blvd, Los Angeles, CA 90210',
        company: 'Design Studio',
        notes: 'Focus on mobile-first design. Regular client meetings.',
        dateAdded: '2024-01-20',
        totalInvoiced: 8900,
        totalPaid: 7400,
        activeProjects: 1,
        status: 'active'
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily@consulting.com',
        phone: '+1 (555) 321-0987',
        address: '321 Business Park, Chicago, IL 60601',
        company: 'Business Consulting Co.',
        notes: 'Long-term partnership. Quarterly invoicing preferred.',
        dateAdded: '2023-11-10',
        totalInvoiced: 45600,
        totalPaid: 45600,
        activeProjects: 0,
        status: 'inactive'
      },
      {
        id: '5',
        name: 'Alex Rodriguez',
        email: 'alex@fintech.com',
        phone: '+1 (555) 654-3210',
        address: '654 Finance Dr, Austin, TX 78701',
        company: 'FinTech Solutions',
        notes: 'Security-focused projects. Detailed documentation required.',
        dateAdded: '2024-03-05',
        totalInvoiced: 12800,
        totalPaid: 9600,
        activeProjects: 1,
        status: 'active'
      }
    ];

    const demoProjects: Project[] = [
      {
        id: '1',
        clientId: '1',
        title: 'E-commerce Website Development',
        description: 'Complete e-commerce platform with payment integration',
        status: 'active',
        startDate: '2024-02-01',
        totalAmount: 8500,
        paidAmount: 4250
      },
      {
        id: '2',
        clientId: '1',
        title: 'Mobile App UI/UX Design',
        description: 'Native mobile app design for iOS and Android',
        status: 'active',
        startDate: '2024-03-01',
        totalAmount: 4200,
        paidAmount: 0
      },
      {
        id: '3',
        clientId: '2',
        title: 'Brand Identity Redesign',
        description: 'Complete brand refresh including logo and guidelines',
        status: 'completed',
        startDate: '2024-01-15',
        endDate: '2024-02-28',
        totalAmount: 5600,
        paidAmount: 5600
      },
      {
        id: '4',
        clientId: '3',
        title: 'Website Maintenance',
        description: 'Monthly website updates and maintenance',
        status: 'active',
        startDate: '2024-01-01',
        totalAmount: 1200,
        paidAmount: 1200
      },
      {
        id: '5',
        clientId: '5',
        title: 'API Development',
        description: 'RESTful API for financial data processing',
        status: 'active',
        startDate: '2024-03-10',
        totalAmount: 6400,
        paidAmount: 3200
      }
    ];

    setClients(demoClients);
    setProjects(demoProjects);
  }, []);

  const handleAddClient = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      company: '',
      notes: '',
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setFormData(client);
    setIsModalOpen(true);
  };

  const handleDeleteClient = (id: string) => {
    if (window.confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
      setClients(clients.filter(c => c.id !== id));
      setProjects(projects.filter(p => p.clientId !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingClient) {
      // Update existing client
      setClients(clients.map(c => 
        c.id === editingClient.id 
          ? { ...formData, id: editingClient.id } as Client
          : c
      ));
    } else {
      // Add new client
      const newClient: Client = {
        ...formData,
        id: Date.now().toString(),
        dateAdded: new Date().toISOString().split('T')[0],
        totalInvoiced: 0,
        totalPaid: 0,
        activeProjects: 0,
      } as Client;
      setClients([newClient, ...clients]);
    }

    setIsModalOpen(false);
    setEditingClient(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const viewClientDetails = (client: Client) => {
    setSelectedClient(client);
    setActiveTab('details');
  };

  const getClientProjects = (clientId: string) => {
    return projects.filter(p => p.clientId === clientId);
  };

  const activeClients = clients.filter(c => c.status === 'active').length;
  const totalRevenue = clients.reduce((sum, c) => sum + c.totalPaid, 0);
  const pendingPayments = clients.reduce((sum, c) => sum + (c.totalInvoiced - c.totalPaid), 0);

  return (
    <div className="client-manager">
      <div className="client-header">
        <div className="header-content">
          <h1>Client Management</h1>
          <div className="client-stats">
            <div className="stat">
              <span className="stat-value">{activeClients}</span>
              <span className="stat-label">Active Clients</span>
            </div>
            <div className="stat">
              <span className="stat-value">${totalRevenue.toLocaleString()}</span>
              <span className="stat-label">Total Revenue</span>
            </div>
            <div className="stat">
              <span className="stat-value">${pendingPayments.toLocaleString()}</span>
              <span className="stat-label">Pending Payments</span>
            </div>
          </div>
        </div>
        <button className="add-btn" onClick={handleAddClient}>
          ➕ Add Client
        </button>
      </div>

      <div className="client-tabs">
        <button 
          className={`tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          📋 Client List
        </button>
        {selectedClient && (
          <button 
            className={`tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            👤 {selectedClient.name}
          </button>
        )}
      </div>

      {activeTab === 'list' ? (
        <div className="clients-table-container">
          <table className="clients-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Company</th>
                <th>Contact</th>
                <th>Projects</th>
                <th>Revenue</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className={client.status}>
                  <td>
                    <div className="client-info">
                      <div className="client-name">{client.name}</div>
                      <div className="client-date">Added {new Date(client.dateAdded).toLocaleDateString()}</div>
                    </div>
                  </td>
                  <td>{client.company || '-'}</td>
                  <td>
                    <div className="contact-info">
                      <div>{client.email}</div>
                      <div className="phone">{client.phone}</div>
                    </div>
                  </td>
                  <td>
                    <span className="project-count">{client.activeProjects} active</span>
                  </td>
                  <td>
                    <div className="revenue-info">
                      <div className="total-paid">${client.totalPaid.toLocaleString()}</div>
                      {client.totalInvoiced > client.totalPaid && (
                        <div className="pending">${(client.totalInvoiced - client.totalPaid).toLocaleString()} pending</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${client.status}`}>
                      {client.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="view-btn"
                        onClick={() => viewClientDetails(client)}
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditClient(client)}
                        title="Edit Client"
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteClient(client.id)}
                        title="Delete Client"
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
      ) : selectedClient && (
        <div className="client-details">
          <div className="details-header">
            <button 
              className="back-btn"
              onClick={() => setActiveTab('list')}
            >
              ← Back to List
            </button>
            <div className="client-actions">
              <button 
                className="edit-btn"
                onClick={() => handleEditClient(selectedClient)}
              >
                ✏️ Edit Client
              </button>
            </div>
          </div>

          <div className="details-grid">
            <div className="client-info-card">
              <h3>📋 Client Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Name:</label>
                  <span>{selectedClient.name}</span>
                </div>
                <div className="info-item">
                  <label>Company:</label>
                  <span>{selectedClient.company || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <span>{selectedClient.email}</span>
                </div>
                <div className="info-item">
                  <label>Phone:</label>
                  <span>{selectedClient.phone}</span>
                </div>
                <div className="info-item full-width">
                  <label>Address:</label>
                  <span>{selectedClient.address}</span>
                </div>
                {selectedClient.notes && (
                  <div className="info-item full-width">
                    <label>Notes:</label>
                    <span>{selectedClient.notes}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="financial-summary-card">
              <h3>💰 Financial Summary</h3>
              <div className="financial-stats">
                <div className="financial-stat">
                  <span className="stat-label">Total Invoiced</span>
                  <span className="stat-value">${selectedClient.totalInvoiced.toLocaleString()}</span>
                </div>
                <div className="financial-stat">
                  <span className="stat-label">Total Paid</span>
                  <span className="stat-value paid">${selectedClient.totalPaid.toLocaleString()}</span>
                </div>
                <div className="financial-stat">
                  <span className="stat-label">Outstanding</span>
                  <span className="stat-value outstanding">
                    ${(selectedClient.totalInvoiced - selectedClient.totalPaid).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="projects-card">
              <h3>🚀 Project History</h3>
              <div className="projects-list">
                {getClientProjects(selectedClient.id).map(project => (
                  <div key={project.id} className="project-item">
                    <div className="project-header">
                      <h4>{project.title}</h4>
                      <span className={`project-status ${project.status}`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="project-description">{project.description}</p>
                    <div className="project-details">
                      <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
                      {project.endDate && (
                        <span>Ended: {new Date(project.endDate).toLocaleDateString()}</span>
                      )}
                      <span>Amount: ${project.totalAmount.toLocaleString()}</span>
                      <span>Paid: ${project.paidAmount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
                {getClientProjects(selectedClient.id).length === 0 && (
                  <p className="no-projects">No projects found for this client.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingClient ? 'Edit Client' : 'Add New Client'}</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                ✕
              </button>
            </div>

            <form className="client-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={2}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingClient ? 'Update' : 'Add'} Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManager;






