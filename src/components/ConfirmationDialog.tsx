import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Paper,
} from '@mui/material';

interface ConfirmationDialogProps {
  open: boolean;
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'secondary' | 'error';
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmationDialog = ({
  open,
  title,
  content,
  confirmText,
  cancelText,
  confirmColor,
  onClose,
  onConfirm,
}: ConfirmationDialogProps) => {
  return (
    <Paper>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {cancelText}
          </Button>
          <Button onClick={onConfirm} color={confirmColor} autoFocus>
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
