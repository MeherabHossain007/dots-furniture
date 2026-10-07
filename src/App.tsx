import React, { useEffect } from 'react';
import { TitleBar } from './components/layout/TitleBar';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ToastContainer } from './components/layout/ToastContainer';

// Dashboard components
import { KpiCards } from './components/dashboard/KpiCards';
import { DeptDistributionChart } from './components/dashboard/DeptDistributionChart';
import { PolicyDonutChart } from './components/dashboard/PolicyDonutChart';
import { RecentJoinersTable } from './components/dashboard/RecentJoinersTable';

// Directory components
import { DirectoryToolbar } from './components/directory/DirectoryToolbar';
import { EmployeeTable } from './components/directory/EmployeeTable';

// Pro-Rata components
import { ProRataSimulator } from './components/prorata/ProRataSimulator';
import { PolicyEditor } from './components/prorata/PolicyEditor';
import { ProRataMatrix } from './components/prorata/ProRataMatrix';

// Departments
import { DepartmentCards } from './components/departments/DepartmentCards';

// Leaves
import { ApplyLeaveForm } from './components/leaves/ApplyLeaveForm';
import { LeaveAuditLog } from './components/leaves/LeaveAuditLog';

// Settings
import { BackupAndReports } from './components/settings/BackupAndReports';

// Modals
import { EmployeeDossierModal } from './components/modals/EmployeeDossierModal';
import { EmployeeFormModal } from './components/modals/EmployeeFormModal';

import { useEmployees } from './context/EmployeeContext';

export const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, setIsCreateModalOpen } = useEmployees();

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+F -> Search
      if (e.ctrlKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setActiveTab('directory');
        setTimeout(() => {
          const searchInput = document.getElementById('employee-search-input');
          if (searchInput) searchInput.focus();
        }, 100);
      }
      // Ctrl+N -> New Employee
      if (e.ctrlKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setIsCreateModalOpen(true);
      }
      // Alt+T or Ctrl+Shift+D -> Toggle Dark Mode
      if ((e.altKey && e.key.toLowerCase() === 't') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd')) {
        e.preventDefault();
        const root = document.documentElement;
        const isDark = root.classList.contains('dark');
        if (isDark) {
          root.classList.remove('dark');
          localStorage.setItem('dots_theme', 'light');
        } else {
          root.classList.add('dark');
          localStorage.setItem('dots_theme', 'dark');
        }
        window.dispatchEvent(new Event('theme-changed'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveTab, setIsCreateModalOpen]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 font-body selection:bg-emerald-100 selection:text-emerald-900 dark:selection:bg-emerald-900 dark:selection:text-emerald-100 transition-colors duration-150">
      {/* Titlebar */}
      <TitleBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-[#0B0F17] transition-colors duration-150">
          <Header />

          {/* Active Viewport with generous whitespace */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {/* Tab 1: Executive Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <KpiCards />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <DeptDistributionChart />
                  <PolicyDonutChart />
                </div>
                <RecentJoinersTable />
              </div>
            )}

            {/* Tab 2: Employee Directory */}
            {activeTab === 'directory' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <DirectoryToolbar />
                <EmployeeTable />
              </div>
            )}

            {/* Tab 3: Pro-Rata Engine */}
            {activeTab === 'prorata' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <ProRataSimulator />
                  <PolicyEditor />
                </div>
                <ProRataMatrix />
              </div>
            )}

            {/* Tab 4: Workshop & Departments */}
            {activeTab === 'departments' && (
              <div className="animate-in fade-in duration-200">
                <DepartmentCards />
              </div>
            )}

            {/* Tab 5: Leave Management */}
            {activeTab === 'leaves' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-in fade-in duration-200">
                <ApplyLeaveForm />
                <LeaveAuditLog />
              </div>
            )}

            {/* Tab 6: Backup & Reports */}
            {activeTab === 'settings' && (
              <div className="animate-in fade-in duration-200">
                <BackupAndReports />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Global Modals */}
      <EmployeeDossierModal />
      <EmployeeFormModal />
      <ToastContainer />
    </div>
  );
};
