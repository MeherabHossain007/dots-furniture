import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useEmployees();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let borderColor = 'border-slate-200';
        let Icon = Info;
        let iconBg = 'bg-blue-100 text-blue-700';

        if (toast.type === 'success') {
          borderColor = 'border-emerald-300';
          Icon = CheckCircle2;
          iconBg = 'bg-emerald-100 text-emerald-800';
        } else if (toast.type === 'error') {
          borderColor = 'border-rose-300';
          Icon = AlertCircle;
          iconBg = 'bg-rose-100 text-rose-800';
        } else if (toast.type === 'warning') {
          borderColor = 'border-amber-300';
          Icon = AlertTriangle;
          iconBg = 'bg-amber-100 text-amber-800';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl bg-white border ${borderColor} shadow-lg shadow-slate-900/10 text-[13px] font-semibold text-slate-900 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2`}
          >
            <div className="flex items-center gap-3">
              <span className={`p-1 rounded-lg shrink-0 ${iconBg}`}>
                <Icon className="w-4 h-4" />
              </span>
              <p className="leading-snug text-slate-900 font-semibold">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
