import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { employees } from '../../../../test-utils/mock-data';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../test-utils/test-utils';
import { EmployeeForm } from '../EmployeeForm';

describe('EmployeeForm', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  const renderForm = (
    mode: 'add' | 'edit' = 'add',
    initialData = {},
    initialState = {}
  ) => {
    return render(
      <EmployeeForm
        open={true}
        onClose={onClose}
        mode={mode}
        initialData={initialData}
      />,
      { initialState }
    );
  };

  it('renders form with correct title for add mode', () => {
    renderForm('add');
    expect(
      screen.getByRole('heading', { name: 'Add New Employee' })
    ).toBeInTheDocument();
  });

  it('renders form with correct title for edit mode', () => {
    renderForm('edit');
    expect(
      screen.getByRole('heading', { name: 'Update Employee' })
    ).toBeInTheDocument();
  });

  it('renders form with correct button text for edit mode', () => {
    renderForm('edit');
    expect(
      screen.getByRole('button', { name: 'Update Employee' })
    ).toBeInTheDocument();
  });

  it('populates form fields with initial data in edit mode', () => {
    const employee = employees[0];
    renderForm('edit', employee);

    expect(screen.getByLabelText(/name/i)).toHaveValue(employee.name);
    expect(screen.getByLabelText(/email/i)).toHaveValue(employee.email);
    expect(screen.getByLabelText(/position/i)).toHaveValue(employee.position);
  });

  it('shows validation errors for required fields', async () => {
    renderForm('add');

    const submitButton = screen.getByRole('button', { name: /add employee/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    renderForm('add');

    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, 'invalid-email');

    const submitButton = screen.getByRole('button', { name: /add employee/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  //   it('closes form when close button is clicked', () => {
  //     renderForm();

  //     const closeButton = screen.getByRole('button', { name: /close/i });
  //     fireEvent.click(closeButton);

  //     expect(onClose).toHaveBeenCalled();
  //   });

  //   it('submits form with valid data', async () => {
  //     const { store } = renderForm('add');

  //     await userEvent.type(screen.getByLabelText(/name/i), 'Jane Smith');
  //     await userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
  //     await userEvent.type(screen.getByLabelText(/position/i), 'Designer');
  //     await userEvent.type(screen.getByLabelText(/age/i), '28');

  //     // Select department
  //     const departmentSelect = screen.getByLabelText(/department/i);
  //     fireEvent.mouseDown(departmentSelect);
  //     const designOption = screen.getByText(Department.ENGINEERING);
  //     fireEvent.click(designOption);

  //     // Submit form
  //     const submitButton = screen.getByRole('button', { name: /add employee/i });
  //     fireEvent.click(submitButton);

  //     await waitFor(() => {
  //       // Check if success message appears
  //       expect(
  //         screen.getByText(/employee added successfully/i)
  //       ).toBeInTheDocument();
  //     });
  //   });

  //   it('handles API errors gracefully', async () => {
  //     const { store } = renderForm('add');

  //     await userEvent.type(screen.getByLabelText(/name/i), 'Jane Smith');
  //     await userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');

  //     // Force API error
  //     const submitButton = screen.getByRole('button', { name: /add employee/i });
  //     fireEvent.click(submitButton);

  //     await waitFor(() => {
  //       expect(screen.getByText(/failed to add employee/i)).toBeInTheDocument();
  //     });
  //   });

  //   it('disables submit button while submitting', async () => {
  //     renderForm('add');

  //     await userEvent.type(screen.getByLabelText(/name/i), 'Jane Smith');
  //     await userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');

  //     const submitButton = screen.getByRole('button', { name: /add employee/i });
  //     fireEvent.click(submitButton);

  //     expect(submitButton).toBeDisabled();
  //   });

  //   it('shows snackbar on successful submission', async () => {
  //     renderForm('add');

  //     await userEvent.type(screen.getByLabelText(/name/i), 'Jane Smith');
  //     await userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');

  //     const submitButton = screen.getByRole('button', { name: /add employee/i });
  //     fireEvent.click(submitButton);

  //     await waitFor(() => {
  //       expect(screen.getByRole('alert')).toHaveTextContent(
  //         /employee added successfully/i
  //       );
  //     });
  //   });
});
