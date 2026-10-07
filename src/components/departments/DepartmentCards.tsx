import React from 'react';
import { Factory, Users, ChevronRight } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';

export const DepartmentCards: React.FC = () => {
  const { employees, setFilters, setActiveTab } = useEmployees();

  // Aggregate stats per department
  const deptStats: Record<string, {
    name: string;
    count: number;
    supervisors: number;
    technicians: number;
    helpers: number;
    executives: number;
    totalAllocated: number;
    totalUsed: number;
    totalRemaining: number;
  }> = {};

  employees.forEach(emp => {
    const d = emp.department;
    if (!deptStats[d]) {
      deptStats[d] = {
        name: d,
        count: 0,
        supervisors: 0,
        technicians: 0,
        helpers: 0,
        executives: 0,
        totalAllocated: 0,
        totalUsed: 0,
        totalRemaining: 0
      };
    }

    const cur = deptStats[d];
    cur.count++;
    cur.totalAllocated += emp.allocation.total;
    cur.totalUsed += emp.used.total;
    cur.totalRemaining += emp.remaining.total;

    const des = emp.designation.toLowerCase();
    if (des.includes('tech')) cur.technicians++;
    else if (des.includes('help')) cur.helpers++;
    else if (des.includes('super')) cur.supervisors++;
    else if (des.includes('exec') || des.includes('manag') || des.includes('md') || des.includes('dir')) cur.executives++;
  });

  const sortedDepts = Object.values(deptStats).sort((a, b) => b.count - a.count);

  const handleSelectDept = (deptName: string) => {
    setFilters(prev => ({ ...prev, department: deptName }));
    setActiveTab('directory');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-bold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Factory className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Workshop &amp; Department Units</span>
          </h3>
          <p className="text-[12px] text-slate-600 dark:text-slate-400 font-medium mt-0.5">
            Operational and manufacturing personnel division across {sortedDepts.length} company units
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedDepts.map((d) => {
          const utilRate = d.totalAllocated > 0
            ? ((d.totalUsed / d.totalAllocated) * 100).toFixed(0)
            : '0';

          return (
            <div
              key={d.name}
              className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl p-4.5 shadow-xs transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div>
                    <h4 className="text-[15px] font-bold font-heading text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                      {d.name}
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      Active Section
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md text-[11px] font-mono font-bold text-slate-900 dark:text-slate-100">
                    <Users className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                    <span>{d.count}</span>
                  </div>
                </div>

                {/* Role tags */}
                <div className="flex flex-wrap gap-1 text-[10px] font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  {d.supervisors > 0 && <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">{d.supervisors} Sup</span>}
                  {d.technicians > 0 && <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">{d.technicians} Tech</span>}
                  {d.helpers > 0 && <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">{d.helpers} Help</span>}
                  {d.executives > 0 && <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">{d.executives} Exec</span>}
                </div>

                {/* Metrics */}
                <div className="space-y-1.5 text-[12px] bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 mb-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Allocated:</span>
                    <strong className="text-slate-900 dark:text-slate-100 font-mono font-bold">{d.totalAllocated.toFixed(1)} d</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Leaves Used:</span>
                    <strong className={`font-mono font-bold ${d.totalUsed > 0 ? 'text-amber-800 dark:text-amber-300' : 'text-slate-400 dark:text-slate-500 font-normal'}`}>
                      {d.totalUsed.toFixed(1)} d
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Remaining:</span>
                    <strong className="text-emerald-700 dark:text-emerald-400 font-mono font-extrabold">{d.totalRemaining.toFixed(1)} d ({utilRate}% used)</strong>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectDept(d.name)}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-semibold bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-300 border border-slate-300 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors shadow-xs"
              >
                <span>View Department Personnel</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
