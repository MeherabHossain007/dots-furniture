/**
 * DOTS Furniture & Décor Limited - Employee Leave Management System
 * Main Application Controller & Business Logic
 */

(function () {
  'use strict';

  // =========================================================================
  // State Management
  // =========================================================================
  const state = {
    employees: [],
    metadata: {
      companyName: "DOTS Furniture & Décor Limited",
      trackingYear: 2026,
      annualPolicy: {
        sickLeave: 14.0,
        casualLeave: 10.0,
        earnedLeave: 6.0,
        totalAnnual: 30.0
      }
    },
    leaveAuditLog: [
      {
        id: 'LOG-1',
        date: '2026-08-15',
        empId: '1010',
        name: 'Mahabub Alam',
        dept: 'Management',
        type: 'Earned Leave (EL)',
        days: 1.0,
        reason: 'Annual Executive Leave'
      },
      {
        id: 'LOG-2',
        date: '2026-09-20',
        empId: '1206',
        name: 'K.M. Abdullah Akib',
        dept: 'Industrial Engineering (IE)',
        type: 'Casual Leave (CL)',
        days: 1.0,
        reason: 'Personal errand'
      }
    ],
    filters: {
      search: '',
      department: '',
      monthsActive: '',
      leaveStatus: '',
      sortBy: 'id_asc'
    },
    pagination: {
      page: 1,
      pageSize: 25,
      totalRows: 0,
      totalPages: 1
    },
    activeTab: 'view-overview',
    selectedEmployeeForDossier: null
  };

  // =========================================================================
  // DOM Element Selectors
  // =========================================================================
  const dom = {
    // Titlebar
    titlebarClock: document.getElementById('titlebarClock'),
    btnWindowMinimize: document.getElementById('btnWindowMinimize'),
    btnWindowMaximize: document.getElementById('btnWindowMaximize'),
    btnWindowClose: document.getElementById('btnWindowClose'),

    // Sidebar & Navigation
    navItems: document.querySelectorAll('.nav-item'),
    tabViews: document.querySelectorAll('.tab-view'),
    pageTitleText: document.getElementById('pageTitleText'),
    pageMainSubtitle: document.getElementById('pageMainSubtitle'),
    navBadgeEmployeeCount: document.getElementById('navBadgeEmployeeCount'),
    navBadgeDeptCount: document.getElementById('navBadgeDeptCount'),
    sidebarPolicySL: document.getElementById('sidebarPolicySL'),
    sidebarPolicyCL: document.getElementById('sidebarPolicyCL'),
    sidebarPolicyEL: document.getElementById('sidebarPolicyEL'),
    policyWidgetYear: document.getElementById('policyWidgetYear'),

    // Header Actions
    btnQuickSearch: document.getElementById('btnQuickSearch'),
    btnQuickApplyLeave: document.getElementById('btnQuickApplyLeave'),
    btnAddNewEmployee: document.getElementById('btnAddNewEmployee'),

    // Tab 1: Overview KPIs & Charts
    kpiTotalEmployees: document.getElementById('kpiTotalEmployees'),
    kpiTotalAllocated: document.getElementById('kpiTotalAllocated'),
    kpiTotalUsed: document.getElementById('kpiTotalUsed'),
    kpiTotalRemaining: document.getElementById('kpiTotalRemaining'),
    kpiUtilizationRate: document.getElementById('kpiUtilizationRate'),
    kpiFactoryCount: document.getElementById('kpiFactoryCount'),
    deptBarsContainer: document.getElementById('deptBarsContainer'),
    donutTotalDays: document.getElementById('donutTotalDays'),
    monthsPillGrid: document.getElementById('monthsPillGrid'),
    recentHiresTbody: document.getElementById('recentHiresTbody'),
    btnViewAllDepts: document.getElementById('btnViewAllDepts'),
    btnGoToFullDirectory: document.getElementById('btnGoToFullDirectory'),

    // Tab 2: Directory & Master Table
    searchInput: document.getElementById('searchInput'),
    btnClearSearch: document.getElementById('btnClearSearch'),
    filterDept: document.getElementById('filterDept'),
    filterMonths: document.getElementById('filterMonths'),
    filterLeaveStatus: document.getElementById('filterLeaveStatus'),
    sortBySelect: document.getElementById('sortBySelect'),
    btnExportFilteredCSV: document.getElementById('btnExportFilteredCSV'),
    btnPrintDirectory: document.getElementById('btnPrintDirectory'),
    masterEmployeeTbody: document.getElementById('masterEmployeeTbody'),
    lblShowingCount: document.getElementById('lblShowingCount'),
    lblTotalCount: document.getElementById('lblTotalCount'),
    lblFilterNotice: document.getElementById('lblFilterNotice'),
    pageSizeSelect: document.getElementById('pageSizeSelect'),
    btnPagePrev: document.getElementById('btnPagePrev'),
    btnPageNext: document.getElementById('btnPageNext'),
    pageNumbersContainer: document.getElementById('pageNumbersContainer'),

    // Tab 3: Pro-Rata Engine
    simMonthsSlider: document.getElementById('simMonthsSlider'),
    simMonthsValue: document.getElementById('simMonthsValue'),
    simJoinDateInput: document.getElementById('simJoinDateInput'),
    simResultSL: document.getElementById('simResultSL'),
    simResultCL: document.getElementById('simResultCL'),
    simResultEL: document.getElementById('simResultEL'),
    simResultTotal: document.getElementById('simResultTotal'),
    simCalcSL: document.getElementById('simCalcSL'),
    simCalcCL: document.getElementById('simCalcCL'),
    simCalcEL: document.getElementById('simCalcEL'),
    policyYearInput: document.getElementById('policyYearInput'),
    policySLInput: document.getElementById('policySLInput'),
    policyCLInput: document.getElementById('policyCLInput'),
    policyELInput: document.getElementById('policyELInput'),
    policyTotalDisplay: document.getElementById('policyTotalDisplay'),
    btnSavePolicy: document.getElementById('btnSavePolicy'),
    btnRecalculateAll: document.getElementById('btnRecalculateAll'),
    matrixTbody: document.getElementById('matrixTbody'),

    // Tab 4: Workshop & Departments
    deptCardsGrid: document.getElementById('deptCardsGrid'),

    // Tab 5: Leave Management
    recordLeaveForm: document.getElementById('recordLeaveForm'),
    leaveEmpSelect: document.getElementById('leaveEmpSelect'),
    leaveEmpPreview: document.getElementById('leaveEmpPreview'),
    lepName: document.getElementById('lepName'),
    lepDept: document.getElementById('lepDept'),
    lepSL: document.getElementById('lepSL'),
    lepCL: document.getElementById('lepCL'),
    lepEL: document.getElementById('lepEL'),
    lepTotal: document.getElementById('lepTotal'),
    leaveTypeSelect: document.getElementById('leaveTypeSelect'),
    leaveDaysInput: document.getElementById('leaveDaysInput'),
    leaveDateFrom: document.getElementById('leaveDateFrom'),
    leaveDateTo: document.getElementById('leaveDateTo'),
    leaveReasonInput: document.getElementById('leaveReasonInput'),
    leaveAuditTbody: document.getElementById('leaveAuditTbody'),

    // Tab 6: Backup & Reports
    btnExportFullCSV: document.getElementById('btnExportFullCSV'),
    btnBackupJSON: document.getElementById('btnBackupJSON'),
    btnImportJSON: document.getElementById('btnImportJSON'),
    btnPrintOfficialReport: document.getElementById('btnPrintOfficialReport'),
    btnResetToDefaults: document.getElementById('btnResetToDefaults'),

    // Modals
    modalDossier: document.getElementById('modalDossier'),
    btnCloseDossier: document.getElementById('btnCloseDossier'),
    dosAvatar: document.getElementById('dosAvatar'),
    dosName: document.getElementById('dosName'),
    dosRoleDept: document.getElementById('dosRoleDept'),
    dosIdTag: document.getElementById('dosIdTag'),
    dosJoinedTag: document.getElementById('dosJoinedTag'),
    dosMonthsTag: document.getElementById('dosMonthsTag'),
    dosStatusTag: document.getElementById('dosStatusTag'),
    dosFormulaText: document.getElementById('dosFormulaText'),
    dosSLRem: document.getElementById('dosSLRem'),
    dosSLDetail: document.getElementById('dosSLDetail'),
    dosCLRem: document.getElementById('dosCLRem'),
    dosCLDetail: document.getElementById('dosCLDetail'),
    dosELRem: document.getElementById('dosELRem'),
    dosELDetail: document.getElementById('dosELDetail'),
    dosTotalRem: document.getElementById('dosTotalRem'),
    dosTotalDetail: document.getElementById('dosTotalDetail'),
    btnDossierApplyLeave: document.getElementById('btnDossierApplyLeave'),
    btnDossierPrintSlip: document.getElementById('btnDossierPrintSlip'),

    modalEmployeeForm: document.getElementById('modalEmployeeForm'),
    btnCloseEmpModal: document.getElementById('btnCloseEmpModal'),
    btnCancelEmpForm: document.getElementById('btnCancelEmpForm'),
    lblEmpModalTitle: document.getElementById('lblEmpModalTitle'),
    employeeForm: document.getElementById('employeeForm'),
    formEmpEditMode: document.getElementById('formEmpEditMode'),
    formEmpId: document.getElementById('formEmpId'),
    formEmpName: document.getElementById('formEmpName'),
    formEmpDept: document.getElementById('formEmpDept'),
    formEmpDesig: document.getElementById('formEmpDesig'),
    formEmpJoiningDate: document.getElementById('formEmpJoiningDate'),
    formEmpMonths: document.getElementById('formEmpMonths'),
    previewEmpSL: document.getElementById('previewEmpSL'),
    previewEmpCL: document.getElementById('previewEmpCL'),
    previewEmpEL: document.getElementById('previewEmpEL'),
    previewEmpTotal: document.getElementById('previewEmpTotal'),
    deptDataList: document.getElementById('deptDataList'),

    toastContainer: document.getElementById('toastContainer')
  };

  // =========================================================================
  // Initialization & Data Loading
  // =========================================================================
  async function initApp() {
    setupTitlebarClock();
    setupWindowControls();
    setupNavigation();
    setupEventListeners();

    await loadData();
    populateDepartmentDropdowns();
    renderAllViews();
    setupProRataSimulator();
  }

  async function loadData() {
    let loaded = null;

    // 1. Try Electron IPC
    if (window.electronAPI && typeof window.electronAPI.loadData === 'function') {
      try {
        const ipcData = await window.electronAPI.loadData();
        if (ipcData && Array.isArray(ipcData) && ipcData.length > 0) {
          loaded = { employees: ipcData };
        }
      } catch (err) {
        console.warn('IPC load failed, trying localStorage:', err);
      }
    }

    // 2. Try localStorage
    if (!loaded) {
      try {
        const local = localStorage.getItem('dots_furniture_data');
        if (local) {
          loaded = JSON.parse(local);
        }
      } catch (e) {
        console.warn('LocalStorage load failed:', e);
      }
    }

    // 3. Fallback to SEED_DATA
    if (!loaded && window.SEED_DATA) {
      loaded = window.SEED_DATA;
    }

    if (loaded && loaded.employees) {
      state.employees = JSON.parse(JSON.stringify(loaded.employees));
      if (loaded.metadata) {
        state.metadata = Object.assign(state.metadata, loaded.metadata);
      }
      if (loaded.leaveAuditLog) {
        state.leaveAuditLog = loaded.leaveAuditLog;
      }
    }

    updatePolicyDisplay();
  }

  async function persistData() {
    const payload = {
      employees: state.employees,
      metadata: state.metadata,
      leaveAuditLog: state.leaveAuditLog
    };

    try {
      localStorage.setItem('dots_furniture_data', JSON.stringify(payload));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }

    if (window.electronAPI && typeof window.electronAPI.saveData === 'function') {
      try {
        await window.electronAPI.saveData(state.employees);
      } catch (err) {
        console.warn('IPC save failed:', err);
      }
    }
  }

  // =========================================================================
  // Pro-Rata Math Engine
  // =========================================================================
  function calculateProRata(monthsActive, policy = state.metadata.annualPolicy) {
    const months = Math.min(Math.max(parseInt(monthsActive, 10) || 12, 1), 12);
    const sl = parseFloat(((months / 12) * policy.sickLeave).toFixed(1));
    const cl = parseFloat(((months / 12) * policy.casualLeave).toFixed(1));
    const el = parseFloat(((months / 12) * policy.earnedLeave).toFixed(1));
    const total = parseFloat((sl + cl + el).toFixed(1));
    return { sl, cl, el, total };
  }

  function calculateActiveMonthsFromJoiningDate(dateStr) {
    if (!dateStr) return 12;
    const parts = dateStr.trim().split(/[/.-]/);
    if (parts.length < 3) return 12;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    const trackingYear = state.metadata.trackingYear || 2026;

    if (year < trackingYear) {
      return 12;
    } else if (year === trackingYear) {
      if (month >= 1 && month <= 12) {
        // e.g. joined in Jan (1) -> 12 active months
        // Feb (2) -> 11 active months
        // May (5) -> 8 active months
        // Sept (9) -> 4 active months
        // Oct (10) -> 3 active months
        return Math.max(1, 13 - month);
      }
    }
    return 12;
  }

  // =========================================================================
  // Navigation & Tab Switching
  // =========================================================================
  function setupNavigation() {
    dom.navItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetTab = item.getAttribute('data-tab');
        if (!targetTab) return;
        switchTab(targetTab);
      });
    });

    if (dom.btnViewAllDepts) {
      dom.btnViewAllDepts.addEventListener('click', () => {
        switchTab('view-departments');
      });
    }

    if (dom.btnGoToFullDirectory) {
      dom.btnGoToFullDirectory.addEventListener('click', () => {
        switchTab('view-employees');
      });
    }
  }

  function switchTab(tabId) {
    state.activeTab = tabId;

    dom.navItems.forEach(item => {
      if (item.getAttribute('data-tab') === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    dom.tabViews.forEach(view => {
      if (view.id === tabId) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Update Header Titles
    const titles = {
      'view-overview': { title: 'Executive Overview', sub: 'Real-time leave balance tracking & pro-rata employee records' },
      'view-employees': { title: 'Employee Directory', sub: 'Master workforce database with pro-rated leave allocations' },
      'view-prorata': { title: 'Pro-Rata Engine', sub: 'Mathematical leave allocation simulator & policy configurations' },
      'view-departments': { title: 'Workshop & Departments', sub: 'Workforce distribution, craft categories & utilization' },
      'view-leaves': { title: 'Leave Management', sub: 'Record approved leaves and audit transaction activity' },
      'view-settings': { title: 'Backup & Reports', sub: 'Export data, print executive slips, and native file operations' }
    };

    if (titles[tabId]) {
      dom.pageTitleText.textContent = titles[tabId].title;
      dom.pageMainSubtitle.textContent = titles[tabId].sub;
    }

    if (tabId === 'view-employees') {
      renderEmployeeTable();
    } else if (tabId === 'view-overview') {
      renderOverviewTab();
    } else if (tabId === 'view-departments') {
      renderDepartmentsTab();
    } else if (tabId === 'view-leaves') {
      populateLeaveEmployeeDropdown();
      renderLeaveAuditLog();
    }
  }

  // =========================================================================
  // Title Bar & Native Window Controls
  // =========================================================================
  function setupTitlebarClock() {
    function updateClock() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedHours = String(hours).padStart(2, '0');

      if (dom.titlebarClock) {
        dom.titlebarClock.textContent = `${year}-${month}-${day}  ${formattedHours}:${minutes} ${ampm}`;
      }
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  function setupWindowControls() {
    if (window.electronAPI) {
      if (dom.btnWindowMinimize) {
        dom.btnWindowMinimize.addEventListener('click', () => {
          window.electronAPI.minimize();
        });
      }
      if (dom.btnWindowMaximize) {
        dom.btnWindowMaximize.addEventListener('click', () => {
          window.electronAPI.maximizeToggle();
        });
      }
      if (dom.btnWindowClose) {
        dom.btnWindowClose.addEventListener('click', () => {
          window.electronAPI.close();
        });
      }

      window.electronAPI.onMaximizedState && window.electronAPI.onMaximizedState((isMax) => {
        if (dom.btnWindowMaximize) {
          dom.btnWindowMaximize.title = isMax ? 'Restore' : 'Maximize';
        }
      });
    }
  }

  // =========================================================================
  // Render: All Views
  // =========================================================================
  function renderAllViews() {
    updateBadgesAndPolicy();
    renderOverviewTab();
    renderEmployeeTable();
    renderDepartmentsTab();
    renderMatrixTable();
    renderLeaveAuditLog();
  }

  function updatePolicyDisplay() {
    const policy = state.metadata.annualPolicy;
    if (dom.sidebarPolicySL) dom.sidebarPolicySL.textContent = policy.sickLeave.toFixed(1);
    if (dom.sidebarPolicyCL) dom.sidebarPolicyCL.textContent = policy.casualLeave.toFixed(1);
    if (dom.sidebarPolicyEL) dom.sidebarPolicyEL.textContent = policy.earnedLeave.toFixed(1);
    if (dom.policyWidgetYear) dom.policyWidgetYear.textContent = state.metadata.trackingYear || 2026;

    if (dom.policyYearInput) dom.policyYearInput.value = state.metadata.trackingYear || 2026;
    if (dom.policySLInput) dom.policySLInput.value = policy.sickLeave;
    if (dom.policyCLInput) dom.policyCLInput.value = policy.casualLeave;
    if (dom.policyELInput) dom.policyELInput.value = policy.earnedLeave;
    if (dom.policyTotalDisplay) {
      const tot = (policy.sickLeave + policy.casualLeave + policy.earnedLeave).toFixed(1);
      dom.policyTotalDisplay.textContent = `${tot} Days`;
    }
    if (dom.donutTotalDays) {
      dom.donutTotalDays.textContent = (policy.sickLeave + policy.casualLeave + policy.earnedLeave).toFixed(1);
    }
  }

  function updateBadgesAndPolicy() {
    if (dom.navBadgeEmployeeCount) {
      dom.navBadgeEmployeeCount.textContent = state.employees.length;
    }

    const uniqueDepts = new Set(state.employees.map(e => e.department));
    if (dom.navBadgeDeptCount) {
      dom.navBadgeDeptCount.textContent = uniqueDepts.size;
    }
  }

  // =========================================================================
  // TAB 1: Executive Overview Render
  // =========================================================================
  function renderOverviewTab() {
    const totalEmp = state.employees.length;
    let totalAlloc = 0;
    let totalUsed = 0;
    let totalRem = 0;
    let factoryCount = 0;

    const deptCounts = {};
    const monthsCounts = {};

    state.employees.forEach(emp => {
      totalAlloc += emp.allocation.total || 0;
      totalUsed += emp.used.total || 0;
      totalRem += emp.remaining.total || 0;

      deptCounts[emp.department] = (deptCounts[emp.department] || 0) + 1;
      monthsCounts[emp.monthsActive] = (monthsCounts[emp.monthsActive] || 0) + 1;

      // Factory Floor Categories
      const d = (emp.department || '').toLowerCase();
      if (d.includes('wood') || d.includes('metal') || d.includes('panel') || d.includes('lacquer') || d.includes('c&s') || d.includes('packing')) {
        factoryCount++;
      }
    });

    if (dom.kpiTotalEmployees) dom.kpiTotalEmployees.textContent = totalEmp;
    if (dom.kpiTotalAllocated) dom.kpiTotalAllocated.textContent = totalAlloc.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    if (dom.kpiTotalUsed) dom.kpiTotalUsed.textContent = totalUsed.toFixed(1);
    if (dom.kpiTotalRemaining) dom.kpiTotalRemaining.textContent = totalRem.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    if (dom.kpiFactoryCount) dom.kpiFactoryCount.textContent = factoryCount;

    const utilRate = totalAlloc > 0 ? ((totalUsed / totalAlloc) * 100).toFixed(2) : '0.00';
    if (dom.kpiUtilizationRate) dom.kpiUtilizationRate.textContent = `${utilRate}% Utilization Rate`;

    // Render Department Bar List (Top 8 Departments)
    const sortedDepts = Object.entries(deptCounts).sort((a, b) => b[1] - a[1]);
    const maxDeptCount = sortedDepts.length > 0 ? sortedDepts[0][1] : 1;

    let barHtml = '';
    sortedDepts.slice(0, 8).forEach(([dept, count]) => {
      const pct = Math.round((count / maxDeptCount) * 100);
      const totalPct = Math.round((count / totalEmp) * 100);
      const color = getDeptColor(dept);

      barHtml += `
        <div class="dept-bar-item" style="cursor: pointer;" onclick="window.filterByDepartment('${escapeHtml(dept)}')">
          <div class="dept-bar-labels">
            <span class="dept-bar-name">${escapeHtml(dept)}</span>
            <span class="dept-bar-count">${count} Staff (${totalPct}%)</span>
          </div>
          <div class="dept-bar-track">
            <div class="dept-bar-fill" style="width: ${pct}%; background-color: ${color};"></div>
          </div>
        </div>
      `;
    });
    if (dom.deptBarsContainer) dom.deptBarsContainer.innerHTML = barHtml;

    // Render Months Active Pill Grid
    let monthsHtml = '';
    const sortedMonths = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3];
    sortedMonths.forEach(m => {
      const count = monthsCounts[m] || 0;
      const proRata = calculateProRata(m);
      monthsHtml += `
        <div class="month-stat-box" style="cursor: pointer;" onclick="window.filterByMonths(${m})">
          <div class="msb-months">${m} Months</div>
          <div class="msb-count">${count}</div>
          <div class="msb-leaves">${proRata.total} Total Leaves</div>
        </div>
      `;
    });
    if (dom.monthsPillGrid) dom.monthsPillGrid.innerHTML = monthsHtml;

    // Render 2026 New Hires Preview (Employees with active months < 12)
    const newHires = state.employees.filter(e => e.monthsActive < 12).slice(0, 8);
    let newHiresHtml = '';
    newHires.forEach(emp => {
      newHiresHtml += `
        <tr style="cursor: pointer;" onclick="window.openEmployeeDossier('${emp.id}')">
          <td class="col-empid">${escapeHtml(emp.id)}</td>
          <td>
            <div class="employee-cell">
              <div class="emp-avatar" style="background-color: ${emp.avatarColor};">${getInitials(emp.name)}</div>
              <span class="emp-name-text">${escapeHtml(emp.name)}</span>
            </div>
          </td>
          <td><span class="dept-badge">${escapeHtml(emp.department)}</span></td>
          <td>${escapeHtml(emp.designation)}</td>
          <td>${escapeHtml(emp.joiningDate)}</td>
          <td><span class="tenure-pill">${emp.monthsActive} mo</span></td>
          <td class="leave-num">${emp.allocation.sl.toFixed(1)}</td>
          <td class="leave-num">${emp.allocation.cl.toFixed(1)}</td>
          <td class="leave-num">${emp.allocation.el.toFixed(1)}</td>
          <td class="leave-num" style="font-weight: 700; color: #fbbf24;">${emp.allocation.total.toFixed(1)}</td>
          <td><span class="status-badge status-ok">${escapeHtml(emp.status || 'OK')}</span></td>
        </tr>
      `;
    });
    if (dom.recentHiresTbody) dom.recentHiresTbody.innerHTML = newHiresHtml;
  }

  // =========================================================================
  // TAB 2: Employee Directory & Filter Engine
  // =========================================================================
  function populateDepartmentDropdowns() {
    const depts = Array.from(new Set(state.employees.map(e => e.department))).sort();

    // Filter dropdown in directory
    let filterOptions = '<option value="">All Departments (' + depts.length + ')</option>';
    let datalistOptions = '';

    depts.forEach(d => {
      filterOptions += `<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`;
      datalistOptions += `<option value="${escapeHtml(d)}">`;
    });

    if (dom.filterDept) dom.filterDept.innerHTML = filterOptions;
    if (dom.deptDataList) dom.deptDataList.innerHTML = datalistOptions;
  }

  function getFilteredEmployees() {
    let list = state.employees.slice();

    // 1. Search Query
    if (state.filters.search) {
      const q = state.filters.search.toLowerCase();
      list = list.filter(emp => {
        return (
          emp.id.toLowerCase().includes(q) ||
          emp.name.toLowerCase().includes(q) ||
          emp.department.toLowerCase().includes(q) ||
          (emp.rawDepartment && emp.rawDepartment.toLowerCase().includes(q)) ||
          emp.designation.toLowerCase().includes(q)
        );
      });
    }

    // 2. Department
    if (state.filters.department) {
      list = list.filter(emp => emp.department === state.filters.department);
    }

    // 3. Months Active
    if (state.filters.monthsActive) {
      const m = parseInt(state.filters.monthsActive, 10);
      list = list.filter(emp => emp.monthsActive === m);
    }

    // 4. Leave Status
    if (state.filters.leaveStatus === 'used_gt_0') {
      list = list.filter(emp => emp.used.total > 0);
    } else if (state.filters.leaveStatus === 'used_eq_0') {
      list = list.filter(emp => emp.used.total === 0);
    } else if (state.filters.leaveStatus === 'lwp') {
      list = list.filter(emp => emp.used.lwp > 0);
    }

    // 5. Sorting
    const sortBy = state.filters.sortBy;
    list.sort((a, b) => {
      switch (sortBy) {
        case 'id_asc':
          return parseInt(a.id, 10) - parseInt(b.id, 10);
        case 'id_desc':
          return parseInt(b.id, 10) - parseInt(a.id, 10);
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'dept_asc':
          return a.department.localeCompare(b.department);
        case 'months_desc':
          return b.monthsActive - a.monthsActive;
        case 'used_desc':
          return b.used.total - a.used.total;
        case 'rem_asc':
          return a.remaining.total - b.remaining.total;
        default:
          return parseInt(a.id, 10) - parseInt(b.id, 10);
      }
    });

    return list;
  }

  function renderEmployeeTable() {
    const filtered = getFilteredEmployees();
    state.pagination.totalRows = filtered.length;

    let pageSize = state.pagination.pageSize;
    if (pageSize === 'all') {
      pageSize = filtered.length || 1;
    } else {
      pageSize = parseInt(pageSize, 10);
    }

    state.pagination.totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    if (state.pagination.page > state.pagination.totalPages) {
      state.pagination.page = state.pagination.totalPages;
    }

    const startIndex = (state.pagination.page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filtered.length);
    const paginatedList = filtered.slice(startIndex, endIndex);

    // Update Showing Labels
    if (dom.lblShowingCount) dom.lblShowingCount.textContent = paginatedList.length;
    if (dom.lblTotalCount) dom.lblTotalCount.textContent = filtered.length;

    if (dom.lblFilterNotice) {
      const activeFilters = [];
      if (state.filters.search) activeFilters.push(`Search: "${state.filters.search}"`);
      if (state.filters.department) activeFilters.push(`Dept: ${state.filters.department}`);
      if (state.filters.monthsActive) activeFilters.push(`${state.filters.monthsActive} Months`);
      if (state.filters.leaveStatus) activeFilters.push(`Status: ${state.filters.leaveStatus}`);

      dom.lblFilterNotice.textContent = activeFilters.length > 0 ? `(${activeFilters.join(', ')})` : '';
    }

    // Render Table Rows
    let rowsHtml = '';
    if (paginatedList.length === 0) {
      rowsHtml = `
        <tr>
          <td colspan="20" style="text-align: center; padding: 48px 16px; color: var(--text-dim);">
            <div style="font-size: 14px; font-weight: 600; color: #94a3b8; margin-bottom: 6px;">No Employees Found</div>
            <div style="font-size: 12px;">Try clearing your search query or reset filter settings.</div>
          </td>
        </tr>
      `;
    } else {
      paginatedList.forEach(emp => {
        const hasUsedLeaves = emp.used.total > 0;
        const usedClass = hasUsedLeaves ? 'num-highlight-used' : '';

        rowsHtml += `
          <tr>
            <td class="col-empid">${escapeHtml(emp.id)}</td>
            <td>
              <div class="employee-cell">
                <div class="emp-avatar" style="background-color: ${emp.avatarColor};">${getInitials(emp.name)}</div>
                <span class="emp-name-text">${escapeHtml(emp.name)}</span>
              </div>
            </td>
            <td><span class="dept-badge">${escapeHtml(emp.department)}</span></td>
            <td>${escapeHtml(emp.designation)}</td>
            <td>${escapeHtml(emp.joiningDate)}</td>
            <td><span class="tenure-pill">${emp.monthsActive} mo</span></td>

            <!-- Allocation -->
            <td class="leave-num th-group-alloc">${emp.allocation.sl.toFixed(1)}</td>
            <td class="leave-num th-group-alloc">${emp.allocation.cl.toFixed(1)}</td>
            <td class="leave-num th-group-alloc">${emp.allocation.el.toFixed(1)}</td>
            <td class="leave-num th-group-alloc" style="font-weight: 700; color: #fbbf24;">${emp.allocation.total.toFixed(1)}</td>

            <!-- Usage -->
            <td class="leave-num th-group-used ${emp.used.sl > 0 ? 'num-highlight-used' : ''}">${emp.used.sl}</td>
            <td class="leave-num th-group-used ${emp.used.cl > 0 ? 'num-highlight-used' : ''}">${emp.used.cl}</td>
            <td class="leave-num th-group-used ${emp.used.el > 0 ? 'num-highlight-used' : ''}">${emp.used.el}</td>
            <td class="leave-num th-group-used ${emp.used.lwp > 0 ? 'num-highlight-used' : ''}">${emp.used.lwp}</td>
            <td class="leave-num th-group-used ${usedClass}" style="font-weight: 700;">${emp.used.total}</td>

            <!-- Remaining -->
            <td class="leave-num th-group-rem">${emp.remaining.sl.toFixed(1)}</td>
            <td class="leave-num th-group-rem">${emp.remaining.cl.toFixed(1)}</td>
            <td class="leave-num th-group-rem">${emp.remaining.el.toFixed(1)}</td>
            <td class="leave-num th-group-rem num-highlight-rem">${emp.remaining.total.toFixed(1)}</td>

            <td><span class="status-badge status-ok">${escapeHtml(emp.status || 'OK')}</span></td>
            
            <td>
              <div class="table-actions">
                <button class="action-icon-btn" title="View Dossier" onclick="window.openEmployeeDossier('${emp.id}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <button class="action-icon-btn" title="Record Leave" onclick="window.openQuickApplyLeave('${emp.id}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <button class="action-icon-btn" title="Edit Employee" onclick="window.openEditEmployeeModal('${emp.id}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <button class="action-icon-btn btn-delete" title="Delete Record" onclick="window.deleteEmployee('${emp.id}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        `;
      });
    }

    if (dom.masterEmployeeTbody) dom.masterEmployeeTbody.innerHTML = rowsHtml;
    renderPaginationControls();
  }

  function renderPaginationControls() {
    if (!dom.pageNumbersContainer) return;

    const current = state.pagination.page;
    const total = state.pagination.totalPages;

    if (dom.btnPagePrev) dom.btnPagePrev.disabled = current <= 1;
    if (dom.btnPageNext) dom.btnPageNext.disabled = current >= total;

    let html = '';
    const maxButtons = 5;
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + maxButtons - 1);
    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let p = start; p <= end; p++) {
      html += `
        <button class="page-btn ${p === current ? 'active' : ''}" onclick="window.changePage(${p})">${p}</button>
      `;
    }

    dom.pageNumbersContainer.innerHTML = html;
  }

  // =========================================================================
  // TAB 3: Pro-Rata Simulator & Matrix
  // =========================================================================
  function setupProRataSimulator() {
    function updateSimulator() {
      const months = parseInt(dom.simMonthsSlider.value, 10);
      dom.simMonthsValue.textContent = `${months} mo`;

      const policy = state.metadata.annualPolicy;
      const proRata = calculateProRata(months, policy);

      dom.simResultSL.textContent = proRata.sl.toFixed(1);
      dom.simResultCL.textContent = proRata.cl.toFixed(1);
      dom.simResultEL.textContent = proRata.el.toFixed(1);
      dom.simResultTotal.textContent = proRata.total.toFixed(1);

      dom.simCalcSL.textContent = `(${months} / 12) × ${policy.sickLeave} = ${proRata.sl.toFixed(1)}`;
      dom.simCalcCL.textContent = `(${months} / 12) × ${policy.casualLeave} = ${proRata.cl.toFixed(1)}`;
      dom.simCalcEL.textContent = `(${months} / 12) × ${policy.earnedLeave} = ${proRata.el.toFixed(1)}`;
    }

    if (dom.simMonthsSlider) {
      dom.simMonthsSlider.addEventListener('input', updateSimulator);
    }

    if (dom.simJoinDateInput) {
      dom.simJoinDateInput.addEventListener('change', () => {
        const dateVal = dom.simJoinDateInput.value; // YYYY-MM-DD
        if (dateVal) {
          const parts = dateVal.split('-');
          const m = parseInt(parts[1], 10);
          const activeMonths = Math.max(1, 13 - m);
          dom.simMonthsSlider.value = activeMonths;
          updateSimulator();
        }
      });
    }

    updateSimulator();
  }

  function renderMatrixTable() {
    if (!dom.matrixTbody) return;

    const monthsCounts = {};
    state.employees.forEach(emp => {
      monthsCounts[emp.monthsActive] = (monthsCounts[emp.monthsActive] || 0) + 1;
    });

    const monthNames = [
      '', 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let html = '';
    for (let m = 12; m >= 1; m--) {
      const proRata = calculateProRata(m);
      const joinedMonthNum = 13 - m;
      const windowStr = m === 12
        ? 'Joined prior to 2026 or during Jan 2026'
        : `Joined during ${monthNames[joinedMonthNum]} 2026`;
      const staffCount = monthsCounts[m] || 0;

      html += `
        <tr>
          <td><strong style="color: #fbbf24;">${m} Months</strong></td>
          <td>${windowStr}</td>
          <td class="leave-num">${proRata.sl.toFixed(1)} Days</td>
          <td class="leave-num">${proRata.cl.toFixed(1)} Days</td>
          <td class="leave-num">${proRata.el.toFixed(1)} Days</td>
          <td class="leave-num" style="font-weight: 700; color: #10b981;">${proRata.total.toFixed(1)} Days</td>
          <td>
            <span class="tenure-pill" style="cursor: pointer;" onclick="window.filterByMonths(${m})">
              ${staffCount} Employees
            </span>
          </td>
        </tr>
      `;
    }

    dom.matrixTbody.innerHTML = html;
  }

  // =========================================================================
  // TAB 4: Workshop & Department Directory
  // =========================================================================
  function renderDepartmentsTab() {
    if (!dom.deptCardsGrid) return;

    const deptMap = {};

    state.employees.forEach(emp => {
      const dept = emp.department;
      if (!deptMap[dept]) {
        deptMap[dept] = {
          name: dept,
          color: emp.avatarColor || getDeptColor(dept),
          count: 0,
          technicians: 0,
          helpers: 0,
          executives: 0,
          supervisors: 0,
          totalAlloc: 0,
          totalUsed: 0
        };
      }

      const d = deptMap[dept];
      d.count++;
      d.totalAlloc += emp.allocation.total;
      d.totalUsed += emp.used.total;

      const des = (emp.designation || '').toLowerCase();
      if (des.includes('tech')) d.technicians++;
      else if (des.includes('help')) d.helpers++;
      else if (des.includes('super')) d.supervisors++;
      else if (des.includes('exec') || des.includes('manag') || des.includes('md') || des.includes('dir')) d.executives++;
    });

    const sorted = Object.values(deptMap).sort((a, b) => b.count - a.count);

    let html = '';
    sorted.forEach(d => {
      const util = d.totalAlloc > 0 ? ((d.totalUsed / d.totalAlloc) * 100).toFixed(1) : '0.0';
      const rem = (d.totalAlloc - d.totalUsed).toFixed(1);

      html += `
        <div class="dept-summary-card">
          <div class="dept-card-top">
            <div>
              <div class="dept-card-name">${escapeHtml(d.name)}</div>
              <span style="font-size: 11px; color: ${d.color}; font-weight: 600;">● Active Unit</span>
            </div>
            <div class="dept-card-headcount">${d.count}</div>
          </div>

          <div class="dept-card-meta">
            <div>Allocation: <strong>${d.totalAlloc.toFixed(1)} Days</strong></div>
            <div>Leaves Used: <strong style="color: ${d.totalUsed > 0 ? '#f87171' : '#cbd5e1'};">${d.totalUsed.toFixed(1)} Days</strong></div>
            <div>Balance: <strong style="color: #34d399;">${rem} Days</strong> (${util}% used)</div>
          </div>

          <div class="dept-card-footer">
            <span style="font-size: 11px; color: var(--text-dim);">
              ${d.supervisors ? `${d.supervisors} Sup • ` : ''}${d.technicians ? `${d.technicians} Tech • ` : ''}${d.helpers ? `${d.helpers} Help` : ''}
            </span>
            <button class="btn btn-sm btn-secondary" onclick="window.filterByDepartment('${escapeHtml(d.name)}')">
              View Staff
            </button>
          </div>
        </div>
      `;
    });

    dom.deptCardsGrid.innerHTML = html;
  }

  // =========================================================================
  // TAB 5: Leave Management & Logging
  // =========================================================================
  function populateLeaveEmployeeDropdown() {
    if (!dom.leaveEmpSelect) return;

    let opts = '<option value="">-- Choose Employee --</option>';
    const sorted = state.employees.slice().sort((a, b) => a.name.localeCompare(b.name));

    sorted.forEach(emp => {
      opts += `<option value="${emp.id}">${escapeHtml(emp.name)} (ID: ${emp.id} - ${escapeHtml(emp.department)})</option>`;
    });

    dom.leaveEmpSelect.innerHTML = opts;
  }

  function renderLeaveAuditLog() {
    if (!dom.leaveAuditTbody) return;

    let html = '';
    if (state.leaveAuditLog.length === 0) {
      html = `
        <tr>
          <td colspan="7" style="text-align: center; color: var(--text-dim); padding: 24px;">
            No leave records logged yet.
          </td>
        </tr>
      `;
    } else {
      state.leaveAuditLog.forEach(log => {
        html += `
          <tr>
            <td>${escapeHtml(log.date)}</td>
            <td class="col-empid">${escapeHtml(log.empId)}</td>
            <td style="font-weight: 600;">${escapeHtml(log.name)}</td>
            <td><span class="dept-badge">${escapeHtml(log.type)}</span></td>
            <td><strong>${log.days} d</strong></td>
            <td style="color: var(--text-muted); font-size: 11px;">${escapeHtml(log.reason || 'N/A')}</td>
            <td>
              <button 
                type="button" 
                class="btn btn-outline" 
                style="padding: 2px 8px; font-size: 10px; color: #f43f5e; border-color: rgba(244,63,94,0.3); cursor: pointer;"
                onclick="window.deleteLeaveRecord('${escapeHtml(log.id)}')"
                title="Remove leave and restore employee balance"
              >
                Remove
              </button>
            </td>
          </tr>
        `;
      });
    }

    dom.leaveAuditTbody.innerHTML = html;
  }

  window.deleteLeaveRecord = async function (logId) {
    const record = state.leaveAuditLog.find(r => r.id === logId);
    if (!record) return;

    if (!confirm(`Are you sure you want to remove this leave record and restore ${record.days} day(s) to ${record.name}?`)) {
      return;
    }

    let cat = 'sl';
    const t = (record.type || '').toLowerCase();
    if (t.includes('sick') || t.includes('(sl)')) cat = 'sl';
    else if (t.includes('casual') || t.includes('(cl)')) cat = 'cl';
    else if (t.includes('earned') || t.includes('(el)')) cat = 'el';
    else if (t.includes('without pay') || t.includes('(lwp)')) cat = 'lwp';

    const emp = state.employees.find(e => e.id === record.empId);
    if (emp) {
      const days = Number(record.days) || 0;
      if (cat === 'sl') emp.used.sl = Math.max(0, parseFloat((emp.used.sl - days).toFixed(1)));
      else if (cat === 'cl') emp.used.cl = Math.max(0, parseFloat((emp.used.cl - days).toFixed(1)));
      else if (cat === 'el') emp.used.el = Math.max(0, parseFloat((emp.used.el - days).toFixed(1)));
      else if (cat === 'lwp') emp.used.lwp = Math.max(0, parseFloat((emp.used.lwp - days).toFixed(1)));

      emp.used.total = parseFloat((emp.used.sl + emp.used.cl + emp.used.el).toFixed(1));
      emp.remaining.sl = parseFloat(Math.min(emp.allocation.sl, Math.max(0, emp.allocation.sl - emp.used.sl)).toFixed(1));
      emp.remaining.cl = parseFloat(Math.min(emp.allocation.cl, Math.max(0, emp.allocation.cl - emp.used.cl)).toFixed(1));
      emp.remaining.el = parseFloat(Math.min(emp.allocation.el, Math.max(0, emp.allocation.el - emp.used.el)).toFixed(1));
      emp.remaining.total = parseFloat(Math.max(0, emp.allocation.total - emp.used.total).toFixed(1));
    }

    state.leaveAuditLog = state.leaveAuditLog.filter(r => r.id !== logId);
    await persistData();
    showToast(`Removed leave and restored ${record.days} day(s) to ${record.name}!`, 'success');
    renderAllViews();
  };

  // =========================================================================
  // Modal: Employee Dossier & Slip Printing
  // =========================================================================
  window.openEmployeeDossier = function (empId) {
    const emp = state.employees.find(e => e.id === empId);
    if (!emp) return;

    state.selectedEmployeeForDossier = emp;

    dom.dosAvatar.textContent = getInitials(emp.name);
    dom.dosAvatar.style.backgroundColor = emp.avatarColor || '#3b82f6';
    dom.dosName.textContent = emp.name;
    dom.dosRoleDept.textContent = `${emp.designation} • ${emp.department}`;
    dom.dosIdTag.textContent = `ID: ${emp.id}`;
    dom.dosJoinedTag.textContent = `Joined: ${emp.joiningDate}`;
    dom.dosMonthsTag.textContent = `${emp.monthsActive} Months Active`;
    dom.dosStatusTag.textContent = `Status: ${emp.status || 'OK'}`;

    dom.dosFormulaText.textContent = emp.monthsActive === 12
      ? 'Tenure ≥ 12 Months: Full standard annual quota (14 Sick, 10 Casual, 6 Earned).'
      : `Pro-Rata active tenure: (${emp.monthsActive} / 12) × Annual policy quota.`;

    dom.dosSLRem.textContent = emp.remaining.sl.toFixed(1);
    dom.dosSLDetail.textContent = `Used: ${emp.used.sl} / Alloc: ${emp.allocation.sl.toFixed(1)}`;

    dom.dosCLRem.textContent = emp.remaining.cl.toFixed(1);
    dom.dosCLDetail.textContent = `Used: ${emp.used.cl} / Alloc: ${emp.allocation.cl.toFixed(1)}`;

    dom.dosELRem.textContent = emp.remaining.el.toFixed(1);
    dom.dosELDetail.textContent = `Used: ${emp.used.el} / Alloc: ${emp.allocation.el.toFixed(1)}`;

    dom.dosTotalRem.textContent = emp.remaining.total.toFixed(1);
    dom.dosTotalDetail.textContent = `Allocated: ${emp.allocation.total.toFixed(1)} Days`;

    dom.modalDossier.classList.add('open');
  };

  function closeDossierModal() {
    dom.modalDossier.classList.remove('open');
    state.selectedEmployeeForDossier = null;
  }

  // Print Employee Official Slip
  function printEmployeeLeaveSlip() {
    if (!state.selectedEmployeeForDossier) return;
    const emp = state.selectedEmployeeForDossier;

    const printWin = window.open('', '_blank', 'width=800,height=600');
    if (!printWin) {
      showToast('Please allow popups to print official slips.', 'error');
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>DOTS Furniture - Employee Leave Card (${emp.id})</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #111; }
          .header { text-align: center; border-bottom: 2px solid #222; padding-bottom: 15px; margin-bottom: 25px; }
          .header h1 { margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px; }
          .header h2 { margin: 5px 0 0; font-size: 14px; font-weight: normal; color: #555; }
          .profile-box { display: flex; justify-content: space-between; background: #f8fafc; border: 1px solid #cbd5e1; padding: 15px; border-radius: 6px; margin-bottom: 25px; }
          .profile-box div { line-height: 1.6; font-size: 13px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th, td { border: 1px solid #cbd5e1; padding: 10px 12px; font-size: 13px; text-align: left; }
          th { background: #f1f5f9; font-weight: 600; }
          .text-right { text-align: right; }
          .total-row { font-weight: bold; background: #f8fafc; }
          .signatures { display: flex; justify-content: space-between; margin-top: 60px; padding-top: 20px; }
          .sig-line { width: 200px; border-top: 1px solid #333; text-align: center; font-size: 12px; padding-top: 5px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>DOTS Furniture &amp; Décor Limited</h1>
          <h2>OFFICIAL EMPLOYEE LEAVE RECORD (AUTOMATED PRO-RATA ${state.metadata.trackingYear})</h2>
        </div>

        <div class="profile-box">
          <div>
            <strong>Employee Name:</strong> ${escapeHtml(emp.name)}<br>
            <strong>Employee ID:</strong> ${escapeHtml(emp.id)}<br>
            <strong>Department:</strong> ${escapeHtml(emp.department)}
          </div>
          <div>
            <strong>Designation:</strong> ${escapeHtml(emp.designation)}<br>
            <strong>Joining Date:</strong> ${escapeHtml(emp.joiningDate)}<br>
            <strong>Active Tenure:</strong> ${emp.monthsActive} Months in ${state.metadata.trackingYear}
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
              <td class="text-right" style="color: #047857;">${emp.remaining.total.toFixed(1)} Days</td>
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
  }

  // =========================================================================
  // Modal: Add / Edit Employee
  // =========================================================================
  window.openEditEmployeeModal = function (empId) {
    const emp = state.employees.find(e => e.id === empId);
    if (!emp) return;

    dom.formEmpEditMode.value = 'edit';
    dom.lblEmpModalTitle.textContent = 'Edit Employee Record';
    dom.formEmpId.value = emp.id;
    dom.formEmpId.readOnly = true;
    dom.formEmpName.value = emp.name;
    dom.formEmpDept.value = emp.department;
    dom.formEmpDesig.value = emp.designation;
    dom.formEmpJoiningDate.value = emp.joiningDate;
    dom.formEmpMonths.value = emp.monthsActive;

    updateEmpFormPreview();
    dom.modalEmployeeForm.classList.add('open');
  };

  function openCreateEmployeeModal() {
    dom.formEmpEditMode.value = 'create';
    dom.lblEmpModalTitle.textContent = 'Add New Employee';
    dom.employeeForm.reset();

    // Auto calculate next Emp ID
    const maxId = state.employees.reduce((max, e) => {
      const num = parseInt(e.id, 10);
      return !isNaN(num) && num > max ? num : max;
    }, 1215);

    dom.formEmpId.value = String(maxId + 1);
    dom.formEmpId.readOnly = false;
    dom.formEmpMonths.value = '12';
    dom.formEmpJoiningDate.value = '01/01/2026';

    updateEmpFormPreview();
    dom.modalEmployeeForm.classList.add('open');
  }

  function closeEmployeeModal() {
    dom.modalEmployeeForm.classList.remove('open');
  }

  function updateEmpFormPreview() {
    const months = parseInt(dom.formEmpMonths.value, 10) || 12;
    const proRata = calculateProRata(months);

    dom.previewEmpSL.textContent = proRata.sl.toFixed(1);
    dom.previewEmpCL.textContent = proRata.cl.toFixed(1);
    dom.previewEmpEL.textContent = proRata.el.toFixed(1);
    dom.previewEmpTotal.textContent = `${proRata.total.toFixed(1)} Days`;
  }

  async function handleEmployeeFormSubmit(e) {
    e.preventDefault();

    const mode = dom.formEmpEditMode.value;
    const id = dom.formEmpId.value.trim();
    const name = dom.formEmpName.value.trim();
    const dept = dom.formEmpDept.value.trim();
    const desig = dom.formEmpDesig.value.trim();
    const joiningDate = dom.formEmpJoiningDate.value.trim();
    const months = parseInt(dom.formEmpMonths.value, 10) || 12;

    if (!id || !name || !dept || !desig) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const proRata = calculateProRata(months);

    if (mode === 'create') {
      const existing = state.employees.find(x => x.id === id);
      if (existing) {
        showToast(`Employee ID ${id} already exists!`, 'error');
        return;
      }

      const newEmp = {
        id,
        name,
        rawDepartment: dept,
        department: dept,
        rawDesignation: desig,
        designation: desig,
        joiningDate,
        monthsActive: months,
        allocation: {
          sl: proRata.sl,
          cl: proRata.cl,
          el: proRata.el,
          total: proRata.total
        },
        used: { sl: 0, cl: 0, el: 0, lwp: 0, total: 0 },
        remaining: {
          sl: proRata.sl,
          cl: proRata.cl,
          el: proRata.el,
          total: proRata.total
        },
        status: 'OK',
        avatarColor: getDeptColor(dept)
      };

      state.employees.unshift(newEmp);
      showToast(`Employee ${name} (${id}) added successfully!`, 'success');
    } else {
      const emp = state.employees.find(x => x.id === id);
      if (!emp) return;

      emp.name = name;
      emp.department = dept;
      emp.designation = desig;
      emp.joiningDate = joiningDate;
      emp.monthsActive = months;

      // Update allocations
      emp.allocation = {
        sl: proRata.sl,
        cl: proRata.cl,
        el: proRata.el,
        total: proRata.total
      };

      // Recalculate remaining
      emp.remaining = {
        sl: parseFloat(Math.max(0, proRata.sl - emp.used.sl).toFixed(1)),
        cl: parseFloat(Math.max(0, proRata.cl - emp.used.cl).toFixed(1)),
        el: parseFloat(Math.max(0, proRata.el - emp.used.el).toFixed(1)),
        total: parseFloat(Math.max(0, proRata.total - emp.used.total).toFixed(1))
      };
      emp.avatarColor = getDeptColor(dept);

      showToast(`Employee ${name} updated successfully!`, 'success');
    }

    await persistData();
    closeEmployeeModal();
    populateDepartmentDropdowns();
    renderAllViews();
  }

  window.deleteEmployee = async function (empId) {
    const emp = state.employees.find(e => e.id === empId);
    if (!emp) return;

    if (!confirm(`Are you sure you want to delete ${emp.name} (ID: ${emp.id})?`)) {
      return;
    }

    state.employees = state.employees.filter(e => e.id !== empId);
    await persistData();
    showToast(`Removed employee ${emp.name}.`, 'success');
    populateDepartmentDropdowns();
    renderAllViews();
  };

  // =========================================================================
  // Quick Apply Leave Modal & Form
  // =========================================================================
  window.openQuickApplyLeave = function (empId) {
    switchTab('view-leaves');
    if (dom.leaveEmpSelect) {
      dom.leaveEmpSelect.value = empId;
      triggerLeaveEmpSelect();
    }
  };

  function triggerLeaveEmpSelect() {
    const empId = dom.leaveEmpSelect.value;
    if (!empId) {
      dom.leaveEmpPreview.style.display = 'none';
      return;
    }

    const emp = state.employees.find(e => e.id === empId);
    if (!emp) return;

    dom.lepName.textContent = emp.name;
    dom.lepDept.textContent = `${emp.designation} • ${emp.department}`;
    dom.lepSL.textContent = emp.remaining.sl.toFixed(1);
    dom.lepCL.textContent = emp.remaining.cl.toFixed(1);
    dom.lepEL.textContent = emp.remaining.el.toFixed(1);
    dom.lepTotal.textContent = `${emp.remaining.total.toFixed(1)} Days`;

    dom.leaveEmpPreview.style.display = 'block';
  }

  async function handleRecordLeaveSubmit(e) {
    e.preventDefault();

    const empId = dom.leaveEmpSelect.value;
    const type = dom.leaveTypeSelect.value;
    const days = parseFloat(dom.leaveDaysInput.value);
    const dateFrom = dom.leaveDateFrom.value;
    const dateTo = dom.leaveDateTo.value;
    const reason = dom.leaveReasonInput.value.trim();

    if (!empId || isNaN(days) || days <= 0 || !dateFrom) {
      showToast('Please provide valid leave details.', 'error');
      return;
    }

    const emp = state.employees.find(x => x.id === empId);
    if (!emp) return;

    // Check balances
    if (type === 'sl') {
      if (days > emp.remaining.sl) {
        if (!confirm(`Requested ${days} days exceeds available Sick Leave (${emp.remaining.sl} days). Continue anyway?`)) {
          return;
        }
      }
      emp.used.sl += days;
      emp.remaining.sl = parseFloat(Math.max(0, emp.remaining.sl - days).toFixed(1));
    } else if (type === 'cl') {
      if (days > emp.remaining.cl) {
        if (!confirm(`Requested ${days} days exceeds available Casual Leave (${emp.remaining.cl} days). Continue anyway?`)) {
          return;
        }
      }
      emp.used.cl += days;
      emp.remaining.cl = parseFloat(Math.max(0, emp.remaining.cl - days).toFixed(1));
    } else if (type === 'el') {
      if (days > emp.remaining.el) {
        if (!confirm(`Requested ${days} days exceeds available Earned Leave (${emp.remaining.el} days). Continue anyway?`)) {
          return;
        }
      }
      emp.used.el += days;
      emp.remaining.el = parseFloat(Math.max(0, emp.remaining.el - days).toFixed(1));
    } else if (type === 'lwp') {
      emp.used.lwp += days;
    }

    emp.used.total = emp.used.sl + emp.used.cl + emp.used.el;
    emp.remaining.total = parseFloat(Math.max(0, emp.allocation.total - emp.used.total).toFixed(1));

    // Audit log
    const typeNames = {
      sl: 'Sick Leave (SL)',
      cl: 'Casual Leave (CL)',
      el: 'Earned Leave (EL)',
      lwp: 'Leave Without Pay (LWP)'
    };

    const newLog = {
      id: 'LOG-' + Date.now(),
      date: dateFrom,
      empId: emp.id,
      name: emp.name,
      dept: emp.department,
      type: typeNames[type] || type,
      days: days,
      reason: reason
    };

    state.leaveAuditLog.unshift(newLog);

    await persistData();
    showToast(`Recorded ${days} days leave for ${emp.name}!`, 'success');
    dom.recordLeaveForm.reset();
    dom.leaveEmpPreview.style.display = 'none';

    renderAllViews();
  }

  // =========================================================================
  // Policy Settings & Full Recalculation
  // =========================================================================
  async function savePolicySettings() {
    const sl = parseFloat(dom.policySLInput.value) || 14.0;
    const cl = parseFloat(dom.policyCLInput.value) || 10.0;
    const el = parseFloat(dom.policyELInput.value) || 6.0;
    const yr = parseInt(dom.policyYearInput.value, 10) || 2026;

    state.metadata.trackingYear = yr;
    state.metadata.annualPolicy = {
      sickLeave: sl,
      casualLeave: cl,
      earnedLeave: el,
      totalAnnual: parseFloat((sl + cl + el).toFixed(1))
    };

    updatePolicyDisplay();
    await persistData();
    showToast('Company leave policy settings saved!', 'success');
    renderMatrixTable();
  }

  async function recalculateAllEmployeesProRata() {
    if (!confirm('Recalculate pro-rated leave quotas for all workforce records using current policy?')) {
      return;
    }

    const policy = state.metadata.annualPolicy;

    state.employees.forEach(emp => {
      const proRata = calculateProRata(emp.monthsActive, policy);
      emp.allocation = {
        sl: proRata.sl,
        cl: proRata.cl,
        el: proRata.el,
        total: proRata.total
      };

      emp.remaining = {
        sl: parseFloat(Math.max(0, proRata.sl - (emp.used.sl || 0)).toFixed(1)),
        cl: parseFloat(Math.max(0, proRata.cl - (emp.used.cl || 0)).toFixed(1)),
        el: parseFloat(Math.max(0, proRata.el - (emp.used.el || 0)).toFixed(1)),
        total: parseFloat(Math.max(0, proRata.total - (emp.used.total || 0)).toFixed(1))
      };
    });

    await persistData();
    showToast('Workforce pro-rata allocations recalculated successfully!', 'success');
    renderAllViews();
  }

  // =========================================================================
  // Export & Native File Operations
  // =========================================================================
  function generateCSV(list = state.employees) {
    const headers = [
      'Emp ID',
      'Employee Name',
      'Department',
      'Designation',
      'Joining Date',
      'Months Active',
      'S L',
      'C L',
      'E L',
      'Total',
      'SL Used',
      'CL Used',
      'EL Used',
      'LWP',
      'Total Used',
      'SL R',
      'CL R',
      'EL R',
      'Total R',
      'Status'
    ];

    const rows = [headers.join(',')];

    list.forEach(e => {
      const row = [
        e.id,
        `"${(e.name || '').replace(/"/g, '""')}"`,
        `"${(e.department || '').replace(/"/g, '""')}"`,
        `"${(e.designation || '').replace(/"/g, '""')}"`,
        e.joiningDate,
        e.monthsActive,
        e.allocation.sl.toFixed(1),
        e.allocation.cl.toFixed(1),
        e.allocation.el.toFixed(1),
        e.allocation.total.toFixed(1),
        e.used.sl,
        e.used.cl,
        e.used.el,
        e.used.lwp,
        e.used.total,
        e.remaining.sl.toFixed(1),
        e.remaining.cl.toFixed(1),
        e.remaining.el.toFixed(1),
        e.remaining.total.toFixed(1),
        e.status || 'OK'
      ];
      rows.push(row.join(','));
    });

    return rows.join('\r\n');
  }

  async function exportCSVData(isFilteredOnly = false) {
    const list = isFilteredOnly ? getFilteredEmployees() : state.employees;
    const csvContent = generateCSV(list);
    const filename = isFilteredOnly
      ? 'DOTS_Furniture_Leave_Filtered_2026.csv'
      : 'DOTS_Furniture_Leave_Tracker_2026.csv';

    if (window.electronAPI && typeof window.electronAPI.exportCSV === 'function') {
      const res = await window.electronAPI.exportCSV(csvContent, filename);
      if (res && res.success) {
        showToast(`Exported CSV to ${res.filePath}`, 'success');
        return;
      } else if (res && res.canceled) {
        return;
      }
    }

    // Browser Blob Fallback
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('CSV export downloaded successfully!', 'success');
  }

  async function exportJSONBackup() {
    const payload = {
      timestamp: new Date().toISOString(),
      metadata: state.metadata,
      employees: state.employees,
      leaveAuditLog: state.leaveAuditLog
    };

    if (window.electronAPI && typeof window.electronAPI.exportJSON === 'function') {
      const res = await window.electronAPI.exportJSON(payload, 'dots_furniture_backup_2026.json');
      if (res && res.success) {
        showToast('JSON backup saved successfully!', 'success');
        return;
      } else if (res && res.canceled) {
        return;
      }
    }

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dots_furniture_backup_2026.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('JSON backup downloaded!', 'success');
  }

  async function importJSONBackup() {
    if (window.electronAPI && typeof window.electronAPI.importJSON === 'function') {
      const res = await window.electronAPI.importJSON();
      if (res && res.success && res.data) {
        processImportedData(res.data);
        return;
      } else if (res && res.canceled) {
        return;
      }
    }

    // Fallback file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target.result);
          processImportedData(parsed);
        } catch (err) {
          showToast('Failed to parse JSON backup file.', 'error');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  async function processImportedData(data) {
    if (Array.isArray(data)) {
      state.employees = data;
    } else if (data && data.employees) {
      state.employees = data.employees;
      if (data.metadata) state.metadata = data.metadata;
      if (data.leaveAuditLog) state.leaveAuditLog = data.leaveAuditLog;
    } else {
      showToast('Invalid backup file structure.', 'error');
      return;
    }

    await persistData();
    populateDepartmentDropdowns();
    renderAllViews();
    showToast(`Imported ${state.employees.length} employee records!`, 'success');
  }

  async function resetToDefaults() {
    if (!confirm('Are you sure you want to restore the original 206 DOTS Furniture employee records? All custom changes will be overwritten.')) {
      return;
    }

    if (window.SEED_DATA && window.SEED_DATA.employees) {
      state.employees = JSON.parse(JSON.stringify(window.SEED_DATA.employees));
      state.metadata = JSON.parse(JSON.stringify(window.SEED_DATA.metadata));
      state.leaveAuditLog = [];
      await persistData();
      populateDepartmentDropdowns();
      renderAllViews();
      showToast('Reset to original DOTS Furniture records complete!', 'success');
    }
  }

  function printOfficialReport() {
    window.print();
  }

  // =========================================================================
  // Global Event Listeners & Shortcuts
  // =========================================================================
  function setupEventListeners() {
    // Search
    if (dom.searchInput) {
      dom.searchInput.addEventListener('input', (e) => {
        state.filters.search = e.target.value.trim();
        state.pagination.page = 1;
        dom.btnClearSearch.style.display = state.filters.search ? 'inline-block' : 'none';
        renderEmployeeTable();
      });
    }

    if (dom.btnClearSearch) {
      dom.btnClearSearch.addEventListener('click', () => {
        dom.searchInput.value = '';
        state.filters.search = '';
        dom.btnClearSearch.style.display = 'none';
        state.pagination.page = 1;
        renderEmployeeTable();
      });
    }

    // Filter Dropdowns
    if (dom.filterDept) {
      dom.filterDept.addEventListener('change', (e) => {
        state.filters.department = e.target.value;
        state.pagination.page = 1;
        renderEmployeeTable();
      });
    }

    if (dom.filterMonths) {
      dom.filterMonths.addEventListener('change', (e) => {
        state.filters.monthsActive = e.target.value;
        state.pagination.page = 1;
        renderEmployeeTable();
      });
    }

    if (dom.filterLeaveStatus) {
      dom.filterLeaveStatus.addEventListener('change', (e) => {
        state.filters.leaveStatus = e.target.value;
        state.pagination.page = 1;
        renderEmployeeTable();
      });
    }

    if (dom.sortBySelect) {
      dom.sortBySelect.addEventListener('change', (e) => {
        state.filters.sortBy = e.target.value;
        renderEmployeeTable();
      });
    }

    if (dom.pageSizeSelect) {
      dom.pageSizeSelect.addEventListener('change', (e) => {
        state.pagination.pageSize = e.target.value;
        state.pagination.page = 1;
        renderEmployeeTable();
      });
    }

    // Pagination buttons
    if (dom.btnPagePrev) {
      dom.btnPagePrev.addEventListener('click', () => {
        if (state.pagination.page > 1) {
          state.pagination.page--;
          renderEmployeeTable();
        }
      });
    }

    if (dom.btnPageNext) {
      dom.btnPageNext.addEventListener('click', () => {
        if (state.pagination.page < state.pagination.totalPages) {
          state.pagination.page++;
          renderEmployeeTable();
        }
      });
    }

    // Table Header Sorting
    document.querySelectorAll('#masterEmployeeTable thead th.sortable').forEach(th => {
      th.addEventListener('click', () => {
        const field = th.getAttribute('data-sort');
        const current = state.filters.sortBy;
        if (current === `${field}_asc`) {
          state.filters.sortBy = `${field}_desc`;
        } else {
          state.filters.sortBy = `${field}_asc`;
        }
        if (dom.sortBySelect) dom.sortBySelect.value = state.filters.sortBy;
        renderEmployeeTable();
      });
    });

    // Buttons
    if (dom.btnQuickSearch) {
      dom.btnQuickSearch.addEventListener('click', () => {
        switchTab('view-employees');
        setTimeout(() => dom.searchInput && dom.searchInput.focus(), 100);
      });
    }

    if (dom.btnQuickApplyLeave) {
      dom.btnQuickApplyLeave.addEventListener('click', () => {
        switchTab('view-leaves');
      });
    }

    if (dom.btnAddNewEmployee) {
      dom.btnAddNewEmployee.addEventListener('click', openCreateEmployeeModal);
    }

    if (dom.btnExportFilteredCSV) {
      dom.btnExportFilteredCSV.addEventListener('click', () => exportCSVData(true));
    }

    if (dom.btnPrintDirectory) {
      dom.btnPrintDirectory.addEventListener('click', printOfficialReport);
    }

    // Policy & Calculations
    if (dom.btnSavePolicy) {
      dom.btnSavePolicy.addEventListener('click', savePolicySettings);
    }

    if (dom.btnRecalculateAll) {
      dom.btnRecalculateAll.addEventListener('click', recalculateAllEmployeesProRata);
    }

    // Leave Form Events
    if (dom.leaveEmpSelect) {
      dom.leaveEmpSelect.addEventListener('change', triggerLeaveEmpSelect);
    }

    if (dom.recordLeaveForm) {
      dom.recordLeaveForm.addEventListener('submit', handleRecordLeaveSubmit);
    }

    // Settings Tab Events
    if (dom.btnExportFullCSV) dom.btnExportFullCSV.addEventListener('click', () => exportCSVData(false));
    if (dom.btnBackupJSON) dom.btnBackupJSON.addEventListener('click', exportJSONBackup);
    if (dom.btnImportJSON) dom.btnImportJSON.addEventListener('click', importJSONBackup);
    if (dom.btnPrintOfficialReport) dom.btnPrintOfficialReport.addEventListener('click', printOfficialReport);
    if (dom.btnResetToDefaults) dom.btnResetToDefaults.addEventListener('click', resetToDefaults);

    // Modals Close Events
    if (dom.btnCloseDossier) dom.btnCloseDossier.addEventListener('click', closeDossierModal);
    if (dom.modalDossier) {
      dom.modalDossier.addEventListener('click', (e) => {
        if (e.target === dom.modalDossier) closeDossierModal();
      });
    }

    if (dom.btnCloseEmpModal) dom.btnCloseEmpModal.addEventListener('click', closeEmployeeModal);
    if (dom.btnCancelEmpForm) dom.btnCancelEmpForm.addEventListener('click', closeEmployeeModal);
    if (dom.modalEmployeeForm) {
      dom.modalEmployeeForm.addEventListener('click', (e) => {
        if (e.target === dom.modalEmployeeForm) closeEmployeeModal();
      });
    }

    if (dom.employeeForm) {
      dom.employeeForm.addEventListener('submit', handleEmployeeFormSubmit);
    }

    if (dom.formEmpMonths) {
      dom.formEmpMonths.addEventListener('input', updateEmpFormPreview);
    }

    if (dom.formEmpJoiningDate) {
      dom.formEmpJoiningDate.addEventListener('blur', () => {
        const months = calculateActiveMonthsFromJoiningDate(dom.formEmpJoiningDate.value);
        dom.formEmpMonths.value = months;
        updateEmpFormPreview();
      });
    }

    if (dom.btnDossierApplyLeave) {
      dom.btnDossierApplyLeave.addEventListener('click', () => {
        if (state.selectedEmployeeForDossier) {
          const empId = state.selectedEmployeeForDossier.id;
          closeDossierModal();
          openQuickApplyLeave(empId);
        }
      });
    }

    if (dom.btnDossierPrintSlip) {
      dom.btnDossierPrintSlip.addEventListener('click', printEmployeeLeaveSlip);
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl+F -> Search
      if (e.ctrlKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        switchTab('view-employees');
        setTimeout(() => dom.searchInput && dom.searchInput.focus(), 100);
      }
      // Ctrl+N -> New Employee
      if (e.ctrlKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        openCreateEmployeeModal();
      }
      // Escape -> Close Modals
      if (e.key === 'Escape') {
        closeDossierModal();
        closeEmployeeModal();
      }
    });
  }

  // =========================================================================
  // Global Helper Functions (Exposed to window for inline onclicks)
  // =========================================================================
  window.changePage = function (page) {
    state.pagination.page = page;
    renderEmployeeTable();
  };

  window.filterByDepartment = function (deptName) {
    switchTab('view-employees');
    state.filters.department = deptName;
    if (dom.filterDept) dom.filterDept.value = deptName;
    state.pagination.page = 1;
    renderEmployeeTable();
  };

  window.filterByMonths = function (months) {
    switchTab('view-employees');
    state.filters.monthsActive = String(months);
    if (dom.filterMonths) dom.filterMonths.value = String(months);
    state.pagination.page = 1;
    renderEmployeeTable();
  };

  function getInitials(name) {
    if (!name) return 'DF';
    const parts = name.trim().replace(/^md\.?\s+/i, '').split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  function getDeptColor(dept) {
    const colors = {
      'Wood Workshop': '#b45309',
      'Metal Workshop': '#475569',
      'Panel Workshop': '#0891b2',
      'C&S (Cutting & Sewing)': '#7c3aed',
      'Lacquer & Finishing': '#db2777',
      'Packing & Dispatch': '#d97706',
      'Maintenance & Engineering': '#ea580c',
      'Sales & Marketing': '#2563eb',
      'Management': '#4f46e5',
      'IT & Systems': '#0284c7',
      'Accounts & Finance': '#059669',
      'HR & Administration': '#10b981',
      'Procurement & Purchase': '#8b5cf6',
      'Store & Inventory': '#64748b',
      'Production Management': '#6366f1',
      'Design & Planning': '#ec4899',
      'Security Services': '#334155',
      'Catering & Kitchen': '#f59e0b'
    };
    return colors[dept] || '#3b82f6';
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function showToast(message, type = 'info') {
    if (!dom.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>' : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
      </svg>
      <span>${escapeHtml(message)}</span>
    `;

    dom.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  // Boot Application
  document.addEventListener('DOMContentLoaded', initApp);

})();
