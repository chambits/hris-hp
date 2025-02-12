import { render, screen, fireEvent } from '@testing-library/react';
import { FormFields } from '../FormFields';
import { Employee, EmployeeStatus, Department } from '../../types';
import { FormikProps } from 'formik';

const mockFormik: Partial<FormikProps<Employee>> = {
  values: {
    id: '',
    name: 'John Doe',
    email: 'john@example.com',
    position: 'Developer',
    department: Department.ENGINEERING,
    hireDate: '2024-01-01',
    status: EmployeeStatus.ACTIVE,
    age: 30,
    country: 'USA',
  },
  touched: {},
  errors: {},
  handleChange: jest.fn(),
  handleBlur: jest.fn(),
  handleSubmit: jest.fn(),
};

describe('FormFields', () => {
  const renderForm = () => {
    render(<FormFields formik={mockFormik as FormikProps<Employee>} />);
  };

  it('renders all form fields', () => {
    renderForm();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/position/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hire date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
  });

  it('displays validation errors', () => {
    const formikWithErrors = {
      ...mockFormik,
      touched: { name: true },
      errors: { name: 'Name is required' },
    };

    render(<FormFields formik={formikWithErrors as FormikProps<Employee>} />);
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('calls handleChange when input value changes', () => {
    renderForm();
    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    expect(mockFormik.handleChange).toHaveBeenCalled();
  });
});
