import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MenuBar } from '../MenuBar';

const renderWithProviders = (ui: React.ReactElement) => {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>{ui}</MemoryRouter>
    </ThemeProvider>
  );
};

describe('MenuBar Component', () => {
  test('renders menu items correctly on desktop', () => {
    window.innerWidth = 2000;
    window.dispatchEvent(new Event('resize'));

    renderWithProviders(<MenuBar />);

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Employees/i)).toBeInTheDocument();
    expect(screen.getByText(/Statistics/i)).toBeInTheDocument();
  });

  test('renders menu items correctly on mobile', () => {
    window.innerWidth = 375;
    window.dispatchEvent(new Event('resize'));

    renderWithProviders(<MenuBar />);

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Employees/i)).toBeInTheDocument();
    expect(screen.getByText(/Statistics/i)).toBeInTheDocument();
  });

  test('menu items link to correct routes', () => {
    renderWithProviders(<MenuBar />);

    expect(screen.getByText(/Dashboard/i).closest('a')).toHaveAttribute(
      'href',
      '/dashboard'
    );
    expect(screen.getByText(/Employees/i).closest('a')).toHaveAttribute(
      'href',
      '/employees'
    );
    expect(screen.getByText(/Statistics/i).closest('a')).toHaveAttribute(
      'href',
      '/statistics'
    );
  });
});
