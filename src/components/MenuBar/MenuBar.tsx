import { BarChart, Dashboard, Menu, People } from '@mui/icons-material';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { forwardRef, ReactNode, useState } from 'react';
import { LinkProps, Link as RouterLink, useLocation } from 'react-router-dom';
import { ThemeSwitcher } from '../ThemeSwitcher';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

interface MenuItem {
  path: string;
  label: string;
  icon: ReactNode;
}

interface MenuContentProps {
  onItemClick?: () => void;
}

interface MenuItemLinkProps extends LinkProps {
  selected?: boolean;
  isActive?: boolean;
}

const menuItems: MenuItem[] = [
  {
    path: '/',
    label: 'Dashboard',
    icon: <Dashboard sx={{ color: 'white' }} />,
  },
  {
    path: '/employees',
    label: 'Employees',
    icon: <People sx={{ color: 'white' }} />,
  },
  {
    path: '/statistics',
    label: 'Statistics',
    icon: <BarChart sx={{ color: 'white' }} />,
  },
];

const MenuItemLink = forwardRef<HTMLAnchorElement, MenuItemLinkProps>(
  ({ ...props }, ref) => (
    <MenuItem component={RouterLink} ref={ref} {...props} />
  )
);

const StyledMenuItem = styled(MenuItemLink, {
  shouldForwardProp: (prop) => !['isActive'].includes(prop as string),
})<{ isActive?: boolean }>(({ theme, isActive, selected }) => ({
  borderRadius: 5,
  color: 'white',
  backgroundColor:
    isActive || selected ? theme.palette.primary.main : 'transparent',
  '&:hover': {
    backgroundColor:
      selected || isActive
        ? theme.palette.primary.main
        : 'rgba(7, 110, 220, 0.1)',
  },
  '& .MuiListItemIcon-root': {
    color: 'white',
  },
}));

const MenuContent = ({ onItemClick }: MenuContentProps) => {
  const location = useLocation();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        height="100%"
        justifyContent="space-between"
      >
        <Box>
          <Typography
            variant="h5"
            textAlign="center"
            sx={{
              fontWeight: 'bold',
              marginY: 2,
              fontFamily: 'Raleway',
            }}
          >
            HEARTPACE HR
          </Typography>
          <Divider sx={{ bgcolor: 'grey' }} />
          <MenuList>
            {menuItems.map((item) => (
              <StyledMenuItem
                key={item.path}
                to={item.path}
                onClick={onItemClick}
                isActive={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </StyledMenuItem>
            ))}
          </MenuList>
        </Box>
        <Box>
          <ThemeSwitcher />
        </Box>
      </Box>
    </>
  );
};

export const MenuBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const handleMobileClose = () => setMobileOpen(false);

  return (
    <>
      <IconButton
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
        onClick={() => setMobileOpen(true)}
      >
        <Menu />
      </IconButton>

      <Grid item sx={{ display: { xs: 'none', md: 'block' } }}>
        <DesktopMenu
          elevation={0}
          variant="outlined"
          data-testid="desktop-menu"
        >
          <MenuContent />
        </DesktopMenu>
      </Grid>

      <MobileMenu
        variant="temporary"
        open={mobileOpen}
        onClose={handleMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          width: 0,
          backgroundColor: theme.palette.background.paper,
        }}
        data-testid="mobile-menu"
      >
        <MenuContent onItemClick={handleMobileClose} />
      </MobileMenu>
    </>
  );
};
