import { ThemeProvider } from '@mui/material/styles';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import './App.css';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard, Employees, Statistics } from './pages';
import { darkTheme, lightTheme } from './theme';
import { useState } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Router>
        <MainLayout>
          {/* <Button onClick={toggleTheme}>
            Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
          </Button> */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
