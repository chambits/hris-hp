# HRIS - HP

This project is an Employee Management System built with React, TypeScript, and Material-UI. It provides functionalities to manage employee data, including adding, editing, and displaying employee information in a table format.

## Features

- **Employee Table**: Displays a list of employees with options to edit or delete entries.
- **Employee Form**: Allows adding new employees or editing existing employee details.
- **State Management**: Utilizes Redux for state management.
- **API Integration**: Uses RTK Query for API calls to add or update employee data.

## Project Structure

- **src/features/employees/EmployeesTable.tsx**: Component for displaying the employee table with actions for editing and deleting employees.
- **src/features/employees/EmployeeForm.tsx**: Component for the employee form used to add or edit employee details.
- **src/features/employees/**tests**/EmployeesTable.test.tsx**: Test file for the `EmployeesTable` component.
- **src/features/employees/**tests**/EmployeeForm.test.tsx**: Test file for the `EmployeeForm` component.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hris-hp/hris-hp.git
   cd hris-hp
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

## Testing

To run the tests, use the following command:

```bash
yarn test
```
