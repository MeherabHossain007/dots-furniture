import React, { useState } from 'react';
import { Settings, RefreshCw, Save } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';

export const PolicyEditor: React.FC = () => {
  const { policy, updatePolicy, recalculateAllProRata } = useEmployees();

  const [formData, setFormData] = useState({
    trackingYear: policy.trackingYear,
    sickLeave: policy.sickLeave,
    casualLeave: policy.casualLeave,
    earnedLeave: policy.earnedLeave,
  });

  const combinedTotal = (
    Number(formData.sickLeave) + 
    Number(formData.casualLeave) + 
    Number(formData.earnedLeave)
  ).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePolicy({
      trackingYear: Number(formData.trackingYear),
      sickLeave: Number(formData.sickLeave),
      casualLeave: Number(formData.casualLeave),
      earnedLeave: Number(formData.earnedLeave),
      totalAnnual: Number(combinedTotal)
    });
  };

  const handleRecalculate = () => {
    if (confirm('Recalculate pro-rated leaves for the entire active workforce using current policy?')) {
      recalculateAllProRata();
    }
  };

  return (
    <div className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
          <Settings className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-[15px] font-bold font-heading text-slate-900 dark:text-slate-100">Company Leave Policy Standard</h3>
          <p className="text-[12px] text-slate-600 dark:text-slate-400 font-medium">Annual baseline quotas for full-year tenure (12 active months)</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 my-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Tracking Year</label>
            <input
              type="number"
              value={formData.trackingYear}
              onChange={(e) => setFormData({ ...formData, trackingYear: parseInt(e.target.value, 10) || 2026 })}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-[13px] font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Sick Leave (SL)</label>
            <input
              type="number"
              step="0.5"
              value={formData.sickLeave}
              onChange={(e) => setFormData({ ...formData, sickLeave: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-[13px] font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Casual Leave (CL)</label>
            <input
              type="number"
              step="0.5"
              value={formData.casualLeave}
              onChange={(e) => setFormData({ ...formData, casualLeave: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-[13px] font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Earned Leave (EL)</label>
            <input
              type="number"
              step="0.5"
              value={formData.earnedLeave}
              onChange={(e) => setFormData({ ...formData, earnedLeave: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-[13px] font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 transition-colors"
            />
          </div>
        </div>

        {/* Display combined total */}
        <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg p-2.5 flex items-center justify-between text-[12px]">
          <span className="text-emerald-950 dark:text-emerald-200 font-bold">Combined Annual Allowance:</span>
          <strong className="text-emerald-800 dark:text-emerald-300 font-mono text-[15px] font-extrabold">{combinedTotal} Days</strong>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Policy</span>
          </button>

          <button
            type="button"
            onClick={handleRecalculate}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 transition-colors shadow-xs"
            title="Recalculate all employees pro-rata based on active policy"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>Recalculate Workforce</span>
          </button>
        </div>
      </form>
    </div>
  );
};
