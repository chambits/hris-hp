import { Grid, useTheme } from '@mui/material';
import { MenuBar } from '../components/MenuBar';
export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <Grid container>
      <Grid item xs={12} sm={2}>
        <MenuBar />
      </Grid>
      <Grid
        item
        xs={12}
        sm={10}
        md={10}
        sx={{
          p: 2,
          backgroundColor: theme.palette.background.default,
          height: '100vh',
          overflowY: 'scroll',
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};
