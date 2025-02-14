import { useMemo } from 'react';
import { Employee } from '../../employees/types';

export const useRecentEmployees = (employees: Employee[], limit = 15) => {
  return useMemo(
    () =>
      [...employees]
        .sort(
          (a, b) =>
            new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime()
        )
        .slice(0, limit),
    [employees, limit]
  );
};
