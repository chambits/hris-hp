import * as Yup from 'yup';
import { EmployeeStatus } from './types';

export const employeeSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  position: Yup.string()
    .min(2, 'Position must be at least 2 characters')
    .required('Position is required'),
  department: Yup.string().required('Department is required'),
  hireDate: Yup.date().required('Hire date is required'),
  status: Yup.string()
    .oneOf(Object.values(EmployeeStatus), 'Invalid status')
    .required('Status is required'),
  age: Yup.number()
    .min(18, 'Must be at least 18 years old')
    .max(100, 'Age cannot exceed 100')
    .required('Age is required'),
  country: Yup.string()
    .min(2, 'Country must be at least 2 characters')
    .required('Country is required'),
  id: Yup.string().optional(),
});
