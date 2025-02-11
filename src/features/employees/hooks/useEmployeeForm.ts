import { useFormik } from 'formik';
import { useState } from 'react';
import { employeeSchema } from '../validationSchema';
import { Employee, EmployeeStatus } from '../types';
import {
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
} from '../employeesApi';

export type SnackbarSeverity = 'success' | 'error';

export const useEmployeeForm = (
  mode: 'add' | 'edit',
  initialData: Partial<Employee>,
  onClose: () => void
) => {
  const [addEmployee, { isLoading: isAdding }] = useAddEmployeeMutation();
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const formik = useFormik<Employee>({
    initialValues: {
      name: initialData.name || '',
      email: initialData.email || '',
      position: initialData.position || '',
      department: initialData.department || '',
      hireDate: initialData.hireDate || '',
      status: initialData.status || EmployeeStatus.INACTIVE,
      age: initialData.age || 0,
      country: initialData.country || '',
      id: initialData.id || '',
    },
    enableReinitialize: true,
    validationSchema: employeeSchema,
    onSubmit: async (values) => {
      try {
        if (mode === 'add') {
          const employeeWithId = {
            ...values,
            id: generateShortIdFromDate(new Date(values.hireDate)),
          };
          await addEmployee(employeeWithId).unwrap();
          setSnackbar({
            open: true,
            message: 'Employee added successfully',
            severity: 'success',
          });
        } else {
          await updateEmployee({ ...values, id: values.id! }).unwrap();
          setSnackbar({
            open: true,
            message: 'Employee updated successfully',
            severity: 'success',
          });
        }
        onClose();
      } catch (error: unknown) {
        setSnackbar({
          open: true,
          message: `Failed to ${mode} employee: ${error instanceof Error ? error.message : 'Unknown error'}`,
          severity: 'error',
        });
        console.error(
          `Failed to ${mode} employee: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    },
  });

  function generateShortIdFromDate(date: Date): string {
    const year = date.getFullYear().toString().slice(-2);
    const timestamp = new Date().getTime();
    const shortId = timestamp % 10000;
    return `EMP-${year}${shortId.toString().padStart(4, '0')}`;
  }

  return {
    formik,
    snackbar,
    setSnackbar,
    isAdding,
    isUpdating,
  };
};
