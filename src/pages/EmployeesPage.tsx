import { Search } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Paper,
} from '@mui/material';
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

const SearchBarSkeleton = () => (
  <Grid
    container
    spacing={2}
    alignItems="center"
    justifyContent="space-between"
  >
    <Grid item xs={12} sm={6} md={3}>
      <Skeleton height={40} />
    </Grid>
    <Grid item xs={12} sm={6} md={4} container justifyContent="flex-end">
      <Skeleton width={120} height={40} />
    </Grid>
  </Grid>
);

const TableSkeleton = () => (
  <Paper sx={{ p: 2 }}>
    <Box sx={{ mb: 2 }}>
      <Skeleton variant="rectangular" height={52} />
    </Box>
    {[...Array(5)].map((_, index) => (
      <Skeleton key={index} height={52} sx={{ my: 1 }} />
    ))}
  </Paper>
);

export const EmployeesPage = () => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );

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

  const handleRowDeleted = useCallback((id: string) => {
    setSelectedEmployeeId(id);
    setIsDialogOpen(true);
  }, []);

  const handleRowEdited = useCallback(
    (employee: Employee) => {
      handleOpenModal('edit');
      setEditingEmployee(employee);
    },
    [handleOpenModal]
  );

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedEmployeeId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedEmployeeId) {
      deleteEmployee(selectedEmployeeId);
    }
    handleDialogClose();
  };

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
          {isLoading ? (
            <SearchBarSkeleton />
          ) : (
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
          )}
        </Grid>
        <Grid item xs={12}>
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <EmployeesTable
              employees={employees}
              isLoading={isLoading}
              onRowDeleted={handleRowDeleted}
              onRowEdited={handleRowEdited}
            />
          )}
        </Grid>
      </Grid>
      <EmployeeForm
        open={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        initialData={editingEmployee || undefined}
      />
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeesPage;
