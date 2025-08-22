import { useState, useEffect } from 'react';
import './InvoiceManager.css';

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  issueDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  notes?: string;
  paymentMethod?: string;
  paidDate?: Date;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  address?: string;
}

const InvoiceManager = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'status' | 'client'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Sample data
  useEffect(() => {
    const sampleClients: Client[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john@techcorp.com',
        company: 'TechCorp Solutions',
        phone: '+1 (555) 123-4567',
        address: '123 Business Ave, Tech City, TC 12345'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@designstudio.com',
        company: 'Creative Design Studio',
        phone: '+1 (555) 987-6543',
        address: '456 Creative Blvd, Design Town, DT 67890'
      }
    ];
    setClients(sampleClients);

    const sampleInvoices: Invoice[] = [
      {
        id: '1',
        invoiceNumber: 'INV-2024-001',
        clientName: 'John Smith',
        clientEmail: 'john@techcorp.com',
        issueDate: new Date('2024-01-15'),
        dueDate: new Date('2024-02-15'),
        items: [
          {
            id: '1',
            description: 'Website Development',
            quantity: 1,
            unitPrice: 2500,
            total: 2500
          },
          {
            id: '2',
            description: 'SEO Optimization',
            quantity: 1,
            unitPrice: 800,
            total: 800
          }
        ],
        subtotal: 3300,
        taxRate: 8.5,
        taxAmount: 280.5,
        total: 3580.5,
        status: 'sent',
        notes: 'Payment due within 30 days'
      },
      {
        id: '2',
        invoiceNumber: 'INV-2024-002',
        clientName: 'Sarah Johnson',
        clientEmail: 'sarah@designstudio.com',
        issueDate: new Date('2024-01-20'),
        dueDate: new Date('2024-02-20'),
        items: [
          {
            id: '3',
            description: 'Logo Design',
            quantity: 1,
            unitPrice: 500,
            total: 500
          }
        ],
        subtotal: 500,
        taxRate: 8.5,
        taxAmount: 42.5,
        total: 542.5,
        status: 'paid',
        notes: 'Logo design for new product launch',
        paymentMethod: 'Credit Card',
        paidDate: new Date('2024-01-25')
      }
    ];
    setInvoices(sampleInvoices);
  }, []);

  const addInvoice = (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => {
    const newInvoice: Invoice = {
      ...invoice,
      id: Date.now().toString(),
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`,
      status: 'draft'
    };
    setInvoices(prev => [newInvoice, ...prev]);
    setShowInvoiceForm(false);
  };

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    setInvoices(prev => prev.map(invoice => 
      invoice.id === id ? { ...invoice, ...updates } : invoice
    ));
    setEditingInvoice(null);
  };

  const deleteInvoice = (id: string) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(prev => prev.filter(invoice => invoice.id !== id));
    }
  };

  const addClient = (client: Omit<Client, 'id'>) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString()
    };
    setClients(prev => [...prev, newClient]);
    setShowClientForm(false);
  };

  const sendInvoice = (id: string) => {
    updateInvoice(id, { status: 'sent' });
    // Here you would typically integrate with email service
    alert('Invoice sent successfully!');
  };

  const markAsPaid = (id: string) => {
    updateInvoice(id, { 
      status: 'paid', 
      paidDate: new Date(),
      paymentMethod: 'Manual Entry'
    });
  };

  const getFilteredAndSortedInvoices = () => {
    let filtered = invoices;
    
    if (filterStatus !== 'all') {
      filtered = invoices.filter(invoice => invoice.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(invoice => 
        invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = b.issueDate.getTime() - a.issueDate.getTime();
          break;
        case 'amount':
          comparison = b.total - a.total;
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'client':
          comparison = a.clientName.localeCompare(b.clientName);
          break;
      }
      return sortOrder === 'asc' ? -comparison : comparison;
    });
  };

  const getTotalInvoiced = () => {
    return invoices.reduce((total, invoice) => total + invoice.total, 0);
  };

  const getTotalPaid = () => {
    return invoices
      .filter(invoice => invoice.status === 'paid')
      .reduce((total, invoice) => total + invoice.total, 0);
  };

  const getOutstandingAmount = () => {
    return invoices
      .filter(invoice => ['sent', 'overdue'].includes(invoice.status))
      .reduce((total, invoice) => total + invoice.total, 0);
  };

  const getOverdueInvoices = () => {
    const today = new Date();
    return invoices.filter(invoice => 
      invoice.status === 'sent' && invoice.dueDate < today
    );
  };

  // Update overdue invoices
  useEffect(() => {
    const today = new Date();
    const overdueInvoices = invoices.filter(invoice => 
      invoice.status === 'sent' && invoice.dueDate < today
    );
    
    if (overdueInvoices.length > 0) {
      overdueInvoices.forEach(invoice => {
        updateInvoice(invoice.id, { status: 'overdue' });
      });
    }
  }, [invoices]);

  return (
    <div className="invoice-manager">
      <div className="feature-header">
        <h1>📄 Invoice Management</h1>
        <p>Create, send, and track invoices with customizable templates</p>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-icon">💰</div>
          <div className="summary-content">
            <h3>Total Invoiced</h3>
            <p className="summary-amount">${getTotalInvoiced().toFixed(2)}</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">✅</div>
          <div className="summary-content">
            <h3>Total Paid</h3>
            <p className="summary-amount">${getTotalPaid().toFixed(2)}</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">⏳</div>
          <div className="summary-content">
            <h3>Outstanding</h3>
            <p className="summary-amount">${getOutstandingAmount().toFixed(2)}</p>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">🚨</div>
          <div className="summary-content">
            <h3>Overdue</h3>
            <p className="summary-amount">{getOverdueInvoices().length}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-section">
        <div className="controls-left">
          <button 
            className="btn btn-primary"
            onClick={() => setShowInvoiceForm(true)}
          >
            ➕ Create Invoice
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowClientForm(true)}
          >
            👥 Add Client
          </button>
        </div>
        <div className="controls-right">
          <input
            type="text"
            placeholder="Search invoices or clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'amount' | 'status' | 'client')}
            className="sort-select"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="status">Sort by Status</option>
            <option value="client">Sort by Client</option>
          </select>
          <button 
            className="btn btn-icon"
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Invoices List */}
      <div className="invoices-section">
        <h2>📋 Invoice Records</h2>
        <div className="invoices-list">
          {getFilteredAndSortedInvoices().map(invoice => (
            <div key={invoice.id} className={`invoice-item status-${invoice.status}`}>
              <div className="invoice-main">
                <div className="invoice-info">
                  <div className="invoice-header">
                    <h3>{invoice.invoiceNumber}</h3>
                    <span className={`status status-${invoice.status}`}>
                      {invoice.status}
                    </span>
                  </div>
                  <div className="invoice-meta">
                    <span className="client-name">{invoice.clientName}</span>
                    <span className="invoice-date">
                      Issued: {invoice.issueDate.toLocaleDateString()}
                    </span>
                    <span className="due-date">
                      Due: {invoice.dueDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="invoice-items-preview">
                    {invoice.items.slice(0, 2).map(item => (
                      <span key={item.id} className="item-preview">
                        {item.description} (${item.total})
                      </span>
                    ))}
                    {invoice.items.length > 2 && (
                      <span className="more-items">+{invoice.items.length - 2} more</span>
                    )}
                  </div>
                  {invoice.notes && (
                    <p className="invoice-notes">{invoice.notes}</p>
                  )}
                </div>
                <div className="invoice-amount">
                  <span className="amount">${invoice.total.toFixed(2)}</span>
                  {invoice.status === 'paid' && invoice.paidDate && (
                    <span className="paid-date">
                      Paid: {invoice.paidDate.toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="invoice-actions">
                {invoice.status === 'draft' && (
                  <button 
                    className="btn btn-small btn-primary"
                    onClick={() => sendInvoice(invoice.id)}
                  >
                    📤 Send
                  </button>
                )}
                {invoice.status === 'sent' && (
                  <button 
                    className="btn btn-small btn-success"
                    onClick={() => markAsPaid(invoice.id)}
                  >
                    ✅ Mark Paid
                  </button>
                )}
                <button 
                  className="btn btn-small btn-secondary"
                  onClick={() => setEditingInvoice(invoice)}
                >
                  ✏️ Edit
                </button>
                <button 
                  className="btn btn-small btn-danger"
                  onClick={() => deleteInvoice(invoice.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice Form */}
      {showInvoiceForm && (
        <InvoiceForm
          onSubmit={addInvoice}
          clients={clients}
          onCancel={() => setShowInvoiceForm(false)}
        />
      )}

      {editingInvoice && (
        <InvoiceForm
          invoice={editingInvoice}
          onSubmit={(updates) => updateInvoice(editingInvoice.id, updates)}
          clients={clients}
          onCancel={() => setEditingInvoice(null)}
        />
      )}

      {/* Client Form */}
      {showClientForm && (
        <ClientForm
          onSubmit={addClient}
          onCancel={() => setShowClientForm(false)}
        />
      )}
    </div>
  );
};

// Invoice Form Component
interface InvoiceFormProps {
  invoice?: Invoice;
  onSubmit: (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => void;
  clients: Client[];
  onCancel: () => void;
}

const InvoiceForm = ({ invoice, onSubmit, clients, onCancel }: InvoiceFormProps) => {
  const [formData, setFormData] = useState({
    clientName: invoice?.clientName || '',
    clientEmail: invoice?.clientEmail || '',
    issueDate: invoice?.issueDate ? invoice.issueDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    dueDate: invoice?.dueDate ? invoice.dueDate.toISOString().split('T')[0] : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: invoice?.items || [{ id: '1', description: '', quantity: 1, unitPrice: 0, total: 0 }],
    taxRate: invoice?.taxRate || 8.5,
    notes: invoice?.notes || ''
  });

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        id: Date.now().toString(),
        description: '',
        quantity: 1,
        unitPrice: 0,
        total: 0
      }]
    }));
  };

  const removeItem = (id: string) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id)
      }));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = subtotal * (formData.taxRate / 100);
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { subtotal, taxAmount, total } = calculateTotals();
    
    onSubmit({
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      issueDate: new Date(formData.issueDate),
      dueDate: new Date(formData.dueDate),
      items: formData.items,
      subtotal,
      taxRate: formData.taxRate,
      taxAmount,
      total,
      notes: formData.notes,
      status: 'draft'
    });
  };

  const { subtotal, taxAmount, total } = calculateTotals();

  return (
    <div className="modal-overlay">
      <div className="modal invoice-modal">
        <div className="modal-header">
          <h2>{invoice ? '✏️ Edit Invoice' : '➕ Create New Invoice'}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="invoice-form">
          <div className="form-row">
            <div className="form-group">
              <label>Client Name *</label>
              <select
                value={formData.clientName}
                onChange={(e) => {
                  const client = clients.find(c => c.name === e.target.value);
                  setFormData(prev => ({
                    ...prev,
                    clientName: e.target.value,
                    clientEmail: client?.email || ''
                  }));
                }}
                required
              >
                <option value="">Select a client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.name}>
                    {client.name} - {client.company || client.email}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Client Email *</label>
              <input
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                required
                placeholder="client@example.com"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Issue Date *</label>
              <input
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label>Due Date *</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Invoice Items *</label>
            <div className="invoice-items">
              {formData.items.map((item) => (
                <div key={item.id} className="invoice-item-row">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    placeholder="Item description"
                    className="item-description"
                    required
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                    placeholder="Qty"
                    className="item-quantity"
                    min="1"
                    required
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                    placeholder="Unit Price"
                    className="item-price"
                    min="0"
                    required
                  />
                  <span className="item-total">${item.total.toFixed(2)}</span>
                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-small btn-danger"
                      onClick={() => removeItem(item.id)}
                    >
                      🗑️
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary add-item-btn"
                onClick={addItem}
              >
                ➕ Add Item
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tax Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.taxRate}
                onChange={(e) => setFormData(prev => ({ ...prev, taxRate: Number(e.target.value) }))}
                placeholder="8.5"
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes for the client..."
                rows={3}
              />
            </div>
          </div>

          <div className="invoice-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax ({formData.taxRate}%):</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {invoice ? 'Update Invoice' : 'Create Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Client Form Component
interface ClientFormProps {
  onSubmit: (client: Omit<Client, 'id'>) => void;
  onCancel: () => void;
}

const ClientForm = ({ onSubmit, onCancel }: ClientFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>👥 Add New Client</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="client-form">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              placeholder="John Smith"
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              placeholder="john@example.com"
            />
          </div>
          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              placeholder="Company Name (optional)"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="123 Business St, City, State ZIP"
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceManager;






