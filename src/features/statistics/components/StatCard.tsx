import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Paper } from '@mui/material';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <Paper sx={{ p: 2 }}>
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Typography variant="subtitle2" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
      </Box>
      <Box sx={{ color: 'primary.main' }}>{icon}</Box>
    </Box>
  </Paper>
);

export default StatCard;
