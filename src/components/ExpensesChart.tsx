import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './ExpensesChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Transaction {
  id?: string;
  type: 'income' | 'expense';
  amount: string;
  description: string;
  category: string;
  date: string;
}

interface ExpensesChartProps {
  transactions: Transaction[];
}

const ExpensesChart: React.FC<ExpensesChartProps> = ({ transactions }) => {
  // Filter only expenses
  const expenses = transactions.filter(t => t.type === 'expense');
  
  // Group expenses by category
  const expensesByCategory = expenses.reduce((acc, transaction) => {
    const category = transaction.category;
    const amount = parseFloat(transaction.amount) || 0;
    
    if (acc[category]) {
      acc[category] += amount;
    } else {
      acc[category] = amount;
    }
    
    return acc;
  }, {} as Record<string, number>);

  // Prepare data for the chart
  const categories = Object.keys(expensesByCategory);
  const amounts = Object.values(expensesByCategory);

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: amounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(199, 199, 199, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#ffffff',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
      },
      title: {
        display: true,
        text: 'Expenses by Category',
        color: '#ffffff',
        font: {
          size: 18,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#4caf50',
        borderWidth: 2,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return `${context.label}: €${context.parsed.y.toFixed(2)}`;
          }
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#ffffff',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return '€' + value.toFixed(2);
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  if (expenses.length === 0) {
    return (
      <div className="expenses-chart-empty">
        <h3>Expenses by Category</h3>
        <p>No expenses registered to show in the chart</p>
      </div>
    );
  }

  return (
    <div className="expenses-chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpensesChart;
