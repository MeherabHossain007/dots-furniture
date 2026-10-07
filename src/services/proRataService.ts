import { LeaveAllocation, CompanyPolicy, Employee } from '../types';

export const proRataService = {
  /**
   * Calculate pro-rata leave entitlement based on active months
   */
  calculateAllocation(monthsActive: number, policy: CompanyPolicy): LeaveAllocation {
    const clampedMonths = Math.min(Math.max(Number(monthsActive) || 12, 1), 12);
    const sl = parseFloat(((clampedMonths / 12) * policy.sickLeave).toFixed(1));
    const cl = parseFloat(((clampedMonths / 12) * policy.casualLeave).toFixed(1));
    const el = parseFloat(((clampedMonths / 12) * policy.earnedLeave).toFixed(1));
    const total = parseFloat((sl + cl + el).toFixed(1));

    return { sl, cl, el, total };
  },

  /**
   * Determine active months in tracking year from joining date string (DD/MM/YYYY)
   */
  getMonthsActiveFromJoinDate(joinDateStr: string, trackingYear: number = 2026): number {
    if (!joinDateStr) return 12;
    const parts = joinDateStr.trim().split(/[/.-]/);
    if (parts.length < 3) return 12;

    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(year) || isNaN(month)) return 12;

    if (year < trackingYear) {
      return 12;
    } else if (year === trackingYear) {
      if (month >= 1 && month <= 12) {
        return Math.max(1, 13 - month);
      }
    }
    return 12;
  },

  /**
   * Recompute all employee allocations and remaining balances against a policy
   */
  recalculateAllEmployees(employees: Employee[], policy: CompanyPolicy): Employee[] {
    return employees.map(emp => {
      const alloc = this.calculateAllocation(emp.monthsActive, policy);
      const usedTotal = parseFloat(((emp.used.sl || 0) + (emp.used.cl || 0) + (emp.used.el || 0)).toFixed(1));
      
      const slRem = parseFloat(Math.max(0, alloc.sl - (emp.used.sl || 0)).toFixed(1));
      const clRem = parseFloat(Math.max(0, alloc.cl - (emp.used.cl || 0)).toFixed(1));
      const elRem = parseFloat(Math.max(0, alloc.el - (emp.used.el || 0)).toFixed(1));
      const totalRem = parseFloat(Math.max(0, alloc.total - usedTotal).toFixed(1));

      return {
        ...emp,
        allocation: alloc,
        used: {
          ...emp.used,
          total: usedTotal
        },
        remaining: {
          sl: slRem,
          cl: clRem,
          el: elRem,
          total: totalRem
        }
      };
    });
  },

  /**
   * Build complete 1-12 months lookup matrix
   */
  getLookupMatrix(policy: CompanyPolicy, countsByMonth: Record<number, number> = {}) {
    const monthNames = [
      '', 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const rows = [];
    for (let m = 12; m >= 1; m--) {
      const alloc = this.calculateAllocation(m, policy);
      const joinedMonthNum = 13 - m;
      const windowStr = m === 12
        ? `Joined prior to ${policy.trackingYear} or during Jan ${policy.trackingYear}`
        : `Joined during ${monthNames[joinedMonthNum]} ${policy.trackingYear}`;

      rows.push({
        months: m,
        window: windowStr,
        sl: alloc.sl,
        cl: alloc.cl,
        el: alloc.el,
        total: alloc.total,
        count: countsByMonth[m] || 0
      });
    }
    return rows;
  }
};
