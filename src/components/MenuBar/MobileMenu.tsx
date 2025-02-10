import { Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';

const MobileMenu = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: '#090E23',
    color: '#ffffff',
    padding: theme.spacing(2),
  },
}));

export default MobileMenu;
