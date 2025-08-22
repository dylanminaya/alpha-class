import { useState } from 'react';
import './ReportViewer.css';

interface ReportData {
  type: string;
  data: Record<string, string | number | object>;
  generatedAt: Date;
}

interface ReportViewerProps {
  report: ReportData;
  onClose: () => void;
  onExport: (format: string, reportType: string) => void;
  isExporting: string | null;
}

const ReportViewer = ({ report, onClose, onExport, isExporting }: ReportViewerProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'export'>('overview');

  const formatValue = (value: string | number | object): string => {
    if (typeof value === 'number') {
      if (value >= 1000) {
        return `$${value.toLocaleString()}`;
      }
      return value.toString();
    }
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'P&L Statement': return '📊';
      case 'Cash Flow Report': return '💰';
      case 'Monthly Summary': return '📈';
      case 'Tax Summary': return '🎯';
      default: return '📄';
    }
  };

  const getReportColor = (type: string) => {
    switch (type) {
      case 'P&L Statement': return '#10b981';
      case 'Cash Flow Report': return '#3b82f6';
      case 'Monthly Summary': return '#f59e0b';
      case 'Tax Summary': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="report-viewer-overlay">
      <div className="report-viewer">
        <div className="report-viewer-header">
          <div className="report-title-section">
            <span 
              className="report-icon"
              style={{ backgroundColor: getReportColor(report.type) }}
            >
              {getReportIcon(report.type)}
            </span>
            <div>
              <h1>{report.type}</h1>
              <p>Generated on {report.generatedAt.toLocaleString()}</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="report-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📋 Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            📊 Details
          </button>
          <button 
            className={`tab-btn ${activeTab === 'export' ? 'active' : ''}`}
            onClick={() => setActiveTab('export')}
          >
            📤 Export
          </button>
        </div>

        <div className="report-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="report-summary">
                <h2>Report Summary</h2>
                <div className="summary-grid">
                  {Object.entries(report.data).slice(0, 6).map(([key, value]) => (
                    <div key={key} className="summary-item">
                      <div className="summary-label">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div className="summary-value">{formatValue(value)}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="report-highlights">
                <h3>Key Highlights</h3>
                <ul>
                  {Object.entries(report.data).slice(0, 3).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {formatValue(value)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="details-tab">
              <h2>Detailed Report Data</h2>
              <div className="data-table">
                <table>
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(report.data).map(([key, value]) => (
                      <tr key={key}>
                        <td className="metric-name">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                        <td className="metric-value">{formatValue(value)}</td>
                        <td className="metric-description">
                          {getMetricDescription(key)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="export-tab">
              <h2>Export Report</h2>
              <p>Choose your preferred export format to download this report.</p>
              
              <div className="export-options">
                <div className="export-option">
                  <div className="export-option-header">
                    <span className="export-icon">📄</span>
                    <div>
                      <h3>PDF Format</h3>
                      <p>Professional formatted report for printing and sharing</p>
                    </div>
                  </div>
                  <button 
                    className="export-btn primary"
                    onClick={() => onExport('PDF', report.type)}
                    disabled={isExporting === 'PDF'}
                  >
                    {isExporting === 'PDF' ? '⏳ Exporting...' : 'Export PDF'}
                  </button>
                </div>

                <div className="export-option">
                  <div className="export-option-header">
                    <span className="export-icon">📊</span>
                    <div>
                      <h3>Excel Format</h3>
                      <p>Spreadsheet format for data analysis and calculations</p>
                    </div>
                  </div>
                  <button 
                    className="export-btn secondary"
                    onClick={() => onExport('Excel', report.type)}
                    disabled={isExporting === 'Excel'}
                  >
                    {isExporting === 'Excel' ? '⏳ Exporting...' : 'Export Excel'}
                  </button>
                </div>

                <div className="export-option">
                  <div className="export-option-header">
                    <span className="export-icon">💾</span>
                    <div>
                      <h3>CSV Format</h3>
                      <p>Comma-separated values for database import</p>
                    </div>
                  </div>
                  <button 
                    className="export-btn secondary"
                    onClick={() => onExport('CSV', report.type)}
                    disabled={isExporting === 'CSV'}
                  >
                    {isExporting === 'CSV' ? '⏳ Exporting...' : 'Export CSV'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Close Button */}
        <div className="report-viewer-footer">
          <button className="close-modal-btn" onClick={onClose}>
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};

const getMetricDescription = (key: string): string => {
  const descriptions: Record<string, string> = {
    revenue: 'Total income generated from all sources',
    expenses: 'Total costs and expenditures incurred',
    netIncome: 'Profit after deducting all expenses from revenue',
    grossMargin: 'Percentage of revenue retained after direct costs',
    expenseRatio: 'Proportion of revenue consumed by expenses',
    operatingCashFlow: 'Cash generated from core business operations',
    availableCash: 'Liquid funds available for immediate use',
    cashRatio: 'Percentage of income maintained as cash reserves',
    monthlyBurnRate: 'Average monthly cash consumption rate',
    runwayMonths: 'Number of months before cash reserves are depleted',
    monthlyIncome: 'Average monthly revenue generation',
    monthlyExpenses: 'Average monthly cost outlay',
    monthlyProfit: 'Average monthly net profit',
    totalIncome: 'Cumulative income for the period',
    deductibleExpenses: 'Business expenses eligible for tax deduction',
    taxableIncome: 'Income subject to taxation after deductions',
    estimatedTaxRate: 'Projected tax rate for the income bracket',
    estimatedTaxLiability: 'Calculated tax amount owed',
    quarterlyPayments: 'Recommended quarterly tax payment amount'
  };
  
  return descriptions[key] || 'Financial metric from the report';
};

export default ReportViewer;
