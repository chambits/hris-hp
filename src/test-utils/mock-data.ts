import { EmployeeStatus } from '../features/employees/types';

export const employees = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    position: 'Developer',
    department: 'Engineering',
    hireDate: '2024-01-01',
    status: EmployeeStatus.ACTIVE,
    age: 30,
    country: 'USA',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    position: 'Product Manager',
    department: 'Product',
    hireDate: '2023-01-01',
    status: EmployeeStatus.ON_LEAVE,
    age: 28,
    country: 'UK',
  },
  {
    id: '3',
    name: 'David Johnson',
    email: 'david@example.com',
    position: 'Marketing Manager',
    department: 'Marketing',
    hireDate: '2023-01-01',
    status: EmployeeStatus.PROBATION,
    age: 38,
    country: 'Australia',
  },
];
