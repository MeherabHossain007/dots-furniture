import React from 'react';
import { Search, Plus, CalendarPlus, Sun, Moon } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';
import { useTheme } from '../../context/ThemeContext';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, setIsCreateModalOpen } = useEmployees();
  const { resolvedTheme, toggleTheme } = useTheme();

  const tabMeta: Record<string, { title: string; subtitle: string }> = {
    overview: {
      title: 'Executive Overview',
      subtitle: 'Real-time leave balance tracking & pro-rata workforce analytics'
    },
    directory: {
      title: 'Employee Directory',
      subtitle: 'Master personnel records with automated pro-rated leave allocations'
    },
    prorata: {
      title: 'Pro-Rata Engine',
      subtitle: 'Mathematical leave simulator, company policy & monthly schedule matrix'
    },
    departments: {
      title: 'Departments & Workshop',
      subtitle: 'Workforce craft categories, supervisor ratios & leave consumption'
    },
    leaves: {
      title: 'Leave Management',
      subtitle: 'Record and deduct employee leaves with chronological transaction auditing'
    },
    settings: {
      title: 'Data & Reports',
      subtitle: 'Excel (.xlsx), CSV and JSON backups, and official printable records'
    }
  };

  const current = tabMeta[activeTab] || tabMeta.overview;

  const handleQuickSearch = () => {
    setActiveTab('directory');
    setTimeout(() => {
      const el = document.getElementById('employee-search-input');
      if (el) el.focus();
    }, 100);
  };

  return (
    <header className="py-4 px-6 md:px-8 bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 z-10 transition-colors duration-150">
      <div>
        <h2 className="text-[24px] md:text-[26px] font-extrabold font-heading text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
          {current.title}
        </h2>
        <p className="text-[13px] text-slate-600 dark:text-slate-400 font-medium mt-0.5">
          {current.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Dark / Light Mode Switch */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-colors shadow-xs"
          title={`Switch to ${resolvedTheme === 'dark' ? 'Light' : 'Dark'} mode (Alt+T)`}
        >
          {resolvedTheme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-slate-600" />
              <span>Dark Mode</span>
            </>
          )}
        </button>

        <button
          onClick={handleQuickSearch}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-colors shadow-xs"
          title="Jump to search (Ctrl+F)"
        >
          <Search className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          <span>Search</span>
        </button>

        <button
          onClick={() => setActiveTab('leaves')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 transition-colors shadow-xs"
        >
          <CalendarPlus className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
          <span>Record Leave</span>
        </button>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[12px] font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>New Employee</span>
        </button>
      </div>
    </header>
  );
};
