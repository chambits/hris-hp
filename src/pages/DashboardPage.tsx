import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
  Skeleton,
} from '@mui/material';
import { PageHeader } from '../components/PageHeader';
import { People, PersonOff, PersonOutline } from '@mui/icons-material';
import { EmployeesTable } from '../features/employees/EmployeesTable';
import { useGetEmployeesQuery } from '../features/employees/employeesApi';
import { BarChart } from '../features/statistics/BarChart';
import { HeatmapChart } from '../features/statistics/HeatmapChart';

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) => (
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

export const DashboardPage = () => {
  const theme = useTheme();
  const { data: employees = [], isLoading } = useGetEmployeesQuery({});

  const stats = {
    total: employees.length,
    active: employees.filter((emp) => emp.status === 'Active').length,
    onLeave: employees.filter((emp) => emp.status === 'On Leave').length,
  };

  const recentEmployees = [...employees]
    .sort(
      (a, b) => new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime()
    )
    .slice(0, 15);

  return (
    <Box
      component="main"
      display="flex"
      flexDirection="column"
      bgcolor={theme.palette.background.default}
      color={theme.palette.text.primary}
      padding={theme.spacing(2)}
      overflow="hidden"
    >
      <PageHeader
        title="Dashboard"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]}
      />

      <Grid container spacing={3}>
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
                title="Active Employees"
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

        <Grid item xs={12}>
          {isLoading ? (
            <ChartSkeleton height={450} />
          ) : (
            <Paper
              sx={{
                p: 2,
                height: '450px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Employees by Department
              </Typography>
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <BarChart employees={employees} />
              </Box>
            </Paper>
          )}
        </Grid>

        <Grid item xs={12}>
          {isLoading ? (
            <ChartSkeleton height={350} />
          ) : (
            <Paper
              sx={{
                p: 2,
                height: '350px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Employee Distribution by Country
              </Typography>
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <HeatmapChart employees={employees} />
              </Box>
            </Paper>
          )}
        </Grid>

        {/* Employees Table */}
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
              <EmployeesTable
                employees={recentEmployees}
                isLoading={isLoading}
              />
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
