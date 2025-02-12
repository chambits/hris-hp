import { useGetEmployeesQuery } from '../../features/employees/employeesApi';
import { employees } from '../../test-utils/mock-data';
import { render, screen, waitFor } from '../../test-utils/test-utils';
import StatisticsPage from '../StatisticsPage';

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

describe('StatisticsPage', () => {
  beforeEach(() => {
    (useGetEmployeesQuery as jest.Mock).mockReturnValue({
      data: employees,
      isLoading: false,
      error: null,
    });
  });

  const renderPage = () => {
    return render(<StatisticsPage />);
  };

  it('renders page title and breadcrumbs', () => {
    renderPage();
    expect(
      screen.getByRole('heading', { name: 'Statistics' })
    ).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders all chart sections', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Employees per Department')).toBeInTheDocument();
      expect(
        screen.getByText('Employee Status Distribution')
      ).toBeInTheDocument();
      expect(screen.getByText('Employee Hires Over Years')).toBeInTheDocument();
      expect(
        screen.getByText('Employee Age vs Years of Service')
      ).toBeInTheDocument();
    });
  });

  it('displays correct department distribution', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Engineering')).toBeInTheDocument();
      expect(screen.getByText('Product')).toBeInTheDocument();
    });
  });

  it('displays correct status distribution', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('On Leave')).toBeInTheDocument();
    });
  });
});
