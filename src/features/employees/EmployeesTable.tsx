import { AgGridReact } from 'ag-grid-react';
import {
  ClientSideRowModelModule,
  ColDef,
  ModuleRegistry,
} from 'ag-grid-community';
import { useState } from 'react';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export const EmployeesTable = () => {
  const [rowData] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      position: 'Software Engineer',
      department: 'Engineering',
      hireDate: '2020-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      position: 'HR Manager',
      department: 'Human Resources',
      hireDate: '2018-05-20',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@company.com',
      position: 'Sales Representative',
      department: 'Sales',
      hireDate: '2019-11-01',
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice.brown@company.com',
      position: 'Product Manager',
      department: 'Product',
      hireDate: '2021-03-10',
    },
    {
      id: 5,
      name: 'Charlie Wilson',
      email: 'charlie.wilson@company.com',
      position: 'Marketing Specialist',
      department: 'Marketing',
      hireDate: '2022-07-05',
    },
  ]);

  const [columnDefs] = useState<ColDef[]>([
    { field: 'name' },
    { field: 'email' },
    { field: 'position' },
    { field: 'department' },
    { field: 'hireDate' },
  ]);

  return (
    <div className="ag-theme-material" style={{ height: 500 }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};
