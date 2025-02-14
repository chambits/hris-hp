import { Employee } from '../../employees/types';

import { useMemo } from 'react';
import { EmployeeStatus } from '../../employees/types';

export const useEmployeeStats = (employees: Employee[]): DashboardStats => {
  return useMemo(
    () => ({
      total: employees.length,
      active: employees.filter(
        (emp) =>
          emp.status === EmployeeStatus.ACTIVE ||
          emp.status === EmployeeStatus.PROBATION
      ).length,
      onLeave: employees.filter((emp) => emp.status === EmployeeStatus.ON_LEAVE)
        .length,
    }),
    [employees]
  );
};

export interface DashboardStats {
  total: number;
  active: number;
  onLeave: number;
}
