import { Box, Typography } from '@mui/material';
import HeartIcon from '@mui/icons-material/Favorite';

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        color: 'text.secondary',
        padding: 2,
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography
        variant="body2"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        Powered by{' '}
        <HeartIcon sx={{ fontSize: 16, marginLeft: 0.5, marginRight: 0.5 }} />{' '}
        Heartpace
      </Typography>
    </Box>
  );
};
