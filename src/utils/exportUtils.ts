import * as XLSX from 'xlsx';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    label?: string;
  }>;
}

export const exportToExcel = (
  expenses: Expense[],
  chartData: ChartData,
  selectedMonth: string = 'all',
  graphType: string = 'bar'
) => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Prepare expense data for export
  const expenseData = expenses.map(expense => ({
    ID: expense.id,
    Description: expense.description,
    Amount: expense.amount,
    Category: expense.category,
    Date: expense.date,
    Type: expense.type,
    FormattedAmount: `$${expense.amount.toFixed(2)}`
  }));

  // Prepare chart data for export
  const chartExportData = chartData.labels.map((label, index) => ({
    Category: label,
    Amount: chartData.datasets[0].data[index],
    FormattedAmount: `$${chartData.datasets[0].data[index].toFixed(2)}`,
    Percentage: `${((chartData.datasets[0].data[index] / chartData.datasets[0].data.reduce((a, b) => a + b, 0)) * 100).toFixed(2)}%`
  }));

  // Create summary data
  const totalExpenses = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const netIncome = totalIncome - totalExpenses;

  const summaryData = [
    { Metric: 'Total Income', Value: totalIncome, FormattedValue: `$${totalIncome.toFixed(2)}` },
    { Metric: 'Total Expenses', Value: totalExpenses, FormattedValue: `$${totalExpenses.toFixed(2)}` },
    { Metric: 'Net Income', Value: netIncome, FormattedValue: `$${netIncome.toFixed(2)}` },
    { Metric: 'Period', Value: selectedMonth === 'all' ? 'All Months' : selectedMonth, FormattedValue: selectedMonth === 'all' ? 'All Months' : selectedMonth },
    { Metric: 'Chart Type', Value: graphType, FormattedValue: graphType.charAt(0).toUpperCase() + graphType.slice(1) }
  ];

  // Create worksheets
  const expenseSheet = XLSX.utils.json_to_sheet(expenseData);
  const chartSheet = XLSX.utils.json_to_sheet(chartExportData);
  const summarySheet = XLSX.utils.json_to_sheet(summaryData);

  // Add worksheets to workbook
  XLSX.utils.book_append_sheet(workbook, expenseSheet, 'Transaction Data');
  XLSX.utils.book_append_sheet(workbook, chartSheet, 'Chart Data');
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

  // Generate filename
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `financial_data_${selectedMonth === 'all' ? 'all_months' : selectedMonth}_${timestamp}.xlsx`;

  // Save the file
  XLSX.writeFile(workbook, filename);
};

export const exportToCSV = (
  expenses: Expense[],
  chartData: ChartData,
  selectedMonth: string = 'all',
  graphType: string = 'bar'
) => {
  // Prepare expense data for CSV
  const expenseData = expenses.map(expense => ({
    ID: expense.id,
    Description: expense.description,
    Amount: expense.amount,
    Category: expense.category,
    Date: expense.date,
    Type: expense.type,
    FormattedAmount: `$${expense.amount.toFixed(2)}`
  }));

  // Prepare chart data for CSV
  const chartExportData = chartData.labels.map((label, index) => ({
    Category: label,
    Amount: chartData.datasets[0].data[index],
    FormattedAmount: `$${chartData.datasets[0].data[index].toFixed(2)}`,
    Percentage: `${((chartData.datasets[0].data[index] / chartData.datasets[0].data.reduce((a, b) => a + b, 0)) * 100).toFixed(2)}%`
  }));

  // Create summary data
  const totalExpenses = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const netIncome = totalIncome - totalExpenses;

  const summaryData = [
    { Metric: 'Total Income', Value: totalIncome, FormattedValue: `$${totalIncome.toFixed(2)}` },
    { Metric: 'Total Expenses', Value: totalExpenses, FormattedValue: `$${totalExpenses.toFixed(2)}` },
    { Metric: 'Net Income', Value: netIncome, FormattedValue: `$${netIncome.toFixed(2)}` },
    { Metric: 'Period', Value: selectedMonth === 'all' ? 'All Months' : selectedMonth, FormattedValue: selectedMonth === 'all' ? 'All Months' : selectedMonth },
    { Metric: 'Chart Type', Value: graphType, FormattedValue: graphType.charAt(0).toUpperCase() + graphType.slice(1) }
  ];

  // Convert to CSV format
  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');
    
    return csvContent;
  };

  // Create CSV content
  const expenseCSV = convertToCSV(expenseData);
  const chartCSV = convertToCSV(chartExportData);
  const summaryCSV = convertToCSV(summaryData);

  // Combine all CSV data
  const fullCSV = `TRANSACTION DATA\n${expenseCSV}\n\nCHART DATA\n${chartCSV}\n\nSUMMARY\n${summaryCSV}`;

  // Create and download CSV file
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `financial_data_${selectedMonth === 'all' ? 'all_months' : selectedMonth}_${timestamp}.csv`;
  
  const blob = new Blob([fullCSV], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
