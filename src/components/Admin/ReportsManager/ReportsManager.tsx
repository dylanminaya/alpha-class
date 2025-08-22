import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import ReportViewer from './ReportViewer';
import FileLocationHelper from './FileLocationHelper';
import './ReportsManager.css';

ChartJS.register(ArcElement, Tooltip, Legend);

interface FinancialData {
  income: number;
  expenses: number;
  availableCash: number;
  total: number;
}

interface FinancialAdvice {
  category: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface ReportData {
  type: string;
  data: Record<string, string | number | object>;
  generatedAt: Date;
}

interface ExportData {
  financialOverview?: FinancialData;
  advice?: FinancialAdvice[];
  generatedAt: Date;
  data?: Record<string, string | number | object>;
}

interface FileSystemWindow extends Window {
  showSaveFilePicker: (options: {
    suggestedName: string;
    types: Array<{
      description: string;
      accept: Record<string, string[]>;
    }>;
  }) => Promise<{
    createWritable: () => Promise<{
      write: (data: Blob) => Promise<void>;
      close: () => Promise<void>;
    }>;
  }>;
}

const ReportsManager = () => {
  const [financialData, setFinancialData] = useState<FinancialData>({
    income: 65400,
    expenses: 18000,
    availableCash: 47400,
    total: 130800
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<FinancialData>({ ...financialData });

  const [advice, setAdvice] = useState<FinancialAdvice[]>([]);

  // Function to handle financial data updates
  const handleFinancialDataUpdate = (field: keyof FinancialData, value: number) => {
    const newData = { ...editData, [field]: value };
    setEditData(newData);
    
    // Recalculate total
    if (field === 'income' || field === 'expenses' || field === 'availableCash') {
      const total = newData.income + newData.availableCash;
      setEditData(prev => ({ ...prev, total }));
    }
  };

  const saveFinancialData = () => {
    setFinancialData(editData);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditData({ ...financialData });
    setIsEditing(false);
  };

  const startEdit = () => {
    setEditData({ ...financialData });
    setIsEditing(true);
  };
  const [generatedReports, setGeneratedReports] = useState<ReportData[]>([]);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [showFileLocation, setShowFileLocation] = useState(false);
  const [exportedFileInfo, setExportedFileInfo] = useState<{ filename: string; format: string } | null>(null);

  useEffect(() => {
    // Simulate loading financial data
    const data: FinancialData = {
      income: 65400,
      expenses: 18000,
      availableCash: 47400,
      total: 130800
    };
    setFinancialData(data);
  }, []);

  useEffect(() => {
    // Generate financial advice based on data
    const expenseRatio = (financialData.expenses / financialData.income) * 100;
    const cashRatio = (financialData.availableCash / financialData.income) * 100;

    const adviceData: FinancialAdvice[] = [];

    // Expense management advice
    if (expenseRatio > 30) {
      adviceData.push({
        category: 'Expense Management',
        title: 'High Expense Ratio',
        description: `Your expenses represent ${expenseRatio.toFixed(1)}% of income. Consider reviewing recurring costs and identifying areas for optimization.`,
        priority: 'high'
      });
    } else if (expenseRatio > 20) {
      adviceData.push({
        category: 'Expense Management',
        title: 'Moderate Expense Level',
        description: `Your expenses are at ${expenseRatio.toFixed(1)}% of income, which is within healthy range. Continue monitoring for optimization opportunities.`,
        priority: 'medium'
      });
    } else {
      adviceData.push({
        category: 'Expense Management',
        title: 'Excellent Expense Control',
        description: `Your expenses are only ${expenseRatio.toFixed(1)}% of income. Great job maintaining low overhead costs!`,
        priority: 'low'
      });
    }

    // Cash flow advice
    if (cashRatio < 50) {
      adviceData.push({
        category: 'Cash Flow',
        title: 'Low Cash Reserves',
        description: `Available cash is ${cashRatio.toFixed(1)}% of income. Consider building emergency funds and reducing expenses.`,
        priority: 'high'
      });
    } else if (cashRatio < 70) {
      adviceData.push({
        category: 'Cash Flow',
        title: 'Moderate Cash Position',
        description: `You have ${cashRatio.toFixed(1)}% of income as available cash. This provides good financial flexibility.`,
        priority: 'medium'
      });
    } else {
      adviceData.push({
        category: 'Cash Flow',
        title: 'Strong Cash Position',
        description: `Excellent cash reserves at ${cashRatio.toFixed(1)}% of income. Consider investment opportunities.`,
        priority: 'low'
      });
    }

    // Growth advice
    if (financialData.income > 50000) {
      adviceData.push({
        category: 'Growth Strategy',
        title: 'Revenue Growth Opportunity',
        description: 'With strong income, consider diversifying revenue streams or investing in business expansion.',
        priority: 'medium'
      });
    }

    // Tax planning advice
    adviceData.push({
      category: 'Tax Planning',
      title: 'Tax Optimization',
      description: 'Track all business expenses and consider quarterly tax payments to avoid year-end surprises.',
      priority: 'medium'
    });

    setAdvice(adviceData);
  }, [financialData.expenses, financialData.income, financialData.availableCash]);

  // Generate different types of reports
  const generateReport = async (reportType: string) => {
    setIsGenerating(reportType);
    
    // Simulate report generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let reportData: Record<string, string | number | object> = {};
    
    switch (reportType) {
      case 'P&L Statement': {
        reportData = {
          revenue: financialData.income,
          expenses: financialData.expenses,
          netIncome: financialData.income - financialData.expenses,
          grossMargin: ((financialData.income - financialData.expenses) / financialData.income * 100).toFixed(1) + '%',
          expenseRatio: (financialData.expenses / financialData.income * 100).toFixed(1) + '%'
        };
        break;
      }
      case 'Cash Flow Report': {
        reportData = {
          operatingCashFlow: financialData.income - financialData.expenses,
          availableCash: financialData.availableCash,
          cashRatio: (financialData.availableCash / financialData.income * 100).toFixed(1) + '%',
          monthlyBurnRate: (financialData.expenses / 12).toFixed(0),
          runwayMonths: Math.floor(financialData.availableCash / (financialData.expenses / 12))
        };
        break;
      }
      case 'Monthly Summary': {
        reportData = {
          currentMonth: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          monthlyIncome: financialData.income / 12,
          monthlyExpenses: financialData.expenses / 12,
          monthlyProfit: (financialData.income - financialData.expenses) / 12,
          yearToDate: {
            income: financialData.income,
            expenses: financialData.expenses,
            profit: financialData.income - financialData.expenses
          }
        };
        break;
      }
      case 'Tax Summary': {
        reportData = {
          totalIncome: financialData.income,
          deductibleExpenses: financialData.expenses * 0.85, // Assume 85% are deductible
          taxableIncome: financialData.income - (financialData.expenses * 0.85),
          estimatedTaxRate: '25%',
          estimatedTaxLiability: (financialData.income - (financialData.expenses * 0.85)) * 0.25,
          quarterlyPayments: ((financialData.income - (financialData.expenses * 0.85)) * 0.25) / 4
        };
        break;
      }
    }
    
    const newReport: ReportData = {
      type: reportType,
      data: reportData,
      generatedAt: new Date()
    };
    
    setGeneratedReports(prev => [newReport, ...prev]);
    setIsGenerating(null);
    
    // Show success message and automatically open the report
    alert(`${reportType} generated successfully!`);
    setSelectedReport(newReport);
  };

  // View a specific report
  const viewReport = (report: ReportData) => {
    setSelectedReport(report);
  };

  // Close report viewer
  const closeReportViewer = () => {
    setSelectedReport(null);
  };

  // Close file location helper
  const closeFileLocationHelper = () => {
    setShowFileLocation(false);
    setExportedFileInfo(null);
  };

  // Export functionality
  const exportReport = async (format: string, reportType?: string) => {
    setIsExporting(format);
    
    // Simulate export delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let dataToExport: ExportData = {
      generatedAt: new Date()
    };
    
    if (reportType && generatedReports.length > 0) {
      // Export specific report
      const report = generatedReports.find(r => r.type === reportType);
      if (report) {
        dataToExport = {
          data: report.data,
          generatedAt: report.generatedAt
        };
      }
    } else {
      // Export all financial data
      dataToExport = {
        financialOverview: financialData,
        advice: advice,
        generatedAt: new Date()
      };
    }
    
    try {
      let content: Blob;
      let filename = '';
      
      switch (format) {
        case 'PDF': {
          // Generate actual PDF content
          content = await generatePDFContent(dataToExport);
          filename = `financial-report-${new Date().toISOString().split('T')[0]}.pdf`;
          break;
        }
        case 'Excel': {
          // Generate actual Excel content
          content = await generateExcelContent(dataToExport);
          filename = `financial-report-${new Date().toISOString().split('T')[0]}.xlsx`;
          break;
        }
        case 'CSV': {
          // Generate CSV content
          const csvString = generateCSVContent(dataToExport);
          content = new Blob([csvString], { type: 'text/csv' });
          filename = `financial-report-${new Date().toISOString().split('T')[0]}.csv`;
          break;
        }
        default:
          throw new Error(`Unsupported format: ${format}`);
      }
      
      // Enhanced download with better feedback
      const success = await downloadFileEnhanced(content, filename, format);
      
      if (success) {
        // Show file location helper instead of alert
        setExportedFileInfo({ filename, format });
        setShowFileLocation(true);
      } else {
        alert(`Export completed but there was an issue with the download.\n\nFile: ${filename}\n\nPlease check your Downloads folder or browser settings.`);
      }
      
    } catch (error) {
      alert(`Error exporting ${format}: ${error}\n\nPlease try again or contact support.`);
    }
    
    setIsExporting(null);
  };

  // Enhanced download function with better error handling and user choice
  const downloadFileEnhanced = async (content: Blob, filename: string, format: string): Promise<boolean> => {
    try {
      // Instead of auto-download, let user choose location
      // We'll use the File System Access API if available, otherwise fall back to download
      if ('showSaveFilePicker' in window) {
        try {
          // Modern browsers - let user choose save location
          const fileHandle = await (window as FileSystemWindow).showSaveFilePicker({
            suggestedName: filename,
            types: [{
              description: `${format} File`,
              accept: {
                [content.type]: [filename.split('.').pop() || '']
              }
            }]
          });
          
          // Create a writable stream and write the content
          const writable = await fileHandle.createWritable();
          await writable.write(content);
          await writable.close();
          
          return true;
        } catch {
          console.log('User cancelled save or File System Access API not supported, falling back to download');
          // Fall back to download if user cancels or API not supported
        }
      }
      
      // Fallback: Create download link (but this will still auto-download)
      // For better user experience, we'll show a message about this
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      
      // Add to DOM, click, and cleanup
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup URL object
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
      
      return true;
    } catch (error) {
      console.error('Download error:', error);
      return false;
    }
  };

  // Helper functions for different export formats
  const generatePDFContent = async (data: ExportData): Promise<Blob> => {
    // Create actual PDF using jsPDF
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('FINANCIAL REPORT', 105, 20, { align: 'center' });
    
    // Add generation date
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 35, { align: 'center' });
    
    let yPosition = 50;
    
    if (data.financialOverview) {
      // Add financial overview section
      doc.setFontSize(16);
      doc.text('FINANCIAL OVERVIEW', 20, yPosition);
      yPosition += 15;
      
      doc.setFontSize(12);
      const overviewData = [
        ['Metric', 'Value']
      ];
      
      overviewData.push(['Total Income', `$${data.financialOverview.income.toLocaleString()}`]);
      overviewData.push(['Total Expenses', `$${data.financialOverview.expenses.toLocaleString()}`]);
      overviewData.push(['Available Cash', `$${data.financialOverview.availableCash.toLocaleString()}`]);
      overviewData.push(['Total Assets', `$${data.financialOverview.total.toLocaleString()}`]);
      overviewData.push(['Net Income', `$${(data.financialOverview.income - data.financialOverview.expenses).toLocaleString()}`]);
      overviewData.push(['Profit Margin', `${((data.financialOverview.income - data.financialOverview.expenses) / data.financialOverview.income * 100).toFixed(1)}%`]);
      
      autoTable(doc, {
        head: [['Metric', 'Value']],
        body: overviewData,
        startY: yPosition,
        margin: { top: 20 },
        styles: { fontSize: 10 }
      });
      
      yPosition += (overviewData.length * 10) + 20;
    } else if (data.data && Object.keys(data.data).length > 0) {
      // Add report data section
      doc.setFontSize(16);
      doc.text('REPORT DATA', 20, yPosition);
      yPosition += 15;
      
      const reportData = Object.entries(data.data).map(([key, value]) => {
        const cleanKey = key.replace(/([A-Z])/g, ' $1').trim();
        const formattedValue = typeof value === 'number' ? `$${value.toLocaleString()}` : String(value);
        return [cleanKey, formattedValue];
      });
      
      autoTable(doc, {
        head: [['Metric', 'Value']],
        body: reportData,
        startY: yPosition,
        margin: { top: 20 },
        styles: { fontSize: 10 }
      });
    }
    
    // Add footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Generated by TrackIt Financial Management System - Page ${i} of ${pageCount}`, 105, doc.internal.pageSize.height - 10, { align: 'center' });
    }
    
    // Return PDF as blob
    const pdfOutput = doc.output('blob');
    return pdfOutput;
  };

  const generateExcelContent = async (data: ExportData): Promise<Blob> => {
    // Create actual Excel file using XLSX
    const workbook = XLSX.utils.book_new();
    
    if (data.financialOverview) {
      // Create financial overview worksheet
      const overviewData = [
        ['Category', 'Value', 'Description'],
        ['Total Income', data.financialOverview.income, 'Total revenue generated'],
        ['Total Expenses', data.financialOverview.expenses, 'Total costs incurred'],
        ['Available Cash', data.financialOverview.availableCash, 'Liquid funds available'],
        ['Total Assets', data.financialOverview.total, 'Combined financial value'],
        ['Net Income', data.financialOverview.income - data.financialOverview.expenses, 'Profit after expenses'],
        ['Profit Margin', `${((data.financialOverview.income - data.financialOverview.expenses) / data.financialOverview.income * 100).toFixed(1)}%`, 'Percentage of revenue retained']
      ];
      
      const overviewSheet = XLSX.utils.aoa_to_sheet(overviewData);
      XLSX.utils.book_append_sheet(workbook, overviewSheet, 'Financial Overview');
      
      // Add advice worksheet if available
      if (data.advice && data.advice.length > 0) {
        const adviceData = [
          ['Category', 'Title', 'Description', 'Priority']
        ];
        
        data.advice.forEach(item => {
          adviceData.push([item.category, item.title, item.description, item.priority]);
        });
        
        const adviceSheet = XLSX.utils.aoa_to_sheet(adviceData);
        XLSX.utils.book_append_sheet(workbook, adviceSheet, 'Financial Advice');
      }
    } else if (data.data && Object.keys(data.data).length > 0) {
      // Create report data worksheet
      const reportData = [
        ['Metric', 'Value', 'Description']
      ];
      
      Object.entries(data.data).forEach(([key, value]) => {
        const description = getMetricDescription(key);
        const cleanKey = key.replace(/([A-Z])/g, ' $1').trim();
        reportData.push([cleanKey, String(value), description]);
      });
      
      const reportSheet = XLSX.utils.aoa_to_sheet(reportData);
      XLSX.utils.book_append_sheet(workbook, reportSheet, 'Report Data');
    }
    
    // Return Excel as blob - Fixed the XLSX.write call
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  };

  const generateCSVContent = (data: ExportData): string => {
    // Create professional CSV content with proper formatting
    let csvContent = `Metric,Value,Description\n`;
    
    if (data.financialOverview) {
      csvContent += `"Total Income","${data.financialOverview.income.toLocaleString()}","Total revenue generated"\n`;
      csvContent += `"Total Expenses","${data.financialOverview.expenses.toLocaleString()}","Total costs incurred"\n`;
      csvContent += `"Available Cash","${data.financialOverview.availableCash.toLocaleString()}","Liquid funds available"\n`;
      csvContent += `"Total Assets","${data.financialOverview.total.toLocaleString()}","Combined financial value"\n`;
      csvContent += `"Net Income","${(data.financialOverview.income - data.financialOverview.expenses).toLocaleString()}","Profit after expenses"\n`;
      csvContent += `"Profit Margin","${((data.financialOverview.income - data.financialOverview.expenses) / data.financialOverview.income * 100).toFixed(1)}%","Percentage of revenue retained"\n`;
    } else if (data.data && Object.keys(data.data).length > 0) {
      Object.entries(data.data).forEach(([key, value]) => {
        const description = getMetricDescription(key);
        const escapedDescription = description.replace(/"/g, '""'); // Escape quotes in CSV
        const escapedValue = String(value).replace(/"/g, '""'); // Escape quotes in value
        // Clean up the key name for better readability
        const cleanKey = key.replace(/([A-Z])/g, ' $1').trim();
        csvContent += `"${cleanKey}","${escapedValue}","${escapedDescription}"\n`;
      });
    } else {
      // Fallback content if no data is available
      csvContent += `"Status","Message"\n`;
      csvContent += `"No Data","No specific data available for export. Please generate a report first."\n`;
    }
    
    return csvContent;
  };

  // Helper function to get a description for a metric
  const getMetricDescription = (key: string): string => {
    switch (key) {
      case 'revenue': return 'Total revenue generated for the period';
      case 'expenses': return 'Total costs incurred for the period';
      case 'netIncome': return 'Net income after expenses';
      case 'grossMargin': return 'Percentage of revenue that exceeds costs';
      case 'expenseRatio': return 'Percentage of total income spent on expenses';
      case 'operatingCashFlow': return 'Cash generated from operations';
      case 'availableCash': return 'Liquid funds available for immediate use';
      case 'cashRatio': return 'Percentage of total income that is available as cash';
      case 'monthlyBurnRate': return 'Average monthly cash outflow';
      case 'runwayMonths': return 'Number of months the business can sustain current expenses';
      case 'monthlyIncome': return 'Average monthly revenue';
      case 'monthlyExpenses': return 'Average monthly expenses';
      case 'monthlyProfit': return 'Average monthly net profit';
      case 'yearToDate': return 'Cumulative financial performance for the year';
      case 'totalIncome': return 'Total income earned for the period';
      case 'deductibleExpenses': return 'Expenses eligible for tax deductions';
      case 'taxableIncome': return 'Income subject to taxation';
      case 'estimatedTaxRate': return 'Estimated tax rate for the period';
      case 'estimatedTaxLiability': return 'Estimated total tax liability';
      case 'quarterlyPayments': return 'Estimated quarterly tax payments';
      default: return 'N/A';
    }
  };

  const chartData = {
    labels: ['Income', 'Expenses', 'Available Cash'],
    datasets: [
      {
        data: [
          financialData.income,
          financialData.expenses,
          financialData.availableCash
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',   // Green for income
          'rgba(239, 68, 68, 0.8)',   // Red for expenses
          'rgba(59, 130, 246, 0.8)',  // Blue for available cash
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: { label?: string; parsed: number }) {
            const label = context.label || '';
            const value = context.parsed;
            const percentage = ((value / financialData.total) * 100).toFixed(1);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityIcon = (priority: string): string => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="reports-manager">
      <div className="feature-header">
        <h1>📊 Financial Reports & Analysis</h1>
        <p>Comprehensive financial overview with insights and recommendations</p>
      </div>

      <div className="reports-content">
        {/* Financial Overview Chart */}
        <div className="chart-section">
          <div className="section-header">
            <h2>💰 Financial Distribution Overview</h2>
            <button 
              className={`edit-btn ${isEditing ? 'editing' : ''}`}
              onClick={isEditing ? saveFinancialData : startEdit}
            >
              {isEditing ? '💾 Save' : '✏️ Edit'}
            </button>
          </div>
          
          {isEditing ? (
            <div className="edit-financial-data">
              <div className="edit-row">
                <div className="edit-field">
                  <label>Total Income</label>
                  <input
                    type="number"
                    value={editData.income}
                    onChange={(e) => handleFinancialDataUpdate('income', Number(e.target.value))}
                    placeholder="Enter income"
                  />
                </div>
                <div className="edit-field">
                  <label>Total Expenses</label>
                  <input
                    type="number"
                    value={editData.expenses}
                    onChange={(e) => handleFinancialDataUpdate('expenses', Number(e.target.value))}
                    placeholder="Enter expenses"
                  />
                </div>
                <div className="edit-field">
                  <label>Available Cash</label>
                  <input
                    type="number"
                    value={editData.availableCash}
                    onChange={(e) => handleFinancialDataUpdate('availableCash', Number(e.target.value))}
                    placeholder="Enter available cash"
                  />
                </div>
              </div>
              <div className="edit-actions">
                <button className="cancel-btn" onClick={cancelEdit}>❌ Cancel</button>
              </div>
            </div>
          ) : (
            <div className="chart-container">
              <div className="pie-chart">
                <Pie data={chartData} options={chartOptions} />
              </div>
              <div className="chart-summary">
                <div className="summary-item">
                  <div className="summary-label">Total Income</div>
                  <div className="summary-value income">${financialData.income.toLocaleString()}</div>
                  <div className="summary-percentage">
                    {((financialData.income / financialData.total) * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Total Expenses</div>
                  <div className="summary-value expenses">${financialData.expenses.toLocaleString()}</div>
                  <div className="summary-percentage">
                    {((financialData.expenses / financialData.total) * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Available Cash</div>
                  <div className="summary-value cash">${financialData.availableCash.toLocaleString()}</div>
                  <div className="summary-percentage">
                    {((financialData.availableCash / financialData.total) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Financial Advice Section */}
        <div className="advice-section">
          <div className="section-header">
            <h2>💡 Financial Insights & Recommendations</h2>
            <div className="advice-status">
              <span className="status-indicator">🔄 Live Updates</span>
              <small>Advice updates automatically when financial data changes</small>
            </div>
          </div>
          <div className="advice-grid">
            {advice.map((item, index) => (
              <div key={index} className={`advice-card priority-${item.priority}`}>
                <div className="advice-header">
                  <span className="priority-icon">{getPriorityIcon(item.priority)}</span>
                  <div className="advice-category">{item.category}</div>
                  <div 
                    className="priority-indicator" 
                    style={{ backgroundColor: getPriorityColor(item.priority) }}
                  ></div>
                </div>
                <h3 className="advice-title">{item.title}</h3>
                <p className="advice-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reports */}
        <div className="quick-reports">
          <h2>📋 Quick Report Generation</h2>
          <div className="report-actions">
            <button 
              className="report-btn primary"
              onClick={() => generateReport('P&L Statement')}
              disabled={isGenerating === 'P&L Statement'}
            >
              {isGenerating === 'P&L Statement' ? '⏳ Generating...' : '📊 Generate P&L Statement'}
            </button>
            <button 
              className="report-btn secondary"
              onClick={() => generateReport('Cash Flow Report')}
              disabled={isGenerating === 'Cash Flow Report'}
            >
              {isGenerating === 'Cash Flow Report' ? '⏳ Generating...' : '💰 Cash Flow Report'}
            </button>
            <button 
              className="report-btn secondary"
              onClick={() => generateReport('Monthly Summary')}
              disabled={isGenerating === 'Monthly Summary'}
            >
              {isGenerating === 'Monthly Summary' ? '⏳ Generating...' : '📈 Monthly Summary'}
            </button>
            <button 
              className="report-btn secondary"
              onClick={() => generateReport('Tax Summary')}
              disabled={isGenerating === 'Tax Summary'}
            >
              {isGenerating === 'Tax Summary' ? '⏳ Generating...' : '🎯 Tax Summary'}
            </button>
          </div>
          
          {/* Generated Reports Display */}
          {generatedReports.length > 0 && (
            <div className="generated-reports">
              <h3>📄 Recently Generated Reports</h3>
              <div className="reports-list">
                {generatedReports.slice(0, 3).map((report, index) => (
                  <div key={index} className="report-item">
                    <div className="report-info">
                      <h4>{report.type}</h4>
                      <span className="report-date">
                        {report.generatedAt.toLocaleString()}
                      </span>
                    </div>
                    <div className="report-actions-mini">
                      <button 
                        className="view-btn-mini"
                        onClick={() => viewReport(report)}
                        title="View Report"
                      >
                        👁️
                      </button>
                      <button 
                        className="export-btn-mini"
                        onClick={() => exportReport('PDF', report.type)}
                        disabled={isExporting === 'PDF'}
                        title="Export PDF"
                      >
                        {isExporting === 'PDF' ? '⏳' : '📄'}
                      </button>
                      <button 
                        className="export-btn-mini"
                        onClick={() => exportReport('Excel', report.type)}
                        disabled={isExporting === 'Excel'}
                        title="Export Excel"
                      >
                        {isExporting === 'Excel' ? '⏳' : '📊'}
                      </button>
                      <button 
                        className="export-btn-mini"
                        onClick={() => exportReport('CSV', report.type)}
                        disabled={isExporting === 'CSV'}
                        title="Export CSV"
                      >
                        {isExporting === 'CSV' ? '⏳' : '💾'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Export Options */}
        <div className="export-section">
          <h2>📤 Export Options</h2>
          <div className="export-grid">
            <div className="export-card">
              <span className="export-icon">📄</span>
              <h3>PDF Reports</h3>
              <p>Professional formatted reports for clients and stakeholders</p>
              <button 
                className="export-action-btn"
                onClick={() => exportReport('PDF')}
                disabled={isExporting === 'PDF'}
              >
                {isExporting === 'PDF' ? '⏳ Exporting...' : 'Export PDF'}
              </button>
            </div>
            <div className="export-card">
              <span className="export-icon">📊</span>
              <h3>Excel Spreadsheets</h3>
              <p>Detailed data analysis and custom calculations</p>
              <button 
                className="export-action-btn"
                onClick={() => exportReport('Excel')}
                disabled={isExporting === 'Excel'}
              >
                {isExporting === 'Excel' ? '⏳ Exporting...' : 'Export Excel'}
              </button>
            </div>
            <div className="export-card">
              <span className="export-icon">💾</span>
              <h3>CSV Data</h3>
              <p>Raw data for accounting software integration</p>
              <button 
                className="export-action-btn"
                onClick={() => exportReport('CSV')}
                disabled={isExporting === 'CSV'}
              >
                {isExporting === 'CSV' ? '⏳ Exporting...' : 'Export CSV'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Viewer Modal */}
      {selectedReport && (
        <ReportViewer
          report={selectedReport}
          onClose={closeReportViewer}
          onExport={exportReport}
          isExporting={isExporting}
        />
      )}

      {/* File Location Helper Modal */}
      {showFileLocation && exportedFileInfo && (
        <FileLocationHelper
          isOpen={showFileLocation}
          onClose={closeFileLocationHelper}
          filename={exportedFileInfo.filename}
          format={exportedFileInfo.format}
        />
      )}
    </div>
  );
};

export default ReportsManager;




