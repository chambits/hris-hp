import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PageHeader } from '../components/PageHeader';
import { BarChart } from '../features/statistics/BarChart';
import { ChartSection } from '../features/statistics/ChartSection';
import { HeatmapChart } from '../features/statistics/HeatmapChart';
import { LineChart } from '../features/statistics/LineChart';
import { PieChart } from '../features/statistics/PieChart';
import { useGetEmployeesQuery } from '../features/employees/employeesApi';
export const StatisticsPage = () => {
  const theme = useTheme();
  const { data: employees } = useGetEmployeesQuery({ q: '' });
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: theme.spacing(2),
      }}
    >
      <PageHeader
        title="Statistics"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Statistics' }]}
      />
      <Grid container spacing={3}>
        <ChartSection title="Employees per Department">
          <BarChart employees={employees || []} />
        </ChartSection>
        <ChartSection title="Employee Status Distribution">
          <PieChart employees={employees || []} />
        </ChartSection>
        <ChartSection title="Employee Hires Over Years">
          <LineChart employees={employees || []} />
        </ChartSection>
        <ChartSection title="Employee Count by Country & Status">
          <HeatmapChart employees={employees || []} />
        </ChartSection>
      </Grid>
    </Box>
  );
};
