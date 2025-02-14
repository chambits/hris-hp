import { Grid } from '@mui/material';
import { PageHeader } from '../components/PageHeader';
import { ChartsSection } from '../features/dashboard/components/ChartsSection';
import { RecentEmployeesSection } from '../features/dashboard/components/RecentEmployeesSection';
import { StatsSection } from '../features/dashboard/components/StatsSection';
import { useEmployeeStats } from '../features/dashboard/hooks/useEmployeeStats';
import { useRecentEmployees } from '../features/dashboard/hooks/useRecentEmployees';
import { useGetEmployeesQuery } from '../features/employees/employeesApi';

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
