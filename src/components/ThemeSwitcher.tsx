import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { Box, useMediaQuery, Menu, MenuItem } from '@mui/material';

interface ThemeSwitcherProps {
  mode: 'light' | 'dark' | 'system';
  onChange: (value: 'light' | 'dark' | 'system') => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  mode,
  onChange,
}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (mode === 'system') {
      const systemTheme = prefersDarkMode ? 'dark' : 'light';
      onChange(systemTheme);
    }
  }, [prefersDarkMode, onChange, mode]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (newMode: 'light' | 'dark' | 'system') => {
    onChange(newMode);
    handleClose();
  };

  const getIcon = () => {
    switch (mode) {
      case 'light':
        return <LightModeIcon />;
      case 'dark':
        return <DarkModeIcon style={{ color: 'white' }} />;
      case 'system':
        return <SettingsBrightnessIcon />;
      default:
        return <SettingsBrightnessIcon />;
    }
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <IconButton onClick={handleClick}>{getIcon()}</IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleThemeChange('light')}>
          <LightModeIcon sx={{ mr: 1 }} /> Light
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange('dark')}>
          <DarkModeIcon sx={{ mr: 1 }} /> Dark
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange('system')}>
          <SettingsBrightnessIcon sx={{ mr: 1 }} /> System
        </MenuItem>
      </Menu>
    </Box>
  );
};
