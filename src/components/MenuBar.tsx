import { BarChart, Dashboard, Menu, People } from '@mui/icons-material';
import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuList,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { useState } from 'react';
import { Link } from 'react-router-dom';

export const MenuBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      {/* Mobile Menu Button */}
      <IconButton
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'absolute',
          top: 5,
          left: 5,
        }}
        onClick={() => setMobileOpen(true)}
      >
        <Menu />
      </IconButton>
      {/* Sidebar for Desktop */}
      <Grid item sx={{ display: { xs: 'none', md: 'block' } }}>
        <DesktopMenu elevation={0} variant="outlined">
          <Typography
            variant="h5"
            textAlign="center"
            sx={{
              fontWeight: 'bold',
              marginTop: 2,
              marginBottom: 3,
              fontFamily: 'Poppins',
            }}
          >
            Heartpace HR
          </Typography>
          <Divider sx={{ bgcolor: 'white' }} />
          <MenuList>
            <MenuItem component={Link} to="/dashboard">
              <ListItemIcon>
                <Dashboard sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </MenuItem>

            <MenuItem component={Link} to="/employees">
              <ListItemIcon>
                <People sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText>Employees</ListItemText>
            </MenuItem>

            <MenuItem component={Link} to="/statistics">
              <ListItemIcon>
                <BarChart sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText>Statistics</ListItemText>
            </MenuItem>
          </MenuList>
        </DesktopMenu>
      </Grid>
      {/* Sidebar for Mobile (Temporary Drawer) */}
      <MobileMenu
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, width: 400 }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          sx={{
            fontWeight: 'bold',
            marginBottom: 3,
            fontFamily: 'Poppins',
          }}
        >
          Heartpace HR
        </Typography>
        <Divider sx={{ bgcolor: 'white' }} />
        <MenuList>
          <MenuItem component={Link} to="/dashboard">
            <ListItemIcon>
              <Dashboard sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </MenuItem>

          <MenuItem component={Link} to="/employees">
            <ListItemIcon>
              <People sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText>Employees</ListItemText>
          </MenuItem>

          <MenuItem component={Link} to="/statistics">
            <ListItemIcon>
              <BarChart sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText>Statistics</ListItemText>
          </MenuItem>
        </MenuList>
      </MobileMenu>
    </>
  );
};

export const MobileMenu = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: '#090E23',
    color: '#ffffff',
    padding: theme.spacing(2),
  },
}));

export const DesktopMenu = styled(Paper)(({ theme }) => ({
  backgroundColor: '#090E23',
  color: '#ffffff',
  padding: theme.spacing(2),
  height: '100vh',
  borderRadius: 0,
}));
