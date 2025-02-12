import { fireEvent, render, screen } from '../../../../test-utils/test-utils';
import { Employee, EmployeeStatus } from '../../types';
import { EmployeesTable } from '../EmployeesTable';

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    position: 'Developer',
    department: 'Engineering',
    hireDate: '2024-01-01',
    status: EmployeeStatus.ACTIVE,
    age: 30,
    country: 'USA',
  },
];

describe('EmployeesTable', () => {
  const onRowDeleted = jest.fn();
  const onRowEdited = jest.fn();

  const renderTable = (initialState = {}) => {
    return render(
      <EmployeesTable
        employees={mockEmployees}
        isLoading={false}
        onRowDeleted={onRowDeleted}
        onRowEdited={onRowEdited}
      />,
      { initialState }
    );
  };

  it('renders table with employee data', () => {
    renderTable();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('calls onRowEdited when edit button is clicked', () => {
    renderTable();
    const editButton = screen.getByTestId('edit-icon');
    fireEvent.click(editButton);
    expect(onRowEdited).toHaveBeenCalledWith(mockEmployees[0]);
  });

  it('calls onRowDeleted when delete button is clicked', () => {
    renderTable();
    const deleteButton = screen.getByTestId('delete-icon');
    fireEvent.click(deleteButton);
    expect(onRowDeleted).toHaveBeenCalledWith('1');
  });

  it('displays status with correct styling', () => {
    renderTable();
    const statusCell = screen.getByText('Active');
    expect(statusCell).toHaveStyle({
      backgroundColor: 'green',
      color: 'white',
    });
  });
});
