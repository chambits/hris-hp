import { Box, Grid, Paper, Typography } from '@mui/material';
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
    <Grid item xs={12} sm={12} md={6}>
      <Paper
        elevation={3}
        sx={{
          padding: theme.spacing(2),
          borderRadius: theme.spacing(1),
          backgroundColor: theme.palette.background.paper,
          textAlign: 'center',
          overflow: 'auto',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          gap={theme.spacing(2)}
          alignItems="center"
        >
          <Typography variant="h6">{title}</Typography>
          {children}
        </Box>
      </Paper>
    </Grid>
  );
};
