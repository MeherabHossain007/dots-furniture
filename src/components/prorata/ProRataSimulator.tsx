import React, { useState } from 'react';
import { Calculator, Calendar } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';
import { proRataService } from '../../services/proRataService';

export const ProRataSimulator: React.FC = () => {
  const { policy } = useEmployees();
  const [months, setMonths] = useState<number>(9);
  const [testJoinDate, setTestJoinDate] = useState<string>('2026-04-01');

  const alloc = proRataService.calculateAllocation(months, policy);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTestJoinDate(val);
    if (val) {
      const parts = val.split('-');
      const m = parseInt(parts[1], 10);
      const active = Math.max(1, 13 - m);
      setMonths(active);
    }
  };

  return (
    <div className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
          <Calculator className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-[15px] font-bold font-heading text-slate-900 dark:text-slate-100">Pro-Rata Calculator Simulator</h3>
          <p className="text-[12px] text-slate-600 dark:text-slate-400 font-medium">Simulate joining dates or tenure to test mathematical allocations</p>
        </div>
      </div>

      <div className="space-y-4 my-4">
        {/* Slider */}
        <div>
          <div className="flex items-center justify-between text-[12px] font-bold mb-1.5">
            <label className="text-slate-700 dark:text-slate-300">Months Active in {policy.trackingYear}:</label>
            <span className="text-emerald-700 dark:text-emerald-400 font-mono text-[14px] font-extrabold">{months} Months</span>
          </div>
          <input
            type="range"
            min={1}
            max={12}
            value={months}
            onChange={(e) => setMonths(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-700 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
          />
        </div>

        {/* Date Input */}
        <div>
          <label className="text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Or Simulate by Joining Date:</span>
          </label>
          <input
            type="date"
            value={testJoinDate}
            onChange={handleDateChange}
            min={`${policy.trackingYear}-01-01`}
            max={`${policy.trackingYear}-12-31`}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-[12px] font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 transition-colors"
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        <div className="bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 p-3 rounded-[10px] text-center">
          <span className="text-[10px] font-bold text-blue-900 dark:text-blue-300 uppercase">Sick Leave (SL)</span>
          <div className="text-[22px] font-extrabold text-blue-700 dark:text-blue-400 font-mono mt-1">{alloc.sl.toFixed(1)}</div>
          <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono font-medium mt-0.5">({months}/12) × {policy.sickLeave}</div>
        </div>

        <div className="bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-3 rounded-[10px] text-center">
          <span className="text-[10px] font-bold text-amber-900 dark:text-amber-300 uppercase">Casual Leave (CL)</span>
          <div className="text-[22px] font-extrabold text-amber-700 dark:text-amber-400 font-mono mt-1">{alloc.cl.toFixed(1)}</div>
          <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono font-medium mt-0.5">({months}/12) × {policy.casualLeave}</div>
        </div>

        <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-3 rounded-[10px] text-center">
          <span className="text-[10px] font-bold text-emerald-900 dark:text-emerald-300 uppercase">Earned Leave (EL)</span>
          <div className="text-[22px] font-extrabold text-emerald-700 dark:text-emerald-400 font-mono mt-1">{alloc.el.toFixed(1)}</div>
          <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono font-medium mt-0.5">({months}/12) × {policy.earnedLeave}</div>
        </div>

        <div className="bg-emerald-700 border border-emerald-800 p-3 rounded-[10px] text-center shadow-xs">
          <span className="text-[10px] font-bold text-emerald-100 uppercase">Total Allocation</span>
          <div className="text-[24px] font-extrabold text-white font-mono mt-1">{alloc.total.toFixed(1)}</div>
          <div className="text-[11px] text-emerald-100 font-mono font-semibold mt-0.5">SL + CL + EL</div>
        </div>
      </div>
    </div>
  );
};
