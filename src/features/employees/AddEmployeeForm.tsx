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
} from '@mui/material';

interface AddEmployeeFormProps {
  open: boolean;
  onClose: () => void;
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

export const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({
  open,
  onClose,
}) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      position: '',
      department: '',
      hireDate: '',
      status: 'Active',
      age: 0,
      country: '',
    },
    validationSchema: employeeSchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
      onClose(); // Close the modal after submission
    },
  });

  return (
    <Modal open={open} onClose={onClose} layout="center">
      <Box
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 1,
          maxWidth: 400,
          mx: 'auto',
          mt: '10%',
        }}
      >
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
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="On Leave">On Leave</MenuItem>
              <MenuItem value="Terminated">Terminated</MenuItem>
              <MenuItem value="Probation">Probation</MenuItem>
              <MenuItem value="Retired">Retired</MenuItem>
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
          <Button color="primary" variant="contained" fullWidth type="submit">
            Add Employee
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
