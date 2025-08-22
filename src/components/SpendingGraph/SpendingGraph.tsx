import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import './SpendingGraph.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface SpendingData {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface SpendingGraphProps {
  data: SpendingData[];
}

const SpendingGraph: React.FC<SpendingGraphProps> = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [chartType, setChartType] = useState<'line' | 'bar' | 'doughnut'>('line');
  const [filteredData, setFilteredData] = useState<SpendingData[]>(data);

  // Generate available months from data
  const availableMonths = React.useMemo(() => {
    const months = new Set<string>();
    data.forEach(item => {
      const date = new Date(item.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months.add(monthYear);
    });
    return Array.from(months).sort();
  }, [data]);

  // Filter data by selected month
  useEffect(() => {
    if (selectedMonth === 'all') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => {
        const date = new Date(item.date);
        const itemMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        return itemMonth === selectedMonth;
      });
      setFilteredData(filtered);
    }
  }, [selectedMonth, data]);

  // Prepare data for line/bar chart (daily spending)
  const dailyData = React.useMemo(() => {
    const dailySpending: { [key: string]: number } = {};
    
    filteredData.forEach(item => {
      const date = new Date(item.date);
      const dateStr = date.toLocaleDateString();
      dailySpending[dateStr] = (dailySpending[dateStr] || 0) + item.amount;
    });

    const sortedDates = Object.keys(dailySpending).sort((a, b) => 
      new Date(a).getTime() - new Date(b).getTime()
    );

    return {
      labels: sortedDates,
      datasets: [{
        label: 'Daily Spending',
        data: sortedDates.map(date => dailySpending[date]),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      }]
    };
  }, [filteredData]);

  // Prepare data for doughnut chart (category spending)
  const categoryData = React.useMemo(() => {
    const categorySpending: { [key: string]: number } = {};
    
    filteredData.forEach(item => {
      categorySpending[item.category] = (categorySpending[item.category] || 0) + item.amount;
    });

    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
      '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
    ];

    return {
      labels: Object.keys(categorySpending),
      datasets: [{
        data: Object.values(categorySpending),
        backgroundColor: colors.slice(0, Object.keys(categorySpending).length),
        borderWidth: 2,
        borderColor: '#fff',
      }]
    };
  }, [filteredData]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Spending Analysis ${selectedMonth !== 'all' ? `(${selectedMonth})` : ''}`,
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

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Spending by Category ${selectedMonth !== 'all' ? `(${selectedMonth})` : ''}`,
      },
    },
  };

  const totalSpending = filteredData.reduce((sum, item) => sum + item.amount, 0);
  const averageSpending = filteredData.length > 0 ? totalSpending / filteredData.length : 0;

  return (
    <div className="spending-graph">
      <div className="graph-controls">
        <div className="control-group">
          <label htmlFor="month-filter">Filter by Month:</label>
          <select
            id="month-filter"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="month-select"
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

        <div className="control-group">
          <label htmlFor="chart-type">Chart Type:</label>
          <select
            id="chart-type"
            value={chartType}
            onChange={(e) => setChartType(e.target.value as 'line' | 'bar' | 'doughnut')}
            className="chart-type-select"
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="doughnut">Doughnut Chart</option>
          </select>
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-item">
          <h3>Total Spending</h3>
          <p className="stat-value">${totalSpending.toFixed(2)}</p>
        </div>
        <div className="stat-item">
          <h3>Average per Transaction</h3>
          <p className="stat-value">${averageSpending.toFixed(2)}</p>
        </div>
        <div className="stat-item">
          <h3>Number of Transactions</h3>
          <p className="stat-value">{filteredData.length}</p>
        </div>
      </div>

      <div className="chart-container">
        {chartType === 'line' && (
          <Line data={dailyData} options={chartOptions} />
        )}
        {chartType === 'bar' && (
          <Bar data={dailyData} options={chartOptions} />
        )}
        {chartType === 'doughnut' && (
          <Doughnut data={categoryData} options={doughnutOptions} />
        )}
      </div>

      {chartType !== 'doughnut' && (
        <div className="category-breakdown">
          <h3>Category Breakdown</h3>
          <div className="category-list">
            {Object.entries(categoryData.datasets[0].data.reduce((acc: any, value, index) => {
              acc[categoryData.labels[index]] = value;
              return acc;
            }, {})).map(([category, amount]) => (
              <div key={category} className="category-item">
                <span className="category-name">{category}</span>
                <span className="category-amount">${(amount as number).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpendingGraph;
