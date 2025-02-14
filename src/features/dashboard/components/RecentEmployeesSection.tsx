import { Skeleton, Typography } from '@mui/material';

import { Paper } from '@mui/material';

import { Grid } from '@mui/material';
import { Employee } from '../../employees/types';
import { EmployeesTable } from '../../employees/components/EmployeesTable';

export const RecentEmployeesSection = ({
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
        <EmployeesTable
          employees={employees || []}
          isLoading={isLoading}
          hideActions
        />
      </Paper>
    )}
  </Grid>
);
