import React from 'react';
import { Search, X, FileSpreadsheet, FileText, Printer } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';

export const DirectoryToolbar: React.FC = () => {
  const { 
    filters, 
    setFilters, 
    employees, 
    filteredEmployees,
    exportExcel, 
    exportCSV 
  } = useEmployees();

  // All distinct departments sorted
  const departments = Array.from(new Set(employees.map(e => e.department))).sort();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const clearSearch = () => {
    setFilters(prev => ({ ...prev, search: '' }));
  };

  return (
    <div className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs mb-4 space-y-3">
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3 pointer-events-none" />
        <input
          id="employee-search-input"
          type="text"
          value={filters.search}
          onChange={handleSearchChange}
          placeholder="Search workforce by Emp ID, Name, Department, or Designation (e.g. 1010, Mahabub, Wood, Supervisor)..."
          className="w-full pl-9 pr-9 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-[13px] text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 transition-colors"
        />
        {filters.search && (
          <button
            onClick={clearSearch}
            className="absolute right-2.5 p-1 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter and Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          {/* Department Filter */}
          <select
            value={filters.department}
            onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-600 cursor-pointer"
          >
            <option value="">All Departments ({departments.length})</option>
            {departments.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Months Active Filter */}
          <select
            value={filters.monthsActive}
            onChange={(e) => setFilters(prev => ({ ...prev, monthsActive: e.target.value }))}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-600 cursor-pointer"
          >
            <option value="">All Active Tenures</option>
            <option value="12">12 Months (Full Tenure)</option>
            <option value="11">11 Months</option>
            <option value="10">10 Months</option>
            <option value="9">9 Months</option>
            <option value="8">8 Months</option>
            <option value="7">7 Months</option>
            <option value="6">6 Months</option>
            <option value="5">5 Months</option>
            <option value="4">4 Months</option>
            <option value="3">3 Months</option>
          </select>

          {/* Leave Status Filter */}
          <select
            value={filters.leaveStatus}
            onChange={(e) => setFilters(prev => ({ ...prev, leaveStatus: e.target.value }))}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-600 cursor-pointer"
          >
            <option value="">All Leave Statuses</option>
            <option value="used_gt_0">Has Taken Leave (&gt; 0)</option>
            <option value="used_eq_0">100% Full Balance Unused</option>
            <option value="lwp">Has Leave Without Pay (LWP)</option>
          </select>

          {/* Sort Selector */}
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-600 cursor-pointer"
          >
            <option value="id_asc">Sort: ID (Low to High)</option>
            <option value="id_desc">Sort: ID (High to Low)</option>
            <option value="name_asc">Sort: Name (A - Z)</option>
            <option value="dept_asc">Sort: Department</option>
            <option value="months_desc">Sort: Months Active</option>
            <option value="used_desc">Sort: Leaves Used (High to Low)</option>
            <option value="rem_asc">Sort: Remaining (Low to High)</option>
          </select>
        </div>

        {/* Export & Print Actions */}
        <div className="flex items-center gap-2">
          {/* Excel Export Button */}
          <button
            onClick={() => exportExcel(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-colors"
            title={`Export ${filteredEmployees.length} filtered records to Excel (.xlsx)`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export Excel</span>
          </button>

          {/* CSV Export Button */}
          <button
            onClick={() => exportCSV(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 shadow-xs transition-colors"
            title="Export filtered records to CSV"
          >
            <FileText className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>CSV</span>
          </button>

          {/* Print Button */}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 shadow-xs transition-colors"
            title="Print directory report"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Print</span>
          </button>
        </div>
      </div>
    </div>
  );
};
