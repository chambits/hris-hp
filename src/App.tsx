import { ThemeProvider } from '@mui/material/styles';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard, EmployeesPage, StatisticsPage } from './pages';
import { useAppTheme } from './store/themeSlice';
import { darkTheme, lightTheme } from './theme';
import { store } from './store';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';

function App() {
  const { mode, setTheme } = useAppTheme();

  return (
    <Provider store={store}>
      <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
        <CssBaseline />
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
    </Provider>
  );
}

export default App;
