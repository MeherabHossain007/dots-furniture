import React, { useEffect, useState } from 'react';
import { X, CalendarPlus, Printer, User, History, Trash2, RotateCcw, AlertTriangle } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';
import { LeaveAuditRecord } from '../../types';

export const EmployeeDossierModal: React.FC = () => {
  const { 
    selectedEmployeeForDossier, 
    setSelectedEmployeeForDossier, 
    policy,
    setActiveTab,
    auditLog,
    deleteLeaveRecord
  } = useEmployees();

  const [recordToDelete, setRecordToDelete] = useState<LeaveAuditRecord | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedEmployeeForDossier(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedEmployeeForDossier]);

  if (!selectedEmployeeForDossier) return null;

  const emp = selectedEmployeeForDossier;
  const employeeLogs = auditLog.filter(log => log.empId === emp.id);

  const getInitials = (name: string) => {
    if (!name) return 'DF';
    const clean = name.replace(/^md\.?\s+/i, '').trim();
    const parts = clean.split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return clean.slice(0, 2).toUpperCase();
  };

  const handleApplyLeave = () => {
    const empId = emp.id;
    setSelectedEmployeeForDossier(null);
    setActiveTab('leaves');
    setTimeout(() => {
      const select = document.getElementById('leave-emp-select') as HTMLSelectElement;
      if (select) {
        select.value = empId;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, 100);
  };

  const printLeaveSlip = () => {
    const printWin = window.open('', '_blank', 'width=800,height=600');
    if (!printWin) {
      alert('Please allow popups to generate official printout.');
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>DOTS Furniture - Leave Card (${emp.id})</title>
        <style>
          body { font-family: 'DM Sans', 'Segoe UI', Arial, sans-serif; padding: 40px; color: #0F172A; }
          .header { text-align: center; border-bottom: 2px solid #0F172A; padding-bottom: 15px; margin-bottom: 25px; }
          .header h1 { margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px; color: #0F172A; }
          .header h2 { margin: 5px 0 0; font-size: 13px; font-weight: normal; color: #475569; }
          .profile-box { display: flex; justify-content: space-between; background: #F8FAFC; border: 1px solid #CBD5E1; padding: 15px; border-radius: 6px; margin-bottom: 25px; }
          .profile-box div { line-height: 1.6; font-size: 13px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th, td { border: 1px solid #CBD5E1; padding: 10px 12px; font-size: 13px; text-align: left; }
          th { background: #F1F5F9; font-weight: bold; color: #1E293B; }
          .text-right { text-align: right; }
          .total-row { font-weight: bold; background: #F1F5F9; }
          .signatures { display: flex; justify-content: space-between; margin-top: 60px; padding-top: 20px; }
          .sig-line { width: 200px; border-top: 1px solid #0F172A; text-align: center; font-size: 12px; padding-top: 5px; color: #334155; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>DOTS Furniture &amp; Décor Limited</h1>
          <h2>OFFICIAL EMPLOYEE LEAVE RECORD (PRO-RATA ${policy.trackingYear})</h2>
        </div>

        <div class="profile-box">
          <div>
            <strong>Employee Name:</strong> ${emp.name}<br>
            <strong>Employee ID:</strong> ${emp.id}<br>
            <strong>Department:</strong> ${emp.department}
          </div>
          <div>
            <strong>Designation:</strong> ${emp.designation}<br>
            <strong>Joining Date:</strong> ${emp.joiningDate}<br>
            <strong>Active Tenure:</strong> ${emp.monthsActive} Months in ${policy.trackingYear}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Leave Category</th>
              <th class="text-right">Allocated (Pro-Rata)</th>
              <th class="text-right">Utilized</th>
              <th class="text-right">Available Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sick Leave (SL)</td>
              <td class="text-right">${emp.allocation.sl.toFixed(1)}</td>
              <td class="text-right">${emp.used.sl}</td>
              <td class="text-right"><strong>${emp.remaining.sl.toFixed(1)}</strong></td>
            </tr>
            <tr>
              <td>Casual Leave (CL)</td>
              <td class="text-right">${emp.allocation.cl.toFixed(1)}</td>
              <td class="text-right">${emp.used.cl}</td>
              <td class="text-right"><strong>${emp.remaining.cl.toFixed(1)}</strong></td>
            </tr>
            <tr>
              <td>Earned Leave (EL)</td>
              <td class="text-right">${emp.allocation.el.toFixed(1)}</td>
              <td class="text-right">${emp.used.el}</td>
              <td class="text-right"><strong>${emp.remaining.el.toFixed(1)}</strong></td>
            </tr>
            <tr>
              <td>Leave Without Pay (LWP)</td>
              <td class="text-right">0.0</td>
              <td class="text-right">${emp.used.lwp}</td>
              <td class="text-right">-</td>
            </tr>
            <tr class="total-row">
              <td>Total Entitlement</td>
              <td class="text-right">${emp.allocation.total.toFixed(1)} Days</td>
              <td class="text-right">${emp.used.total} Days</td>
              <td class="text-right" style="color: #24634B;">${emp.remaining.total.toFixed(1)} Days</td>
            </tr>
          </tbody>
        </table>

        <div class="signatures">
          <div class="sig-line">Employee Signature</div>
          <div class="sig-line">Department Supervisor</div>
          <div class="sig-line">HR &amp; Admin Incharge</div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    printWin.document.open();
    printWin.document.write(html);
    printWin.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div 
        className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <User className="w-4 h-4" />
            </div>
            <h3 className="text-[16px] font-bold font-heading text-slate-900 dark:text-slate-100">Personnel Dossier</h3>
          </div>
          <button
            onClick={() => setSelectedEmployeeForDossier(null)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Profile Banner */}
          <div className="flex items-center gap-4 p-4 rounded-[10px] bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div
              className="w-13 h-13 rounded-full flex items-center justify-center font-bold text-[15px] text-white shrink-0 shadow-xs"
              style={{ backgroundColor: emp.avatarColor || '#059669' }}
            >
              {getInitials(emp.name)}
            </div>
            <div>
              <h4 className="text-[17px] font-bold font-heading text-slate-900 dark:text-slate-100">{emp.name}</h4>
              <p className="text-[13px] text-slate-600 dark:text-slate-400 font-medium mt-0.5">
                {emp.designation} • {emp.department}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
                  ID: {emp.id}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-700 dark:text-slate-300 font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
                  Joined: {emp.joiningDate}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {emp.monthsActive} Mo Active
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  {emp.status || 'OK'}
                </span>
              </div>
            </div>
          </div>

          {/* Pro-Rata Formula Box */}
          <div className="p-3.5 rounded-[10px] bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[12px] text-slate-700 dark:text-slate-300">
            <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block mb-1">
              Automated Pro-Rata Entitlement
            </span>
            <p className="leading-relaxed font-medium">
              {emp.monthsActive === 12
                ? `Standard full tenure: Allocated full company policy quotas for ${policy.trackingYear} (14 Sick, 10 Casual, 6 Earned).`
                : `Pro-rated service tenure: (${emp.monthsActive} / 12) × Annual policy quota in ${policy.trackingYear}.`}
            </p>
          </div>

          {/* Leave Balances Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 p-3 rounded-[10px] text-center">
              <span className="text-[10px] font-bold text-blue-900 dark:text-blue-300 uppercase block">Sick Leave</span>
              <div className="text-[22px] font-extrabold text-blue-700 dark:text-blue-400 font-mono my-1">
                {emp.remaining.sl.toFixed(1)}
              </div>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium block">
                Used: {emp.used.sl} / {emp.allocation.sl.toFixed(1)}
              </span>
            </div>

            <div className="bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 p-3 rounded-[10px] text-center">
              <span className="text-[10px] font-bold text-amber-900 dark:text-amber-300 uppercase block">Casual Leave</span>
              <div className="text-[22px] font-extrabold text-amber-700 dark:text-amber-400 font-mono my-1">
                {emp.remaining.cl.toFixed(1)}
              </div>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium block">
                Used: {emp.used.cl} / {emp.allocation.cl.toFixed(1)}
              </span>
            </div>

            <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 p-3 rounded-[10px] text-center">
              <span className="text-[10px] font-bold text-emerald-900 dark:text-emerald-300 uppercase block">Earned Leave</span>
              <div className="text-[22px] font-extrabold text-emerald-700 dark:text-emerald-400 font-mono my-1">
                {emp.remaining.el.toFixed(1)}
              </div>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium block">
                Used: {emp.used.el} / {emp.allocation.el.toFixed(1)}
              </span>
            </div>

            <div className="bg-emerald-700 dark:bg-emerald-800 border border-emerald-800 dark:border-emerald-700 p-3 rounded-[10px] text-center shadow-xs">
              <span className="text-[10px] font-bold text-emerald-100 uppercase block">Total Balance</span>
              <div className="text-[22px] font-extrabold text-white font-mono my-1">
                {emp.remaining.total.toFixed(1)}
              </div>
              <span className="text-[11px] text-emerald-100 font-medium block">
                Allocated: {emp.allocation.total.toFixed(1)} d
              </span>
            </div>
          </div>

          {/* Employee Leave Activity History & Reversal */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span className="text-[13px] font-bold font-heading text-slate-900 dark:text-slate-100">
                  Leave Deduction Records ({employeeLogs.length})
                </span>
              </div>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                Logged leaves for {policy.trackingYear}
              </span>
            </div>

            {employeeLogs.length === 0 ? (
              <div className="p-3.5 rounded-[10px] bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center text-[12px] text-slate-600 dark:text-slate-400 font-medium">
                No leave deductions recorded yet for {emp.name}. Full quota intact!
              </div>
            ) : (
              <div className="overflow-x-auto rounded-[10px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 max-h-50">
                <table className="w-full text-[12px] text-left">
                  <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-700 z-10">
                    <tr>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Leave Type</th>
                      <th className="py-2 px-3 text-right">Days</th>
                      <th className="py-2 px-3">Reason / Details</th>
                      <th className="py-2 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {employeeLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors">
                        <td className="py-2 px-3 font-mono text-slate-700 dark:text-slate-300 font-medium text-[11px]">{log.date}</td>
                        <td className="py-2 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            {log.type}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-amber-800 dark:text-amber-400">
                          {log.days} d
                        </td>
                        <td className="py-2 px-3 text-slate-700 dark:text-slate-300 font-medium max-w-35 truncate" title={log.reason || '—'}>
                          {log.reason || '—'}
                        </td>
                        <td className="py-2 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => setRecordToDelete(log)}
                            title="Remove leave and restore days to balance"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold text-rose-700 dark:text-rose-400 hover:text-white dark:hover:text-white bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-600 dark:hover:bg-rose-600 transition-colors border border-rose-300 dark:border-rose-800"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Confirm Delete Leave Modal in Dossier */}
        {recordToDelete && (
          <div 
            className="fixed inset-0 z-60 bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setRecordToDelete(null)}
          >
            <div 
              className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 text-slate-900 dark:text-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
                  <AlertTriangle className="w-4 h-4" />
                  <h4 className="text-[13px] font-bold font-heading text-slate-900 dark:text-slate-100">Remove Leave Deduction</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setRecordToDelete(null)}
                  className="p-1 rounded text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-3 text-[12px] text-slate-700 dark:text-slate-300">
                <p>
                  Are you sure you want to remove this leave record?
                </p>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-[12px]">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Leave Type:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{recordToDelete.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Days to Refund:</span>
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">+{recordToDelete.days} day(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Date:</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{recordToDelete.date}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  This will restore {recordToDelete.days} day(s) back to {emp.name}&apos;s remaining balance.
                </p>
              </div>

              <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRecordToDelete(null)}
                  className="px-3 py-1.5 rounded-lg text-[12px] font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteLeaveRecord(recordToDelete.id);
                    setRecordToDelete(null);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Confirm &amp; Restore</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-end gap-2.5">
          <button
            onClick={printLeaveSlip}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-slate-700 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Slip</span>
          </button>

          <button
            onClick={handleApplyLeave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors shadow-xs"
          >
            <CalendarPlus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Record Leave</span>
          </button>
        </div>
      </div>
    </div>
  );
};
