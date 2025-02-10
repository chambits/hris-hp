import { ThemeProvider } from '@mui/material/styles';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { MainLayout } from './layouts/MainLayout';
import { useAppTheme } from './store/themeSlice';
import { darkTheme, lightTheme } from './theme';
import { Box, CircularProgress } from '@mui/material';

const DashboardPageLazy = React.lazy(() => import('./pages/DashboardPage'));
const EmployeesPageLazy = React.lazy(() => import('./pages/EmployeesPage'));
const StatisticsPageLazy = React.lazy(() => import('./pages/StatisticsPage'));
const NotFoundPageLazy = React.lazy(() => import('./pages/NotFoundPage'));

function App() {
  const { mode, setTheme } = useAppTheme();

  const renderLoadingSpinner = () => (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default"
      color="text.primary"
      textAlign="center"
      p={3}
    >
      <CircularProgress />
    </Box>
  );

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <Router
        basename={process.env.NODE_ENV === 'development' ? '/' : '/hris-hp'}
      >
        <MainLayout>
          <ThemeSwitcher mode={mode} onChange={setTheme} />
          <Suspense fallback={renderLoadingSpinner()}>
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
  );
}

export default App;
