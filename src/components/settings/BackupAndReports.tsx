import React, { useRef } from 'react';
import { 
  FileSpreadsheet, 
  FileText, 
  Download, 
  Upload, 
  Printer, 
  RotateCcw, 
  AlertTriangle,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';
import { useTheme, Theme } from '../../context/ThemeContext';

export const BackupAndReports: React.FC = () => {
  const { 
    exportExcel, 
    exportCSV, 
    exportJSONBackup, 
    importJSONBackup, 
    resetToInitialData, 
    employees, 
    policy 
  } = useEmployees();

  const { theme, setTheme } = useTheme();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        importJSONBackup(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data back to original DOTS Furniture records? Any unsaved edits will be discarded.')) {
      resetToInitialData();
    }
  };

  const themeOptions: { id: Theme; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'light', label: 'Light Mode', desc: 'Crisp, high-contrast light workspace', icon: Sun },
    { id: 'dark', label: 'Dark Mode', desc: 'Sleek, glare-free dark interface', icon: Moon },
    { id: 'system', label: 'System Default', desc: 'Sync automatically with Windows theme', icon: Laptop },
  ];

  return (
    <div className="space-y-5">
      {/* Theme & Display Settings Card */}
      <div className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
        <div>
          <h3 className="text-[15px] font-bold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span>Appearance &amp; Theme Settings</span>
          </h3>
          <p className="text-[12px] text-slate-600 dark:text-slate-400 font-medium mt-0.5">
            Select your preferred visual mode for working with leave records and analytics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => setTheme(opt.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-700 text-white">
                      Active
                    </span>
                  )}
                </div>
                <strong className={`block text-[13px] font-bold ${
                  isSelected ? 'text-emerald-900 dark:text-emerald-200' : 'text-slate-900 dark:text-slate-100'
                }`}>
                  {opt.label}
                </strong>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium mt-0.5">
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Export & Print Card */}
        <div className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
          <div>
            <h3 className="text-[15px] font-bold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Export &amp; File Operations</span>
            </h3>
            <p className="text-[12px] text-slate-600 dark:text-slate-400 font-medium mt-0.5">
              Save complete workforce records to Excel (.xlsx), CSV, or printable documents
            </p>
          </div>

          <div className="space-y-2.5">
            {/* Excel Export (.xlsx) */}
            <button
              onClick={() => exportExcel(false)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-[12px] transition-colors shadow-xs"
            >
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                <div className="text-left">
                  <span className="block font-bold">Export Complete Database to Excel (.xlsx)</span>
                  <span className="block text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">
                    Formatted multi-sheet workbook with pro-rata quotas &amp; audit history
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-700 text-[10px] font-bold uppercase text-white">.XLSX</span>
            </button>

            {/* CSV Export (.csv) */}
            <button
              onClick={() => exportCSV(false)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-[12px] transition-colors shadow-xs"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <div className="text-left">
                  <span className="block font-bold">Export Standard CSV (.csv)</span>
                  <span className="block text-[11px] text-slate-600 dark:text-slate-400 font-medium">Universal comma-separated format</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-[10px] font-bold uppercase text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600">.CSV</span>
            </button>

            {/* JSON Backup Download */}
            <button
              onClick={exportJSONBackup}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-[12px] transition-colors shadow-xs"
            >
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                <div className="text-left">
                  <span className="block font-bold">Create Full JSON System Backup</span>
                  <span className="block text-[11px] text-slate-600 dark:text-slate-400 font-medium">Complete snapshot including all audit records</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-[10px] font-bold uppercase border border-blue-200 dark:border-blue-800">.JSON</span>
            </button>

            {/* Print Report */}
            <button
              onClick={() => window.print()}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-[12px] transition-colors shadow-xs"
            >
              <div className="flex items-center gap-3">
                <Printer className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                <div className="text-left">
                  <span className="block font-bold">Print Official Executive Summary</span>
                  <span className="block text-[11px] text-slate-600 dark:text-slate-400 font-medium">Printer-optimized document layout</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-bold uppercase border border-amber-200 dark:border-amber-800">Print</span>
            </button>
          </div>
        </div>

        {/* Backup Import & Maintenance Card */}
        <div className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
          <div>
            <h3 className="text-[15px] font-bold font-heading text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-700 dark:text-blue-400" />
              <span>Database Restore &amp; Maintenance</span>
            </h3>
            <p className="text-[12px] text-slate-600 dark:text-slate-400 font-medium mt-0.5">
              Restore from previous backups or revert to factory company datasets
            </p>
          </div>

          <div className="space-y-4">
            {/* Import JSON */}
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100/80 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 font-bold text-[12px] transition-colors shadow-xs"
              >
                <Upload className="w-4 h-4" />
                <span>Restore Database from Backup JSON File</span>
              </button>
            </div>

            {/* Danger Zone: Reset to Defaults */}
            <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-700 dark:text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[12px] font-bold text-rose-900 dark:text-rose-200">Reset to Factory Records</h4>
                  <p className="text-[11px] text-rose-800 dark:text-rose-300 font-medium mt-0.5">
                    Restores clean initial dataset of 206 employees for DOTS Furniture. All custom records and deductions will be reset.
                  </p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-800 font-bold text-[12px] transition-colors shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore Factory Dataset</span>
              </button>
            </div>

            {/* System Info Info Box */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[12px] text-slate-700 dark:text-slate-300 font-medium space-y-1.5">
              <div className="flex justify-between">
                <span>Active Stored Records:</span>
                <strong className="text-slate-900 dark:text-slate-100 font-bold">{employees.length} Employees</strong>
              </div>
              <div className="flex justify-between">
                <span>Tracking Calendar Cycle:</span>
                <strong className="text-slate-900 dark:text-slate-100 font-bold">{policy.trackingYear}</strong>
              </div>
              <div className="flex justify-between">
                <span>Storage Persistence:</span>
                <strong className="text-emerald-700 dark:text-emerald-400 font-bold">Browser Local Storage + Electron IPC</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
