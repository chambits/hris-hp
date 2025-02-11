import { Box, Grid, useTheme } from '@mui/material';
import { MenuBar } from '../components/MenuBar/MenuBar';
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
        sm={12}
        md={10}
        sx={{
          p: 2,
          backgroundColor: theme.palette.background.default,
          height: '100vh',
          overflowY: 'scroll',
        }}
      >
        <Box
          component="main"
          display="flex"
          flexDirection="column"
          bgcolor={theme.palette.background.default}
          color={theme.palette.text.primary}
          padding={theme.spacing(2)}
          overflow="hidden"
        >
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};
