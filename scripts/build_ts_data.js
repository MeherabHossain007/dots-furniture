const fs = require('fs');
const path = require('path');

const empData = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'employees.json'), 'utf-8');
const metaData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'metadata.json'), 'utf-8'));

const tsCode = `import { Employee, CompanyPolicy } from '../types';

export const INITIAL_EMPLOYEES: Employee[] = ${empData};

export const DEFAULT_POLICY: CompanyPolicy = {
  trackingYear: ${metaData.trackingYear || 2026},
  sickLeave: ${metaData.annualPolicy.sickLeave || 14},
  casualLeave: ${metaData.annualPolicy.casualLeave || 10},
  earnedLeave: ${metaData.annualPolicy.earnedLeave || 6},
  totalAnnual: ${metaData.annualPolicy.totalAnnual || 30}
};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'initialEmployees.ts'), tsCode, 'utf-8');
console.log('Successfully wrote src/data/initialEmployees.ts');
