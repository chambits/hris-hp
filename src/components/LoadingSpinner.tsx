import { CircularProgress } from '@mui/material';

import { Box } from '@mui/material';

export const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default"
      color="text.primary"
      textAlign="center"
      p={3}
    >
      <CircularProgress />
    </Box>
  );
};
