import { Box, IconButton, Modal, Typography, useTheme } from '@mui/material';
import { Close } from '@mui/icons-material';
import React from 'react';

interface PopupModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: number;
  height?: string;
}

export const PopupModal: React.FC<PopupModalProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth,
  height = '80vh',
}) => {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        bgcolor={theme.palette.background.default}
        color={theme.palette.text.primary}
        boxShadow={theme.spacing(3)}
        p={4}
        maxWidth={maxWidth || theme.spacing(70)}
        height={height}
        overflow="hidden"
        borderRadius={1}
        margin={2}
        position="relative"
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
          }}
          aria-label="close"
        >
          <Close />
        </IconButton>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          mb={2}
        >
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
        </Box>
        {children}
      </Box>
    </Modal>
  );
};

export default PopupModal;
