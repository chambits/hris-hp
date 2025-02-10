export enum EmployeeStatus {
  ACTIVE = 'Active',
  ON_LEAVE = 'On Leave',
  TERMINATED = 'Terminated',
  PROBATION = 'Probation',
  RETIRED = 'Retired',
  INACTIVE = 'Inactive',
}

export enum Department {
  ENGINEERING = 'Engineering',
  HUMAN_RESOURCES = 'Human Resources',
  SALES = 'Sales',
  MARKETING = 'Marketing',
  PRODUCT = 'Product',
  CUSTOMER_SUPPORT = 'Customer Support',
  FINANCE = 'Finance',
  LEGAL = 'Legal',
  OPERATIONS = 'Operations',
  RESEARCH_AND_DEVELOPMENT = 'Research & Development',
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  hireDate: string;
  status: EmployeeStatus;
  age: number;
  country: string;
}
