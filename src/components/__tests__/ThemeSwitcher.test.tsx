import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../test-utils/test-utils';
import { ThemeSwitcher } from '../ThemeSwitcher';

describe('ThemeSwitcher', () => {
  it('renders theme switcher button', () => {
    render(<ThemeSwitcher />);
    expect(
      screen.getByRole('button', { name: 'Light Mode' })
    ).toBeInTheDocument();
  });

  it('shows current theme mode', () => {
    render(<ThemeSwitcher />, {
      initialState: { theme: { mode: 'Light' } },
    });
    expect(screen.getByText('Light Mode')).toBeInTheDocument();
  });

  it('opens menu on click', () => {
    render(<ThemeSwitcher />);
    const button = screen.getByRole('button', { name: 'Light Mode' });
    fireEvent.click(button);

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
  });

  it('changes theme when option is selected', async () => {
    const { store } = render(<ThemeSwitcher />);
    fireEvent.click(screen.getByRole('button', { name: 'Light Mode' }));
    fireEvent.click(screen.getByText('Dark'));

    await waitFor(() => {
      expect(store.getState().theme.mode).toBe('Dark');
      expect(screen.getByText('Dark Mode')).toBeInTheDocument();
    });
  });

  it('closes menu after selection', () => {
    render(<ThemeSwitcher />);
    fireEvent.click(screen.getByRole('button', { name: 'Light Mode' }));
    fireEvent.click(screen.getByText('Dark'));

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
