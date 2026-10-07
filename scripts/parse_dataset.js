const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'src', 'data', 'raw_data.csv');
const rawContent = fs.readFileSync(csvPath, 'utf-8');

const lines = rawContent.split(/\r?\n/).filter(line => line.trim().length > 0);
const headers = lines[0].split(',').map(h => h.trim());

// Department standardizer
function normalizeDepartment(rawDept, designation) {
  if (!rawDept || rawDept.trim() === '') {
    const des = (designation || '').toLowerCase();
    if (des === 'md' || des === 'director' || des === 'ceo') return 'Management';
    if (des.includes('manager') || des.includes('executive')) return 'Administration';
    return 'General Operations';
  }
  const clean = rawDept.trim();
  const lower = clean.toLowerCase();
  if (lower === 'panal' || lower === 'panel') return 'Panel Workshop';
  if (lower === 'wood') return 'Wood Workshop';
  if (lower === 'metal') return 'Metal Workshop';
  if (lower === 'c&s' || lower === 'cns') return 'C&S (Cutting & Sewing)';
  if (lower === 'lacquer' || lower === 'lacquire' || lower === 'polish') return 'Lacquer & Finishing';
  if (lower === 'paking') return 'Packing & Dispatch';
  if (lower === 'maintanance') return 'Maintenance & Engineering';
  if (lower === 'cook' || lower === 'cooking') return 'Catering & Kitchen';
  if (lower === 'security') return 'Security Services';
  if (lower === 'store') return 'Store & Inventory';
  if (lower === 'production') return 'Production Management';
  if (lower === 'purchase' || lower === 'procurment') return 'Procurement & Purchase';
  if (lower === 'sales & marketing' || lower === 'corporate sales') return 'Sales & Marketing';
  if (lower === 'design & planing') return 'Design & Planning';
  if (lower === 'it' || lower === 'it & e-commerce') return 'IT & Systems';
  if (lower === 'accounts & finance') return 'Accounts & Finance';
  if (lower === 'hr & admin') return 'HR & Administration';
  if (lower === 'supply chain') return 'Supply Chain';
  if (lower === 'transport') return 'Transport & Fleet';
  if (lower === 'office staff' || lower === 'staff') return 'Office Administration';
  if (lower === 'tender') return 'Tender & Projects';
  if (lower === 'crm') return 'Customer Relations (CRM)';
  if (lower === 'ie') return 'Industrial Engineering (IE)';
  if (lower === 'distribution') return 'Logistics & Distribution';
  return clean;
}

function normalizeRole(role) {
  if (!role || role.trim() === '') return 'Technician / Operative';
  return role.trim();
}

function getAvatarColor(dept) {
  const colors = {
    'Wood Workshop': '#b45309', // Amber-700
    'Metal Workshop': '#475569', // Slate-600
    'Panel Workshop': '#0891b2', // Cyan-600
    'C&S (Cutting & Sewing)': '#7c3aed', // Violet-600
    'Lacquer & Finishing': '#db2777', // Pink-600
    'Packing & Dispatch': '#d97706', // Amber-600
    'Maintenance & Engineering': '#ea580c', // Orange-600
    'Sales & Marketing': '#2563eb', // Blue-600
    'Management': '#4f46e5', // Indigo-600
    'IT & Systems': '#0284c7', // Sky-600
    'Accounts & Finance': '#059669', // Emerald-600
    'HR & Administration': '#10b981', // Emerald-500
    'Procurement & Purchase': '#8b5cf6', // Purple-500
    'Store & Inventory': '#64748b', // Slate-500
    'Production Management': '#6366f1', // Indigo-500
    'Design & Planning': '#ec4899', // Pink-500
    'Security Services': '#334155', // Slate-700
    'Catering & Kitchen': '#f59e0b', // Amber-500
  };
  return colors[dept] || '#3b82f6';
}

const employees = [];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const cols = line.split(',').map(c => c.trim());
  if (cols.length < 5 || !cols[0]) continue;

  const empId = cols[0];
  const name = cols[1];
  const rawDept = cols[2];
  const rawDesig = cols[3];
  const joiningDate = cols[4];
  const monthsActive = parseInt(cols[5] || '12', 10);
  const sl = parseFloat(cols[6] || '0');
  const cl = parseFloat(cols[7] || '0');
  const el = parseFloat(cols[8] || '0');
  const totalAlloc = parseFloat(cols[9] || '0');
  const slUsed = parseFloat(cols[10] || '0');
  const clUsed = parseFloat(cols[11] || '0');
  const elUsed = parseFloat(cols[12] || '0');
  const lwp = parseFloat(cols[13] || '0');
  const totalUsed = parseFloat(cols[14] || '0');
  const slRemaining = parseFloat(cols[15] || '0');
  const clRemaining = parseFloat(cols[16] || '0');
  const elRemaining = parseFloat(cols[17] || '0');
  const totalRemaining = parseFloat(cols[18] || '0');
  const status = cols[19] || 'OK';

  const normalizedDept = normalizeDepartment(rawDept, rawDesig);
  const normalizedDesignation = normalizeRole(rawDesig);

  employees.push({
    id: empId,
    name: name,
    rawDepartment: rawDept,
    department: normalizedDept,
    rawDesignation: rawDesig,
    designation: normalizedDesignation,
    joiningDate: joiningDate,
    monthsActive: monthsActive,
    allocation: {
      sl: sl,
      cl: cl,
      el: el,
      total: totalAlloc
    },
    used: {
      sl: slUsed,
      cl: clUsed,
      el: elUsed,
      lwp: lwp,
      total: totalUsed
    },
    remaining: {
      sl: slRemaining,
      cl: clRemaining,
      el: elRemaining,
      total: totalRemaining
    },
    status: status,
    avatarColor: getAvatarColor(normalizedDept)
  });
}

console.log(`Successfully parsed ${employees.length} employees.`);

// Generate meta statistics
const deptCounts = {};
let totalAllocatedLeaves = 0;
let totalUsedLeaves = 0;
let totalRemainingLeaves = 0;

employees.forEach(emp => {
  deptCounts[emp.department] = (deptCounts[emp.department] || 0) + 1;
  totalAllocatedLeaves += emp.allocation.total;
  totalUsedLeaves += emp.used.total;
  totalRemainingLeaves += emp.remaining.total;
});

const metadata = {
  companyName: "DOTS Furniture & Décor Limited",
  reportTitle: "EMPLOYEE LEAVE TRACKER (AUTOMATED PRO-RATA)",
  trackingYear: 2026,
  annualPolicy: {
    sickLeave: 14,
    casualLeave: 10,
    earnedLeave: 6,
    totalAnnual: 30
  },
  totalEmployees: employees.length,
  totalAllocatedLeaves: parseFloat(totalAllocatedLeaves.toFixed(1)),
  totalUsedLeaves: parseFloat(totalUsedLeaves.toFixed(1)),
  totalRemainingLeaves: parseFloat(totalRemainingLeaves.toFixed(1)),
  departmentCounts: deptCounts
};

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'employees.json'), JSON.stringify(employees, null, 2));
fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'metadata.json'), JSON.stringify(metadata, null, 2));
console.log('Saved employees.json and metadata.json.');
