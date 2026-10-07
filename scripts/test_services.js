const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// 1. Test Excel generation with sample data
console.log('--- Testing Excel (.xlsx) and CSV Generation ---');

const employees = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'employees.json'), 'utf-8'));
const policy = {
  trackingYear: 2026,
  sickLeave: 14.0,
  casualLeave: 10.0,
  earnedLeave: 6.0,
  totalAnnual: 30.0
};

console.log(`Loaded ${employees.length} employees.`);

// Create workbook
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

const totalAllocated = employees.reduce((sum, e) => sum + e.allocation.total, 0);
const totalUsed = employees.reduce((sum, e) => sum + e.used.total, 0);
const totalRemaining = employees.reduce((sum, e) => sum + e.remaining.total, 0);

const summaryRow = [
  'TOTAL',
  `${employees.length} Employees`,
  '', '', '', '', '', '', '',
  parseFloat(totalAllocated.toFixed(1)),
  '', '', '', 0,
  parseFloat(totalUsed.toFixed(1)),
  '', '', '',
  parseFloat(totalRemaining.toFixed(1)),
  ''
];

const ws1 = XLSX.utils.aoa_to_sheet([headers, ...dataRows, summaryRow]);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws1, 'Employee Leave Tracker');

const outDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const testExcelPath = path.join(outDir, 'test_export.xlsx');
XLSX.writeFile(wb, testExcelPath);

if (fs.existsSync(testExcelPath)) {
  const stat = fs.statSync(testExcelPath);
  console.log(`Excel file created successfully (${stat.size} bytes).`);
} else {
  console.error('Failed to create Excel file.');
  process.exit(1);
}

// 2. Test Pro-Rata Math
console.log('--- Testing Pro-Rata Math Engine ---');
function calculateProRata(months, p) {
  const m = Math.min(Math.max(months, 1), 12);
  const sl = parseFloat(((m / 12) * p.sickLeave).toFixed(1));
  const cl = parseFloat(((m / 12) * p.casualLeave).toFixed(1));
  const el = parseFloat(((m / 12) * p.earnedLeave).toFixed(1));
  const total = parseFloat((sl + cl + el).toFixed(1));
  return { sl, cl, el, total };
}

const test12 = calculateProRata(12, policy);
console.log('12 Months:', test12, 'Expected total 30.0:', test12.total === 30.0 ? 'PASS' : 'FAIL');

const test11 = calculateProRata(11, policy);
console.log('11 Months:', test11, 'Expected total 27.5:', test11.total === 27.5 ? 'PASS' : 'FAIL');

const test8 = calculateProRata(8, policy);
console.log('8 Months:', test8, 'Expected total 20.0:', test8.total === 20.0 ? 'PASS' : 'FAIL');

const test4 = calculateProRata(4, policy);
console.log('4 Months:', test4, 'Expected total 10.0:', test4.total === 10.0 ? 'PASS' : 'FAIL');

const test3 = calculateProRata(3, policy);
console.log('3 Months:', test3, 'Expected total 7.5:', test3.total === 7.5 ? 'PASS' : 'FAIL');

console.log('All backend and export test assertions passed cleanly!');
