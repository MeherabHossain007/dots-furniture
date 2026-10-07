import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  Employee, 
  CompanyPolicy, 
  LeaveAuditRecord, 
  FilterState, 
  ToastNotification, 
  ActiveTab 
} from '../types';
import { storageService } from '../services/storageService';
import { proRataService } from '../services/proRataService';
import { excelExportService } from '../services/excelExportService';

interface EmployeeContextType {
  employees: Employee[];
  policy: CompanyPolicy;
  auditLog: LeaveAuditRecord[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  filteredEmployees: Employee[];
  toasts: ToastNotification[];
  addToast: (type: ToastNotification['type'], message: string) => void;
  removeToast: (id: string) => void;
  
  // Actions
  addEmployee: (data: { id: string; name: string; department: string; designation: string; joiningDate: string; monthsActive: number }) => boolean;
  updateEmployee: (id: string, data: Partial<Employee>) => boolean;
  deleteEmployee: (id: string) => boolean;
  applyLeave: (empId: string, leaveType: string, days: number, dateFrom: string, dateTo: string, reason: string) => boolean;
  deleteLeaveRecord: (recordId: string) => boolean;
  updatePolicy: (newPolicy: CompanyPolicy) => boolean;
  recalculateAllProRata: () => boolean;
  resetToInitialData: () => void;
  exportExcel: (filteredOnly?: boolean) => void;
  exportCSV: (filteredOnly?: boolean) => void;
  exportJSONBackup: () => void;
  importJSONBackup: (jsonString: string) => boolean;

  // Modals state
  selectedEmployeeForDossier: Employee | null;
  setSelectedEmployeeForDossier: (emp: Employee | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  employeeToEdit: Employee | null;
  setEmployeeToEdit: (emp: Employee | null) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(() => storageService.loadEmployees());
  const [policy, setPolicy] = useState<CompanyPolicy>(() => storageService.loadPolicy());
  const [auditLog, setAuditLog] = useState<LeaveAuditRecord[]>(() => storageService.loadAuditLog());
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    department: '',
    monthsActive: '',
    leaveStatus: '',
    sortBy: 'id_asc',
  });

  // Modal State
  const [selectedEmployeeForDossier, setSelectedEmployeeForDossier] = useState<Employee | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  // Toast Notification System
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = (type: ToastNotification['type'], message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to localStorage
  useEffect(() => {
    storageService.saveEmployees(employees);
  }, [employees]);

  useEffect(() => {
    storageService.savePolicy(policy);
  }, [policy]);

  useEffect(() => {
    storageService.saveAuditLog(auditLog);
  }, [auditLog]);

  // Derived Filtered Employees
  const filteredEmployees = useMemo(() => {
    let result = [...employees];

    // Search filter
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(emp => 
        emp.id.toLowerCase().includes(q) ||
        emp.name.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q) ||
        emp.designation.toLowerCase().includes(q)
      );
    }

    // Department filter
    if (filters.department) {
      result = result.filter(emp => emp.department === filters.department);
    }

    // Months active filter
    if (filters.monthsActive) {
      const m = parseInt(filters.monthsActive, 10);
      result = result.filter(emp => emp.monthsActive === m);
    }

    // Leave status filter
    if (filters.leaveStatus === 'used_gt_0') {
      result = result.filter(emp => emp.used.total > 0);
    } else if (filters.leaveStatus === 'used_eq_0') {
      result = result.filter(emp => emp.used.total === 0);
    } else if (filters.leaveStatus === 'lwp') {
      result = result.filter(emp => emp.used.lwp > 0);
    }

    // Sort order
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'id_asc':
          return parseInt(a.id, 10) - parseInt(b.id, 10);
        case 'id_desc':
          return parseInt(b.id, 10) - parseInt(a.id, 10);
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'dept_asc':
          return a.department.localeCompare(b.department);
        case 'months_desc':
          return b.monthsActive - a.monthsActive;
        case 'used_desc':
          return b.used.total - a.used.total;
        case 'rem_asc':
          return a.remaining.total - b.remaining.total;
        default:
          return parseInt(a.id, 10) - parseInt(b.id, 10);
      }
    });

    return result;
  }, [employees, filters]);

  // Add Employee
  const addEmployee = (data: { id: string; name: string; department: string; designation: string; joiningDate: string; monthsActive: number }) => {
    if (employees.some(e => e.id === data.id)) {
      addToast('error', `Employee ID ${data.id} already exists.`);
      return false;
    }

    const alloc = proRataService.calculateAllocation(data.monthsActive, policy);
    const newEmp: Employee = {
      id: data.id,
      name: data.name,
      department: data.department,
      designation: data.designation,
      joiningDate: data.joiningDate,
      monthsActive: data.monthsActive,
      allocation: alloc,
      used: { sl: 0, cl: 0, el: 0, lwp: 0, total: 0 },
      remaining: {
        sl: alloc.sl,
        cl: alloc.cl,
        el: alloc.el,
        total: alloc.total
      },
      status: 'OK'
    };

    setEmployees(prev => [newEmp, ...prev]);
    addToast('success', `Employee ${data.name} (${data.id}) created successfully.`);
    return true;
  };

  // Update Employee
  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id !== id) return emp;
      const updated = { ...emp, ...updates };

      // If months active changed, recalculate pro-rata
      if (updates.monthsActive !== undefined && updates.monthsActive !== emp.monthsActive) {
        const alloc = proRataService.calculateAllocation(updates.monthsActive, policy);
        updated.allocation = alloc;
        updated.remaining = {
          sl: parseFloat(Math.max(0, alloc.sl - updated.used.sl).toFixed(1)),
          cl: parseFloat(Math.max(0, alloc.cl - updated.used.cl).toFixed(1)),
          el: parseFloat(Math.max(0, alloc.el - updated.used.el).toFixed(1)),
          total: parseFloat(Math.max(0, alloc.total - updated.used.total).toFixed(1)),
        };
      }
      return updated;
    }));

    addToast('success', 'Employee updated successfully.');
    return true;
  };

  // Delete Employee
  const deleteEmployee = (id: string) => {
    const target = employees.find(e => e.id === id);
    if (!target) return false;

    setEmployees(prev => prev.filter(e => e.id !== id));
    addToast('success', `Employee ${target.name} (${id}) deleted.`);
    return true;
  };

  // Apply Leave
  const applyLeave = (
    empId: string, 
    leaveType: string, 
    days: number, 
    dateFrom: string, 
    dateTo: string, 
    reason: string
  ) => {
    const target = employees.find(e => e.id === empId);
    if (!target) {
      addToast('error', 'Employee not found.');
      return false;
    }

    setEmployees(prev => prev.map(emp => {
      if (emp.id !== empId) return emp;

      const updatedUsed = { ...emp.used };
      const updatedRemaining = { ...emp.remaining };

      if (leaveType === 'sl') {
        updatedUsed.sl += days;
        updatedRemaining.sl = parseFloat(Math.max(0, updatedRemaining.sl - days).toFixed(1));
      } else if (leaveType === 'cl') {
        updatedUsed.cl += days;
        updatedRemaining.cl = parseFloat(Math.max(0, updatedRemaining.cl - days).toFixed(1));
      } else if (leaveType === 'el') {
        updatedUsed.el += days;
        updatedRemaining.el = parseFloat(Math.max(0, updatedRemaining.el - days).toFixed(1));
      } else if (leaveType === 'lwp') {
        updatedUsed.lwp += days;
      }

      updatedUsed.total = parseFloat((updatedUsed.sl + updatedUsed.cl + updatedUsed.el).toFixed(1));
      updatedRemaining.total = parseFloat(Math.max(0, emp.allocation.total - updatedUsed.total).toFixed(1));

      return {
        ...emp,
        used: updatedUsed,
        remaining: updatedRemaining
      };
    }));

    // Record in Audit Log
    const typeLabelMap: Record<string, string> = {
      sl: 'Sick Leave (SL)',
      cl: 'Casual Leave (CL)',
      el: 'Earned Leave (EL)',
      lwp: 'Leave Without Pay (LWP)'
    };

    const newRecord: LeaveAuditRecord = {
      id: `LOG-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      date: dateTo && dateTo !== dateFrom ? `${dateFrom} to ${dateTo}` : dateFrom,
      empId: target.id,
      name: target.name,
      dept: target.department,
      type: typeLabelMap[leaveType] || leaveType,
      leaveCategory: leaveType as 'sl' | 'cl' | 'el' | 'lwp',
      days,
      reason,
      timestamp: new Date().toISOString()
    };

    setAuditLog(prev => [newRecord, ...prev]);
    addToast('success', `Approved ${days} days ${typeLabelMap[leaveType] || leaveType} for ${target.name}.`);
    return true;
  };

  // Delete Leave Record & Refund Balance
  const deleteLeaveRecord = (recordId: string): boolean => {
    const record = auditLog.find(r => r.id === recordId);
    if (!record) {
      addToast('error', 'Leave record not found.');
      return false;
    }

    // Determine category
    let cat: 'sl' | 'cl' | 'el' | 'lwp' = record.leaveCategory || 'sl';
    if (!record.leaveCategory) {
      const t = (record.type || '').toLowerCase();
      if (t.includes('sick') || t.includes('(sl)') || t === 'sl') cat = 'sl';
      else if (t.includes('casual') || t.includes('(cl)') || t === 'cl') cat = 'cl';
      else if (t.includes('earned') || t.includes('(el)') || t === 'el') cat = 'el';
      else if (t.includes('without pay') || t.includes('(lwp)') || t === 'lwp') cat = 'lwp';
    }

    const daysToRefund = Number(record.days) || 0;

    // Refund employee balance
    setEmployees(prev => prev.map(emp => {
      if (emp.id !== record.empId) return emp;

      const updatedUsed = { ...emp.used };
      if (cat === 'sl') {
        updatedUsed.sl = Math.max(0, parseFloat((updatedUsed.sl - daysToRefund).toFixed(1)));
      } else if (cat === 'cl') {
        updatedUsed.cl = Math.max(0, parseFloat((updatedUsed.cl - daysToRefund).toFixed(1)));
      } else if (cat === 'el') {
        updatedUsed.el = Math.max(0, parseFloat((updatedUsed.el - daysToRefund).toFixed(1)));
      } else if (cat === 'lwp') {
        updatedUsed.lwp = Math.max(0, parseFloat((updatedUsed.lwp - daysToRefund).toFixed(1)));
      }

      updatedUsed.total = parseFloat((updatedUsed.sl + updatedUsed.cl + updatedUsed.el).toFixed(1));

      const updatedRemaining = {
        sl: parseFloat(Math.min(emp.allocation.sl, Math.max(0, emp.allocation.sl - updatedUsed.sl)).toFixed(1)),
        cl: parseFloat(Math.min(emp.allocation.cl, Math.max(0, emp.allocation.cl - updatedUsed.cl)).toFixed(1)),
        el: parseFloat(Math.min(emp.allocation.el, Math.max(0, emp.allocation.el - updatedUsed.el)).toFixed(1)),
        total: parseFloat(Math.max(0, emp.allocation.total - updatedUsed.total).toFixed(1)),
      };

      let status: 'OK' | 'Warning' | 'Exceeded' = 'OK';
      if (updatedUsed.lwp > 0 || updatedUsed.total > emp.allocation.total) {
        status = 'Exceeded';
      } else if (updatedRemaining.total <= 3) {
        status = 'Warning';
      }

      const updatedEmp: Employee = {
        ...emp,
        used: updatedUsed,
        remaining: updatedRemaining,
        status
      };

      setSelectedEmployeeForDossier(current => (current && current.id === emp.id ? updatedEmp : current));

      return updatedEmp;
    }));

    // Remove from audit log
    setAuditLog(prev => prev.filter(r => r.id !== recordId));
    addToast('success', `Removed leave record: ${daysToRefund} day(s) refunded to ${record.name} (${record.empId}).`);
    return true;
  };

  // Update Policy
  const updatePolicy = (newPolicy: CompanyPolicy) => {
    setPolicy(newPolicy);
    addToast('success', 'Company leave policy updated.');
    return true;
  };

  // Recalculate Pro-Rata
  const recalculateAllProRata = () => {
    const updated = proRataService.recalculateAllEmployees(employees, policy);
    setEmployees(updated);
    addToast('success', 'All employee pro-rata leave entitlements recalculated.');
    return true;
  };

  // Reset to Defaults
  const resetToInitialData = () => {
    const res = storageService.resetToDefaults();
    setEmployees(res.employees);
    setPolicy(res.policy);
    setAuditLog(res.audit);
    addToast('info', 'Restored initial DOTS Furniture records.');
  };

  // Excel & CSV Exports
  const exportExcel = (filteredOnly = false) => {
    const list = filteredOnly ? filteredEmployees : employees;
    const res = excelExportService.exportToExcel(list, policy);
    if (res.success) {
      addToast('success', `Successfully exported ${list.length} records to Excel (.xlsx).`);
    } else {
      addToast('error', res.error || 'Failed to export Excel file.');
    }
  };

  const exportCSV = (filteredOnly = false) => {
    const list = filteredOnly ? filteredEmployees : employees;
    const res = excelExportService.exportToCSV(list, policy);
    if (res.success) {
      addToast('success', `Successfully exported ${list.length} records to CSV.`);
    } else {
      addToast('error', res.error || 'Failed to export CSV file.');
    }
  };

  // JSON Backup / Restore
  const exportJSONBackup = () => {
    try {
      const jsonStr = storageService.exportBackupJSON();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dots_furniture_backup_${policy.trackingYear}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addToast('success', 'JSON backup file downloaded.');
    } catch (err: any) {
      addToast('error', 'Failed to generate JSON backup: ' + err.message);
    }
  };

  const importJSONBackup = (jsonString: string) => {
    try {
      const res = storageService.importBackupJSON(jsonString);
      setEmployees(res.employees);
      setPolicy(res.policy);
      setAuditLog(res.audit);
      addToast('success', `Restored ${res.employees.length} records from backup.`);
      return true;
    } catch (err: any) {
      addToast('error', err.message || 'Corrupted or invalid JSON backup file.');
      return false;
    }
  };

  return (
    <EmployeeContext.Provider value={{
      employees,
      policy,
      auditLog,
      activeTab,
      setActiveTab,
      filters,
      setFilters,
      filteredEmployees,
      toasts,
      addToast,
      removeToast,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      applyLeave,
      deleteLeaveRecord,
      updatePolicy,
      recalculateAllProRata,
      resetToInitialData,
      exportExcel,
      exportCSV,
      exportJSONBackup,
      importJSONBackup,
      selectedEmployeeForDossier,
      setSelectedEmployeeForDossier,
      isCreateModalOpen,
      setIsCreateModalOpen,
      isEditModalOpen,
      setIsEditModalOpen,
      employeeToEdit,
      setEmployeeToEdit
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};
