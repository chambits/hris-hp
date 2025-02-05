import { Grid } from '@mui/material';
import { MenuBar } from '../components/MenuBar';
export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid container spacing={0}>
      <MenuBar />
      {/* Main Content */}
      <Grid item xs={12} md={12} sx={{ p: 3 }}>
        {children}
      </Grid>
    </Grid>
  );
};
