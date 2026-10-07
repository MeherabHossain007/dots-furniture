import React, { useState } from 'react';
import { 
  Eye, 
  CalendarPlus, 
  Edit2, 
  Trash2, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Users 
} from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';
import { Employee } from '../../types';
import { Pagination } from './Pagination';

export const EmployeeTable: React.FC = () => {
  const { 
    filteredEmployees, 
    filters, 
    setFilters, 
    setSelectedEmployeeForDossier, 
    setEmployeeToEdit, 
    setIsEditModalOpen, 
    deleteEmployee,
    setActiveTab
  } = useEmployees();

  // Local Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | 'all'>(25);

  const totalItems = filteredEmployees.length;
  const effectivePageSize = pageSize === 'all' ? Math.max(totalItems, 1) : pageSize;
  const totalPages = Math.max(1, Math.ceil(totalItems / effectivePageSize));

  // Slice for current page
  const startIndex = (currentPage - 1) * effectivePageSize;
  const paginatedEmployees = pageSize === 'all' 
    ? filteredEmployees 
    : filteredEmployees.slice(startIndex, startIndex + effectivePageSize);

  // Sorting helper
  const handleSort = (field: string) => {
    const currentSort = filters.sortBy;
    if (currentSort === `${field}_asc`) {
      setFilters(prev => ({ ...prev, sortBy: `${field}_desc` }));
    } else {
      setFilters(prev => ({ ...prev, sortBy: `${field}_asc` }));
    }
    setCurrentPage(1);
  };

  const renderSortIcon = (field: string) => {
    const current = filters.sortBy;
    if (current === `${field}_asc`) {
      return <ArrowUp className="w-3.5 h-3.5 text-emerald-700 inline ml-1 font-bold" />;
    }
    if (current === `${field}_desc`) {
      return <ArrowDown className="w-3.5 h-3.5 text-emerald-700 inline ml-1 font-bold" />;
    }
    return <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 hover:text-slate-700 inline ml-1" />;
  };

  const getInitials = (name: string) => {
    if (!name) return 'DF';
    const clean = name.replace(/^md\.?\s+/i, '').trim();
    const parts = clean.split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return clean.slice(0, 2).toUpperCase();
  };

  const handleApplyLeave = (emp: Employee) => {
    setActiveTab('leaves');
    setTimeout(() => {
      const select = document.getElementById('leave-emp-select') as HTMLSelectElement;
      if (select) {
        select.value = emp.id;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, 100);
  };

  const handleEdit = (emp: Employee) => {
    setEmployeeToEdit(emp);
    setIsEditModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden flex flex-col">
      <div className="overflow-x-auto max-h-[calc(100vh-340px)] relative">
        <table className="w-full text-[12px] text-left border-collapse">
          {/* Header Row */}
          <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-700 z-10 shadow-xs">
            <tr>
              <th 
                onClick={() => handleSort('id')} 
                className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
              >
                Emp ID {renderSortIcon('id')}
              </th>
              <th 
                onClick={() => handleSort('name')} 
                className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
              >
                Employee Name {renderSortIcon('name')}
              </th>
              <th 
                onClick={() => handleSort('dept')} 
                className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
              >
                Department {renderSortIcon('dept')}
              </th>
              <th className="py-3 px-3 whitespace-nowrap">Designation</th>
              <th className="py-3 px-3 whitespace-nowrap">Joining Date</th>
              <th 
                onClick={() => handleSort('months')} 
                className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
              >
                Active {renderSortIcon('months')}
              </th>

              {/* Allocations Group (Blue tint) */}
              <th className="py-3 px-2 text-right bg-blue-50/80 dark:bg-blue-950/40 border-l border-slate-200 dark:border-slate-700 whitespace-nowrap text-blue-900 dark:text-blue-300 font-bold" title="Sick Leave Allocated">
                SL
              </th>
              <th className="py-3 px-2 text-right bg-blue-50/80 dark:bg-blue-950/40 whitespace-nowrap text-blue-900 dark:text-blue-300 font-bold" title="Casual Leave Allocated">
                CL
              </th>
              <th className="py-3 px-2 text-right bg-blue-50/80 dark:bg-blue-950/40 whitespace-nowrap text-blue-900 dark:text-blue-300 font-bold" title="Earned Leave Allocated">
                EL
              </th>
              <th className="py-3 px-2 text-right bg-blue-100/90 dark:bg-blue-900/60 border-r border-slate-200 dark:border-slate-700 whitespace-nowrap font-extrabold text-blue-950 dark:text-blue-200" title="Total Allocated Leaves">
                Total
              </th>

              {/* Used Group (Amber tint) */}
              <th className="py-3 px-2 text-right bg-amber-50/80 dark:bg-amber-950/40 whitespace-nowrap text-amber-900 dark:text-amber-300 font-bold" title="Sick Leave Used">
                SL Used
              </th>
              <th className="py-3 px-2 text-right bg-amber-50/80 dark:bg-amber-950/40 whitespace-nowrap text-amber-900 dark:text-amber-300 font-bold" title="Casual Leave Used">
                CL Used
              </th>
              <th className="py-3 px-2 text-right bg-amber-50/80 dark:bg-amber-950/40 whitespace-nowrap text-amber-900 dark:text-amber-300 font-bold" title="Earned Leave Used">
                EL Used
              </th>
              <th className="py-3 px-2 text-right bg-amber-50/80 dark:bg-amber-950/40 whitespace-nowrap text-amber-900 dark:text-amber-300 font-bold" title="Leave Without Pay">
                LWP
              </th>
              <th 
                onClick={() => handleSort('used')} 
                className="py-3 px-2 text-right bg-amber-100/90 dark:bg-amber-900/60 border-r border-slate-200 dark:border-slate-700 whitespace-nowrap font-extrabold text-amber-950 dark:text-amber-200 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                title="Total Leaves Used"
              >
                Total Used {renderSortIcon('used')}
              </th>

              {/* Remaining Group (Emerald tint) */}
              <th className="py-3 px-2 text-right bg-emerald-50/80 dark:bg-emerald-950/40 whitespace-nowrap text-emerald-900 dark:text-emerald-300 font-bold" title="Sick Leave Remaining">
                SL Rem
              </th>
              <th className="py-3 px-2 text-right bg-emerald-50/80 dark:bg-emerald-950/40 whitespace-nowrap text-emerald-900 dark:text-emerald-300 font-bold" title="Casual Leave Remaining">
                CL Rem
              </th>
              <th className="py-3 px-2 text-right bg-emerald-50/80 dark:bg-emerald-950/40 whitespace-nowrap text-emerald-900 dark:text-emerald-300 font-bold" title="Earned Leave Remaining">
                EL Rem
              </th>
              <th 
                onClick={() => handleSort('rem')} 
                className="py-3 px-2 text-right bg-emerald-100/90 dark:bg-emerald-900/60 border-r border-slate-200 dark:border-slate-700 whitespace-nowrap font-extrabold text-emerald-950 dark:text-emerald-200 cursor-pointer hover:text-emerald-800 dark:hover:text-emerald-300"
                title="Total Balance Remaining"
              >
                Total Rem {renderSortIcon('rem')}
              </th>

              <th className="py-3 px-3 whitespace-nowrap text-center">Status</th>
              <th className="py-3 px-3 whitespace-nowrap text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {paginatedEmployees.length === 0 ? (
              <tr>
                <td colSpan={20} className="py-12 text-center text-slate-500 dark:text-slate-400">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-50 text-slate-400" />
                  <p className="text-[14px] font-bold text-slate-900 dark:text-slate-100">No matching employees found</p>
                  <p className="text-[12px] text-slate-600 dark:text-slate-400 font-medium mt-1">Try refining your search term or reset applied filters.</p>
                </td>
              </tr>
            ) : (
              paginatedEmployees.map((emp) => {
                const hasUsed = emp.used.total > 0;

                return (
                  <tr key={emp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    {/* ID */}
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-slate-100">
                      {emp.id}
                    </td>

                    {/* Employee Name & Avatar */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div 
                          className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] text-white shrink-0 shadow-xs"
                          style={{ backgroundColor: emp.avatarColor || '#059669' }}
                        >
                          {getInitials(emp.name)}
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-slate-100 text-[13px]">{emp.name}</span>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {emp.department}
                      </span>
                    </td>

                    {/* Designation */}
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">
                      {emp.designation}
                    </td>

                    {/* Joining Date */}
                    <td className="py-2.5 px-3 font-mono text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap text-[11px]">
                      {emp.joiningDate}
                    </td>

                    {/* Active Months */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {emp.monthsActive} mo
                      </span>
                    </td>

                    {/* Allocations */}
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700 dark:text-slate-300 font-medium bg-blue-50/15 dark:bg-blue-950/20 border-l border-slate-200 dark:border-slate-800">
                      {emp.allocation.sl.toFixed(1)}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700 dark:text-slate-300 font-medium bg-blue-50/15 dark:bg-blue-950/20">
                      {emp.allocation.cl.toFixed(1)}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700 dark:text-slate-300 font-medium bg-blue-50/15 dark:bg-blue-950/20">
                      {emp.allocation.el.toFixed(1)}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono font-extrabold text-blue-950 dark:text-blue-200 bg-blue-50/35 dark:bg-blue-900/30 border-r border-slate-200 dark:border-slate-800">
                      {emp.allocation.total.toFixed(1)}
                    </td>

                    {/* Used */}
                    <td className={`py-2.5 px-2 text-right font-mono bg-amber-50/15 dark:bg-amber-950/20 ${emp.used.sl > 0 ? 'text-amber-800 dark:text-amber-300 font-bold' : 'text-slate-400 dark:text-slate-600 font-normal'}`}>
                      {emp.used.sl}
                    </td>
                    <td className={`py-2.5 px-2 text-right font-mono bg-amber-50/15 dark:bg-amber-950/20 ${emp.used.cl > 0 ? 'text-amber-800 dark:text-amber-300 font-bold' : 'text-slate-400 dark:text-slate-600 font-normal'}`}>
                      {emp.used.cl}
                    </td>
                    <td className={`py-2.5 px-2 text-right font-mono bg-amber-50/15 dark:bg-amber-950/20 ${emp.used.el > 0 ? 'text-amber-800 dark:text-amber-300 font-bold' : 'text-slate-400 dark:text-slate-600 font-normal'}`}>
                      {emp.used.el}
                    </td>
                    <td className={`py-2.5 px-2 text-right font-mono bg-amber-50/15 dark:bg-amber-950/20 ${emp.used.lwp > 0 ? 'text-rose-700 dark:text-rose-400 font-bold' : 'text-slate-400 dark:text-slate-600 font-normal'}`}>
                      {emp.used.lwp}
                    </td>
                    <td className={`py-2.5 px-2 text-right font-mono font-extrabold bg-amber-50/35 dark:bg-amber-900/30 border-r border-slate-200 dark:border-slate-800 ${hasUsed ? 'text-amber-900 dark:text-amber-200 font-bold' : 'text-slate-400 dark:text-slate-600 font-normal'}`}>
                      {emp.used.total}
                    </td>

                    {/* Remaining */}
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700 dark:text-slate-300 font-medium bg-emerald-50/15 dark:bg-emerald-950/20">
                      {emp.remaining.sl.toFixed(1)}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700 dark:text-slate-300 font-medium bg-emerald-50/15 dark:bg-emerald-950/20">
                      {emp.remaining.cl.toFixed(1)}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700 dark:text-slate-300 font-medium bg-emerald-50/15 dark:bg-emerald-950/20">
                      {emp.remaining.el.toFixed(1)}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-50/35 dark:bg-emerald-900/30 border-r border-slate-200 dark:border-slate-800">
                      {emp.remaining.total.toFixed(1)}
                    </td>

                    {/* Status */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        emp.status === 'OK' 
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : emp.status === 'Warning'
                          ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                          : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                      }`}>
                        {emp.status || 'OK'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedEmployeeForDossier(emp)}
                          className="p-1 rounded text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors"
                          title="View Profile Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleApplyLeave(emp)}
                          className="p-1 rounded text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors"
                          title="Record Leave"
                        >
                          <CalendarPlus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleEdit(emp)}
                          className="p-1 rounded text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                          title="Edit Employee"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete employee ${emp.name} (ID: ${emp.id})?`)) {
                              deleteEmployee(emp.id);
                            }
                          }}
                          className="p-1 rounded text-slate-600 dark:text-slate-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/60 border border-transparent hover:border-rose-200 dark:hover:border-rose-800 transition-colors"
                          title="Delete Employee"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={(p) => setCurrentPage(p)}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};
