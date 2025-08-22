import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { exportToExcel, exportToCSV, type Expense, type ChartData } from '../../utils/exportUtils';
import './SpendingGraph.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

interface SpendingGraphProps {
  expenses: Expense[];
}

const SpendingGraph: React.FC<SpendingGraphProps> = ({ expenses }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [graphType, setGraphType] = useState<'bar' | 'doughnut'>('bar');

  // Get unique months from expenses
  const getAvailableMonths = () => {
    const months = expenses.map(expense => {
      const date = new Date(expense.date);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    });
    return [...new Set(months)].sort();
  };

  // Filter expenses by selected month
  const getFilteredExpenses = () => {
    if (selectedMonth === 'all') {
      return expenses;
    }
    return expenses.filter(expense => {
      const date = new Date(expense.date);
      const expenseMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      return expenseMonth === selectedMonth;
    });
  };

  // Prepare data for bar chart
  const getBarChartData = () => {
    const filteredExpenses = getFilteredExpenses();
    const expensesByCategory = filteredExpenses
      .filter(expense => expense.type === 'expense')
      .reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {} as Record<string, number>);

    const categories = Object.keys(expensesByCategory);
    const amounts = Object.values(expensesByCategory);

    return {
      labels: categories,
      datasets: [
        {
          label: 'Spending by Category',
          data: amounts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 2,
        },
      ],
    };
  };

  // Prepare data for doughnut chart
  const getDoughnutChartData = () => {
    const filteredExpenses = getFilteredExpenses();
    const expensesByCategory = filteredExpenses
      .filter(expense => expense.type === 'expense')
      .reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {} as Record<string, number>);

    const categories = Object.keys(expensesByCategory);
    const amounts = Object.values(expensesByCategory);

    return {
      labels: categories,
      datasets: [
        {
          data: amounts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 2,
        },
      ],
    };
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Spending by Category',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toFixed(2);
          }
        }
      }
    }
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Spending Distribution',
      },
    },
  };

  const availableMonths = getAvailableMonths();
  const filteredExpenses = getFilteredExpenses();
  const totalSpending = filteredExpenses
    .filter(expense => expense.type === 'expense')
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="spending-graph">
      <div className="graph-header">
        <h3>Spending Analytics</h3>
        <div className="graph-controls">
          <div className="month-filter">
            <label htmlFor="month-select">Filter by Month:</label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="all">All Months</option>
              {availableMonths.map(month => {
                const [year, monthNum] = month.split('-');
                const monthName = new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                return (
                  <option key={month} value={month}>
                    {monthName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="graph-type-toggle">
            <button
              className={graphType === 'bar' ? 'active' : ''}
              onClick={() => setGraphType('bar')}
            >
              Bar Chart
            </button>
            <button
              className={graphType === 'doughnut' ? 'active' : ''}
              onClick={() => setGraphType('doughnut')}
            >
              Doughnut Chart
            </button>
          </div>
        </div>
        <div className="total-spending">
          <span>Total Spending: <strong>${totalSpending.toFixed(2)}</strong></span>
        </div>
        <div className="export-controls">
          <button 
            className="export-btn excel-btn"
            onClick={() => {
              const currentChartData = graphType === 'bar' ? getBarChartData() : getDoughnutChartData();
              exportToExcel(expenses, currentChartData, selectedMonth, graphType);
            }}
          >
            📊 Export to Excel
          </button>
          <button 
            className="export-btn csv-btn"
            onClick={() => {
              const currentChartData = graphType === 'bar' ? getBarChartData() : getDoughnutChartData();
              exportToCSV(expenses, currentChartData, selectedMonth, graphType);
            }}
          >
            📄 Export to CSV
          </button>
        </div>
      </div>
      
      <div className="chart-container">
        {graphType === 'bar' ? (
          <Bar data={getBarChartData()} options={barChartOptions} />
        ) : (
          <Doughnut data={getDoughnutChartData()} options={doughnutChartOptions} />
        )}
      </div>

      {filteredExpenses.length === 0 && (
        <div className="no-data">
          <p>No spending data available for the selected period.</p>
        </div>
      )}
    </div>
  );
};

export default SpendingGraph;
