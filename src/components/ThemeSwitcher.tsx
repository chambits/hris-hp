import React from 'react';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Box } from '@mui/material';

interface ThemeSwitcherProps {
  mode: 'light' | 'dark';
  onChange: (value: 'light' | 'dark') => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  mode,
  onChange,
}) => {
  const handleThemeChange = () => {
    onChange(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <IconButton onClick={handleThemeChange}>
        {mode === 'dark' ? (
          <DarkModeIcon style={{ color: 'white' }} />
        ) : (
          <LightModeIcon />
        )}
      </IconButton>
    </Box>
  );
};
