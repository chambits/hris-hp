import {
  Alert,
  AlertColor,
  Box,
  Button,
  Modal,
  Snackbar,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { Employee } from '../types';
import { FormFields } from './FormFields';
import { useEmployeeForm } from '../hooks/useEmployeeForm';

interface AddEmployeeFormProps {
  open: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialData?: Partial<Employee>;
}

export const EmployeeForm: React.FC<AddEmployeeFormProps> = ({
  open,
  onClose,
  mode = 'add',
  initialData = {},
}) => {
  const theme = useTheme();
  const { formik, snackbar, setSnackbar, isAdding, isUpdating } =
    useEmployeeForm(mode, initialData, onClose);

  return (
    <>
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
          justifyContent="center"
          alignItems="center"
          bgcolor={theme.palette.background.default}
          color={theme.palette.text.primary}
          boxShadow={theme.spacing(3)}
          p={4}
          maxWidth={theme.spacing(70)}
          height="80vh"
          overflow="hidden"
          borderRadius={1}
          margin={2}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            {mode === 'add' ? 'Add New Employee' : 'Update Employee'}
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            mt={2}
            overflow="auto"
            paddingRight={theme.spacing(1)}
          >
            <FormFields formik={formik} />
            <Button
              color="primary"
              variant="contained"
              fullWidth
              data-testid="form-submit-button"
              type="submit"
              sx={{ height: theme.spacing(6) }}
              disabled={isAdding || isUpdating}
            >
              {mode === 'add' ? 'Add Employee' : 'Update Employee'}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={snackbar.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      >
        <Alert severity={snackbar.severity as AlertColor}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EmployeeForm;
