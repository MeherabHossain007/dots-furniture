import React from 'react';
import { Users, CalendarCheck2, Clock, CheckCircle2, Hammer } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';

export const KpiCards: React.FC = () => {
  const { employees, policy } = useEmployees();

  const totalEmployees = employees.length;
  const totalAllocated = employees.reduce((sum, e) => sum + e.allocation.total, 0);
  const totalUsed = employees.reduce((sum, e) => sum + e.used.total, 0);
  const totalRemaining = employees.reduce((sum, e) => sum + e.remaining.total, 0);

  const factoryCount = employees.filter(e => {
    const d = e.department.toLowerCase();
    return d.includes('wood') || d.includes('metal') || d.includes('panel') || 
           d.includes('lacquer') || d.includes('c&s') || d.includes('packing');
  }).length;

  const utilizationRate = totalAllocated > 0 
    ? ((totalUsed / totalAllocated) * 100).toFixed(1)
    : '0.0';

  const cards = [
    {
      label: 'Total Workforce',
      value: totalEmployees.toString(),
      unit: 'Active',
      subtext: `${policy.trackingYear} Headcount Roster`,
      icon: Users,
      accentBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      iconColor: 'text-emerald-700 dark:text-emerald-400',
      borderAccent: 'border-emerald-200 dark:border-emerald-800'
    },
    {
      label: 'Allocated Leaves',
      value: totalAllocated.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
      unit: 'Days',
      subtext: 'Calculated Pro-Rata Quota',
      icon: CalendarCheck2,
      accentBg: 'bg-blue-50 dark:bg-blue-950/60',
      iconColor: 'text-blue-700 dark:text-blue-400',
      borderAccent: 'border-blue-200 dark:border-blue-800'
    },
    {
      label: 'Leaves Utilized',
      value: totalUsed.toFixed(1),
      unit: 'Days',
      subtext: `${utilizationRate}% Quota Consumed`,
      icon: Clock,
      accentBg: 'bg-amber-50 dark:bg-amber-950/60',
      iconColor: 'text-amber-700 dark:text-amber-400',
      borderAccent: 'border-amber-200 dark:border-amber-800'
    },
    {
      label: 'Available Balance',
      value: totalRemaining.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
      unit: 'Days',
      subtext: 'Unclaimed Entitlements',
      icon: CheckCircle2,
      accentBg: 'bg-teal-50 dark:bg-teal-950/60',
      iconColor: 'text-teal-700 dark:text-teal-400',
      borderAccent: 'border-teal-200 dark:border-teal-800'
    },
    {
      label: 'Factory Craftsmen',
      value: factoryCount.toString(),
      unit: 'Staff',
      subtext: 'Wood, Metal & Finishing',
      icon: Hammer,
      accentBg: 'bg-purple-50 dark:bg-purple-950/60',
      iconColor: 'text-purple-700 dark:text-purple-400',
      borderAccent: 'border-purple-200 dark:border-purple-800'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl p-4.5 shadow-xs transition-all hover:shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {card.label}
              </span>
              <div className={`w-8 h-8 rounded-lg ${card.accentBg} ${card.borderAccent} border flex items-center justify-center shrink-0 shadow-xs`}>
                <Icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-[32px] font-extrabold font-heading text-slate-900 dark:text-slate-100 leading-tight tracking-tight">
                {card.value}
              </span>
              <span className="text-[12px] font-bold text-slate-600 dark:text-slate-400">
                {card.unit}
              </span>
            </div>

            <p className="text-[12px] text-slate-600 dark:text-slate-400 font-medium mt-1.5 truncate">
              {card.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
};
