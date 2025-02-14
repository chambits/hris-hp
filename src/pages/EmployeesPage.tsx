import { Alert, Box, Grid, Paper, Skeleton, Snackbar } from '@mui/material';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { PageHeader } from '../components/PageHeader';
import { EmployeeForm } from '../features/employees/components/EmployeeForm';
import { EmployeesTable } from '../features/employees/components/EmployeesTable';
import { useGetEmployeesQuery } from '../features/employees/employeesApi';
import { useEmployeeDelete } from '../features/employees/hooks/useEmployeeDelete';
import { useEmployeeModal } from '../features/employees/hooks/useEmployeeModal';
import EmployeeActions from '../features/employees/components/EmployeeActions';

export const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: employees, isLoading } = useGetEmployeesQuery(
    searchTerm ? { q: searchTerm } : undefined
  );

  const {
    showSnackbar,
    setShowSnackbar,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDelete,
    handleConfirmDelete,
  } = useEmployeeDelete();

  const {
    isModalOpen,
    modalMode,
    editingEmployee,
    handleOpenModal,
    handleCloseModal,
    handleRowEdited,
  } = useEmployeeModal();

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
      }, 300),
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

  const handleDialogClose = () => {
    setIsDeleteDialogOpen(false);
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
            <EmployeeActions
              onSearch={handleSearch}
              onAddEmployee={() => handleOpenModal('add')}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <EmployeesTable
              employees={employees}
              isLoading={isLoading}
              onRowDeleted={handleDelete}
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
        open={isDeleteDialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        content="Are you sure you want to delete this employee?"
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
      />
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Employee successfully deleted
        </Alert>
      </Snackbar>
    </>
  );
};

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

export default EmployeesPage;
