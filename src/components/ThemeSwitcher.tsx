import { KeyboardArrowDown } from '@mui/icons-material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from '@mui/material';
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

  const handleThemeSelect = (newMode: ThemeMode) => {
    setTheme(newMode);
    setAnchorEl(null);
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
    <>
      <Button
        onClick={handleClick}
        startIcon={getIcon()}
        endIcon={
          <KeyboardArrowDown
            sx={{
              transition: 'transform 0.2s',
              transform: anchorEl ? 'rotate(180deg)' : 'rotate(0)',
            }}
          />
        }
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          paddingX: 2,
          paddingY: 1,
          color: 'white',
          borderRadius: 1,
          textTransform: 'none',
          '&:hover': {
            bgcolor: '#111827',
          },
          marginBottom: 2,
        }}
      >
        <Typography>{mode} Mode</Typography>
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => handleThemeSelect('Light')}
          selected={mode === 'Light'}
        >
          <LightModeIcon sx={{ mr: 1 }} /> Light
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeSelect('Dark')}
          selected={mode === 'Dark'}
        >
          <DarkModeIcon sx={{ mr: 1 }} /> Dark
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeSelect('System')}
          selected={mode === 'System'}
        >
          <SettingsBrightnessIcon sx={{ mr: 1 }} /> System
        </MenuItem>
      </Menu>
    </>
  );
};
