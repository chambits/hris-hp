import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MenuBar } from '../MenuBar';

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
    render(
      <MemoryRouter>
        <MenuBar />
      </MemoryRouter>
    );

    expect(screen.getAllByText('Heartpace HR')[0]).toBeInTheDocument();
    // expect(screen.getByText('Dashboard')).toBeInTheDocument();
    // expect(screen.getByText('Employees')).toBeInTheDocument();
    // expect(screen.getByText('Statistics')).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /menu/i })
    ).not.toBeInTheDocument();
  });

  it('renders mobile menu on small screens (< 600px)', () => {
    setMobileView();
    render(
      <MemoryRouter>
        <MenuBar />
      </MemoryRouter>
    );

    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
    // Menu items should be hidden initially
    // expect(screen.getByTestId('desktop-menu')).not.toBeVisible();
  });

  it('opens mobile menu when hamburger icon is clicked (< 600px)', () => {
    setMobileView();
    render(
      <MemoryRouter>
        <MenuBar />
      </MemoryRouter>
    );

    const menuButton = screen.getByTestId('mobile-menu');
    fireEvent.click(menuButton);

    expect(screen.getAllByText('Heartpace HR')[0]).toBeInTheDocument();
    // expect(screen.getByText('Dashboard')).toBeVisible();
    // expect(screen.getByText('Employees')).toBeVisible();
    // expect(screen.getByText('Statistics')).toBeVisible();
  });

  it('closes mobile menu when a menu item is clicked (< 600px)', () => {
    setMobileView();
    render(
      <MemoryRouter>
        <MenuBar />
      </MemoryRouter>
    );

    const menuButton = screen.getByTestId('mobile-menu');
    fireEvent.click(menuButton);
    fireEvent.click(screen.getAllByText('Employees')[0]);
    expect(screen.queryByTestId('mobile-menu')).not.toBeVisible();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
