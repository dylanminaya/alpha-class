// Export Service for Dashboard Data
export interface ExportData {
  expenses: any[];
  transactions: any[];
  budgets: any[];
  debts: any[];
  userInfo: any;
}

export class ExportService {
  // Mock data for export
  private static getMockData(): ExportData {
    return {
      expenses: [
        { id: 1, amount: 45.50, category: 'Food', description: 'Coffee Shop', date: '2024-01-15' },
        { id: 2, amount: 120.30, category: 'Shopping', description: 'Grocery Store', date: '2024-01-14' },
        { id: 3, amount: 28.00, category: 'Entertainment', description: 'Movie Theater', date: '2024-01-13' },
        { id: 4, amount: 85.00, category: 'Transport', description: 'Gas Station', date: '2024-01-12' }
      ],
      transactions: [
        { id: 1, type: 'expense', amount: -45.50, description: 'Coffee Shop', date: '2024-01-15' },
        { id: 2, type: 'income', amount: 2500.00, description: 'Salary', date: '2024-01-01' },
        { id: 3, type: 'expense', amount: -120.30, description: 'Grocery Store', date: '2024-01-14' }
      ],
      budgets: [
        { category: 'Food', limit: 500, spent: 320, remaining: 180 },
        { category: 'Transport', limit: 300, spent: 150, remaining: 150 },
        { category: 'Entertainment', limit: 200, spent: 85, remaining: 115 }
      ],
      debts: [
        { name: 'Credit Card', original: 5000, remaining: 3200, interest: 18.99 },
        { name: 'Student Loan', original: 15000, remaining: 12000, interest: 5.5 },
        { name: 'Car Loan', original: 12000, remaining: 8500, interest: 4.25 }
      ],
      userInfo: {
        name: 'Admin User',
        email: 'admin@alphaclass.com',
        accountNumber: '****1234',
        joinDate: '2023-01-01'
      }
    };
  }

  // Export to Excel format (CSV)
  static exportToExcel(): void {
    const data = this.getMockData();
    const csvContent = this.convertToCSV(data);
    this.downloadFile(csvContent, 'dashboard-data.csv', 'text/csv');
  }

  // Export to PDF format
  static exportToPDF(): void {
    const data = this.getMockData();
    const pdfContent = this.convertToPDF(data);
    this.downloadFile(pdfContent, 'dashboard-report.pdf', 'application/pdf');
  }

  // Export to CSV format
  static exportToCSV(): void {
    const data = this.getMockData();
    const csvContent = this.convertToCSV(data);
    this.downloadFile(csvContent, 'dashboard-data.csv', 'text/csv');
  }

  // Convert data to CSV format
  private static convertToCSV(data: ExportData): string {
    let csv = 'Category,Description,Amount,Date\n';
    
    // Add expenses
    data.expenses.forEach(expense => {
      csv += `Expense,${expense.description},${expense.amount},${expense.date}\n`;
    });
    
    // Add transactions
    data.transactions.forEach(transaction => {
      csv += `Transaction,${transaction.description},${transaction.amount},${transaction.date}\n`;
    });
    
    // Add budget summary
    csv += '\nBudget Summary\n';
    csv += 'Category,Limit,Spent,Remaining\n';
    data.budgets.forEach(budget => {
      csv += `${budget.category},${budget.limit},${budget.spent},${budget.remaining}\n`;
    });
    
    // Add debt summary
    csv += '\nDebt Summary\n';
    csv += 'Name,Original Amount,Remaining,Interest Rate\n';
    data.debts.forEach(debt => {
      csv += `${debt.name},${debt.original},${debt.remaining},${debt.interest}%\n`;
    });
    
    return csv;
  }

  // Convert data to PDF format (simplified - in real app would use a PDF library)
  private static convertToPDF(data: ExportData): string {
    // This is a simplified version. In a real application, you would use a library like jsPDF
    const pdfContent = `
      Alpha Class Dashboard Report
      Generated on: ${new Date().toLocaleDateString()}
      
      User Information:
      Name: ${data.userInfo.name}
      Email: ${data.userInfo.email}
      Account: ${data.userInfo.accountNumber}
      
      Expense Summary:
      ${data.expenses.map(exp => `- ${exp.description}: $${exp.amount}`).join('\n')}
      
      Budget Summary:
      ${data.budgets.map(budget => `- ${budget.category}: $${budget.spent}/${budget.limit}`).join('\n')}
      
      Debt Summary:
      ${data.debts.map(debt => `- ${debt.name}: $${debt.remaining} remaining`).join('\n')}
    `;
    
    return pdfContent;
  }

  // Download file helper
  private static downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  // Get export statistics
  static getExportStats(): { totalExpenses: number; totalTransactions: number; totalDebts: number } {
    const data = this.getMockData();
    return {
      totalExpenses: data.expenses.length,
      totalTransactions: data.transactions.length,
      totalDebts: data.debts.length
    };
  }
}
