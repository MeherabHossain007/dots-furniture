import * as XLSX from 'xlsx';
import { Employee, CompanyPolicy } from '../types';

export const excelExportService = {
  /**
   * Export workforce data to Excel format (.xlsx)
   */
  exportToExcel(
    employees: Employee[],
    policy: CompanyPolicy,
    filename = `DOTS_Furniture_Leave_Tracker_${policy.trackingYear || 2026}.xlsx`
  ): { success: boolean; error?: string } {
    try {
      if (!employees || employees.length === 0) {
        throw new Error('No employee records available to export.');
      }

      // 1. Prepare Main Sheet Data
      const headers = [
        'Emp ID',
        'Employee Name',
        'Department',
        'Designation',
        'Joining Date',
        'Months Active',
        'SL Allocated',
        'CL Allocated',
        'EL Allocated',
        'Total Allocated',
        'SL Used',
        'CL Used',
        'EL Used',
        'LWP',
        'Total Used',
        'SL Remaining',
        'CL Remaining',
        'EL Remaining',
        'Total Remaining',
        'Status'
      ];

      const dataRows = employees.map(emp => [
        emp.id,
        emp.name,
        emp.department,
        emp.designation,
        emp.joiningDate,
        emp.monthsActive,
        emp.allocation.sl,
        emp.allocation.cl,
        emp.allocation.el,
        emp.allocation.total,
        emp.used.sl,
        emp.used.cl,
        emp.used.el,
        emp.used.lwp,
        emp.used.total,
        emp.remaining.sl,
        emp.remaining.cl,
        emp.remaining.el,
        emp.remaining.total,
        emp.status || 'OK'
      ]);

      // Totals calculation
      const totalAllocated = employees.reduce((sum, e) => sum + e.allocation.total, 0);
      const totalUsed = employees.reduce((sum, e) => sum + e.used.total, 0);
      const totalRemaining = employees.reduce((sum, e) => sum + e.remaining.total, 0);
      const totalLWP = employees.reduce((sum, e) => sum + (e.used.lwp || 0), 0);

      const summaryRow = [
        'TOTAL',
        `${employees.length} Employees`,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        parseFloat(totalAllocated.toFixed(1)),
        '',
        '',
        '',
        parseFloat(totalLWP.toFixed(1)),
        parseFloat(totalUsed.toFixed(1)),
        '',
        '',
        '',
        parseFloat(totalRemaining.toFixed(1)),
        ''
      ];

      const fullSheetData = [headers, ...dataRows, summaryRow];
      const mainWorksheet = XLSX.utils.aoa_to_sheet(fullSheetData);

      // Auto-fit column widths
      const colWidths = headers.map((header, colIndex) => {
        let maxLen = header.length;
        dataRows.forEach(row => {
          const valStr = String(row[colIndex] ?? '');
          if (valStr.length > maxLen) maxLen = valStr.length;
        });
        return { wch: Math.min(Math.max(maxLen + 3, 10), 35) };
      });
      mainWorksheet['!cols'] = colWidths;

      // 2. Prepare Company Summary & Policy Sheet
      const deptCounts: Record<string, number> = {};
      employees.forEach(e => {
        deptCounts[e.department] = (deptCounts[e.department] || 0) + 1;
      });

      const policySheetData = [
        ['DOTS Furniture & Décor Limited', ''],
        ['Employee Leave Management & Automated Pro-Rata Tracker', ''],
        ['', ''],
        ['Company Policy Settings', ''],
        ['Tracking Year', policy.trackingYear],
        ['Sick Leave (SL) Annual Quota', policy.sickLeave],
        ['Casual Leave (CL) Annual Quota', policy.casualLeave],
        ['Earned Leave (EL) Annual Quota', policy.earnedLeave],
        ['Total Annual Quotas Combined', policy.totalAnnual],
        ['', ''],
        ['Workforce Headcount Overview', ''],
        ['Total Workforce', employees.length],
        ['Total Leave Days Allocated', parseFloat(totalAllocated.toFixed(1))],
        ['Total Leave Days Used', parseFloat(totalUsed.toFixed(1))],
        ['Total Leave Days Remaining', parseFloat(totalRemaining.toFixed(1))],
        ['Workforce Leave Utilization Rate', `${((totalUsed / (totalAllocated || 1)) * 100).toFixed(2)}%`],
        ['', ''],
        ['Department', 'Headcount']
      ];

      Object.entries(deptCounts)
        .sort((a, b) => b[1] - a[1])
        .forEach(([dept, count]) => {
          policySheetData.push([dept, count]);
        });

      const policyWorksheet = XLSX.utils.aoa_to_sheet(policySheetData);
      policyWorksheet['!cols'] = [{ wch: 32 }, { wch: 18 }];

      // 3. Assemble Workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, mainWorksheet, 'Employee Leave Tracker');
      XLSX.utils.book_append_sheet(workbook, policyWorksheet, 'Policy & Statistics');

      // 4. Trigger download
      XLSX.writeFile(workbook, filename);
      return { success: true };
    } catch (err: any) {
      console.error('Excel export failure:', err);
      return { success: false, error: err.message || 'Failed to export Excel file.' };
    }
  },

  /**
   * Export workforce data to standard CSV (.csv)
   */
  exportToCSV(
    employees: Employee[],
    policy: CompanyPolicy,
    filename = `DOTS_Furniture_Leave_Tracker_${policy.trackingYear || 2026}.csv`
  ): { success: boolean; error?: string } {
    try {
      if (!employees || employees.length === 0) {
        throw new Error('No employee records available to export.');
      }

      const headers = [
        'Emp ID',
        'Employee Name',
        'Department',
        'Designation',
        'Joining Date',
        'Months Active',
        'S L',
        'C L',
        'E L',
        'Total',
        'SL Used',
        'CL Used',
        'EL Used',
        'LWP',
        'Total Used',
        'SL R',
        'CL R',
        'EL R',
        'Total R',
        'Status'
      ];

      const rows = [headers.join(',')];

      employees.forEach(e => {
        const row = [
          e.id,
          `"${(e.name || '').replace(/"/g, '""')}"`,
          `"${(e.department || '').replace(/"/g, '""')}"`,
          `"${(e.designation || '').replace(/"/g, '""')}"`,
          e.joiningDate,
          e.monthsActive,
          e.allocation.sl.toFixed(1),
          e.allocation.cl.toFixed(1),
          e.allocation.el.toFixed(1),
          e.allocation.total.toFixed(1),
          e.used.sl,
          e.used.cl,
          e.used.el,
          e.used.lwp,
          e.used.total,
          e.remaining.sl.toFixed(1),
          e.remaining.cl.toFixed(1),
          e.remaining.el.toFixed(1),
          e.remaining.total.toFixed(1),
          e.status || 'OK'
        ];
        rows.push(row.join(','));
      });

      const csvContent = rows.join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      return { success: true };
    } catch (err: any) {
      console.error('CSV export failure:', err);
      return { success: false, error: err.message || 'Failed to export CSV file.' };
    }
  }
};
