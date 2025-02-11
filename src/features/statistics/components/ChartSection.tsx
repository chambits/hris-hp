import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface ChartSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ChartSection: React.FC<ChartSectionProps> = ({
  title,
  children,
}) => {
  const theme = useTheme();
  return (
    <Grid item xs={12} sm={12} md={12}>
      <Paper
        elevation={3}
        sx={{
          padding: theme.spacing(2),
          borderRadius: theme.spacing(1),
          backgroundColor: theme.palette.background.paper,
          textAlign: 'center',
          height: '600px',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          gap={theme.spacing(4)}
          alignItems="center"
          padding={theme.spacing(2)}
        >
          <Typography variant="h6">{title}</Typography>
          <Divider sx={{ width: '100%' }} />
          {children}
        </Box>
      </Paper>
    </Grid>
  );
};
