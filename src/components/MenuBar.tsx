import { BarChart, Dashboard, Menu, People } from '@mui/icons-material';
import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuList,
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
          top: 10,
          left: 10,
        }}
        onClick={() => setMobileOpen(true)}
      >
        <Menu />
      </IconButton>
      {/* Sidebar for Desktop */}
      <Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Sidebar variant="permanent">
          <Typography
            variant="h5"
            textAlign="center"
            sx={{ fontWeight: 'bold', marginBottom: 3 }}
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
        </Sidebar>
      </Grid>
      {/* Sidebar for Mobile (Temporary Drawer) */}
      <Sidebar
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
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
      </Sidebar>
    </>
  );
};

export const Sidebar = styled(Drawer)(({ theme }) => ({
  width: '16vw',
  '& .MuiDrawer-paper': {
    width: '16vw',
    backgroundColor: '#111827',
    color: 'white',
    padding: theme.spacing(2),
  },
}));
