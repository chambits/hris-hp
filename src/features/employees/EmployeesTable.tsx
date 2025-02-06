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
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useGetEmployeesQuery } from './employeesApi';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnAutoSizeModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
]);

export const EmployeesTable = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: 800, width: '100%' }), []);
  const { data: employees, error, isLoading } = useGetEmployeesQuery();

  console.log(isLoading);

  //   const [rowData] = useState(employees);

  const statusCellRenderer = (params: any) => {
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
      <span
        style={{
          color,
          backgroundColor,
          padding: '2px 8px',
          borderRadius: '4px',
          fontWeight: 'semibold',
        }}
      >
        {status}
      </span>
    );
  };

  const [columnDefs] = useState<ColDef[]>([
    { field: 'id', minWidth: 150 },
    { field: 'name', minWidth: 150 },
    { field: 'email', minWidth: 100 },
    { field: 'position', minWidth: 100 },
    { field: 'department', minWidth: 100 },
    { field: 'hireDate', minWidth: 100, filter: 'agDateColumnFilter' },
    {
      field: 'status',
      minWidth: 100,
      cellRenderer: statusCellRenderer,
    },
    { field: 'age', minWidth: 20 },
    { field: 'country', minWidth: 100 },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: 'agTextColumnFilter',
      suppressHeaderMenuButton: true,
      suppressHeaderContextMenu: true,
    };
  }, []);

  const onGridSizeChanged = useCallback(
    (params: GridSizeChangedEvent) => {
      // get the current grids width
      const gridWidth =
        document.querySelector('.ag-body-viewport')!.clientWidth;
      // keep track of which columns to hide/show
      const columnsToShow = [];
      const columnsToHide = [];
      // iterate over all columns (visible or not) and work out
      // now many columns can fit (based on their minWidth)
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
      // show/hide columns based on current grid width
      params.api.setColumnsVisible(columnsToShow, true);
      params.api.setColumnsVisible(columnsToHide, false);
      // wait until columns stopped moving and fill out
      // any available space to ensure there are no gaps
      window.setTimeout(() => {
        params.api.sizeColumnsToFit();
      }, 10);
    },
    [window]
  );

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  const popupParent = useMemo<HTMLElement | null>(() => {
    return document.body;
  }, []);

  return (
    // <div style={containerStyle}>
    <div style={gridStyle}>
      <AgGridReact
        //   domLayout={'autoHeight'}
        popupParent={popupParent}
        ref={gridRef}
        onRowClicked={(e) => console.log('ROW CLICKED', e)}
        className="ag-theme-quartz"
        rowData={employees}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        loading={isLoading}
        suppressServerSideFullWidthLoadingRow={true}
        onGridSizeChanged={onGridSizeChanged}
        onFirstDataRendered={onFirstDataRendered}
      />
    </div>
    // </div>
  );
};
