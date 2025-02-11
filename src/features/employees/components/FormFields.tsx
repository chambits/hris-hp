import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { Department, Employee, EmployeeStatus } from '../types';
import { FormikProps } from 'formik';

interface FormFieldsProps {
  formik: FormikProps<Employee>;
}

export const FormFields = ({ formik }: FormFieldsProps) => {
  return (
    <>
      <CustomTextField id="name" label="Name" formikConfig={formik} />
      <CustomTextField id="email" label="Email" formikConfig={formik} />
      <CustomTextField id="position" label="Position" formikConfig={formik} />
      <CustomSelectField
        id="department"
        label="Department"
        options={Department}
        formik={formik}
      />
      <CustomTextField
        id="hireDate"
        label="Hire Date"
        type="date"
        formikConfig={formik}
      />
      <CustomSelectField
        id="status"
        label="Status"
        options={EmployeeStatus}
        formik={formik}
      />
      <CustomTextField
        id="age"
        label="Age"
        type="number"
        formikConfig={formik}
      />
      <CustomTextField id="country" label="Country" formikConfig={formik} />
    </>
  );
};

const CustomTextField = ({
  id,
  label,
  type = 'text',
  formikConfig,
}: {
  id: string;
  label: string;
  type?: string;
  formikConfig: FormikProps<Employee>;
}) => {
  const key = id as keyof Employee;
  return (
    <TextField
      fullWidth
      margin="normal"
      id={id}
      name={id}
      label={label}
      type={type}
      InputLabelProps={type === 'date' ? { shrink: true } : undefined}
      value={formikConfig.values[key]}
      onChange={formikConfig.handleChange}
      error={formikConfig.touched[key] && Boolean(formikConfig.errors[key])}
      helperText={formikConfig.touched[key] && formikConfig.errors[key]}
    />
  );
};

export const CustomSelectField = ({
  id,
  label,
  options,
  formik,
}: {
  id: string;
  label: string;
  options: Record<string, string>;
  formik: FormikProps<Employee>;
}) => {
  const key = id as keyof Employee;
  return (
    <FormControl
      fullWidth
      margin="normal"
      error={formik.touched[key] && Boolean(formik.errors[key])}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        id={id}
        name={id}
        value={formik.values[key]}
        onChange={formik.handleChange}
        label={label}
      >
        {Object.values(options).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {formik.touched[key] && formik.errors[key]}
      </FormHelperText>
    </FormControl>
  );
};
