import { ThemeProvider } from '@mui/material/styles';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard, EmployeesPage, StatisticsPage } from './pages';
import { useAppTheme } from './store/themeSlice';
import { darkTheme, lightTheme } from './theme';

function App() {
  const { mode, setTheme } = useAppTheme();

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <Router>
        <MainLayout>
          <ThemeSwitcher mode={mode} onChange={setTheme} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Routes>
        </MainLayout>
        {/* <Footer /> */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
