import { Search } from '@mui/icons-material';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Employee } from '../features/employees/types';
import { EmployeeForm } from '../features/employees/EmployeeForm';
import { EmployeesTable } from '../features/employees/EmployeesTable';
import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from '../features/employees/employeesApi';

export const EmployeesPage = () => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const {
    data: employees,
    isLoading,
    refetch,
  } = useGetEmployeesQuery({ q: searchTerm });

  const [deleteEmployee] = useDeleteEmployeeMutation();

  const handleOpenModal = useCallback((mode: 'add' | 'edit') => {
    setModalMode(mode);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRowDeleted = useCallback(
    (id: string) => {
      deleteEmployee(id);
    },
    [deleteEmployee]
  );

  const handleRowEdited = useCallback(
    (employee: Employee) => {
      handleOpenModal('edit');
      setEditingEmployee(employee);
    },
    [handleOpenModal]
  );

  useEffect(() => {
    refetch();
  }, [searchTerm, refetch]);

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
        title="Employees"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Employees' }]}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search employees"
                value={searchTerm}
                onChange={handleSearch}
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
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => handleOpenModal('add')}
                >
                  Add Employee
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <EmployeesTable
            employees={employees}
            isLoading={isLoading}
            onRowDeleted={handleRowDeleted}
            onRowEdited={handleRowEdited}
          />
        </Grid>
      </Grid>
      <EmployeeForm
        open={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        initialData={editingEmployee || undefined}
      />
    </Box>
  );
};
