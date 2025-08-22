import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import './FinancialCharts.css';

interface ChartData {
  name: string;
  income: number;
  expenses: number;
  balance: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

const FinancialCharts: React.FC = () => {
  // Sample data for charts
  const monthlyData: ChartData[] = [
    { name: 'Jan', income: 3200, expenses: 1800, balance: 1400 },
    { name: 'Feb', income: 2800, expenses: 1600, balance: 1200 },
    { name: 'Mar', income: 3500, expenses: 2100, balance: 1400 },
    { name: 'Apr', income: 4200, expenses: 1900, balance: 2300 },
    { name: 'May', income: 3800, expenses: 2200, balance: 1600 },
    { name: 'Jun', income: 4500, expenses: 2400, balance: 2100 },
  ];

  const categoryData: CategoryData[] = [
    { name: 'Tools', value: 35, color: '#4f46e5' },
    { name: 'Office', value: 25, color: '#10b981' },
    { name: 'Marketing', value: 20, color: '#f59e0b' },
    { name: 'Education', value: 15, color: '#ef4444' },
    { name: 'Others', value: 5, color: '#8b5cf6' },
  ];

  const totalIncome = monthlyData.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = monthlyData.reduce((sum, item) => sum + item.expenses, 0);
  const averageBalance = monthlyData.reduce((sum, item) => sum + item.balance, 0) / monthlyData.length;

  return (
    <motion.div 
      className="financial-charts"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="charts-header">
        <h2>Financial Analysis</h2>
        <p>Visualize your finances with interactive charts</p>
      </div>

      {/* Metrics Summary */}
      <motion.div 
        className="metrics-summary"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className="metric-card"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <TrendingUp size={24} />
          <div>
            <span className="metric-label">Total Income</span>
            <span className="metric-value">${totalIncome.toLocaleString()}</span>
          </div>
        </motion.div>

        <motion.div 
          className="metric-card"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <TrendingDown size={24} />
          <div>
            <span className="metric-label">Total Expenses</span>
            <span className="metric-value">${totalExpenses.toLocaleString()}</span>
          </div>
        </motion.div>

        <motion.div 
          className="metric-card"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <DollarSign size={24} />
          <div>
            <span className="metric-label">Average Balance</span>
            <span className="metric-value">${averageBalance.toLocaleString()}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bar Chart - Income vs Expenses */}
      <motion.div 
        className="chart-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3>Monthly Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              labelStyle={{ color: '#1f2937' }}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar 
              dataKey="income" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]}
              name="Income"
            />
            <Bar 
              dataKey="expenses" 
              fill="#ef4444" 
              radius={[4, 4, 0, 0]}
              name="Expenses"
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Line Chart - Monthly Balance */}
      <motion.div 
        className="chart-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3>Monthly Balance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              labelStyle={{ color: '#1f2937' }}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="#4f46e5" 
              fill="url(#balanceGradient)"
              strokeWidth={3}
            />
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Pie Chart - Expense Distribution by Category */}
      <motion.div 
        className="chart-container pie-chart"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3>Expense Distribution by Category</h3>
        <div className="pie-chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value}%`, '']}
                labelStyle={{ color: '#1f2937' }}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="pie-legend">
            {categoryData.map((category, index) => (
              <motion.div 
                key={category.name}
                className="legend-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              >
                <div 
                  className="legend-color" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="legend-label">{category.name}</span>
                <span className="legend-value">{category.value}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Line Chart - Trends */}
      <motion.div 
        className="chart-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3>Income Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              labelStyle={{ color: '#1f2937' }}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default FinancialCharts;
