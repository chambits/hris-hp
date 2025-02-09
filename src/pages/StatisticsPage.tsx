import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PageHeader } from '../components/PageHeader';
import { BarChart } from '../features/statistics/BarChart';
import { ChartSection } from '../features/statistics/ChartSection';
import { HeatmapChart } from '../features/statistics/HeatmapChart';
import { LineChart } from '../features/statistics/LineChart';
import { PieChart } from '../features/statistics/PieChart';

export const StatisticsPage = () => {
  const theme = useTheme();
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
          <BarChart />
        </ChartSection>
        <ChartSection title="Employee Status Distribution">
          <PieChart />
        </ChartSection>
        <ChartSection title="Employee Hires Over Years">
          <LineChart />
        </ChartSection>
        <ChartSection title="Employee Count by Country & Status">
          <HeatmapChart />
        </ChartSection>
      </Grid>
    </Box>
  );
};
