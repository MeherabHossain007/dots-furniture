# DOTS Furniture Leave Tracker 🪑📋

> **DOTS Furniture & Décor Limited**  
> Modern desktop employee management and automated pro-rata leave tracking system for the 2026 tracking year.

Built with **Electron**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**.

---

## 🌟 Key Features

### 1. Executive Dashboard
- **KPI Metrics**: Real-time stats on total staff, department count, cumulative remaining leave balances, and company-wide utilization rate.
- **Visual Analytics**:
  - Horizontal department workforce distribution chart with custom color palettes.
  - Interactive tenure donut chart showing full-year vs. pro-rated employee distribution.
  - Recent joiners overview table with instant tenure indicators.

### 2. Employee Directory
- **Multi-Category Quota Tracking**: Comprehensive visibility over **Sick Leave (SL)**, **Casual Leave (CL)**, **Earned Leave (EL)**, and **Leave Without Pay (LWP)**.
- **Grouped Columns**: Clear side-by-side breakdown of **Allocated**, **Used**, and **Remaining** balances.
- **Search & Filters**: Instant full-text search across employee name, ID, designation, and department dropdown filtering.
- **Exporting**: One-click native CSV and Excel export.

### 3. Automated Pro-Rata Calculation Engine
- **Statutory Quota Compliance**: Standard 30-day annual allowance (14 Sick, 10 Casual, 6 Earned).
- **Automated Service Tenure Pro-Rating**:
  $$\text{Allocation} = \left(\frac{\text{Months Active}}{12}\right) \times \text{Annual Quota}$$
- **Pro-Rata Matrix**: Visual comparison grid displaying pro-rated allowances for every service tenure from 1 to 12 months.
- **Interactive Simulator**: Dynamic slider tool allowing HR administrators to simulate join dates and verify allocations.
- **Configurable Policy Editor**: Adjust standard quotas or rounding rules directly from the app.

### 4. Leave Management & Audit Log
- **Deduction Processing**: Apply leaves with automatic validation against remaining pro-rata balances and over-allocation warnings.
- **Comprehensive Audit Trail**: Timestamped history of all leave deductions with leave type, duration, and reason.
- **Refund & Reversal**: Single-click leave cancellation and automatic balance restoration.

### 5. Personnel Dossier & Official Printing
- **Employee Dossier**: Complete personnel profile showing tenure, department, remaining balances, and individual deduction history.
- **Official Print Slips**: Clean, printable leave cards (`window.print()`) pre-styled with signature lines for employee, supervisor, and HR incharge.

### 6. Appearance & Dark Mode
- **Bespoke Theme Engine**: Full support for **Light**, **Dark**, and **System Default** modes.
- **High-Contrast Palette**: Modern deep slate palette (`#0B0F17` canvas, `#151D2A` cards, slate-100 high-contrast typography).
- **Multiple Toggle Options**:
  - Top Header toggle button
  - Frameless Window TitleBar quick action
  - Sidebar animated toggle pill
  - Appearance card in System Settings
  - Global keyboard shortcut: **`Alt + T`** (or `Ctrl + Shift + D`)

### 7. Data Persistence & Backup
- **Local Database**: Automatic persistence to `%APPDATA%/dots-furniture/dots_furniture_employees_v2.json`.
- **Backup & Restore**: Native file dialogs for full database export (JSON) and import.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Desktop Shell** | [Electron](https://www.electronjs.org/) v44 |
| **Frontend Framework** | [React](https://react.dev/) v19 + [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) v4 |
| **Build Tool** | [Vite](https://vite.dev/) v8 |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Spreadsheets** | [SheetJS (xlsx)](https://sheetjs.com/) |
| **Packaging** | [electron-builder](https://www.electron.build/) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (v9 or v10)

### Installation
Clone or open the repository directory, then install dependencies:

```bash
pnpm install
```

### Running in Development
To compile the frontend bundle and launch the Electron desktop window:

```bash
pnpm start
```

Alternatively, to start Vite's local dev server for browser testing:

```bash
pnpm dev
```

---

## 📦 Building & Packaging

### Production Web Build
Compile production assets into `dist/`:

```bash
pnpm run build
```

### Package Windows Installers
Create distributable Windows binaries using `electron-builder`:

- **Complete NSIS Setup & Portable Binary**:
  ```bash
  pnpm make
  # or
  pnpm dist
  ```
  Artifacts will be output to the `release/` folder:
  - `release/DOTS Furniture Leave Tracker Setup 1.0.0.exe` (Installer)
  - `release/DOTS Furniture Leave Tracker 1.0.0.exe` (Portable executable)

- **Portable Executable Only**:
  ```bash
  pnpm dist:portable
  ```

---

## 📁 Project Structure

```
dots-furniture/
├── main.js                  # Electron main process (IPC, window lifecycle, persistence)
├── preload.js               # Context isolation preload script
├── index.html               # Main HTML entry
├── vite.config.mts          # Vite configuration with React & Tailwind plugins
├── tsconfig.json            # TypeScript configuration
├── package.json             # Scripts and dependencies
├── src/
│   ├── main.tsx             # React root mount
│   ├── App.tsx              # Application layout & navigation router
│   ├── index.css            # Tailwind v4 configuration & theme tokens
│   ├── context/
│   │   ├── EmployeeContext.tsx # Employee state & persistence manager
│   │   └── ThemeContext.tsx    # Light/Dark/System theme provider
│   ├── components/
│   │   ├── layout/          # TitleBar, Header, Sidebar
│   │   ├── dashboard/       # KPI cards, Department chart, Policy donut
│   │   ├── directory/       # Employee table, toolbar, pagination
│   │   ├── departments/     # Department distribution cards
│   │   ├── leaves/          # Apply leave form, audit log table
│   │   ├── prorata/         # Matrix grid, simulator, policy editor
│   │   ├── settings/        # Backup, import/export, appearance settings
│   │   └── modals/          # Add/Edit employee modal, Personnel dossier
│   ├── services/
│   │   ├── proRataService.ts   # Pro-rata math & date calculations
│   │   └── storageService.ts   # Electron IPC bridge / LocalStorage fallback
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces and types
│   └── data/
│       └── employees.json   # Seed workforce data
└── release/                 # electron-builder output binaries
```

---

## 📜 License
Internal proprietary software for **DOTS Furniture & Décor Limited**.
