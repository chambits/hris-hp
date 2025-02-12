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
];
