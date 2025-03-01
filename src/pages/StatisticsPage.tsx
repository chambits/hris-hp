import { Grid, Skeleton } from '@mui/material';
import { PageHeader } from '../components/PageHeader';
import { useGetEmployeesQuery } from '../features/employees/employeesApi';
import {
  BarChart,
  LineChart,
  PieChart,
  ScatterPlot,
} from '../features/statistics';
import { Chart } from '../features/statistics/components/Chart';

const chartConfigs = [
  { title: 'Employees per Department', Component: BarChart },
  { title: 'Employee Status Distribution', Component: PieChart },
  { title: 'Employee Hires Over Years', Component: LineChart },
  { title: 'Employee Age vs Years of Service', Component: ScatterPlot },
];

const StatisticsPage = () => {
  const { data: employees = [], isLoading } = useGetEmployeesQuery();

  return (
    <>
      <PageHeader
        title="Statistics"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Statistics' }]}
      />
      <Grid container spacing={4}>
        {chartConfigs.map(({ title, Component }) => (
          <Chart key={title} title={title}>
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%" height={300} />
            ) : (
              <Component employees={employees} />
            )}
          </Chart>
        ))}
      </Grid>
    </>
  );
};

export default StatisticsPage;
