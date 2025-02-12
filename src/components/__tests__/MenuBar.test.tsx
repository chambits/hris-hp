import { fireEvent, render, screen } from '../../test-utils/test-utils';
import { MenuBar } from '../MenuBar/MenuBar';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
  }),
}));

const setMobileView = () => {
  global.innerWidth = 600;
  global.dispatchEvent(new Event('resize'));
};

const setDesktopView = () => {
  global.innerWidth = 1200;
  global.dispatchEvent(new Event('resize'));
};

describe('MenuBar', () => {
  beforeEach(() => {
    setDesktopView();
  });

  it('renders desktop menu on large screens (>= 1200px)', () => {
    setDesktopView();
    render(<MenuBar />);

    expect(screen.getAllByText('HEARTPACE HR')[0]).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /menu/i })
    ).not.toBeInTheDocument();
  });

  it('renders mobile menu on small screens (< 600px)', () => {
    setMobileView();
    render(<MenuBar />);

    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  });

  it('opens mobile menu when hamburger icon is clicked (< 600px)', () => {
    setMobileView();
    render(<MenuBar />);

    const menuButton = screen.getByTestId('mobile-menu');
    fireEvent.click(menuButton);

    expect(screen.getAllByText('HEARTPACE HR')[0]).toBeInTheDocument();
  });

  it('closes mobile menu when a menu item is clicked (< 600px)', () => {
    setMobileView();
    render(<MenuBar />);

    const menuButton = screen.getByTestId('mobile-menu');
    fireEvent.click(menuButton);
    fireEvent.click(screen.getAllByText('Employees')[0]);
    expect(screen.queryByTestId('mobile-menu')).not.toBeVisible();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
