import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, useTheme } from '@mui/material';
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
  colorSchemeLight,
  themeQuartz,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef } from 'react';
import { useAppTheme } from '../../../store/themeSlice';
import { Employee } from '../types';

const themeLight = themeQuartz.withPart(colorSchemeLight);
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
}

export const EmployeesTable: React.FC<EmployeesTableProps> = ({
  employees,
  isLoading,
  onRowDeleted,
  onRowEdited,
}) => {
  const gridRef = useRef<AgGridReact>(null);
  const gridStyle = useMemo(() => ({ height: '70vh', width: '100%' }), []);
  const { mode } = useAppTheme();
  const theme = useTheme();

  const themeDark = themeQuartz.withParams({
    backgroundColor: '#090E23',
    foregroundColor: theme.palette.text.primary,
    headerTextColor: theme.palette.text.primary,
    headerBackgroundColor: theme.palette.background.default,
    oddRowBackgroundColor: theme.palette.background.default,
    headerColumnResizeHandleColor: theme.palette.text.primary,
  });

  const statusCellRenderer = useCallback((params: { value: string }) => {
    const status = params.value;
    let color = '';
    let backgroundColor = '';
    switch (status) {
      case 'Active':
        color = 'white';
        backgroundColor = 'green';
        break;
      case 'On Leave':
        color = 'white';
        backgroundColor = 'blue';
        break;
      case 'Terminated':
        color = 'white';
        backgroundColor = 'red';
        break;
      case 'Probation':
        color = 'white';
        backgroundColor = 'orange';
        break;
      case 'Retired':
        color = 'white';
        backgroundColor = 'purple';
        break;
      default:
        color = 'black';
        backgroundColor = 'gray';
    }

    return (
      <Box
        component="span"
        color={color}
        bgcolor={backgroundColor}
        padding="2px 8px"
        borderRadius="4px"
        fontWeight="semibold"
      >
        {status}
      </Box>
    );
  }, []);

  const actionCellRenderer = useCallback(
    (params: { data: Employee }) => {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          padding={0.5}
        >
          <EditIcon
            data-testid="edit-icon"
            style={{ cursor: 'pointer' }}
            fontSize="small"
            onClick={() => onRowEdited?.(params.data)}
          />
          <Divider orientation="vertical" flexItem />
          <DeleteIcon
            data-testid="delete-icon"
            style={{ cursor: 'pointer', color: 'red' }}
            fontSize="small"
            onClick={() => onRowDeleted?.(params.data.id)}
          />
        </Box>
      );
    },
    [onRowDeleted, onRowEdited]
  );

  const columnDefs = useMemo<ColDef[]>(
    () => [
      { field: 'id', minWidth: 120 },
      { field: 'name', minWidth: 120 },
      { field: 'email', minWidth: 100 },
      { field: 'position', minWidth: 100 },
      { field: 'department', minWidth: 120 },
      {
        field: 'hireDate',
        minWidth: 100,
        filter: 'agDateColumnFilter',
        sort: 'desc',
      },
      {
        field: 'status',
        minWidth: 120,
        cellRenderer: statusCellRenderer,
      },
      { field: 'age', minWidth: 80 },
      { field: 'country', minWidth: 80 },
      {
        headerName: 'Actions',
        field: 'actions',
        minWidth: 80,
        cellRenderer: actionCellRenderer,
        filter: false,
        sortable: false,
        resizable: false,
      },
    ],
    [actionCellRenderer, statusCellRenderer]
  );

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: 'agTextColumnFilter',
      suppressHeaderMenuButton: true,
      suppressHeaderContextMenu: true,
    };
  }, []);

  const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
    const gridWidth = document.querySelector('.ag-body-viewport')!.clientWidth;
    const columnsToShow = [];
    const columnsToHide = [];
    let totalColsWidth = 0;
    const allColumns = params.api.getColumns();
    if (allColumns && allColumns.length > 0) {
      for (let i = 0; i < allColumns.length; i++) {
        const column = allColumns[i];
        totalColsWidth += column.getMinWidth();
        if (totalColsWidth > gridWidth) {
          columnsToHide.push(column.getColId());
        } else {
          columnsToShow.push(column.getColId());
        }
      }
    }
    params.api.setColumnsVisible(columnsToShow, true);
    params.api.setColumnsVisible(columnsToHide, false);
    window.setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 10);
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <div style={gridStyle}>
      <AgGridReact
        popupParent={document.body}
        ref={gridRef}
        onRowClicked={(e) => console.log('ROW CLICKED', e)}
        className="ag-theme-quartz"
        rowData={employees}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        loading={isLoading}
        onGridSizeChanged={onGridSizeChanged}
        onFirstDataRendered={onFirstDataRendered}
        theme={mode === 'Dark' ? themeDark : themeLight}
      />
    </div>
  );
};
