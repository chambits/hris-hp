import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../test-utils/test-utils';
import { EmployeesPage } from '../EmployeesPage';
import { useGetEmployeesQuery } from '../../features/employees/employeesApi';
import { userEvent } from '@testing-library/user-event';
import { employees } from '../../test-utils/mock-data';

jest.mock('../../features/employees/employeesApi', () => ({
  ...jest.requireActual('../../features/employees/employeesApi'),
  useGetEmployeesQuery: jest.fn(),
}));

describe('EmployeesPage', () => {
  beforeEach(() => {
    (useGetEmployeesQuery as jest.Mock).mockReturnValue({
      data: employees,
      isLoading: false,
      error: null,
    });
  });

  it('renders page title and breadcrumbs', async () => {
    render(<EmployeesPage />);
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 1, name: 'Employees' })
      ).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });

  it('opens add employee modal when clicking add button', async () => {
    render(<EmployeesPage />);

    await waitFor(() => {
      const addButton = screen.getByText('Add Employee');
      fireEvent.click(addButton);
    });

    expect(
      screen.getByRole('heading', { name: 'Add New Employee' })
    ).toBeInTheDocument();
  });

  it('loads and displays employee data', async () => {
    render(<EmployeesPage />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('handles search filtering', async () => {
    render(<EmployeesPage />);

    const searchInput = screen.getByPlaceholderText('Search employees');
    await userEvent.type(searchInput, 'John');

    await waitFor(() => {
      expect(searchInput).toHaveValue('John');
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
