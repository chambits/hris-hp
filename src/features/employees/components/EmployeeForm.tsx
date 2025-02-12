import { Alert, AlertColor, Box, Button, Snackbar } from '@mui/material';
import React from 'react';
import { useEmployeeForm } from '../hooks/useEmployeeForm';
import { Employee } from '../types';
import { FormFields } from './FormFields';
import { PopupModal } from '../../../components/PopupModal';
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
  const { formik, snackbar, setSnackbar, isAdding, isUpdating } =
    useEmployeeForm(mode, initialData, onClose);

  return (
    <>
      <PopupModal
        open={open}
        onClose={onClose}
        title={mode === 'add' ? 'Add New Employee' : 'Update Employee'}
      >
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          mt={2}
          overflow="auto"
          paddingRight={2}
        >
          <FormFields formik={formik} />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            sx={{ height: 48 }}
            disabled={isAdding || isUpdating}
          >
            {mode === 'add' ? 'Add Employee' : 'Update Employee'}
          </Button>
        </Box>
      </PopupModal>

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
