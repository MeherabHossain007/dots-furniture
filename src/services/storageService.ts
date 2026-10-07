import { Employee, CompanyPolicy, LeaveAuditRecord } from '../types';
import { INITIAL_EMPLOYEES, DEFAULT_POLICY } from '../data/initialEmployees';

const STORAGE_KEYS = {
  EMPLOYEES: 'dots_furniture_employees_v2',
  POLICY: 'dots_furniture_policy_v2',
  AUDIT: 'dots_furniture_audit_v2',
};

const DEFAULT_AUDIT_LOG: LeaveAuditRecord[] = [
  {
    id: 'LOG-1010-1',
    date: '2026-08-15',
    empId: '1010',
    name: 'Mahabub Alam',
    dept: 'Management',
    type: 'Earned Leave (EL)',
    days: 1.0,
    reason: 'Annual Executive Leave',
    timestamp: '2026-08-15T09:30:00.000Z'
  },
  {
    id: 'LOG-1206-1',
    date: '2026-09-20',
    empId: '1206',
    name: 'K.M. Abdullah Akib',
    dept: 'Industrial Engineering (IE)',
    type: 'Casual Leave (CL)',
    days: 1.0,
    reason: 'Personal urgent errand',
    timestamp: '2026-09-20T10:15:00.000Z'
  }
];

export const storageService = {
  /**
   * Safely load employees from localStorage with graceful fallback to seeded data
   */
  loadEmployees(): Employee[] {
    try {
      const serialized = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
      if (!serialized) {
        // Initialize with default
        this.saveEmployees(INITIAL_EMPLOYEES);
        return INITIAL_EMPLOYEES;
      }
      const parsed = JSON.parse(serialized);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return INITIAL_EMPLOYEES;
    } catch (err) {
      console.error('Storage error loading employees, restoring initial:', err);
      return INITIAL_EMPLOYEES;
    }
  },

  /**
   * Safely persist employees to localStorage
   */
  saveEmployees(employees: Employee[]): boolean {
    try {
      localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
      return true;
    } catch (err) {
      console.error('Storage quota or serialization failure while saving employees:', err);
      return false;
    }
  },

  /**
   * Safely load company policy
   */
  loadPolicy(): CompanyPolicy {
    try {
      const serialized = localStorage.getItem(STORAGE_KEYS.POLICY);
      if (!serialized) {
        this.savePolicy(DEFAULT_POLICY);
        return DEFAULT_POLICY;
      }
      return JSON.parse(serialized);
    } catch (err) {
      console.error('Storage error loading policy:', err);
      return DEFAULT_POLICY;
    }
  },

  /**
   * Safely save company policy
   */
  savePolicy(policy: CompanyPolicy): boolean {
    try {
      localStorage.setItem(STORAGE_KEYS.POLICY, JSON.stringify(policy));
      return true;
    } catch (err) {
      console.error('Failed to save policy to localStorage:', err);
      return false;
    }
  },

  /**
   * Safely load audit records
   */
  loadAuditLog(): LeaveAuditRecord[] {
    try {
      const serialized = localStorage.getItem(STORAGE_KEYS.AUDIT);
      if (!serialized) {
        this.saveAuditLog(DEFAULT_AUDIT_LOG);
        return DEFAULT_AUDIT_LOG;
      }
      const parsed = JSON.parse(serialized);
      return Array.isArray(parsed) ? parsed : DEFAULT_AUDIT_LOG;
    } catch (err) {
      console.error('Error loading audit log:', err);
      return DEFAULT_AUDIT_LOG;
    }
  },

  /**
   * Safely save audit records
   */
  saveAuditLog(logs: LeaveAuditRecord[]): boolean {
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(logs));
      return true;
    } catch (err) {
      console.error('Error saving audit log:', err);
      return false;
    }
  },

  /**
   * Create complete JSON backup
   */
  exportBackupJSON(): string {
    const payload = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      policy: this.loadPolicy(),
      employees: this.loadEmployees(),
      auditLog: this.loadAuditLog()
    };
    return JSON.stringify(payload, null, 2);
  },

  /**
   * Restore from JSON backup with validation
   */
  importBackupJSON(jsonContent: string): { employees: Employee[]; policy: CompanyPolicy; audit: LeaveAuditRecord[] } {
    const parsed = JSON.parse(jsonContent);
    if (!parsed || !Array.isArray(parsed.employees)) {
      throw new Error('Invalid backup file format: Missing employee list.');
    }

    const employees = parsed.employees as Employee[];
    const policy = parsed.policy || DEFAULT_POLICY;
    const audit = Array.isArray(parsed.auditLog) ? parsed.auditLog : [];

    this.saveEmployees(employees);
    this.savePolicy(policy);
    this.saveAuditLog(audit);

    return { employees, policy, audit };
  },

  /**
   * Reset everything to initial 206 DOTS Furniture records
   */
  resetToDefaults(): { employees: Employee[]; policy: CompanyPolicy; audit: LeaveAuditRecord[] } {
    localStorage.removeItem(STORAGE_KEYS.EMPLOYEES);
    localStorage.removeItem(STORAGE_KEYS.POLICY);
    localStorage.removeItem(STORAGE_KEYS.AUDIT);

    const employees = JSON.parse(JSON.stringify(INITIAL_EMPLOYEES));
    const policy = { ...DEFAULT_POLICY };
    const audit = [...DEFAULT_AUDIT_LOG];

    this.saveEmployees(employees);
    this.savePolicy(policy);
    this.saveAuditLog(audit);

    return { employees, policy, audit };
  }
};
