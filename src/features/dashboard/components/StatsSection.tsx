import { People, PersonOff, PersonOutline } from '@mui/icons-material';
import { Box, Grid, Paper, Skeleton } from '@mui/material';
import StatCard from '../../statistics/components/StatCard';

interface DashboardStats {
  total: number;
  active: number;
  onLeave: number;
}

const STATS_CONFIG = [
  {
    key: 'total',
    title: 'Total Employees',
    icon: <People fontSize="large" />,
  },
  {
    key: 'active',
    title: 'Working Employees',
    icon: <PersonOutline fontSize="large" />,
  },
  {
    key: 'onLeave',
    title: 'Employees on Leave',
    icon: <PersonOff fontSize="large" />,
  },
] as const;

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

export const StatsSection = ({
  stats,
  isLoading,
}: {
  stats: DashboardStats;
  isLoading: boolean;
}) => (
  <>
    {isLoading ? (
      <>
        {[...Array(STATS_CONFIG.length)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
            <StatCardSkeleton />
          </Grid>
        ))}
      </>
    ) : (
      <>
        {STATS_CONFIG.map(({ key, title, icon }) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <StatCard title={title} value={stats[key]} icon={icon} />
          </Grid>
        ))}
      </>
    )}
  </>
);
