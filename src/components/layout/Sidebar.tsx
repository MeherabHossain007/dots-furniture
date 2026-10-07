import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calculator, 
  Factory, 
  CalendarCheck, 
  Settings, 
  Armchair,
  Sun,
  Moon
} from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';
import { useTheme } from '../../context/ThemeContext';
import { ActiveTab } from '../../types';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, employees, policy } = useEmployees();
  const { resolvedTheme, toggleTheme } = useTheme();

  const uniqueDepartmentsCount = new Set(employees.map(e => e.department)).size;

  const navItems: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }>; count?: number }[] = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'directory', label: 'Employee Directory', icon: Users, count: employees.length },
    { id: 'prorata', label: 'Pro-Rata Engine', icon: Calculator },
    { id: 'departments', label: 'Workshop & Depts', icon: Factory, count: uniqueDepartmentsCount },
    { id: 'leaves', label: 'Leave Management', icon: CalendarCheck },
    { id: 'settings', label: 'Backup & Reports', icon: Settings }
  ];

  return (
    <aside className="w-60 bg-white dark:bg-[#0F172A] border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 z-20 transition-colors duration-150">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-white shrink-0 shadow-xs">
          <Armchair className="w-4.5 h-4.5 stroke-[2.2]" />
        </div>
        <div className="min-w-0">
          <h1 className="text-[14px] font-bold font-heading text-slate-900 dark:text-slate-100 truncate leading-tight">
            DOTS Furniture
          </h1>
          <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400 truncate">
            Leave &amp; Entitlements
          </p>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-2.5 pt-2 pb-1.5 text-[11px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
          Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors text-left group ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-xs font-bold'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 font-semibold'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'}`} />
              <span className="flex-1 truncate">{item.label}</span>

              {item.count !== undefined && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Theme Switch & Footer Policy Widget */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] space-y-2.5">
        {/* Dark Mode Sidebar Switch Button */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-2xs group"
          title="Toggle light/dark appearance"
        >
          <div className="flex items-center gap-2 text-[12px] font-semibold">
            {resolvedTheme === 'dark' ? (
              <Moon className="w-4 h-4 text-emerald-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
            <span>{resolvedTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
          </div>

          <div className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 dark:bg-emerald-600 transition-colors duration-200 ease-in-out">
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                resolvedTheme === 'dark' ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </div>
        </button>

        {/* Policy Standard Widget */}
        <div className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Policy Standard</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {policy.trackingYear}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div className="bg-slate-50 dark:bg-slate-800/80 p-1.5 rounded border border-slate-200 dark:border-slate-700">
              <span className="block text-[10px] text-slate-600 dark:text-slate-400 font-semibold">Sick</span>
              <strong className="block text-[12px] font-heading font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">{policy.sickLeave.toFixed(0)}d</strong>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/80 p-1.5 rounded border border-slate-200 dark:border-slate-700">
              <span className="block text-[10px] text-slate-600 dark:text-slate-400 font-semibold">Casual</span>
              <strong className="block text-[12px] font-heading font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">{policy.casualLeave.toFixed(0)}d</strong>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/80 p-1.5 rounded border border-slate-200 dark:border-slate-700">
              <span className="block text-[10px] text-slate-600 dark:text-slate-400 font-semibold">Earned</span>
              <strong className="block text-[12px] font-heading font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">{policy.earnedLeave.toFixed(0)}d</strong>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
