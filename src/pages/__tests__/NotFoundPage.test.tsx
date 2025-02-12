import { fireEvent, render, screen } from '../../test-utils/test-utils';
import NotFoundPage from '../NotFoundPage';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('NotFoundPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders 404 page elements', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to Home' })
    ).toBeInTheDocument();
  });

  it('navigates to home page when button is clicked', () => {
    render(<NotFoundPage />);

    const homeButton = screen.getByRole('button', { name: 'Go to Home' });
    fireEvent.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
