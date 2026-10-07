import { Employee, CompanyPolicy } from '../types';

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    "id": "1010",
    "name": "Mahabub Alam",
    "rawDepartment": "",
    "department": "Management",
    "rawDesignation": "MD",
    "designation": "MD",
    "joiningDate": "08/09/2020",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 1,
      "lwp": 0,
      "total": 1
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 5,
      "total": 29
    },
    "status": "OK",
    "avatarColor": "#4f46e5"
  },
  {
    "id": "1011",
    "name": "Md. Sabbir Hossain",
    "rawDepartment": "Store",
    "department": "Store & Inventory",
    "rawDesignation": "Executive",
    "designation": "Executive",
    "joiningDate": "19/02/2021",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#64748b"
  },
  {
    "id": "1012",
    "name": "Md. Aminul Haq",
    "rawDepartment": "",
    "department": "Management",
    "rawDesignation": "Director",
    "designation": "Director",
    "joiningDate": "17/08/2021",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#4f46e5"
  },
  {
    "id": "1013",
    "name": "Md. Marjanur Rashid",
    "rawDepartment": "Production",
    "department": "Production Management",
    "rawDesignation": "Executive",
    "designation": "Executive",
    "joiningDate": "25/10/2021",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#6366f1"
  },
  {
    "id": "1014",
    "name": "Md. Newaz Sharif",
    "rawDepartment": "Purchase",
    "department": "Procurement & Purchase",
    "rawDesignation": "Procurement",
    "designation": "Procurement",
    "joiningDate": "01/01/2022",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#8b5cf6"
  },
  {
    "id": "1015",
    "name": "Md. Tara Mia",
    "rawDepartment": "Office Staff",
    "department": "Office Administration",
    "rawDesignation": "Support Staff",
    "designation": "Support Staff",
    "joiningDate": "01/07/2022",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#3b82f6"
  },
  {
    "id": "1016",
    "name": "Md. Rojob Ali",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Technician",
    "designation": "Technician",
    "joiningDate": "20/09/2022",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1017",
    "name": "Md. Sojol Mia",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Supervisor",
    "designation": "Supervisor",
    "joiningDate": "20/09/2022",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1018",
    "name": "Bedana Begum",
    "rawDepartment": "Cook",
    "department": "Catering & Kitchen",
    "rawDesignation": "Cook",
    "designation": "Cook",
    "joiningDate": "15/03/2023",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#f59e0b"
  },
  {
    "id": "1019",
    "name": "S.M Mohammd Ali",
    "rawDepartment": "Security",
    "department": "Security Services",
    "rawDesignation": "Security",
    "designation": "Security",
    "joiningDate": "15/05/2023",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#334155"
  },
  {
    "id": "1020",
    "name": "Bilkis Begum",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "02/04/2024",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1021",
    "name": "Md. Rifat Khan",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "05/04/2024",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1022",
    "name": "Abdul Kalam",
    "rawDepartment": "Security",
    "department": "Security Services",
    "rawDesignation": "Security",
    "designation": "Security",
    "joiningDate": "07/03/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#334155"
  },
  {
    "id": "1023",
    "name": "Md. Rashal",
    "rawDepartment": "Panal",
    "department": "Panel Workshop",
    "rawDesignation": "Technician",
    "designation": "Technician",
    "joiningDate": "15/05/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1024",
    "name": "Sahina Khatun",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "27/06/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1025",
    "name": "Firoja Begum",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "01/07/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1026",
    "name": "Hridoy Babu",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Technician",
    "designation": "Technician",
    "joiningDate": "25/07/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1027",
    "name": "Debdash Barman",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "12/08/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1028",
    "name": "Md. Samuel Mollik",
    "rawDepartment": "",
    "department": "Management",
    "rawDesignation": "CEO",
    "designation": "CEO",
    "joiningDate": "21/08/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#4f46e5"
  },
  {
    "id": "1029",
    "name": "Md. Anney",
    "rawDepartment": "Maintanance",
    "department": "Maintenance & Engineering",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "01/09/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#ea580c"
  },
  {
    "id": "1030",
    "name": "Manik Chandra Roy",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Supervisor",
    "designation": "Supervisor",
    "joiningDate": "03/09/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1031",
    "name": "Md.Soikot Mia",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "04/09/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1032",
    "name": "Mst. Jannati Begum",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "04/09/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1033",
    "name": "Md. Sadekul Islam",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "04/09/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1034",
    "name": "Md. Ariful Islam",
    "rawDepartment": "C&S",
    "department": "C&S (Cutting & Sewing)",
    "rawDesignation": "Supervisor",
    "designation": "Supervisor",
    "joiningDate": "04/09/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#7c3aed"
  },
  {
    "id": "1035",
    "name": "Bedana Begum",
    "rawDepartment": "Cooking",
    "department": "Catering & Kitchen",
    "rawDesignation": "Cook",
    "designation": "Cook",
    "joiningDate": "04/09/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#f59e0b"
  },
  {
    "id": "1036",
    "name": "Jihad Sikder 1",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "05/09/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1037",
    "name": "Md. Millat Hossain",
    "rawDepartment": "C&S",
    "department": "C&S (Cutting & Sewing)",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "05/09/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#7c3aed"
  },
  {
    "id": "1038",
    "name": "Ismail Islam",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "06/09/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1039",
    "name": "Sudeb Chandra Roy",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "07/09/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1040",
    "name": "Samsunahar Poli",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "12/09/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1041",
    "name": "Mst Rabeya",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "01/10/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1042",
    "name": "Murad Patwary",
    "rawDepartment": "Sales & Marketing",
    "department": "Sales & Marketing",
    "rawDesignation": "AGM S&M",
    "designation": "AGM S&M",
    "joiningDate": "01/10/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#2563eb"
  },
  {
    "id": "1043",
    "name": "Faisal Bin mawla",
    "rawDepartment": "Design & Planing",
    "department": "Design & Planning",
    "rawDesignation": "Manager",
    "designation": "Manager",
    "joiningDate": "01/10/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#ec4899"
  },
  {
    "id": "1044",
    "name": "Molla Md. Sabit",
    "rawDepartment": "IT",
    "department": "IT & Systems",
    "rawDesignation": "Software Engineer",
    "designation": "Software Engineer",
    "joiningDate": "01/10/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#0284c7"
  },
  {
    "id": "1045",
    "name": "Munni Begum",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "22/10/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1046",
    "name": "Md. Julhas Hossain Motin",
    "rawDepartment": "Maintanance",
    "department": "Maintenance & Engineering",
    "rawDesignation": "Technician",
    "designation": "Technician",
    "joiningDate": "02/11/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#ea580c"
  },
  {
    "id": "1047",
    "name": "Khadiza Begum",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "02/11/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1048",
    "name": "Md.Shimul Mia",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "02/11/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1049",
    "name": "Md. Al Amin",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "Supervisor",
    "designation": "Supervisor",
    "joiningDate": "09/11/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1050",
    "name": "Kodbanu",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "10/11/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1051",
    "name": "Imran",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "11/11/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1052",
    "name": "Sokina Akter",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "04/12/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1053",
    "name": "Kamruzzaman Rakib",
    "rawDepartment": "Procurment",
    "department": "Procurement & Purchase",
    "rawDesignation": "Executive",
    "designation": "Executive",
    "joiningDate": "09/12/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#8b5cf6"
  },
  {
    "id": "1054",
    "name": "Nurul Haque",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "Technician",
    "designation": "Technician",
    "joiningDate": "09/12/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1055",
    "name": "Md. Abdul Hakim",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "Technician",
    "designation": "Technician",
    "joiningDate": "26/12/2025",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1056",
    "name": "Md. Usan Hossain",
    "rawDepartment": "Office Staff",
    "department": "Office Administration",
    "rawDesignation": "Support Staff",
    "designation": "Support Staff",
    "joiningDate": "01/01/2026",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#3b82f6"
  },
  {
    "id": "1057",
    "name": "Md.Roton",
    "rawDepartment": "Maintanance",
    "department": "Maintenance & Engineering",
    "rawDesignation": "Technician",
    "designation": "Technician",
    "joiningDate": "10/01/2026",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#ea580c"
  },
  {
    "id": "1058",
    "name": "Afjal Hossain",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Technician",
    "designation": "Technician",
    "joiningDate": "24/01/2026",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1059",
    "name": "Mumtaj Khatun",
    "rawDepartment": "wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "25/01/2026",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1060",
    "name": "Md. Sakib",
    "rawDepartment": "Paking",
    "department": "Packing & Dispatch",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "26/05/2026",
    "monthsActive": 8,
    "allocation": {
      "sl": 9.3,
      "cl": 6.7,
      "el": 4,
      "total": 20
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 9.3,
      "cl": 6.7,
      "el": 4,
      "total": 20
    },
    "status": "OK",
    "avatarColor": "#d97706"
  },
  {
    "id": "1061",
    "name": "Md. Hasan Ali",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "27/01/2026",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1062",
    "name": "Mahamud",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "01/02/2026",
    "monthsActive": 11,
    "allocation": {
      "sl": 12.8,
      "cl": 9.2,
      "el": 5.5,
      "total": 27.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 12.8,
      "cl": 9.2,
      "el": 5.5,
      "total": 27.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1063",
    "name": "Md. Rubel",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "01/02/2026",
    "monthsActive": 11,
    "allocation": {
      "sl": 12.8,
      "cl": 9.2,
      "el": 5.5,
      "total": 27.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 12.8,
      "cl": 9.2,
      "el": 5.5,
      "total": 27.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1064",
    "name": "Palash Hossain",
    "rawDepartment": "C&S",
    "department": "C&S (Cutting & Sewing)",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "01/02/2026",
    "monthsActive": 11,
    "allocation": {
      "sl": 12.8,
      "cl": 9.2,
      "el": 5.5,
      "total": 27.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 12.8,
      "cl": 9.2,
      "el": 5.5,
      "total": 27.5
    },
    "status": "OK",
    "avatarColor": "#7c3aed"
  },
  {
    "id": "1065",
    "name": "Md. Mehedi Hasan",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "15/02/2026",
    "monthsActive": 11,
    "allocation": {
      "sl": 12.8,
      "cl": 9.2,
      "el": 5.5,
      "total": 27.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 12.8,
      "cl": 9.2,
      "el": 5.5,
      "total": 27.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1066",
    "name": "Monira",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "16/02/2026",
    "monthsActive": 11,
    "allocation": {
      "sl": 12.8,
      "cl": 9.2,
      "el": 5.5,
      "total": 27.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 12.8,
      "cl": 9.2,
      "el": 5.5,
      "total": 27.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1067",
    "name": "Md. Gazi Monjoor",
    "rawDepartment": "Distribution",
    "department": "Logistics & Distribution",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "25/02/2026",
    "monthsActive": 11,
    "allocation": {
      "sl": 12.8,
      "cl": 9.2,
      "el": 5.5,
      "total": 27.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 12.8,
      "cl": 9.2,
      "el": 5.5,
      "total": 27.5
    },
    "status": "OK",
    "avatarColor": "#3b82f6"
  },
  {
    "id": "1068",
    "name": "Jesmin",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "01/03/2026",
    "monthsActive": 10,
    "allocation": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1069",
    "name": "Md. Mostofa",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "01/03/2026",
    "monthsActive": 10,
    "allocation": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1070",
    "name": "Khadiza 2",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "01/03/2026",
    "monthsActive": 10,
    "allocation": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1071",
    "name": "Md. Sha Alam",
    "rawDepartment": "Panal",
    "department": "Panel Workshop",
    "rawDesignation": "Technician",
    "designation": "Technician",
    "joiningDate": "06/03/2026",
    "monthsActive": 10,
    "allocation": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1072",
    "name": "Md. Monikul Islam",
    "rawDepartment": "Lacquer",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "07/03/2026",
    "monthsActive": 10,
    "allocation": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1073",
    "name": "Md. Atikulk Islam",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "07/03/2026",
    "monthsActive": 10,
    "allocation": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1074",
    "name": "Lipi",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "08/03/2026",
    "monthsActive": 10,
    "allocation": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1075",
    "name": "Atikul 2",
    "rawDepartment": "Panal",
    "department": "Panel Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "14/03/2026",
    "monthsActive": 10,
    "allocation": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1076",
    "name": "Rasel Uddin",
    "rawDepartment": "Sales & Marketing",
    "department": "Sales & Marketing",
    "rawDesignation": "SHR Incharge",
    "designation": "SHR Incharge",
    "joiningDate": "15/03/2026",
    "monthsActive": 10,
    "allocation": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "status": "OK",
    "avatarColor": "#2563eb"
  },
  {
    "id": "1077",
    "name": "Monirul",
    "rawDepartment": "",
    "department": "General Operations",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "21/03/2026",
    "monthsActive": 10,
    "allocation": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 11.7,
      "cl": 8.3,
      "el": 5,
      "total": 25
    },
    "status": "OK",
    "avatarColor": "#3b82f6"
  },
  {
    "id": "1078",
    "name": "Md. Sagor Mondol",
    "rawDepartment": "C&S",
    "department": "C&S (Cutting & Sewing)",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "01/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#7c3aed"
  },
  {
    "id": "1079",
    "name": "Sahin Sheikh",
    "rawDepartment": "Paking",
    "department": "Packing & Dispatch",
    "rawDesignation": "Supervisor",
    "designation": "Supervisor",
    "joiningDate": "01/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#d97706"
  },
  {
    "id": "1080",
    "name": "Md. Tarikul Islam",
    "rawDepartment": "Sales & Marketing",
    "department": "Sales & Marketing",
    "rawDesignation": "SR",
    "designation": "SR",
    "joiningDate": "01/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#2563eb"
  },
  {
    "id": "1081",
    "name": "Liyam",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "06/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1082",
    "name": "Md. Hridoy Hossain",
    "rawDepartment": "",
    "department": "General Operations",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "07/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#3b82f6"
  },
  {
    "id": "1083",
    "name": "Hasan Ali",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "08/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1084",
    "name": "Mala Banu",
    "rawDepartment": "Panal",
    "department": "Panel Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "09/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1085",
    "name": "Buluara",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "11/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1086",
    "name": "Faruk Mia",
    "rawDepartment": "Lacquer",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "11/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1087",
    "name": "Abdus Sattar",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Technician",
    "designation": "Technician",
    "joiningDate": "11/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1088",
    "name": "Md. Aisur Rahman",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Technician",
    "designation": "Technician",
    "joiningDate": "11/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1089",
    "name": "Golakesh Gain",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Worker",
    "designation": "Worker",
    "joiningDate": "12/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1090",
    "name": "Mahim",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "13/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1091",
    "name": "Mst Fatama Begum",
    "rawDepartment": "Panal",
    "department": "Panel Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "17/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1092",
    "name": "Md. Jakirul Islam",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "20/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1093",
    "name": "Jihad 2",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "20/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1094",
    "name": "Jahirul Islam Sumon",
    "rawDepartment": "Sales & Marketing",
    "department": "Sales & Marketing",
    "rawDesignation": "SR",
    "designation": "SR",
    "joiningDate": "20/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#2563eb"
  },
  {
    "id": "1095",
    "name": "Md. Enamul Hoque",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "Technician",
    "designation": "Technician",
    "joiningDate": "21/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1096",
    "name": "Hashibur Rahman",
    "rawDepartment": "Paking",
    "department": "Packing & Dispatch",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "28/04/2026",
    "monthsActive": 9,
    "allocation": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 10.5,
      "cl": 7.5,
      "el": 4.5,
      "total": 22.5
    },
    "status": "OK",
    "avatarColor": "#d97706"
  },
  {
    "id": "1097",
    "name": "Sajid Murtuja",
    "rawDepartment": "IT",
    "department": "IT & Systems",
    "rawDesignation": "IT Assistant",
    "designation": "IT Assistant",
    "joiningDate": "01/05/2026",
    "monthsActive": 8,
    "allocation": {
      "sl": 9.3,
      "cl": 6.7,
      "el": 4,
      "total": 20
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 9.3,
      "cl": 6.7,
      "el": 4,
      "total": 20
    },
    "status": "OK",
    "avatarColor": "#0284c7"
  },
  {
    "id": "1098",
    "name": "Sajib Khan",
    "rawDepartment": "Paking",
    "department": "Packing & Dispatch",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "07/05/2026",
    "monthsActive": 8,
    "allocation": {
      "sl": 9.3,
      "cl": 6.7,
      "el": 4,
      "total": 20
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 9.3,
      "cl": 6.7,
      "el": 4,
      "total": 20
    },
    "status": "OK",
    "avatarColor": "#d97706"
  },
  {
    "id": "1099",
    "name": "Milon Bisws",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "09/05/2026",
    "monthsActive": 8,
    "allocation": {
      "sl": 9.3,
      "cl": 6.7,
      "el": 4,
      "total": 20
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 9.3,
      "cl": 6.7,
      "el": 4,
      "total": 20
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1100",
    "name": "Nazma",
    "rawDepartment": "Cooking",
    "department": "Catering & Kitchen",
    "rawDesignation": "Cook",
    "designation": "Cook",
    "joiningDate": "01/01/2026",
    "monthsActive": 12,
    "allocation": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 14,
      "cl": 10,
      "el": 6,
      "total": 30
    },
    "status": "OK",
    "avatarColor": "#f59e0b"
  },
  {
    "id": "1101",
    "name": "Mst. Jakia Akter",
    "rawDepartment": "Sales & Marketing",
    "department": "Sales & Marketing",
    "rawDesignation": "Showroom assistant",
    "designation": "Showroom assistant",
    "joiningDate": "10/05/2026",
    "monthsActive": 8,
    "allocation": {
      "sl": 9.3,
      "cl": 6.7,
      "el": 4,
      "total": 20
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 9.3,
      "cl": 6.7,
      "el": 4,
      "total": 20
    },
    "status": "OK",
    "avatarColor": "#2563eb"
  },
  {
    "id": "1102",
    "name": "Musa Karim",
    "rawDepartment": "Tender",
    "department": "Tender & Projects",
    "rawDesignation": "Manager",
    "designation": "Manager",
    "joiningDate": "13/05/2026",
    "monthsActive": 8,
    "allocation": {
      "sl": 9.3,
      "cl": 6.7,
      "el": 4,
      "total": 20
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 9.3,
      "cl": 6.7,
      "el": 4,
      "total": 20
    },
    "status": "OK",
    "avatarColor": "#3b82f6"
  },
  {
    "id": "1103",
    "name": "Yusuf Sirajy",
    "rawDepartment": "Accounts & Finance",
    "department": "Accounts & Finance",
    "rawDesignation": "Manager",
    "designation": "Manager",
    "joiningDate": "16/05/2026",
    "monthsActive": 8,
    "allocation": {
      "sl": 9.3,
      "cl": 6.7,
      "el": 4,
      "total": 20
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 9.3,
      "cl": 6.7,
      "el": 4,
      "total": 20
    },
    "status": "OK",
    "avatarColor": "#059669"
  },
  {
    "id": "1104",
    "name": "Johirul",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "01/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1105",
    "name": "Md. Sobuj Mia",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "01/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1106",
    "name": "Yeanur Molla",
    "rawDepartment": "Procurment",
    "department": "Procurement & Purchase",
    "rawDesignation": "Distributor",
    "designation": "Distributor",
    "joiningDate": "01/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#8b5cf6"
  },
  {
    "id": "1107",
    "name": "Aminul Haque",
    "rawDepartment": "Lacquer",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "02/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1108",
    "name": "Md. Mominur Rahman",
    "rawDepartment": "",
    "department": "Administration",
    "rawDesignation": "Manager",
    "designation": "Manager",
    "joiningDate": "05/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#3b82f6"
  },
  {
    "id": "1109",
    "name": "Mukter khan",
    "rawDepartment": "Panal",
    "department": "Panel Workshop",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "06/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1110",
    "name": "Sefali",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "06/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1111",
    "name": "Sahida khatun",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "06/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1112",
    "name": "Kazi Zakir",
    "rawDepartment": "Maintanance",
    "department": "Maintenance & Engineering",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "06/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#ea580c"
  },
  {
    "id": "1113",
    "name": "Md. Abul Hasim Rana",
    "rawDepartment": "Design & Planing",
    "department": "Design & Planning",
    "rawDesignation": "Assistant manager",
    "designation": "Assistant manager",
    "joiningDate": "06/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#ec4899"
  },
  {
    "id": "1114",
    "name": "Mst. Dolena",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "07/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1115",
    "name": "Md. Enamul Hoque",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "09/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1116",
    "name": "Towhid",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "09/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1117",
    "name": "Rubel Roy",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "10/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1118",
    "name": "Md.Akter Uzzaman",
    "rawDepartment": "IT & E-Commerce",
    "department": "IT & Systems",
    "rawDesignation": "Executive",
    "designation": "Executive",
    "joiningDate": "10/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#0284c7"
  },
  {
    "id": "1119",
    "name": "Sabbir",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "13/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1120",
    "name": "Soheb",
    "rawDepartment": "C&S",
    "department": "C&S (Cutting & Sewing)",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "13/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#7c3aed"
  },
  {
    "id": "1121",
    "name": "Mst Shilpi Khatun",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "15/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1122",
    "name": "Salma",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "15/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1123",
    "name": "Monsur",
    "rawDepartment": "C&S",
    "department": "C&S (Cutting & Sewing)",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "20/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#7c3aed"
  },
  {
    "id": "1124",
    "name": "Kazi Shafiqul Islam",
    "rawDepartment": "Sales & Marketing",
    "department": "Sales & Marketing",
    "rawDesignation": "Deputy Manager",
    "designation": "Deputy Manager",
    "joiningDate": "20/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#2563eb"
  },
  {
    "id": "1125",
    "name": "Samiya Akter Sayma",
    "rawDepartment": "Sales & Marketing",
    "department": "Sales & Marketing",
    "rawDesignation": "Sales Representative",
    "designation": "Sales Representative",
    "joiningDate": "20/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#2563eb"
  },
  {
    "id": "1126",
    "name": "Bulbuli Begum",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "21/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1127",
    "name": "Md. Miraj Khan",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "21/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1128",
    "name": "Md. Jihad Mia",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "21/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1129",
    "name": "Rahat",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "21/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1130",
    "name": "Md. Emon",
    "rawDepartment": "Lacquer",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "28/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1131",
    "name": "Abdul Haque",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "28/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1132",
    "name": "Md. Ejajul Haque",
    "rawDepartment": "CNS",
    "department": "C&S (Cutting & Sewing)",
    "rawDesignation": "Technician",
    "designation": "Technician",
    "joiningDate": "28/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#7c3aed"
  },
  {
    "id": "1133",
    "name": "Fatema Akter Tonni",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "01/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1134",
    "name": "Mst Monzina",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "06/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1135",
    "name": "Rakibul",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "07/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1136",
    "name": "Marufa Bibi",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "07/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1137",
    "name": "Md. Noyon Mia",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "11/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1138",
    "name": "Sree Sukumar Chandra Mohonto",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "11/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1139",
    "name": "Md. Alamin Hossain",
    "rawDepartment": "HR & Admin",
    "department": "HR & Administration",
    "rawDesignation": "Executive",
    "designation": "Executive",
    "joiningDate": "11/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#10b981"
  },
  {
    "id": "1140",
    "name": "Shamim",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "12/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1141",
    "name": "Md. Romjan Ali",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "12/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1142",
    "name": "Mst Tarabanu",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "18/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1143",
    "name": "Omar Faruk",
    "rawDepartment": "Office Staff",
    "department": "Office Administration",
    "rawDesignation": "Staff",
    "designation": "Staff",
    "joiningDate": "18/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#3b82f6"
  },
  {
    "id": "1144",
    "name": "Md.Shamim",
    "rawDepartment": "C&S",
    "department": "C&S (Cutting & Sewing)",
    "rawDesignation": "Helper Technician",
    "designation": "Helper Technician",
    "joiningDate": "21/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#7c3aed"
  },
  {
    "id": "1145",
    "name": "Mohammed Ullah Chowdhury",
    "rawDepartment": "Accounts & Finance",
    "department": "Accounts & Finance",
    "rawDesignation": "Jr. Executive",
    "designation": "Jr. Executive",
    "joiningDate": "21/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#059669"
  },
  {
    "id": "1146",
    "name": "Durjoy Chandra Roy",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "21/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1147",
    "name": "Md.Mahmud Hossain",
    "rawDepartment": "Sales & Marketing",
    "department": "Sales & Marketing",
    "rawDesignation": "Head of Business Development",
    "designation": "Head of Business Development",
    "joiningDate": "25/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#2563eb"
  },
  {
    "id": "1148",
    "name": "Bobita",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "26/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1149",
    "name": "Mst Rojina",
    "rawDepartment": "wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "26/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1150",
    "name": "Momena",
    "rawDepartment": "wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "25/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1151",
    "name": "Aleya",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "26/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1152",
    "name": "Rozina Begum",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "27/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1153",
    "name": "Md. Golam Mostafa Khan",
    "rawDepartment": "Supply Chain",
    "department": "Supply Chain",
    "rawDesignation": "AGM",
    "designation": "AGM",
    "joiningDate": "01/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#3b82f6"
  },
  {
    "id": "1154",
    "name": "Md. Nijam Uddin",
    "rawDepartment": "Sales & Marketing",
    "department": "Sales & Marketing",
    "rawDesignation": "Project Co-Ordinetor",
    "designation": "Project Co-Ordinetor",
    "joiningDate": "01/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#2563eb"
  },
  {
    "id": "1155",
    "name": "Sajeda Akter",
    "rawDepartment": "COOK",
    "department": "Catering & Kitchen",
    "rawDesignation": "Cook",
    "designation": "Cook",
    "joiningDate": "02/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#f59e0b"
  },
  {
    "id": "1156",
    "name": "Md. Sakil Hossain",
    "rawDepartment": "Panal",
    "department": "Panel Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "02/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1157",
    "name": "Md. Shahidul Islam Munsur",
    "rawDepartment": "Lacquire",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Supervisor",
    "designation": "Supervisor",
    "joiningDate": "09/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1158",
    "name": "Mst Aysha Sumi",
    "rawDepartment": "Lacquer",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "10/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1159",
    "name": "Md. Rakib Khan",
    "rawDepartment": "Lacquer",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "11/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1160",
    "name": "Md. Beauty Akter",
    "rawDepartment": "Lacquer",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "12/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1161",
    "name": "Durjoy Razbongsi",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "13/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1162",
    "name": "Md. Biplob Hossain",
    "rawDepartment": "Transport",
    "department": "Transport & Fleet",
    "rawDesignation": "Driver",
    "designation": "Driver",
    "joiningDate": "14/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#3b82f6"
  },
  {
    "id": "1163",
    "name": "Shoeb Ahammad",
    "rawDepartment": "Corporate Sales",
    "department": "Sales & Marketing",
    "rawDesignation": "Executive",
    "designation": "Executive",
    "joiningDate": "01/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#2563eb"
  },
  {
    "id": "1164",
    "name": "Himel Kamal",
    "rawDepartment": "Staff",
    "department": "Office Administration",
    "rawDesignation": "Showroom Staff",
    "designation": "Showroom Staff",
    "joiningDate": "08/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#3b82f6"
  },
  {
    "id": "1165",
    "name": "Kulsum Akter",
    "rawDepartment": "Sales & Marketing",
    "department": "Sales & Marketing",
    "rawDesignation": "Jr. Sales Executive",
    "designation": "Jr. Sales Executive",
    "joiningDate": "09/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#2563eb"
  },
  {
    "id": "1166",
    "name": "Iftikhar Ahmed Tanvir",
    "rawDepartment": "Corporate Sales",
    "department": "Sales & Marketing",
    "rawDesignation": "Executive",
    "designation": "Executive",
    "joiningDate": "10/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#2563eb"
  },
  {
    "id": "1167",
    "name": "Md. Sabbir Hossain",
    "rawDepartment": "Sales & Marketing",
    "department": "Sales & Marketing",
    "rawDesignation": "Executive",
    "designation": "Executive",
    "joiningDate": "11/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#2563eb"
  },
  {
    "id": "1168",
    "name": "Nirob",
    "rawDepartment": "CNS",
    "department": "C&S (Cutting & Sewing)",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "12/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#7c3aed"
  },
  {
    "id": "1169",
    "name": "Durjoy",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "13/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1170",
    "name": "Rakib Hossain",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "14/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1171",
    "name": "Piyash",
    "rawDepartment": "wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "15/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1172",
    "name": "Mst pinki Khatun",
    "rawDepartment": "Lacquer",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "16/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1173",
    "name": "Md. Shanto Pramanik",
    "rawDepartment": "Lacquer",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "17/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1174",
    "name": "Md. Ekram Hossain",
    "rawDepartment": "Lacquer",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "18/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1175",
    "name": "Mst Ela Khatun",
    "rawDepartment": "Lacquer",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "19/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1176",
    "name": "Md. Shahidul Islam Munsur",
    "rawDepartment": "Lacquer",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "20/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1177",
    "name": "Sonia",
    "rawDepartment": "Lacquer",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "21/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1178",
    "name": "Md. Bosir",
    "rawDepartment": "Lacquer",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "22/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1179",
    "name": "Rabbi",
    "rawDepartment": "Paking",
    "department": "Packing & Dispatch",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "23/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#d97706"
  },
  {
    "id": "1180",
    "name": "Krisna",
    "rawDepartment": "Paking",
    "department": "Packing & Dispatch",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "24/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#d97706"
  },
  {
    "id": "1181",
    "name": "Chandon",
    "rawDepartment": "Paking",
    "department": "Packing & Dispatch",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "25/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#d97706"
  },
  {
    "id": "1182",
    "name": "Shekh Sagor",
    "rawDepartment": "CNS",
    "department": "C&S (Cutting & Sewing)",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "26/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#7c3aed"
  },
  {
    "id": "1183",
    "name": "Md. Shoaib hossain",
    "rawDepartment": "CNS",
    "department": "C&S (Cutting & Sewing)",
    "rawDesignation": "Technician",
    "designation": "Technician",
    "joiningDate": "27/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#7c3aed"
  },
  {
    "id": "1184",
    "name": "Md. Monsur Sheikh",
    "rawDepartment": "CNS",
    "department": "C&S (Cutting & Sewing)",
    "rawDesignation": "Technician",
    "designation": "Technician",
    "joiningDate": "28/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#7c3aed"
  },
  {
    "id": "1185",
    "name": "Md. Asmaul Husna",
    "rawDepartment": "CNS",
    "department": "C&S (Cutting & Sewing)",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "29/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#7c3aed"
  },
  {
    "id": "1186",
    "name": "Rosul Ahmmed",
    "rawDepartment": "CNS",
    "department": "C&S (Cutting & Sewing)",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "30/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#7c3aed"
  },
  {
    "id": "1187",
    "name": "Mst Sarmina khatun",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "06/06/2026",
    "monthsActive": 7,
    "allocation": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 8.2,
      "cl": 5.8,
      "el": 3.5,
      "total": 17.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1188",
    "name": "Md. Nazrul",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "07/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1189",
    "name": "Mst Sazeda",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "02/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1190",
    "name": "Samiul",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "03/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1191",
    "name": "Md. Rifat Ali",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "04/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1192",
    "name": "Md. Faruk Mia",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "05/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1193",
    "name": "Asha",
    "rawDepartment": "Wood",
    "department": "Wood Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "06/07/2026",
    "monthsActive": 6,
    "allocation": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 7,
      "cl": 5,
      "el": 3,
      "total": 15
    },
    "status": "OK",
    "avatarColor": "#b45309"
  },
  {
    "id": "1194",
    "name": "Md. Abul Kalam",
    "rawDepartment": "Store",
    "department": "Store & Inventory",
    "rawDesignation": "Incharge",
    "designation": "Incharge",
    "joiningDate": "26/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#64748b"
  },
  {
    "id": "1195",
    "name": "Md. Rifat Ali",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "27/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1196",
    "name": "Mst. Rujina Begum",
    "rawDepartment": "polish",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "28/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1197",
    "name": "Md.Faruk Mia",
    "rawDepartment": "Metal",
    "department": "Metal Workshop",
    "rawDesignation": "Technician",
    "designation": "Technician",
    "joiningDate": "29/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#475569"
  },
  {
    "id": "1198",
    "name": "Md. Amir Hossain",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "30/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1199",
    "name": "Abdur Rahman",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "30/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1200",
    "name": "Sabbir Hossain",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "30/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1201",
    "name": "Mijanur Rahman",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "30/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1202",
    "name": "Mst. Fatema",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "30/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1203",
    "name": "Md. Romjan",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "30/08/2026",
    "monthsActive": 5,
    "allocation": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 5.8,
      "cl": 4.2,
      "el": 2.5,
      "total": 12.5
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1204",
    "name": "Md.Arif Sarker",
    "rawDepartment": "Sales & Marketing",
    "department": "Sales & Marketing",
    "rawDesignation": "Assistant manager",
    "designation": "Assistant manager",
    "joiningDate": "01/09/2026",
    "monthsActive": 4,
    "allocation": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "status": "OK",
    "avatarColor": "#2563eb"
  },
  {
    "id": "1205",
    "name": "Abduz Jaher",
    "rawDepartment": "CNS",
    "department": "C&S (Cutting & Sewing)",
    "rawDesignation": "Supervisor",
    "designation": "Supervisor",
    "joiningDate": "14/09/2026",
    "monthsActive": 4,
    "allocation": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "status": "OK",
    "avatarColor": "#7c3aed"
  },
  {
    "id": "1206",
    "name": "K.M. Abdullah Akib",
    "rawDepartment": "IE",
    "department": "Industrial Engineering (IE)",
    "rawDesignation": "Jr Executive",
    "designation": "Jr Executive",
    "joiningDate": "14/09/2026",
    "monthsActive": 4,
    "allocation": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "used": {
      "sl": 0,
      "cl": 1,
      "el": 0,
      "lwp": 0,
      "total": 1
    },
    "remaining": {
      "sl": 4.7,
      "cl": 2.3,
      "el": 2,
      "total": 9
    },
    "status": "OK",
    "avatarColor": "#3b82f6"
  },
  {
    "id": "1207",
    "name": "Md. Jahir Mia",
    "rawDepartment": "CNS",
    "department": "C&S (Cutting & Sewing)",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "10/09/2026",
    "monthsActive": 4,
    "allocation": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "status": "OK",
    "avatarColor": "#7c3aed"
  },
  {
    "id": "1208",
    "name": "Md. Yasir RahinShah",
    "rawDepartment": "Production",
    "department": "Production Management",
    "rawDesignation": "Assistant manager",
    "designation": "Assistant manager",
    "joiningDate": "27/09/2026",
    "monthsActive": 4,
    "allocation": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "status": "OK",
    "avatarColor": "#6366f1"
  },
  {
    "id": "1209",
    "name": "Samima Akter",
    "rawDepartment": "Lacquer",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "05/09/2026",
    "monthsActive": 4,
    "allocation": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1210",
    "name": "Monira Khatun",
    "rawDepartment": "Lacquer",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "15/09/2026",
    "monthsActive": 4,
    "allocation": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1211",
    "name": "Nomita Rani",
    "rawDepartment": "Lacquer",
    "department": "Lacquer & Finishing",
    "rawDesignation": "Helper",
    "designation": "Helper",
    "joiningDate": "16/09/2026",
    "monthsActive": 4,
    "allocation": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "status": "OK",
    "avatarColor": "#db2777"
  },
  {
    "id": "1212",
    "name": "Roni",
    "rawDepartment": "Panel",
    "department": "Panel Workshop",
    "rawDesignation": "",
    "designation": "Technician / Operative",
    "joiningDate": "17/09/2026",
    "monthsActive": 4,
    "allocation": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "status": "OK",
    "avatarColor": "#0891b2"
  },
  {
    "id": "1213",
    "name": "Rabbin Uzzaman Sarkar",
    "rawDepartment": "",
    "department": "Administration",
    "rawDesignation": "Jr Executive",
    "designation": "Jr Executive",
    "joiningDate": "18/09/2026",
    "monthsActive": 4,
    "allocation": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "status": "OK",
    "avatarColor": "#3b82f6"
  },
  {
    "id": "1214",
    "name": "Ms. Fahrin Saif",
    "rawDepartment": "CRM",
    "department": "Customer Relations (CRM)",
    "rawDesignation": "Sr. Executive",
    "designation": "Sr. Executive",
    "joiningDate": "28/09/2026",
    "monthsActive": 4,
    "allocation": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 4.7,
      "cl": 3.3,
      "el": 2,
      "total": 10
    },
    "status": "OK",
    "avatarColor": "#3b82f6"
  },
  {
    "id": "1215",
    "name": "Md. Raju Hossain",
    "rawDepartment": "Sales & Marketing",
    "department": "Sales & Marketing",
    "rawDesignation": "Sr. Executive",
    "designation": "Sr. Executive",
    "joiningDate": "01/10/2026",
    "monthsActive": 3,
    "allocation": {
      "sl": 3.5,
      "cl": 2.5,
      "el": 1.5,
      "total": 7.5
    },
    "used": {
      "sl": 0,
      "cl": 0,
      "el": 0,
      "lwp": 0,
      "total": 0
    },
    "remaining": {
      "sl": 3.5,
      "cl": 2.5,
      "el": 1.5,
      "total": 7.5
    },
    "status": "OK",
    "avatarColor": "#2563eb"
  }
];

export const DEFAULT_POLICY: CompanyPolicy = {
  trackingYear: 2026,
  sickLeave: 14,
  casualLeave: 10,
  earnedLeave: 6,
  totalAnnual: 30
};
