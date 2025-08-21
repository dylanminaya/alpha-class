import React, { useState } from 'react';
import './Loans.css';

interface LoanApplication {
  id: number;
  amount: number;
  purpose: string;
  term: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  monthlyPayment?: number;
  totalInterest?: number;
}

const Loans: React.FC = () => {
  const [applications, setApplications] = useState<LoanApplication[]>([
    {
      id: 1,
      amount: 15000,
      purpose: 'Renovación de casa',
      term: 36,
      status: 'approved',
      createdAt: '2024-01-10',
      monthlyPayment: 450,
      totalInterest: 1200
    },
    {
      id: 2,
      amount: 8000,
      purpose: 'Compra de vehículo',
      term: 24,
      status: 'pending',
      createdAt: '2024-01-15'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    term: '12',
    income: '',
    employment: '',
    creditScore: ''
  });

  const loanPurposes = [
    'Renovación de casa',
    'Compra de vehículo',
    'Consolidación de deudas',
    'Educación',
    'Emergencia médica',
    'Negocio',
    'Viajes',
    'Otros'
  ];

  const terms = [12, 24, 36, 48, 60];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newApplication: LoanApplication = {
      id: Date.now(),
      amount: parseFloat(formData.amount),
      purpose: formData.purpose,
      term: parseInt(formData.term),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setApplications([...applications, newApplication]);
    setShowForm(false);
    setFormData({
      amount: '',
      purpose: '',
      term: '12',
      income: '',
      employment: '',
      creditScore: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#4ecdc4';
      case 'rejected': return '#ff6b6b';
      case 'pending': return '#ffa726';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Aprobado';
      case 'rejected': return 'Rechazado';
      case 'pending': return 'En Revisión';
      default: return 'Desconocido';
    }
  };

  const calculateLoan = (amount: number, term: number) => {
    const rate = 0.08; // 8% annual interest rate
    const monthlyRate = rate / 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                          (Math.pow(1 + monthlyRate, term) - 1);
    const totalInterest = (monthlyPayment * term) - amount;
    
    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest)
    };
  };

  return (
    <div className="loans-page">
      <div className="loans-container">
        <header className="loans-header">
          <div className="header-content">
            <h1>🏦 Solicitud de Préstamos</h1>
            <p>Financiamiento personalizado para tus necesidades</p>
          </div>
          <button 
            className="apply-loan-btn"
            onClick={() => setShowForm(true)}
          >
            + Solicitar Préstamo
          </button>
        </header>

        {/* Loan Calculator */}
        <div className="loan-calculator">
          <h2>💡 Calculadora de Préstamos</h2>
          <div className="calculator-grid">
            <div className="calculator-card">
              <h3>Préstamo Personal</h3>
              <div className="loan-details">
                <div className="detail-row">
                  <span>Monto máximo:</span>
                  <span className="amount">$50,000</span>
                </div>
                <div className="detail-row">
                  <span>Tasa de interés:</span>
                  <span className="rate">8% anual</span>
                </div>
                <div className="detail-row">
                  <span>Plazo máximo:</span>
                  <span>60 meses</span>
                </div>
              </div>
            </div>
            
            <div className="calculator-card">
              <h3>Préstamo Hipotecario</h3>
              <div className="loan-details">
                <div className="detail-row">
                  <span>Monto máximo:</span>
                  <span className="amount">$500,000</span>
                </div>
                <div className="detail-row">
                  <span>Tasa de interés:</span>
                  <span className="rate">6% anual</span>
                </div>
                <div className="detail-row">
                  <span>Plazo máximo:</span>
                  <span>30 años</span>
                </div>
              </div>
            </div>
            
            <div className="calculator-card">
              <h3>Préstamo Automotriz</h3>
              <div className="loan-details">
                <div className="detail-row">
                  <span>Monto máximo:</span>
                  <span className="amount">$100,000</span>
                </div>
                <div className="detail-row">
                  <span>Tasa de interés:</span>
                  <span className="rate">7% anual</span>
                </div>
                <div className="detail-row">
                  <span>Plazo máximo:</span>
                  <span>72 meses</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applications History */}
        <div className="applications-section">
          <h2>📋 Historial de Solicitudes</h2>
          <div className="applications-grid">
            {applications.map(app => (
              <div key={app.id} className="application-card">
                <div className="app-header">
                  <div className="app-info">
                    <h3>${app.amount.toLocaleString()}</h3>
                    <span className="app-purpose">{app.purpose}</span>
                  </div>
                  <div 
                    className="app-status"
                    style={{ backgroundColor: getStatusColor(app.status) }}
                  >
                    {getStatusText(app.status)}
                  </div>
                </div>
                
                <div className="app-details">
                  <div className="detail-item">
                    <span className="detail-label">Plazo:</span>
                    <span>{app.term} meses</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Fecha:</span>
                    <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                  </div>
                  {app.monthlyPayment && (
                    <div className="detail-item">
                      <span className="detail-label">Pago mensual:</span>
                      <span>${app.monthlyPayment}</span>
                    </div>
                  )}
                  {app.totalInterest && (
                    <div className="detail-item">
                      <span className="detail-label">Interés total:</span>
                      <span>${app.totalInterest}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Solicitud de Préstamo</h2>
              <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="loan-form">
              <div className="form-group">
                <label htmlFor="amount">Monto del Préstamo ($)</label>
                <input
                  type="number"
                  id="amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  min="1000"
                  max="50000"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="purpose">Propósito del Préstamo</label>
                <select
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  required
                >
                  <option value="">Selecciona el propósito</option>
                  {loanPurposes.map(purpose => (
                    <option key={purpose} value={purpose}>{purpose}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="term">Plazo (meses)</label>
                <select
                  id="term"
                  value={formData.term}
                  onChange={(e) => setFormData({...formData, term: e.target.value})}
                  required
                >
                  {terms.map(term => (
                    <option key={term} value={term}>{term} meses</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="income">Ingreso Mensual ($)</label>
                <input
                  type="number"
                  id="income"
                  value={formData.income}
                  onChange={(e) => setFormData({...formData, income: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="employment">Tiempo de Empleo (años)</label>
                <input
                  type="number"
                  id="employment"
                  value={formData.employment}
                  onChange={(e) => setFormData({...formData, employment: e.target.value})}
                  min="0"
                  max="50"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="creditScore">Puntuación de Crédito</label>
                <input
                  type="number"
                  id="creditScore"
                  value={formData.creditScore}
                  onChange={(e) => setFormData({...formData, creditScore: e.target.value})}
                  min="300"
                  max="850"
                  required
                />
              </div>
              
              {formData.amount && formData.term && (
                <div className="loan-preview">
                  <h3>Resumen del Préstamo</h3>
                  <div className="preview-details">
                    <div className="preview-item">
                      <span>Monto:</span>
                      <span>${parseFloat(formData.amount).toLocaleString()}</span>
                    </div>
                    <div className="preview-item">
                      <span>Plazo:</span>
                      <span>{formData.term} meses</span>
                    </div>
                    <div className="preview-item">
                      <span>Pago mensual estimado:</span>
                      <span>${calculateLoan(parseFloat(formData.amount), parseInt(formData.term)).monthlyPayment}</span>
                    </div>
                    <div className="preview-item">
                      <span>Interés total estimado:</span>
                      <span>${calculateLoan(parseFloat(formData.amount), parseInt(formData.term)).totalInterest}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
                <button type="submit" className="submit-btn">
                  Enviar Solicitud
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loans;
