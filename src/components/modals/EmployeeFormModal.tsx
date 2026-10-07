import React, { useState, useEffect } from 'react';
import { X, UserPlus, Save } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';
import { proRataService } from '../../services/proRataService';

export const EmployeeFormModal: React.FC = () => {
  const { 
    isCreateModalOpen, 
    setIsCreateModalOpen, 
    isEditModalOpen, 
    setIsEditModalOpen, 
    employeeToEdit, 
    setEmployeeToEdit, 
    employees, 
    addEmployee, 
    updateEmployee, 
    policy 
  } = useEmployees();

  const isOpen = isCreateModalOpen || isEditModalOpen;
  const isEdit = !!employeeToEdit && isEditModalOpen;

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    department: '',
    designation: '',
    joiningDate: '01/01/2026',
    monthsActive: 12
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Auto next ID for create mode
  useEffect(() => {
    if (isCreateModalOpen) {
      const maxId = employees.reduce((max, e) => {
        const num = parseInt(e.id, 10);
        return !isNaN(num) && num > max ? num : max;
      }, 1215);

      setFormData({
        id: String(maxId + 1),
        name: '',
        department: 'Wood Workshop',
        designation: 'Helper',
        joiningDate: '01/01/2026',
        monthsActive: 12
      });
      setFormErrors({});
    } else if (isEditModalOpen && employeeToEdit) {
      setFormData({
        id: employeeToEdit.id,
        name: employeeToEdit.name,
        department: employeeToEdit.department,
        designation: employeeToEdit.designation,
        joiningDate: employeeToEdit.joiningDate,
        monthsActive: employeeToEdit.monthsActive
      });
      setFormErrors({});
    }
  }, [isCreateModalOpen, isEditModalOpen, employeeToEdit, employees]);

  if (!isOpen) return null;

  // Real-time pro-rata preview
  const previewAlloc = proRataService.calculateAllocation(formData.monthsActive, policy);

  const departments = Array.from(new Set(employees.map(e => e.department))).sort();

  const handleJoiningDateBlur = () => {
    const calcMonths = proRataService.getMonthsActiveFromJoinDate(formData.joiningDate, policy.trackingYear);
    setFormData(prev => ({ ...prev, monthsActive: calcMonths }));
  };

  const handleClose = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setEmployeeToEdit(null);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.id.trim()) errors.id = 'Employee ID is required';
    if (!formData.name.trim()) errors.name = 'Employee name is required';
    if (!formData.department.trim()) errors.department = 'Department is required';
    if (!formData.designation.trim()) errors.designation = 'Designation is required';
    if (!formData.joiningDate.trim()) errors.joiningDate = 'Joining date is required';
    if (formData.monthsActive < 1 || formData.monthsActive > 12) {
      errors.monthsActive = 'Active months must be between 1 and 12';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEdit) {
      updateEmployee(formData.id, {
        name: formData.name,
        department: formData.department,
        designation: formData.designation,
        joiningDate: formData.joiningDate,
        monthsActive: formData.monthsActive
      });
    } else {
      const ok = addEmployee(formData);
      if (!ok) return;
    }

    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div 
        className="bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-slate-800 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <UserPlus className="w-4 h-4" />
            </div>
            <h3 className="text-[16px] font-bold font-heading text-slate-900 dark:text-slate-100">
              {isEdit ? 'Edit Employee Details' : 'Add New Employee'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Employee ID *</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                readOnly={isEdit}
                required
                className={`w-full bg-slate-50 dark:bg-slate-900/80 border rounded-lg px-3 py-2 text-[13px] font-mono font-bold text-slate-900 dark:text-slate-100 focus:outline-none ${
                  isEdit ? 'opacity-60 cursor-not-allowed border-slate-300 dark:border-slate-700' : 'border-slate-300 dark:border-slate-700 focus:border-emerald-600 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600'
                }`}
              />
              {formErrors.id && <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 mt-1 block">{formErrors.id}</span>}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g. Farhan Ahmed"
                className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 transition-colors"
              />
              {formErrors.name && <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 mt-1 block">{formErrors.name}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Department *</label>
              <input
                type="text"
                list="department-datalist"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
                placeholder="e.g. Wood Workshop"
                className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 transition-colors"
              />
              <datalist id="department-datalist">
                {departments.map(d => (
                  <option key={d} value={d} />
                ))}
              </datalist>
              {formErrors.department && <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 mt-1 block">{formErrors.department}</span>}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Designation *</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                required
                placeholder="e.g. Technician, Helper"
                className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 transition-colors"
              />
              {formErrors.designation && <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 mt-1 block">{formErrors.designation}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Joining Date (DD/MM/YYYY) *</label>
              <input
                type="text"
                value={formData.joiningDate}
                onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                onBlur={handleJoiningDateBlur}
                required
                placeholder="01/01/2026"
                className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-[13px] text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 transition-colors"
              />
              {formErrors.joiningDate && <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 mt-1 block">{formErrors.joiningDate}</span>}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Months Active in {policy.trackingYear} *</label>
              <input
                type="number"
                min={1}
                max={12}
                value={formData.monthsActive}
                onChange={(e) => setFormData({ ...formData, monthsActive: parseInt(e.target.value, 10) || 12 })}
                required
                className="w-full bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-[13px] text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-emerald-600 transition-colors"
              />
              {formErrors.monthsActive && <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 mt-1 block">{formErrors.monthsActive}</span>}
            </div>
          </div>

          {/* Real-time Pro-Rata Entitlement Preview */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[10px] p-3 text-[12px] space-y-2">
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Calculated Pro-Rata Allocation ({formData.monthsActive} Mo Active)
            </span>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 p-1.5 rounded">
                <span className="text-[10px] text-blue-900 dark:text-blue-300 font-bold block">Sick</span>
                <strong className="text-blue-700 dark:text-blue-400 font-mono text-[13px] font-extrabold">{previewAlloc.sl.toFixed(1)} d</strong>
              </div>
              <div className="bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 p-1.5 rounded">
                <span className="text-[10px] text-amber-900 dark:text-amber-300 font-bold block">Casual</span>
                <strong className="text-amber-700 dark:text-amber-400 font-mono text-[13px] font-extrabold">{previewAlloc.cl.toFixed(1)} d</strong>
              </div>
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 p-1.5 rounded">
                <span className="text-[10px] text-emerald-900 dark:text-emerald-300 font-bold block">Earned</span>
                <strong className="text-emerald-700 dark:text-emerald-400 font-mono text-[13px] font-extrabold">{previewAlloc.el.toFixed(1)} d</strong>
              </div>
              <div className="bg-emerald-100/70 dark:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-700/60 p-1.5 rounded">
                <span className="text-[10px] text-emerald-950 dark:text-emerald-200 block font-extrabold">Total</span>
                <strong className="text-emerald-800 dark:text-emerald-300 font-mono text-[13px] font-extrabold">{previewAlloc.total.toFixed(1)} d</strong>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-3.5 py-2 rounded-lg text-[12px] font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isEdit ? 'Save Changes' : 'Create Employee'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
