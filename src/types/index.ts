export interface LeaveAllocation {
  sl: number;
  cl: number;
  el: number;
  total: number;
}

export interface LeaveUsed {
  sl: number;
  cl: number;
  el: number;
  lwp: number;
  total: number;
}

export interface LeaveRemaining {
  sl: number;
  cl: number;
  el: number;
  total: number;
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  rawDepartment?: string;
  designation: string;
  rawDesignation?: string;
  joiningDate: string;
  monthsActive: number;
  allocation: LeaveAllocation;
  used: LeaveUsed;
  remaining: LeaveRemaining;
  status: 'OK' | 'Warning' | 'Exceeded';
  avatarColor?: string;
}

export interface CompanyPolicy {
  trackingYear: number;
  sickLeave: number;
  casualLeave: number;
  earnedLeave: number;
  totalAnnual: number;
}

export interface LeaveAuditRecord {
  id: string;
  date: string;
  empId: string;
  name: string;
  dept: string;
  type: string;
  leaveCategory?: 'sl' | 'cl' | 'el' | 'lwp';
  days: number;
  reason: string;
  timestamp?: string;
}

export interface FilterState {
  search: string;
  department: string;
  monthsActive: string;
  leaveStatus: string;
  sortBy: string;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export type ActiveTab = 
  | 'overview' 
  | 'directory' 
  | 'prorata' 
  | 'departments' 
  | 'leaves' 
  | 'settings';
