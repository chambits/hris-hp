import { useCallback, useState } from 'react';
import { Employee } from '../types';

export const useEmployeeModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const handleOpenModal = useCallback((mode: 'add' | 'edit') => {
    setModalMode(mode);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleRowEdited = useCallback(
    (employee: Employee) => {
      handleOpenModal('edit');
      setEditingEmployee(employee);
    },
    [handleOpenModal]
  );

  return {
    isModalOpen,
    modalMode,
    editingEmployee,
    handleOpenModal,
    handleCloseModal,
    handleRowEdited,
  };
};
