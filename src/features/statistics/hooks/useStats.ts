import { useMemo } from 'react';
import { useGetEmployeesQuery } from '../../employees/employeesApi';

export const useStats = () => {
  const { data: employees = [], isLoading } = useGetEmployeesQuery();

  const employeesCountByDepartment = useMemo(() => {
    const departmentCounts = employees.reduce<Record<string, number>>(
      (acc, emp) => {
        acc[emp.department] = (acc[emp.department] || 0) + 1;
        return acc;
      },
      {}
    );

    return Object.entries(departmentCounts).map(([department, count]) => ({
      department: department === 'Research & Development' ? 'R&D' : department,
      count,
    }));
  }, [employees]);

  const employeesCountByStatus = useMemo(() => {
    const statusCounts = employees.reduce<Record<string, number>>(
      (acc, emp) => {
        acc[emp.status] = (acc[emp.status] || 0) + 1;
        return acc;
      },
      {}
    );

    const data = Object.keys(statusCounts).map((key) => ({
      status: key,
      count: statusCounts[key],
    }));

    return data;
  }, [employees]);

  const employeesHiresCountByYear = useMemo(() => {
    const hiresByYear = employees.reduce<Record<number, number>>((acc, emp) => {
      const year = new Date(emp.hireDate).getFullYear();
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});

    const data = Object.keys(hiresByYear).map((year) => ({
      year: new Date(parseInt(year), 0, 1),
      hires: hiresByYear[parseInt(year)],
    }));

    return data;
  }, [employees]);

  const yearsOfService = useMemo(() => {
    const today = new Date();
    const data = employees.map((emp) => ({
      age: emp.age,
      yearsOfService:
        (today.getTime() - new Date(emp.hireDate).getTime()) /
        (1000 * 60 * 60 * 24 * 365),
      department: emp.department,
      status: emp.status,
    }));

    return data;
  }, [employees]);

  return {
    employees,
    isLoading,
    employeesCountByDepartment,
    employeesCountByStatus,
    employeesHiresCountByYear,
    yearsOfService,
  };
};
