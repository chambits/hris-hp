import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Department, Employee, EmployeeStatus } from '../types';
import { EmployeeForm } from '../EmployeeForm';

const mockOnClose = jest.fn();
const mockAddEmployee = jest.fn().mockResolvedValue({});
const mockUpdateEmployee = jest.fn().mockResolvedValue({});

jest.mock('../employeesApi', () => ({
  useAddEmployeeMutation: () => [
    mockAddEmployee,
    { isLoading: false, error: null },
  ],
  useUpdateEmployeeMutation: () => [
    mockUpdateEmployee,
    { isLoading: false, error: null },
  ],
}));

const fillEmployeeForm = () => {
  fireEvent.change(screen.getByLabelText('Name'), {
    target: { value: 'Jane Doe' },
  });
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'jane.doe@example.com' },
  });
  fireEvent.change(screen.getByLabelText('Position'), {
    target: { value: 'Designer' },
  });
  fireEvent.mouseDown(screen.getByLabelText('Department'));
  fireEvent.click(screen.getByText('Engineering'));
  fireEvent.change(screen.getByLabelText('Hire Date'), {
    target: { value: '2022-01-01' },
  });
  fireEvent.mouseDown(screen.getByLabelText('Status'));
  fireEvent.click(screen.getByText('Active'));
  fireEvent.change(screen.getByLabelText('Age'), { target: { value: 28 } });
  fireEvent.change(screen.getByLabelText('Country'), {
    target: { value: 'Canada' },
  });
};

const defaultEmployeeData = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  position: 'Designer',
  department: Department.ENGINEERING,
  hireDate: '2022-01-01',
  status: EmployeeStatus.ACTIVE,
  age: 28,
  country: 'Canada',
};

describe('EmployeeForm', () => {
  it('renders the form with initial data', () => {
    const initialData: Partial<Employee> = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      position: 'Developer',
      department: Department.ENGINEERING,
      hireDate: '2021-01-01',
      status: EmployeeStatus.ACTIVE,
      age: 30,
      country: 'USA',
    };

    render(
      <EmployeeForm
        open={true}
        onClose={mockOnClose}
        mode="edit"
        initialData={initialData}
      />
    );

    expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/email/i)).toHaveValue('john.doe@example.com');
    expect(screen.getByLabelText(/position/i)).toHaveValue('Developer');
    expect(screen.getByLabelText(/hire date/i)).toHaveValue('2021-01-01');
    expect(screen.getByLabelText(/age/i)).toHaveValue(30);
    expect(screen.getByLabelText(/country/i)).toHaveValue('USA');
  });

  it('calls addEmployee when form is submitted in add mode', async () => {
    render(
      <EmployeeForm
        open={true}
        onClose={mockOnClose}
        mode="add"
        initialData={{}}
      />
    );

    fillEmployeeForm();
    fireEvent.click(screen.getByRole('button', { name: 'Add Employee' }));

    await waitFor(() => {
      expect(mockAddEmployee).toHaveBeenCalledWith(
        expect.objectContaining(defaultEmployeeData)
      );
    });
  });

  it('calls updateEmployee when form is submitted in edit mode', async () => {
    const initialData: Partial<Employee> = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      position: 'Developer',
      department: Department.ENGINEERING,
      hireDate: '2021-01-01',
      status: EmployeeStatus.ACTIVE,
      age: 30,
      country: 'USA',
    };

    render(
      <EmployeeForm
        open={true}
        onClose={mockOnClose}
        mode="edit"
        initialData={initialData}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /update employee/i }));

    await waitFor(() => {
      expect(mockUpdateEmployee).toHaveBeenCalled();
    });
  });

  // it('shows error message when server returns an error', async () => {
  //   mockAddEmployee.mockRejectedValueOnce(new Error('Failed to add employee'));

  //   render(
  //     <EmployeeForm
  //       open={true}
  //       onClose={mockOnClose}
  //       mode="add"
  //       initialData={{}}
  //     />
  //   );

  //   fillEmployeeForm();
  //   fireEvent.click(screen.getByRole('button', { name: 'Add Employee' }));

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText('Unable to add the employee. Please try again.')
  //     ).toBeInTheDocument();
  //   });
  // });
});
