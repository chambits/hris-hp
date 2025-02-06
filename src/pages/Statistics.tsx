import BarChart from '../features/statistics/BarChart';
import HeatmapChart from '../features/statistics/HeatmapChart';
import LineChart from '../features/statistics/LineChart';
import PieChart from '../features/statistics/PieChart';
import TimelineChart from '../features/statistics/TimelineChart';
import StackedBarChart from '../features/statistics/TimelineChart';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const Statistics = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: 2,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <h2>Employees per Department</h2>
          <BarChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <h2>Employee Status Distribution</h2>
          <PieChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <h2>Employee Hires Over Time</h2>
          <LineChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <h2>Employee Count by Country & Status</h2>
          <HeatmapChart />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <h2>Employee Hires Over the Years</h2>
          <TimelineChart />
        </Grid> */}
      </Grid>
    </Box>
  );
};
