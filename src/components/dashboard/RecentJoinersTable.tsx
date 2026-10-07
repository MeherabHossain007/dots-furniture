import React from 'react';
import { UserPlus, ArrowRight, Eye } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';

export const RecentJoinersTable: React.FC = () => {
  const { employees, setActiveTab, setSelectedEmployeeForDossier } = useEmployees();

  // Filter 2026 new joiners (monthsActive < 12)
  const newJoiners = employees.filter(e => e.monthsActive < 12).slice(0, 6);

  return (
    <div className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs mt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-bold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>New Hires &amp; Pro-Rata Allocations</span>
          </h3>
          <p className="text-[12px] text-slate-600 dark:text-slate-400 font-medium mt-0.5">Personnel enrolled during current cycle with proportionate annual quotas</p>
        </div>

        <button
          onClick={() => setActiveTab('directory')}
          className="text-[12px] font-semibold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 transition-colors"
        >
          <span>Full Directory</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="w-full text-[12px] text-left">
          <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Emp ID</th>
              <th className="py-2.5 px-3">Employee Name</th>
              <th className="py-2.5 px-3">Department</th>
              <th className="py-2.5 px-3">Designation</th>
              <th className="py-2.5 px-3">Joined</th>
              <th className="py-2.5 px-3">Tenure</th>
              <th className="py-2.5 px-3 text-right">SL</th>
              <th className="py-2.5 px-3 text-right">CL</th>
              <th className="py-2.5 px-3 text-right">EL</th>
              <th className="py-2.5 px-3 text-right text-emerald-800 dark:text-emerald-300">Total</th>
              <th className="py-2.5 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {newJoiners.map(emp => (
              <tr key={emp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-slate-100">{emp.id}</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-slate-100">{emp.name}</td>
                <td className="py-2.5 px-3">
                  <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {emp.department}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-medium truncate max-w-44">{emp.designation}</td>
                <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-mono text-[11px]">{emp.joiningDate}</td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {emp.monthsActive} mo
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-700 dark:text-slate-300 font-medium">{emp.allocation.sl.toFixed(1)}</td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-700 dark:text-slate-300 font-medium">{emp.allocation.cl.toFixed(1)}</td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-700 dark:text-slate-300 font-medium">{emp.allocation.el.toFixed(1)}</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">{emp.allocation.total.toFixed(1)}</td>
                <td className="py-2.5 px-3 text-center">
                  <button
                    onClick={() => setSelectedEmployeeForDossier(emp)}
                    className="p-1 rounded text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors"
                    title="View Profile Dossier"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
