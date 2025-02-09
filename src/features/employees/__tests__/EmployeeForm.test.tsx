import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Employee, EmployeeStatus } from '../types';
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

describe('EmployeeForm', () => {
  it('renders the form with initial data', () => {
    const initialData: Partial<Employee> = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      position: 'Developer',
      department: 'Engineering',
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
    expect(screen.getByLabelText(/department/i)).toHaveValue('Engineering');
    expect(screen.getByLabelText(/hire date/i)).toHaveValue('2021-01-01');
    expect(screen.getByLabelText(/status/i)).toHaveValue('Active');
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

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'jane.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/position/i), {
      target: { value: 'Designer' },
    });
    fireEvent.change(screen.getByLabelText(/department/i), {
      target: { value: 'Design' },
    });
    fireEvent.change(screen.getByLabelText(/hire date/i), {
      target: { value: '2022-01-01' },
    });

    fireEvent.mouseDown(screen.getByLabelText(/status/i));
    const statusOption = screen.getByRole('option', { name: /Active/i });
    fireEvent.click(statusOption);

    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: 28 } });
    fireEvent.change(screen.getByLabelText(/country/i), {
      target: { value: 'Canada' },
    });

    fireEvent.click(screen.getByRole('button', { name: /add employee/i }));

    await waitFor(() => {
      expect(mockAddEmployee).toHaveBeenCalled();
    });
  });

  it('calls updateEmployee when form is submitted in edit mode', async () => {
    const initialData: Partial<Employee> = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      position: 'Developer',
      department: 'Engineering',
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

  it('closes the form when onClose is called', () => {
    render(
      <EmployeeForm
        open={true}
        onClose={mockOnClose}
        mode="add"
        initialData={{}}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
