import { Search } from '@mui/icons-material';
import { Box, Button, Grid, Paper, Skeleton, TextField } from '@mui/material';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { PageHeader } from '../components/PageHeader';
import { EmployeeForm } from '../features/employees/components/EmployeeForm';
import { EmployeesTable } from '../features/employees/components/EmployeesTable';
import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from '../features/employees/employeesApi';
import { Employee } from '../features/employees/types';

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
      <Skeleton variant="rectangular" height={60} />
    </Box>
    {[...Array(5)].map((_, index) => (
      <Skeleton key={index} height={50} sx={{ my: 1 }} />
    ))}
  </Paper>
);

export const EmployeesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );

  const { data: employees, isLoading } = useGetEmployeesQuery(
    searchTerm ? { q: searchTerm } : undefined
  );

  const [deleteEmployee] = useDeleteEmployeeMutation();

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
      }, 500),
    []
  );

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(event.target.value);
    },
    [debouncedSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleOpenModal = useCallback((mode: 'add' | 'edit') => {
    setModalMode(mode);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
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

  return (
    <>
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
                    color="primary"
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
      <ConfirmationDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        content="Are you sure you want to delete this employee?"
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
      />
    </>
  );
};

export default EmployeesPage;
