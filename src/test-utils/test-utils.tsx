import { render as rtlRender } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { lightTheme } from '../theme';
import { employeesApi } from '../features/employees/employeesApi';
import themeReducer from '../store/themeSlice';
import { BrowserRouter } from 'react-router-dom';

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      [employeesApi.reducerPath]: employeesApi.reducer,
      theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(employeesApi.middleware),
    preloadedState,
  });
};

interface WrapperProps {
  children: React.ReactNode;
  initialState?: unknown;
}

function render(
  ui: React.ReactElement,
  {
    initialState,
    ...renderOptions
  }: { initialState?: Record<string, unknown>; renderOptions?: unknown }
) {
  const store = createTestStore(initialState);

  function Wrapper({ children }: WrapperProps) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  }

  return {
    store,
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export * from '@testing-library/react';
export { render };
