import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { Employee, EmployeeStatus } from '../types';
import { EmployeesTable } from '../EmployeesTable';

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    position: 'Developer',
    department: 'Engineering',
    hireDate: '2021-01-01',
    status: EmployeeStatus.ACTIVE,
    age: 30,
    country: 'USA',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    position: 'Designer',
    department: 'Design',
    hireDate: '2020-05-15',
    status: EmployeeStatus.ON_LEAVE,
    age: 28,
    country: 'Canada',
  },
];

const mockOnRowDeleted = jest.fn();
const mockOnRowEdited = jest.fn();

describe('EmployeesTable', () => {
  it('renders the table with employee data', () => {
    render(
      <Provider store={store}>
        <EmployeesTable
          employees={mockEmployees}
          isLoading={false}
          onRowDeleted={mockOnRowDeleted}
          onRowEdited={mockOnRowEdited}
        />
      </Provider>
    );

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
  });

  it('calls onRowDeleted when delete icon is clicked', () => {
    render(
      <Provider store={store}>
        <EmployeesTable
          employees={mockEmployees}
          isLoading={false}
          onRowDeleted={mockOnRowDeleted}
          onRowEdited={mockOnRowEdited}
        />
      </Provider>
    );

    const deleteIcons = screen.getAllByTestId('delete-icon');
    fireEvent.click(deleteIcons[0]);

    expect(mockOnRowDeleted).toHaveBeenCalledWith('1');
  });

  it('calls onRowEdited when edit icon is clicked', () => {
    render(
      <Provider store={store}>
        <EmployeesTable
          employees={mockEmployees}
          isLoading={false}
          onRowDeleted={mockOnRowDeleted}
          onRowEdited={mockOnRowEdited}
        />
      </Provider>
    );

    const editIcons = screen.getAllByTestId('edit-icon');
    fireEvent.click(editIcons[0]);

    expect(mockOnRowEdited).toHaveBeenCalledWith(mockEmployees[0]);
  });

  it('displays loading indicator when isLoading is true', () => {
    render(
      <Provider store={store}>
        <EmployeesTable
          employees={[]}
          isLoading={true}
          onRowDeleted={mockOnRowDeleted}
          onRowEdited={mockOnRowEdited}
        />
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
