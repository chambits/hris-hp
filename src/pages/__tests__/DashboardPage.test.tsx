import { useGetEmployeesQuery } from '../../features/employees/employeesApi';
import { employees } from '../../test-utils/mock-data';
import { render, screen, waitFor } from '../../test-utils/test-utils';
import { DashboardPage } from '../DashboardPage';

// Mock ResizeObserver for charts
const mockResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

global.ResizeObserver = mockResizeObserver;

jest.mock('../../features/employees/employeesApi', () => ({
  ...jest.requireActual('../../features/employees/employeesApi'),
  useGetEmployeesQuery: jest.fn(),
}));

describe('DashboardPage', () => {
  beforeEach(() => {
    (useGetEmployeesQuery as jest.Mock).mockReturnValue({
      data: employees,
      isLoading: false,
      error: null,
    });
  });

  const renderDashboard = () => {
    return render(<DashboardPage />);
  };

  it('renders page title and breadcrumbs', () => {
    renderDashboard();
    expect(
      screen.getByRole('heading', { name: 'Dashboard' })
    ).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  describe('Stats Section', () => {
    it('displays correct employee statistics', async () => {
      renderDashboard();

      await waitFor(() => {
        expect(screen.getByText('Total Employees')).toBeInTheDocument();
        expect(
          screen.getByRole('heading', { level: 4, name: '3' })
        ).toBeInTheDocument();
        expect(screen.getByText('Working Employees')).toBeInTheDocument();
        expect(
          screen.getByRole('heading', { level: 4, name: '2' })
        ).toBeInTheDocument();
        expect(screen.getByText('Employees on Leave')).toBeInTheDocument();
        expect(
          screen.getByRole('heading', { level: 4, name: '1' })
        ).toBeInTheDocument();
      });
    });
  });

  describe('Charts Section', () => {
    it('renders department distribution chart', async () => {
      renderDashboard();

      await waitFor(() => {
        expect(screen.getByText('Employees by Department')).toBeInTheDocument();
      });
    });

    it('renders status distribution chart', async () => {
      renderDashboard();

      await waitFor(() => {
        expect(
          screen.getByText('Employee Status Distribution')
        ).toBeInTheDocument();
      });
    });
  });

  describe('Recent Employees Section', () => {
    it('displays recent employees table', async () => {
      renderDashboard();

      await waitFor(() => {
        expect(screen.getByText('Recent Employees')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      });
    });

    it('sorts employees by hire date', async () => {
      renderDashboard();

      await waitFor(() => {
        const rows = screen.getAllByRole('row');
        expect(rows[1]).toHaveTextContent('John Doe'); // Most recent first
        expect(rows[2]).toHaveTextContent('Jane Smith');
      });
    });
  });
});
