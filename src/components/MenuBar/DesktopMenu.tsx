import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const DesktopMenu = styled(Paper)(({ theme }) => ({
  backgroundColor: '#090E23',
  color: '#ffffff',
  padding: theme.spacing(2),
  height: '100vh',
  borderRadius: 0,
}));

export default DesktopMenu;
