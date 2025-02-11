import { ThemeProvider } from '@mui/material/styles';
import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HOSTED_PATH } from '../constants';
import ErrorBoundary from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { MainLayout } from './layouts/MainLayout';
import { useAppTheme } from './store/themeSlice';
import { darkTheme, lightTheme } from './theme';
const DashboardPageLazy = React.lazy(() => import('./pages/DashboardPage'));
const EmployeesPageLazy = React.lazy(() => import('./pages/EmployeesPage'));
const StatisticsPageLazy = React.lazy(() => import('./pages/StatisticsPage'));
const NotFoundPageLazy = React.lazy(() => import('./pages/NotFoundPage'));

function App() {
  const { mode } = useAppTheme();

  return (
    <ErrorBoundary>
      <ThemeProvider
        theme={mode === 'Dark' || mode === 'System' ? darkTheme : lightTheme}
      >
        <Router
          basename={process.env.NODE_ENV === 'development' ? '/' : HOSTED_PATH}
        >
          <MainLayout>
            {/* <ThemeSwitcher /> */}
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<DashboardPageLazy />} />
                <Route path="/employees" element={<EmployeesPageLazy />} />
                <Route path="/statistics" element={<StatisticsPageLazy />} />
                <Route path="*" element={<NotFoundPageLazy />} />
              </Routes>
            </Suspense>
          </MainLayout>
          {/* <Footer /> */}
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
