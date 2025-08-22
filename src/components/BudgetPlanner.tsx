import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  Plus,
  Trash2,
  Edit3,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import './BudgetPlanner.css';

interface BudgetCategory {
  id: string;
  name: string;
  planned: number;
  spent: number;
  color: string;
}

interface BudgetGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  status: 'on-track' | 'at-risk' | 'completed';
}

const BudgetPlanner: React.FC = () => {
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([
    { id: '1', name: 'Herramientas de Trabajo', planned: 200, spent: 150, color: '#4f46e5' },
    { id: '2', name: 'Oficina & Coworking', planned: 300, spent: 280, color: '#10b981' },
    { id: '3', name: 'Marketing & Publicidad', planned: 150, spent: 120, color: '#f59e0b' },
    { id: '4', name: 'Educación & Cursos', planned: 100, spent: 80, color: '#ef4444' },
    { id: '5', name: 'Software & Suscripciones', planned: 80, spent: 75, color: '#8b5cf6' },
  ]);

  const [budgetGoals, setBudgetGoals] = useState<BudgetGoal[]>([
    { id: '1', name: 'Ahorro Mensual', target: 1000, current: 750, deadline: '2024-01-31', status: 'on-track' },
    { id: '2', name: 'Fondo de Emergencia', target: 5000, current: 3200, deadline: '2024-06-30', status: 'at-risk' },
    { id: '3', name: 'Inversión en Equipo', target: 800, current: 800, deadline: '2024-02-15', status: 'completed' },
  ]);

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingGoal, setEditingGoal] = useState<string | null>(null);

  const [newCategory, setNewCategory] = useState({
    name: '',
    planned: '',
    color: '#4f46e5'
  });

  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    deadline: new Date().toISOString().split('T')[0]
  });

  const totalPlanned = budgetCategories.reduce((sum, cat) => sum + cat.planned, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = totalPlanned - totalSpent;
  const budgetUtilization = (totalSpent / totalPlanned) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return '#10b981';
      case 'at-risk': return '#f59e0b';
      case 'completed': return '#4f46e5';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle size={20} />;
      case 'at-risk': return <AlertTriangle size={20} />;
      case 'completed': return <CheckCircle size={20} />;
      default: return null;
    }
  };

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.planned) {
      const category: BudgetCategory = {
        id: Date.now().toString(),
        name: newCategory.name,
        planned: parseFloat(newCategory.planned),
        spent: 0,
        color: newCategory.color
      };
      setBudgetCategories([...budgetCategories, category]);
      setNewCategory({ name: '', planned: '', color: '#4f46e5' });
      setShowAddCategory(false);
    }
  };

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.target) {
      const goal: BudgetGoal = {
        id: Date.now().toString(),
        name: newGoal.name,
        target: parseFloat(newGoal.target),
        current: 0,
        deadline: newGoal.deadline,
        status: 'on-track'
      };
      setBudgetGoals([...budgetGoals, goal]);
      setNewGoal({ name: '', target: '', deadline: new Date().toISOString().split('T')[0] });
      setShowAddGoal(false);
    }
  };

  const handleDeleteCategory = (id: string) => {
    setBudgetCategories(budgetCategories.filter(cat => cat.id !== id));
  };

  const handleDeleteGoal = (id: string) => {
    setBudgetGoals(budgetGoals.filter(goal => goal.id !== id));
  };

  const handleUpdateSpent = (id: string, spent: number) => {
    setBudgetCategories(budgetCategories.map(cat => 
      cat.id === id ? { ...cat, spent } : cat
    ));
  };

  const handleUpdateGoalProgress = (id: string, current: number) => {
    setBudgetGoals(budgetGoals.map(goal => {
      if (goal.id === id) {
        let status: 'on-track' | 'at-risk' | 'completed' = 'on-track';
        if (current >= goal.target) status = 'completed';
        else if (current < goal.target * 0.7) status = 'at-risk';
        return { ...goal, current, status };
      }
      return goal;
    }));
  };

  return (
    <motion.div 
      className="budget-planner"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="budget-header">
        <h1>Planificador de Presupuesto</h1>
        <p>Organiza y controla tus finanzas mensuales</p>
      </div>

      {/* Resumen del Presupuesto */}
      <motion.div 
        className="budget-summary"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="summary-card total-budget">
          <h3>Presupuesto Total</h3>
          <span className="amount">${totalPlanned.toLocaleString()}</span>
        </div>
        
        <div className="summary-card spent-budget">
          <h3>Gastado</h3>
          <span className="amount">${totalSpent.toLocaleString()}</span>
        </div>
        
        <div className="summary-card remaining-budget">
          <h3>Restante</h3>
          <span className="amount">${remainingBudget.toLocaleString()}</span>
        </div>
        
        <div className="summary-card utilization">
          <h3>Utilización</h3>
          <span className="amount">{budgetUtilization.toFixed(1)}%</span>
        </div>
      </motion.div>

      {/* Categorías de Presupuesto */}
      <motion.div 
        className="budget-categories"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="section-header">
          <h2>Categorías de Presupuesto</h2>
          <motion.button
            className="add-btn"
            onClick={() => setShowAddCategory(!showAddCategory)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
            Agregar Categoría
          </motion.button>
        </div>

        {showAddCategory && (
          <motion.div 
            className="add-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="form-row">
              <input
                type="text"
                placeholder="Nombre de la categoría"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Presupuesto planeado"
                value={newCategory.planned}
                onChange={(e) => setNewCategory({ ...newCategory, planned: e.target.value })}
              />
              <input
                type="color"
                value={newCategory.color}
                onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
              />
              <button onClick={handleAddCategory} className="submit-btn">
                Agregar
              </button>
            </div>
          </motion.div>
        )}

        <div className="categories-grid">
          {budgetCategories.map((category) => (
            <motion.div
              key={category.id}
              className="category-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="category-header">
                <div 
                  className="category-color" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <h3>{category.name}</h3>
                <div className="category-actions">
                  <button 
                    onClick={() => setEditingCategory(category.id)}
                    className="edit-btn"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteCategory(category.id)}
                    className="delete-btn"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="category-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${Math.min((category.spent / category.planned) * 100, 100)}%`,
                      backgroundColor: category.color
                    }}
                  ></div>
                </div>
                <div className="progress-stats">
                  <span>${category.spent.toLocaleString()} / ${category.planned.toLocaleString()}</span>
                  <span>{((category.spent / category.planned) * 100).toFixed(1)}%</span>
                </div>
              </div>

              <div className="category-input">
                <label>Actualizar gasto:</label>
                <input
                  type="number"
                  value={category.spent}
                  onChange={(e) => handleUpdateSpent(category.id, parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Metas Financieras */}
      <motion.div 
        className="financial-goals"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="section-header">
          <h2>Metas Financieras</h2>
          <motion.button
            className="add-btn"
            onClick={() => setShowAddGoal(!showAddGoal)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
            Agregar Meta
          </motion.button>
        </div>

        {showAddGoal && (
          <motion.div 
            className="add-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="form-row">
              <input
                type="text"
                placeholder="Nombre de la meta"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Meta objetivo"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
              />
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              />
              <button onClick={handleAddGoal} className="submit-btn">
                Agregar
              </button>
            </div>
          </motion.div>
        )}

        <div className="goals-grid">
          {budgetGoals.map((goal) => (
            <motion.div
              key={goal.id}
              className="goal-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="goal-header">
                <div className="goal-status" style={{ color: getStatusColor(goal.status) }}>
                  {getStatusIcon(goal.status)}
                </div>
                <h3>{goal.name}</h3>
                <button 
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="delete-btn"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="goal-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                      backgroundColor: getStatusColor(goal.status)
                    }}
                  ></div>
                </div>
                <div className="progress-stats">
                  <span>${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</span>
                  <span>{((goal.current / goal.target) * 100).toFixed(1)}%</span>
                </div>
              </div>

              <div className="goal-details">
                <span className="deadline">Fecha límite: {goal.deadline}</span>
                <div className="goal-input">
                  <label>Progreso actual:</label>
                  <input
                    type="number"
                    value={goal.current}
                    onChange={(e) => handleUpdateGoalProgress(goal.id, parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Consejos de Ahorro */}
      <motion.div 
        className="savings-tips"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2>Consejos para Ahorrar</h2>
        <div className="tips-grid">
          <motion.div 
            className="tip-card"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <TrendingUp size={32} />
            <h3>Establece Prioridades</h3>
            <p>Identifica qué gastos son esenciales y cuáles puedes reducir o eliminar.</p>
          </motion.div>

          <motion.div 
            className="tip-card"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Target size={32} />
            <h3>Metas Realistas</h3>
            <p>Establece objetivos de ahorro alcanzables y celebra cada logro.</p>
          </motion.div>

          <motion.div 
            className="tip-card"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Calendar size={32} />
            <h3>Revisa Regularmente</h3>
            <p>Monitorea tu presupuesto semanalmente para mantener el control.</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BudgetPlanner;
