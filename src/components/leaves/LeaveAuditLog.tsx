import React, { useState, useMemo } from 'react';
import { History, FileText, Trash2, Search, AlertTriangle, X, RotateCcw } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';
import { LeaveAuditRecord } from '../../types';

export const LeaveAuditLog: React.FC = () => {
  const { auditLog, deleteLeaveRecord } = useEmployees();
  const [searchTerm, setSearchTerm] = useState('');
  const [recordToDelete, setRecordToDelete] = useState<LeaveAuditRecord | null>(null);

  // Filter audit records based on search
  const filteredLogs = useMemo(() => {
    if (!searchTerm.trim()) return auditLog;
    const term = searchTerm.toLowerCase().trim();
    return auditLog.filter(log => 
      log.empId.toLowerCase().includes(term) ||
      log.name.toLowerCase().includes(term) ||
      log.type.toLowerCase().includes(term) ||
      (log.dept && log.dept.toLowerCase().includes(term)) ||
      (log.reason && log.reason.toLowerCase().includes(term))
    );
  }, [auditLog, searchTerm]);

  const confirmDelete = () => {
    if (!recordToDelete) return;
    deleteLeaveRecord(recordToDelete.id);
    setRecordToDelete(null);
  };

  const getBadgeColor = (typeStr: string) => {
    const t = typeStr.toLowerCase();
    if (t.includes('sick') || t.includes('sl')) return 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    if (t.includes('casual') || t.includes('cl')) return 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    if (t.includes('earned') || t.includes('el')) return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    return 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800';
  };

  return (
    <div className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
            <History className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-bold font-heading text-slate-900 dark:text-slate-100">Activity &amp; Audit Log</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {auditLog.length} Records
              </span>
            </div>
            <p className="text-[12px] text-slate-600 dark:text-slate-400 font-medium">Chronological history of recorded leave deductions &amp; quota reversals</p>
          </div>
        </div>

        {/* Search input */}
        <div className="relative min-w-55">
          <Search className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search records..."
            className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-[12px] font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 max-h-120">
        <table className="w-full text-[12px] text-left">
          <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-700 z-10">
            <tr>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Emp ID</th>
              <th className="py-2.5 px-3">Employee Name</th>
              <th className="py-2.5 px-3">Leave Type</th>
              <th className="py-2.5 px-3 text-right">Days</th>
              <th className="py-2.5 px-3">Reason / Details</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500 dark:text-slate-400">
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-50 text-slate-400" />
                  <p className="font-bold text-slate-900 dark:text-slate-100 text-[14px]">
                    {searchTerm ? 'No matching leave records found' : 'No leave records registered yet'}
                  </p>
                  <p className="text-[12px] text-slate-600 dark:text-slate-400 font-medium mt-1">
                    {searchTerm ? 'Try a different search query' : 'When leaves are deducted, records appear here.'}
                  </p>
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="py-2.5 px-3 font-mono text-slate-700 dark:text-slate-300 font-medium text-[11px]">{log.date}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-slate-100">{log.empId}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-slate-100">
                    {log.name}
                    {log.dept && (
                      <span className="block text-[11px] text-slate-600 dark:text-slate-400 font-medium">{log.dept}</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getBadgeColor(log.type)}`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-800 dark:text-amber-400">
                    {log.days} d
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-medium max-w-xs truncate" title={log.reason || 'No reason provided'}>
                    {log.reason || '—'}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => setRecordToDelete(log)}
                      title="Remove this leave entry and restore quota back to employee"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold text-rose-700 dark:text-rose-300 hover:text-white bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-600 dark:hover:bg-rose-600 border border-rose-300 dark:border-rose-800 transition-colors shadow-xs"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal for Removing Leave */}
      {recordToDelete && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setRecordToDelete(null)}
        >
          <div 
            className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
              <div className="flex items-center gap-2.5 text-rose-750">
                <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-700 dark:text-rose-400">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold font-heading text-slate-900 dark:text-slate-100">Remove Leave Record</h3>
                  <p className="text-[12px] font-medium text-slate-600 dark:text-slate-400">Confirm deduction reversal &amp; balance refund</p>
                </div>
              </div>
              <button
                onClick={() => setRecordToDelete(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-[13px]">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Are you sure you want to remove this leave record? Deleting this entry will 
                <span className="text-emerald-700 dark:text-emerald-400 font-bold"> refund {recordToDelete.days} day(s) </span> 
                back to the employee&apos;s available balance.
              </p>

              {/* Record Summary Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5 text-[12px]">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">Employee:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {recordToDelete.name} <span className="text-slate-600 dark:text-slate-400 font-mono">({recordToDelete.empId})</span>
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">Leave Type:</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${getBadgeColor(recordToDelete.type)}`}>
                    {recordToDelete.type}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">Deduction:</span>
                  <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{recordToDelete.days} day(s)</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">Date:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{recordToDelete.date}</span>
                </div>
                {recordToDelete.reason && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400 font-semibold">Reason:</span>
                    <span className="text-slate-700 dark:text-slate-300 italic text-right max-w-50 truncate">{recordToDelete.reason}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setRecordToDelete(null)}
                className="px-3.5 py-1.5 rounded-lg text-[12px] font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-bold text-white bg-rose-700 hover:bg-rose-800 shadow-sm transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Remove &amp; Refund Quota</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
