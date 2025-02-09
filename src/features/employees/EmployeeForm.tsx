import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Modal,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  useTheme,
} from '@mui/material';
import {
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
} from './employeesApi';
import { Employee, EmployeeStatus } from './types';

interface AddEmployeeFormProps {
  open: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialData?: Partial<Employee>;
}

const employeeSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  position: Yup.string().required('Position is required'),
  department: Yup.string().required('Department is required'),
  hireDate: Yup.string().required('Hire date is required'),
  status: Yup.mixed()
    .oneOf(['Active', 'On Leave', 'Terminated', 'Probation', 'Retired'])
    .required('Status is required'),
  age: Yup.number().min(18, 'Must be at least 18').required('Age is required'),
  country: Yup.string().required('Country is required'),
});

export const EmployeeForm: React.FC<AddEmployeeFormProps> = ({
  open,
  onClose,
  mode = 'add',
  initialData = {},
}) => {
  const theme = useTheme();

  const [addEmployee, { isLoading: isAdding, error: addEmployeeError }] =
    useAddEmployeeMutation();

  const [
    updateEmployee,
    { isLoading: isUpdating, error: updateEmployeeError },
  ] = useUpdateEmployeeMutation();

  const formik = useFormik({
    initialValues: {
      name: initialData.name || '',
      email: initialData.email || '',
      position: initialData.position || '',
      department: initialData.department || '',
      hireDate: initialData.hireDate || '',
      status: initialData.status || EmployeeStatus.INACTIVE,
      age: initialData.age || 0,
      country: initialData.country || '',
      id: initialData.id,
    },
    enableReinitialize: true,
    validationSchema: employeeSchema,
    onSubmit: async (values) => {
      if (mode === 'add') {
        const employeeWithId = {
          ...values,
          id: generateShortIdFromDate(new Date(values.hireDate)),
        };
        await addEmployee(employeeWithId).unwrap();
      } else {
        await updateEmployee({ ...values, id: values.id! }).unwrap();
      }
      onClose();
    },
  });

  function generateShortIdFromDate(date: Date): string {
    const year = date.getFullYear().toString().slice(-2);
    const timestamp = new Date().getTime();
    const shortId = timestamp % 10000;
    return `EMP-${year}${shortId.toString().padStart(4, '0')}`;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor={theme.palette.background.default}
        color={theme.palette.text.primary}
        boxShadow={theme.spacing(3)}
        p={4}
        maxWidth={theme.spacing(70)}
        height="90vh"
        overflow="hidden"
        borderRadius={1}
        margin={2}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          {mode === 'add' ? 'Add New Employee' : 'Update Employee'}
        </Typography>
        {addEmployeeError && (
          <Typography color="error" variant="body2">
            Failed to save employee. Please try again.
          </Typography>
        )}
        {updateEmployeeError && (
          <Typography color="error" variant="body2">
            Failed to update employee. Please try again.
          </Typography>
        )}
        <Box flex={1} overflow="auto" paddingRight={theme.spacing(1)}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              margin="normal"
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              id="position"
              name="position"
              label="Position"
              value={formik.values.position}
              onChange={formik.handleChange}
              error={formik.touched.position && Boolean(formik.errors.position)}
              helperText={formik.touched.position && formik.errors.position}
            />
            <TextField
              fullWidth
              margin="normal"
              id="department"
              name="department"
              label="Department"
              value={formik.values.department}
              onChange={formik.handleChange}
              error={
                formik.touched.department && Boolean(formik.errors.department)
              }
              helperText={formik.touched.department && formik.errors.department}
            />
            <TextField
              fullWidth
              margin="normal"
              id="hireDate"
              name="hireDate"
              label="Hire Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formik.values.hireDate}
              onChange={formik.handleChange}
              error={formik.touched.hireDate && Boolean(formik.errors.hireDate)}
              helperText={formik.touched.hireDate && formik.errors.hireDate}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
              >
                {Object.values(EmployeeStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              id="age"
              name="age"
              label="Age"
              type="number"
              value={formik.values.age}
              onChange={formik.handleChange}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
            <TextField
              fullWidth
              margin="normal"
              id="country"
              name="country"
              label="Country"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              paddingTop={3}
            >
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{ height: theme.spacing(6) }}
                disabled={isAdding || isUpdating}
              >
                {mode === 'add' ? 'Add Employee' : 'Update Employee'}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};
