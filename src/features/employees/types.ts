export enum EmployeeStatus {
  ACTIVE = 'Active',
  ON_LEAVE = 'On Leave',
  TERMINATED = 'Terminated',
  PROBATION = 'Probation',
  RETIRED = 'Retired',
  INACTIVE = 'Inactive',
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
