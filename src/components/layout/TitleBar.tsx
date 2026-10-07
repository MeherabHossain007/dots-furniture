import React, { useState, useEffect } from 'react';
import { Minus, Square, X, Layers, Sun, Moon } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';
import { useTheme } from '../../context/ThemeContext';

declare global {
  interface Window {
    electronAPI?: {
      minimize: () => void;
      maximizeToggle: () => void;
      close: () => void;
      isMaximized: () => Promise<boolean>;
      onMaximizedState: (cb: (isMax: boolean) => void) => void;
    };
  }
}

export const TitleBar: React.FC = () => {
  const { policy } = useEmployees();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [timeStr, setTimeStr] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const yr = now.getFullYear();
      const mo = String(now.getMonth() + 1).padStart(2, '0');
      const da = String(now.getDate()).padStart(2, '0');
      let hr = now.getHours();
      const min = String(now.getMinutes()).padStart(2, '0');
      const ampm = hr >= 12 ? 'PM' : 'AM';
      hr = hr % 12 || 12;
      setTimeStr(`${yr}-${mo}-${da}  ${String(hr).padStart(2, '0')}:${min} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (window.electronAPI?.onMaximizedState) {
      window.electronAPI.onMaximizedState((maxState) => {
        setIsMaximized(maxState);
      });
    }
  }, []);

  const handleMinimize = () => {
    window.electronAPI?.minimize();
  };

  const handleMaximize = () => {
    window.electronAPI?.maximizeToggle();
  };

  const handleClose = () => {
    window.electronAPI?.close();
  };

  return (
    <header className="h-9 bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between app-drag z-50 select-none px-0 transition-colors duration-150">
      {/* Brand Identity */}
      <div className="flex items-center gap-2 pl-3">
        <div className="w-5 h-5 rounded-md bg-emerald-800 flex items-center justify-center text-white shadow-xs">
          <Layers className="w-3 h-3 stroke-[2.2]" />
        </div>
        <div className="flex items-center gap-2 text-[12px] font-bold font-heading text-slate-900 dark:text-slate-100">
          <span>DOTS Furniture &amp; Décor</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Pro-Rata {policy.trackingYear}
          </span>
        </div>
      </div>

      {/* Clock */}
      <div className="hidden sm:flex items-center text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-400">
        {timeStr}
      </div>

      {/* Controls */}
      <div className="flex items-center h-full app-no-drag">
        {/* Theme quick switch in TitleBar */}
        <button
          onClick={toggleTheme}
          className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={`Switch to ${resolvedTheme === 'dark' ? 'Light' : 'Dark'} mode (Alt+T)`}
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5" />
          )}
        </button>

        <button
          onClick={handleMinimize}
          className="w-10 h-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Minimize"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleMaximize}
          className="w-10 h-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={isMaximized ? 'Restore' : 'Maximize'}
        >
          <Square className="w-2.5 h-2.5" />
        </button>
        <button
          onClick={handleClose}
          className="w-10 h-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-white hover:bg-rose-600 transition-colors"
          title="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
