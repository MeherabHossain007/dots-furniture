import React from 'react';
import { BarChart3, ChevronRight } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';

export const DeptDistributionChart: React.FC = () => {
  const { employees, setFilters, setActiveTab } = useEmployees();

  const deptCounts: Record<string, number> = {};
  employees.forEach(emp => {
    deptCounts[emp.department] = (deptCounts[emp.department] || 0) + 1;
  });

  const sortedDepts = Object.entries(deptCounts).sort((a, b) => b[1] - a[1]);
  const maxCount = sortedDepts.length > 0 ? sortedDepts[0][1] : 1;
  const topDepts = sortedDepts.slice(0, 7);

  // High-visibility, distinct categorical palette (WCAG accessible)
  const colors = [
    '#2563EB', // Royal Blue (Wood Workshop)
    '#059669', // Emerald Green (Panel Workshop)
    '#7C3AED', // Violet / Purple (Metal Workshop)
    '#D97706', // Warm Amber (Lacquer & Finishing)
    '#E11D48', // Crimson Rose (C&S)
    '#0891B2', // Vibrant Cyan (Sales & Marketing)
    '#4F46E5', // Deep Indigo (Packing & Dispatch)
  ];

  const handleDeptClick = (deptName: string) => {
    setFilters(prev => ({ ...prev, department: deptName }));
    setActiveTab('directory');
  };

  return (
    <div className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-bold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Workforce by Department</span>
          </h3>
          <p className="text-[12px] text-slate-600 dark:text-slate-400 font-medium mt-0.5">Headcount distribution across workshop &amp; management units</p>
        </div>

        <button
          onClick={() => setActiveTab('departments')}
          className="text-[12px] font-semibold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 transition-colors"
        >
          <span>All Units</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {topDepts.map(([dept, count], idx) => {
          const pct = Math.round((count / maxCount) * 100);
          const totalPct = Math.round((count / (employees.length || 1)) * 100);
          const barColor = colors[idx % colors.length];

          return (
            <div
              key={dept}
              onClick={() => handleDeptClick(dept)}
              className="group cursor-pointer p-1.5 -mx-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
              <div className="flex items-center justify-between text-[13px] mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: barColor }}
                    aria-hidden="true"
                  />
                  <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors truncate">
                    {dept}
                  </span>
                </div>
                <span className="text-slate-900 dark:text-slate-100 text-[12px] shrink-0 font-mono ml-2 font-bold">
                  {count} Staff <span className="text-slate-600 dark:text-slate-400 font-semibold font-sans">({totalPct}%)</span>
                </span>
              </div>
              <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
                <div
                  className="h-full rounded-full transition-all duration-300 shadow-xs"
                  style={{ width: `${pct}%`, backgroundColor: barColor }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
