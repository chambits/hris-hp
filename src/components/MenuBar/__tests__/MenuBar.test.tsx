import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MenuBar } from '../MenuBar';
import store from '../../../store';
import { Provider } from 'react-redux';

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
      <Provider store={store}>
        <MemoryRouter>
          <MenuBar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('HEARTPACE HR')[0]).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /menu/i })
    ).not.toBeInTheDocument();
  });

  it('renders mobile menu on small screens (< 600px)', () => {
    setMobileView();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MenuBar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  });

  it('opens mobile menu when hamburger icon is clicked (< 600px)', () => {
    setMobileView();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MenuBar />
        </MemoryRouter>
      </Provider>
    );

    const menuButton = screen.getByTestId('mobile-menu');
    fireEvent.click(menuButton);

    expect(screen.getAllByText('HEARTPACE HR')[0]).toBeInTheDocument();
  });

  it('closes mobile menu when a menu item is clicked (< 600px)', () => {
    setMobileView();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MenuBar />
        </MemoryRouter>
      </Provider>
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
