import React, { useState } from 'react';
import { CalendarPlus, AlertCircle } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';

export const ApplyLeaveForm: React.FC = () => {
  const { employees, applyLeave } = useEmployees();

  const [selectedEmpId, setSelectedEmpId] = useState('');
  const [leaveType, setLeaveType] = useState('sl');
  const [days, setDays] = useState<number>(1.0);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [reason, setReason] = useState('');

  const selectedEmployee = employees.find(e => e.id === selectedEmpId);

  // Available remaining balance for selected type
  const getRemainingForType = () => {
    if (!selectedEmployee) return 0;
    if (leaveType === 'sl') return selectedEmployee.remaining.sl;
    if (leaveType === 'cl') return selectedEmployee.remaining.cl;
    if (leaveType === 'el') return selectedEmployee.remaining.el;
    return 999; // LWP is uncapped
  };

  const remaining = getRemainingForType();
  const isOverBalance = leaveType !== 'lwp' && days > remaining;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmpId) return;

    if (isOverBalance) {
      if (!confirm(`Warning: Requested ${days} days exceeds available balance (${remaining} days). Proceed anyway?`)) {
        return;
      }
    }

    const success = applyLeave(selectedEmpId, leaveType, days, dateFrom, dateTo || dateFrom, reason);
    if (success) {
      setDays(1.0);
      setDateFrom('');
      setDateTo('');
      setReason('');
    }
  };

  return (
    <div className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
          <CalendarPlus className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-[15px] font-bold font-heading text-slate-900 dark:text-slate-100">Record Employee Leave</h3>
          <p className="text-[12px] text-slate-600 dark:text-slate-400 font-medium">Apply approved leave directly with automated pro-rata quota deduction</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Employee Select */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
            Select Employee *
          </label>
          <select
            id="leave-emp-select"
            value={selectedEmpId}
            onChange={(e) => setSelectedEmpId(e.target.value)}
            required
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 cursor-pointer transition-colors"
          >
            <option value="">-- Choose Employee ({employees.length} available) --</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.name} (ID: {emp.id} — {emp.department})
              </option>
            ))}
          </select>
        </div>

        {/* Live Employee Balance Preview */}
        {selectedEmployee && (
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[10px] p-3 text-[12px] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-slate-100">{selectedEmployee.name}</span>
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">{selectedEmployee.designation} • {selectedEmployee.department}</span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-200 dark:border-slate-700 text-center">
              <div className="bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 p-1.5 rounded">
                <span className="text-[10px] text-blue-900 dark:text-blue-300 font-bold block">SL Rem</span>
                <strong className="text-blue-700 dark:text-blue-400 font-mono text-[13px] font-extrabold">{selectedEmployee.remaining.sl.toFixed(1)}</strong>
              </div>
              <div className="bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-1.5 rounded">
                <span className="text-[10px] text-amber-900 dark:text-amber-300 font-bold block">CL Rem</span>
                <strong className="text-amber-700 dark:text-amber-400 font-mono text-[13px] font-extrabold">{selectedEmployee.remaining.cl.toFixed(1)}</strong>
              </div>
              <div className="bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-1.5 rounded">
                <span className="text-[10px] text-emerald-900 dark:text-emerald-300 font-bold block">EL Rem</span>
                <strong className="text-emerald-700 dark:text-emerald-400 font-mono text-[13px] font-extrabold">{selectedEmployee.remaining.el.toFixed(1)}</strong>
              </div>
              <div className="bg-emerald-100/70 dark:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-700 p-1.5 rounded">
                <span className="text-[10px] text-emerald-950 dark:text-emerald-200 block font-extrabold">Total Rem</span>
                <strong className="text-emerald-800 dark:text-emerald-300 font-mono text-[13px] font-extrabold">{selectedEmployee.remaining.total.toFixed(1)}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Leave Type and Days */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Leave Type *</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 cursor-pointer transition-colors"
            >
              <option value="sl">Sick Leave (SL)</option>
              <option value="cl">Casual Leave (CL)</option>
              <option value="el">Earned Leave (EL)</option>
              <option value="lwp">Leave Without Pay (LWP)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Number of Days *</label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              value={days}
              onChange={(e) => setDays(parseFloat(e.target.value) || 0.5)}
              required
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-[13px] font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 transition-colors"
            />
          </div>
        </div>

        {/* Date From and Date To */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Start Date *</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              required
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">End Date</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 transition-colors"
            />
          </div>
        </div>

        {/* Reason / Notes */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Reason / Notes</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Medical illness, Personal urgent errand, Family emergency..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 transition-colors"
          />
        </div>

        {/* Over balance warning if applicable */}
        {isOverBalance && (
          <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900 rounded-lg p-3 text-[12px] font-semibold text-rose-800 dark:text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>Requested {days} days exceeds remaining quota ({remaining} days available).</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!selectedEmpId}
          className="w-full py-2.5 px-4 rounded-lg text-[13px] font-bold bg-emerald-700 hover:bg-emerald-800 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-xs transition-colors"
        >
          Approve &amp; Deduct Leave
        </button>
      </form>
    </div>
  );
};
