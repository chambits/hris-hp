import { Grid, Paper, Skeleton } from '@mui/material';
import { Employee } from '../../employees/types';
import { BarChart } from '../../statistics/components/BarChart';
import { Chart } from '../../statistics/components/Chart';
import { PieChart } from '../../statistics/components/PieChart';

const ChartSkeleton = ({ height }: { height: number }) => (
  <Paper sx={{ p: 2, height: `${height}px` }}>
    <Skeleton width={200} height={32} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" height={height - 80} />
  </Paper>
);

export const ChartsSection = ({
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
        <Chart title="Employees by Department">
          <BarChart employees={employees} />
        </Chart>
      )}
    </Grid>
    <Grid item xs={12}>
      {isLoading ? (
        <ChartSkeleton height={350} />
      ) : (
        <Chart title="Employee Status Distribution">
          <PieChart employees={employees} />
        </Chart>
      )}
    </Grid>
  </>
);
