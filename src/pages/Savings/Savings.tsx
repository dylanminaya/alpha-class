import React, { useState } from 'react';
import './Savings.css';

interface SavingsPlan {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  description: string;
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
}

const Savings: React.FC = () => {
  const [plans, setPlans] = useState<SavingsPlan[]>([
    {
      id: 1,
      name: 'Vacaciones de Verano',
      targetAmount: 5000,
      currentAmount: 3200,
      deadline: '2024-06-15',
      category: 'Viajes',
      description: 'Ahorro para vacaciones familiares',
      status: 'active',
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      name: 'Fondo de Emergencia',
      targetAmount: 10000,
      currentAmount: 7500,
      deadline: '2024-12-31',
      category: 'Emergencias',
      description: 'Fondo para gastos inesperados',
      status: 'active',
      createdAt: '2023-12-01'
    },
    {
      id: 3,
      name: 'Nuevo Laptop',
      targetAmount: 2500,
      currentAmount: 2500,
      deadline: '2024-03-01',
      category: 'Tecnología',
      description: 'Laptop para trabajo',
      status: 'completed',
      createdAt: '2023-11-01'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SavingsPlan | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
    category: '',
    description: ''
  });

  const categories = ['Viajes', 'Emergencias', 'Tecnología', 'Educación', 'Casa', 'Coche', 'Otros'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPlan) {
      // Update existing plan
      setPlans(plans.map(plan => 
        plan.id === editingPlan.id 
          ? {
              ...plan,
              name: formData.name,
              targetAmount: parseFloat(formData.targetAmount),
              deadline: formData.deadline,
              category: formData.category,
              description: formData.description
            }
          : plan
      ));
    } else {
      // Create new plan
      const newPlan: SavingsPlan = {
        id: Date.now(),
        name: formData.name,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: 0,
        deadline: formData.deadline,
        category: formData.category,
        description: formData.description,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setPlans([...plans, newPlan]);
    }
    
    resetForm();
  };

  const handleEdit = (plan: SavingsPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      targetAmount: plan.targetAmount.toString(),
      deadline: plan.deadline,
      category: plan.category,
      description: plan.description
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este plan de ahorro?')) {
      setPlans(plans.filter(plan => plan.id !== id));
    }
  };

  const handleAddAmount = (id: number, amount: number) => {
    setPlans(plans.map(plan => 
      plan.id === id 
        ? {
            ...plan,
            currentAmount: Math.min(plan.currentAmount + amount, plan.targetAmount),
            status: plan.currentAmount + amount >= plan.targetAmount ? 'completed' : 'active'
          }
        : plan
    ));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      targetAmount: '',
      deadline: '',
      category: '',
      description: ''
    });
    setEditingPlan(null);
    setShowModal(false);
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4ecdc4';
      case 'completed': return '#ff6b6b';
      case 'paused': return '#ffa726';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'completed': return 'Completado';
      case 'paused': return 'Pausado';
      default: return 'Desconocido';
    }
  };

  const totalSaved = plans.reduce((sum, plan) => sum + plan.currentAmount, 0);
  const totalTarget = plans.reduce((sum, plan) => sum + plan.targetAmount, 0);

  return (
    <div className="savings-page">
      <div className="savings-container">
        <header className="savings-header">
          <div className="header-content">
            <h1>💰 Planes de Ahorro</h1>
            <p>Gestiona tus metas financieras</p>
          </div>
          <button 
            className="add-plan-btn"
            onClick={() => setShowModal(true)}
          >
            + Nuevo Plan
          </button>
        </header>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <div className="card-icon">💵</div>
            <div className="card-content">
              <h3>Total Ahorrado</h3>
              <div className="card-value">${totalSaved.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="card-icon">🎯</div>
            <div className="card-content">
              <h3>Meta Total</h3>
              <div className="card-value">${totalTarget.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="card-icon">📊</div>
            <div className="card-content">
              <h3>Progreso</h3>
              <div className="card-value">{((totalSaved / totalTarget) * 100).toFixed(1)}%</div>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="card-icon">📋</div>
            <div className="card-content">
              <h3>Planes Activos</h3>
              <div className="card-value">{plans.filter(p => p.status === 'active').length}</div>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="plans-grid">
          {plans.map(plan => (
            <div key={plan.id} className="plan-card">
              <div className="plan-header">
                <div className="plan-info">
                  <h3>{plan.name}</h3>
                  <span className="plan-category">{plan.category}</span>
                </div>
                <div className="plan-actions">
                  <button 
                    className="action-btn edit"
                    onClick={() => handleEdit(plan)}
                  >
                    ✏️
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDelete(plan.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              <p className="plan-description">{plan.description}</p>
              
              <div className="plan-progress">
                <div className="progress-info">
                  <span>${plan.currentAmount.toLocaleString()} / ${plan.targetAmount.toLocaleString()}</span>
                  <span>{getProgressPercentage(plan.currentAmount, plan.targetAmount).toFixed(1)}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${getProgressPercentage(plan.currentAmount, plan.targetAmount)}%`,
                      backgroundColor: getStatusColor(plan.status)
                    }}
                  />
                </div>
              </div>
              
              <div className="plan-details">
                <div className="detail-item">
                  <span className="detail-label">Fecha límite:</span>
                  <span className="detail-value">{new Date(plan.deadline).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Estado:</span>
                  <span 
                    className="detail-value status"
                    style={{ color: getStatusColor(plan.status) }}
                  >
                    {getStatusText(plan.status)}
                  </span>
                </div>
              </div>
              
              {plan.status === 'active' && (
                <div className="add-amount-section">
                  <input
                    type="number"
                    placeholder="Cantidad a agregar"
                    className="amount-input"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.target as HTMLInputElement;
                        const amount = parseFloat(input.value);
                        if (amount > 0) {
                          handleAddAmount(plan.id, amount);
                          input.value = '';
                        }
                      }
                    }}
                  />
                  <button 
                    className="add-amount-btn"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      const amount = parseFloat(input.value);
                      if (amount > 0) {
                        handleAddAmount(plan.id, amount);
                        input.value = '';
                      }
                    }}
                  >
                    Agregar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingPlan ? 'Editar Plan' : 'Nuevo Plan de Ahorro'}</h2>
              <button className="close-btn" onClick={resetForm}>✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="plan-form">
              <div className="form-group">
                <label htmlFor="name">Nombre del Plan</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="targetAmount">Meta de Ahorro ($)</label>
                <input
                  type="number"
                  id="targetAmount"
                  value={formData.targetAmount}
                  onChange={(e) => setFormData({...formData, targetAmount: e.target.value})}
                  min="1"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="deadline">Fecha Límite</label>
                <input
                  type="date"
                  id="deadline"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Categoría</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  required
                />
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetForm}>
                  Cancelar
                </button>
                <button type="submit" className="save-btn">
                  {editingPlan ? 'Actualizar' : 'Crear Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Savings;
