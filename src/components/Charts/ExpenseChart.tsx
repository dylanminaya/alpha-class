import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ExpenseChartProps {
  type: 'bar' | 'doughnut';
  title: string;
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ type, title }) => {
  // Mock data for expenses
  const expenseData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ingresos',
        data: [12000, 15000, 13500, 18000, 16500, 20000],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
      },
      {
        label: 'Gastos',
        data: [8000, 9500, 11000, 12000, 10500, 13000],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 2,
      },
    ],
  };

  const categoryData = {
    labels: ['Alimentación', 'Transporte', 'Entretenimiento', 'Servicios', 'Otros'],
    datasets: [
      {
        data: [2500, 1800, 1200, 3200, 1300],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(52, 211, 153, 0.8)',
          'rgba(110, 231, 183, 0.8)',
          'rgba(167, 243, 208, 0.8)',
          'rgba(209, 250, 229, 0.8)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(52, 211, 153, 1)',
          'rgba(110, 231, 183, 1)',
          'rgba(167, 243, 208, 1)',
          'rgba(209, 250, 229, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(16, 185, 129, 0.5)',
        borderWidth: 1,
      },
    },
    scales: type === 'bar' ? {
      x: {
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#94a3b8',
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          },
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
      },
    } : {},
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#e2e8f0',
          font: {
            size: 11,
          },
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(16, 185, 129, 0.5)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
    cutout: '60%',
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      {type === 'bar' ? (
        <Bar data={expenseData} options={chartOptions} />
      ) : (
        <Doughnut data={categoryData} options={doughnutOptions} />
      )}
    </div>
  );
};

export default ExpenseChart;
