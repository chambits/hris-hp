import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Tooltip } from '@mui/material';
import Divider from '@mui/material/Divider';
import {
  ClientSideRowModelModule,
  ColDef,
  ColumnAutoSizeModule,
  DateFilterModule,
  FirstDataRenderedEvent,
  GridSizeChangedEvent,
  ModuleRegistry,
  NumberFilterModule,
  TextFilterModule,
  themeQuartz,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef } from 'react';
import { useQuartzTheme } from '../hooks/useQuartzTheme';
import { Employee } from '../types';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnAutoSizeModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
]);

interface EmployeesTableProps {
  employees: Employee[] | undefined;
  isLoading: boolean;
  onRowDeleted?: (id: string) => void;
  onRowEdited?: (employee: Employee) => void;
  hideActions?: boolean;
}

export const EmployeesTable: React.FC<EmployeesTableProps> = ({
  employees,
  isLoading,
  onRowDeleted,
  onRowEdited,
  hideActions,
}) => {
  const gridRef = useRef<AgGridReact>(null);
  const gridStyle = useMemo(() => ({ height: '70vh', width: '100%' }), []);
  const theme = useQuartzTheme(themeQuartz);

  const statusColors: Record<
    string,
    { color: string; backgroundColor: string }
  > = useMemo(() => {
    return {
      Active: { color: 'white', backgroundColor: 'green' },
      'On Leave': { color: 'white', backgroundColor: 'blue' },
      Terminated: { color: 'white', backgroundColor: 'red' },
      Probation: { color: 'white', backgroundColor: 'orange' },
      Retired: { color: 'white', backgroundColor: 'purple' },
      Default: { color: 'black', backgroundColor: 'gray' },
    };
  }, []);

  const statusCellRenderer = useCallback(
    ({ value }: { value: string }) => {
      const { color, backgroundColor } =
        statusColors[value] || statusColors.Default;
      return (
        <Box
          component="span"
          color={color}
          bgcolor={backgroundColor}
          paddingX={1}
          paddingY={0.25}
          borderRadius={1}
          fontWeight="semibold"
          fontSize="0.8rem"
        >
          {value}
        </Box>
      );
    },
    [statusColors]
  );

  const actionCellRenderer = useCallback(
    (params: { data: Employee }) => {
      if (hideActions) return null;

      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={0.5}
          marginTop={0.5}
        >
          <Tooltip title="Edit Employee" arrow placement="top">
            <IconButton
              data-testid="edit-icon"
              size="small"
              onClick={() => onRowEdited?.(params.data)}
              sx={{
                padding: 0.5,
                '& .MuiSvgIcon-root': {
                  fontSize: '1rem',
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: 16, marginTop: 0.5 }}
          />

          <Tooltip title="Delete Employee" arrow placement="top">
            <IconButton
              data-testid="delete-icon"
              size="small"
              onClick={() => onRowDeleted?.(params.data.id)}
              sx={{
                padding: 0.5,
                color: 'error.main',
                '& .MuiSvgIcon-root': {
                  fontSize: '1rem',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      );
    },
    [onRowDeleted, onRowEdited, hideActions]
  );

  const columnDefs = useMemo<ColDef[]>(
    () => [
      { field: 'id', minWidth: 120 },
      { field: 'name', minWidth: 120 },
      { field: 'email', minWidth: 120 },
      { field: 'position', minWidth: 120 },
      { field: 'department', minWidth: 120 },
      {
        field: 'hireDate',
        minWidth: 120,
        filter: 'agDateColumnFilter',
        sort: 'desc',
      },
      {
        field: 'status',
        minWidth: 120,
        cellRenderer: statusCellRenderer,
      },
      { field: 'age', minWidth: 60 },
      { field: 'country', minWidth: 80 },
      ...(hideActions
        ? []
        : [
            {
              headerName: 'Actions',
              field: 'actions',
              minWidth: 80,
              cellRenderer: actionCellRenderer,
              filter: false,
              sortable: false,
              resizable: false,
            },
          ]),
    ],
    [actionCellRenderer, hideActions, statusCellRenderer]
  );

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: 'agTextColumnFilter',
      suppressHeaderMenuButton: true,
      suppressHeaderContextMenu: true,
    };
  }, []);

  const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <div style={gridStyle}>
      <AgGridReact
        popupParent={document.body}
        ref={gridRef}
        className="ag-theme-quartz"
        rowData={employees}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        loading={isLoading}
        onGridSizeChanged={onGridSizeChanged}
        onFirstDataRendered={onFirstDataRendered}
        theme={theme}
      />
    </div>
  );
};
