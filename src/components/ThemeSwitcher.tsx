import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { Box, Menu, MenuItem, useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import { ThemeMode, useAppTheme } from '../store/themeSlice';

export const ThemeSwitcher: React.FC = () => {
  const { mode, setTheme } = useAppTheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (mode === 'System') {
      const systemTheme = prefersDarkMode ? 'Dark' : 'Light';
      setTheme(systemTheme);
    }
  }, [prefersDarkMode, mode, setTheme]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (newMode: ThemeMode) => {
    setTheme(newMode);
    handleClose();
  };

  const getIcon = () => {
    switch (mode) {
      case 'Light':
        return <LightModeIcon style={{ color: 'white' }} />;
      case 'Dark':
        return <DarkModeIcon style={{ color: 'white' }} />;
      case 'System':
        return <SettingsBrightnessIcon />;
      default:
        return <SettingsBrightnessIcon />;
    }
  };

  return (
    <Box display="flex" justifyContent="flex-start" alignItems="center">
      <IconButton onClick={handleClick}>{getIcon()}</IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => handleThemeChange('Light')}
          selected={mode === 'Light'}
        >
          <LightModeIcon sx={{ mr: 1 }} /> Light
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeChange('Dark')}
          selected={mode === 'Dark'}
        >
          <DarkModeIcon sx={{ mr: 1 }} /> Dark
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeChange('System')}
          selected={mode === 'System'}
        >
          <SettingsBrightnessIcon sx={{ mr: 1 }} /> System
        </MenuItem>
      </Menu>
      <Box color="white">{mode} Mode</Box>
    </Box>
  );
};
