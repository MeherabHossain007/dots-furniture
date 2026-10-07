import React from 'react';
import { PieChart, Clock } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';

export const PolicyDonutChart: React.FC = () => {
  const { policy, employees, setFilters, setActiveTab } = useEmployees();

  const total = policy.totalAnnual || 30;
  const slPct = ((policy.sickLeave / total) * 100).toFixed(0);
  const clPct = ((policy.casualLeave / total) * 100).toFixed(0);
  const elPct = ((policy.earnedLeave / total) * 100).toFixed(0);

  // Circumference for r=48 is 2 * PI * 48 = ~301.59
  const circ = 301.59;
  const slStroke = (policy.sickLeave / total) * circ;
  const clStroke = (policy.casualLeave / total) * circ;
  const elStroke = (policy.earnedLeave / total) * circ;

  // Active months counts
  const monthsCounts: Record<number, number> = {};
  employees.forEach(emp => {
    monthsCounts[emp.monthsActive] = (monthsCounts[emp.monthsActive] || 0) + 1;
  });

  const monthsKeys = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3];

  const handleMonthClick = (m: number) => {
    setFilters(prev => ({ ...prev, monthsActive: String(m) }));
    setActiveTab('directory');
  };

  return (
    <div className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-bold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Annual Policy Allocation</span>
          </h3>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            {policy.trackingYear} Standard
          </span>
        </div>

        {/* Donut graphic */}
        <div className="flex items-center justify-center gap-6 py-2">
          <div className="relative w-36 h-36 shrink-0">
            <svg viewBox="0 0 120 120" className="w-full h-full transform -rotate-90">
              {/* Background ring */}
              <circle cx="60" cy="60" r="48" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="15" />

              {/* Sick Leave (Vibrant Cobalt Blue) */}
              <circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke="#2563EB"
                strokeWidth="15"
                strokeDasharray={`${slStroke} ${circ}`}
                strokeDashoffset="0"
                className="transition-all duration-500"
              />

              {/* Casual Leave (Warm Amber / Orange) */}
              <circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke="#D97706"
                strokeWidth="15"
                strokeDasharray={`${clStroke} ${circ}`}
                strokeDashoffset={-slStroke}
                className="transition-all duration-500"
              />

              {/* Earned Leave (Vibrant Emerald Green) */}
              <circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke="#059669"
                strokeWidth="15"
                strokeDasharray={`${elStroke} ${circ}`}
                strokeDashoffset={-(slStroke + clStroke)}
                className="transition-all duration-500"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[28px] font-extrabold font-heading text-slate-900 dark:text-slate-100 leading-none">{total.toFixed(0)}</span>
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mt-1">Days / Yr</span>
            </div>
          </div>

          <div className="space-y-2.5 text-[12px]">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-[#2563EB] shrink-0 shadow-xs"></span>
              <span className="text-slate-700 dark:text-slate-300 font-semibold min-w-18">Sick (SL):</span>
              <strong className="text-slate-900 dark:text-slate-100 font-mono font-bold">{policy.sickLeave.toFixed(0)}d</strong>
              <span className="text-slate-600 dark:text-slate-400 font-medium">({slPct}%)</span>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-[#D97706] shrink-0 shadow-xs"></span>
              <span className="text-slate-700 dark:text-slate-300 font-semibold min-w-18">Casual (CL):</span>
              <strong className="text-slate-900 dark:text-slate-100 font-mono font-bold">{policy.casualLeave.toFixed(0)}d</strong>
              <span className="text-slate-600 dark:text-slate-400 font-medium">({clPct}%)</span>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-sm bg-[#059669] shrink-0 shadow-xs"></span>
              <span className="text-slate-700 dark:text-slate-300 font-semibold min-w-18">Earned (EL):</span>
              <strong className="text-slate-900 dark:text-slate-100 font-mono font-bold">{policy.earnedLeave.toFixed(0)}d</strong>
              <span className="text-slate-600 dark:text-slate-400 font-medium">({elPct}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tenure grid */}
      <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-800">
        <h4 className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
          <span>Active Tenure in {policy.trackingYear}</span>
        </h4>

        <div className="grid grid-cols-5 gap-2 text-center">
          {monthsKeys.map(m => {
            const count = monthsCounts[m] || 0;
            return (
              <button
                key={m}
                onClick={() => handleMonthClick(m)}
                className="bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:border-emerald-300 dark:hover:border-emerald-700 p-2 rounded-lg border border-slate-200 dark:border-slate-700 transition-all text-center group shadow-xs"
              >
                <span className="block text-[11px] text-slate-600 dark:text-slate-400 font-semibold group-hover:text-emerald-800 dark:group-hover:text-emerald-300">{m} Mo</span>
                <strong className="block text-[13px] font-extrabold text-slate-900 dark:text-slate-100 font-mono group-hover:text-emerald-950 dark:group-hover:text-emerald-200 mt-0.5">{count}</strong>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
