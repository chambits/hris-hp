import { Search } from '@mui/icons-material';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { AddEmployeeForm } from '../features/employees/AddEmployeeForm';
import { EmployeesTable } from '../features/employees/EmployeesTable';

export const Employees = () => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: 2,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            component="h1"
            gutterBottom
            color="text.primary"
          >
            Employees
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search employees"
                // value={searchTerm}
                // onChange={handleSearch}
                InputProps={{
                  startAdornment: <Search />,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              container
              justifyContent="flex-end"
              spacing={2}
            >
              {/* <Grid item>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  // onClick={() => setIsFilterOpen(true)}
                >
                  Filter
                </Button>
              </Grid> */}
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleOpenModal();
                    // setEditingEmployee(null);
                    // setIsFormOpen(true);
                  }}
                >
                  Add Employee
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <EmployeesTable />
        </Grid>
      </Grid>
      <AddEmployeeForm open={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
};
