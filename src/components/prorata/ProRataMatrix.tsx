import React from 'react';
import { Table, Users } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';
import { proRataService } from '../../services/proRataService';

export const ProRataMatrix: React.FC = () => {
  const { policy, employees, setFilters, setActiveTab } = useEmployees();

  const countsByMonth: Record<number, number> = {};
  employees.forEach(emp => {
    countsByMonth[emp.monthsActive] = (countsByMonth[emp.monthsActive] || 0) + 1;
  });

  const matrix = proRataService.getLookupMatrix(policy, countsByMonth);

  const handleRowClick = (m: number) => {
    setFilters(prev => ({ ...prev, monthsActive: String(m) }));
    setActiveTab('directory');
  };

  return (
    <div className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs mt-6">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
          <Table className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-[15px] font-bold font-heading text-slate-900 dark:text-slate-100">Official Pro-Rata Lookup Matrix ({policy.trackingYear})</h3>
          <p className="text-[12px] text-slate-600 dark:text-slate-400 font-medium">Standard monthly scale from 12 down to 1 month service tenure</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="w-full text-[12px] text-left">
          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="py-2.5 px-3">Tenure</th>
              <th className="py-2.5 px-3">Joining Window in {policy.trackingYear}</th>
              <th className="py-2.5 px-3 text-right">Sick Leave (SL)</th>
              <th className="py-2.5 px-3 text-right">Casual Leave (CL)</th>
              <th className="py-2.5 px-3 text-right">Earned Leave (EL)</th>
              <th className="py-2.5 px-3 text-right text-emerald-800 dark:text-emerald-300">Total Quota</th>
              <th className="py-2.5 px-3 text-center">Active Workforce</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {matrix.map((row) => (
              <tr 
                key={row.months}
                onClick={() => handleRowClick(row.months)}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
              >
                <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-slate-100">
                  {row.months} Months
                </td>
                <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-medium">
                  {row.window}
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-700 dark:text-slate-300 font-medium">
                  {row.sl.toFixed(1)} d
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-700 dark:text-slate-300 font-medium">
                  {row.cl.toFixed(1)} d
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-700 dark:text-slate-300 font-medium">
                  {row.el.toFixed(1)} d
                </td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  {row.total.toFixed(1)} d
                </td>
                <td className="py-2.5 px-3 text-center">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    <Users className="w-3 h-3" />
                    <span>{row.count} Staff</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
