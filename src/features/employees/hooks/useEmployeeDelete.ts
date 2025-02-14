import { useCallback, useState } from 'react';
import { useDeleteEmployeeMutation } from '../employeesApi';

export const useEmployeeDelete = () => {
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );

  const handleDelete = useCallback((id: string) => {
    setSelectedEmployeeId(id);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedEmployeeId) {
      deleteEmployee(selectedEmployeeId);
      setShowSnackbar(true);
    }
    setIsDeleteDialogOpen(false);
    setSelectedEmployeeId(null);
  }, [deleteEmployee, selectedEmployeeId]);

  return {
    showSnackbar,
    setShowSnackbar,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDelete,
    handleConfirmDelete,
  };
};
