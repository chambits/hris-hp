import { People, PersonOff, PersonOutline } from '@mui/icons-material';
import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { EmployeesTable } from '../features/employees/components/EmployeesTable';
import { useGetEmployeesQuery } from '../features/employees/employeesApi';
import { Employee, EmployeeStatus } from '../features/employees/types';
import { PieChart } from '../features/statistics';
import { BarChart } from '../features/statistics/components/BarChart';
import { ChartSection } from '../features/statistics/components/ChartSection';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

interface DashboardStats {
  total: number;
  active: number;
  onLeave: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <Paper sx={{ p: 2 }}>
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Typography variant="subtitle2" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
      </Box>
      <Box sx={{ color: 'primary.main' }}>{icon}</Box>
    </Box>
  </Paper>
);

const StatCardSkeleton = () => (
  <Paper sx={{ p: 2 }}>
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Skeleton width={100} height={20} />
        <Skeleton width={60} height={40} />
      </Box>
      <Skeleton variant="circular" width={40} height={40} />
    </Box>
  </Paper>
);

const ChartSkeleton = ({ height }: { height: number }) => (
  <Paper sx={{ p: 2, height: `${height}px` }}>
    <Skeleton width={200} height={32} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" height={height - 80} />
  </Paper>
);

const useEmployeeStats = (employees: Employee[]): DashboardStats => {
  return React.useMemo(
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

const useRecentEmployees = (employees: Employee[], limit = 15) => {
  return React.useMemo(
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

const StatsSection = ({
  stats,
  isLoading,
}: {
  stats: DashboardStats;
  isLoading: boolean;
}) => (
  <>
    {isLoading ? (
      <>
        <Grid item xs={12} sm={6} md={4}>
          <StatCardSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCardSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCardSkeleton />
        </Grid>
      </>
    ) : (
      <>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Employees"
            value={stats.total}
            icon={<People fontSize="large" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Working Employees"
            value={stats.active}
            icon={<PersonOutline fontSize="large" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Employees on Leave"
            value={stats.onLeave}
            icon={<PersonOff fontSize="large" />}
          />
        </Grid>
      </>
    )}
  </>
);

const ChartsSection = ({
  employees,
  isLoading,
}: {
  employees: Employee[];
  isLoading: boolean;
}) => (
  <>
    <Grid item xs={12}>
      {isLoading ? (
        <ChartSkeleton height={450} />
      ) : (
        <ChartSection title="Employees by Department">
          <BarChart employees={employees} />
        </ChartSection>
      )}
    </Grid>
    <Grid item xs={12}>
      {isLoading ? (
        <ChartSkeleton height={350} />
      ) : (
        <ChartSection title="Employee Status Distribution">
          <PieChart employees={employees} />
        </ChartSection>
      )}
    </Grid>
  </>
);

const RecentEmployeesSection = ({
  employees,
  isLoading,
}: {
  employees: Employee[];
  isLoading: boolean;
}) => (
  <Grid item xs={12}>
    {isLoading ? (
      <Paper sx={{ p: 2 }}>
        <Skeleton width={200} height={32} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={200} />
      </Paper>
    ) : (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Recent Employees
        </Typography>
        <EmployeesTable employees={employees || []} isLoading={isLoading} />
      </Paper>
    )}
  </Grid>
);

export const DashboardPage = () => {
  const { data: employees = [], isLoading } = useGetEmployeesQuery();
  const stats = useEmployeeStats(employees);
  const recentEmployees = useRecentEmployees(employees);

  return (
    <>
      <PageHeader
        title="Dashboard"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]}
      />

      <Grid container spacing={3}>
        <StatsSection stats={stats} isLoading={isLoading} />
        <ChartsSection employees={employees} isLoading={isLoading} />
        <RecentEmployeesSection
          employees={recentEmployees}
          isLoading={isLoading}
        />
      </Grid>
    </>
  );
};

export default DashboardPage;
