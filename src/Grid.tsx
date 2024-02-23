import { AgGridReact } from "ag-grid-react";
import { 
  GridReadyEvent, 
  GridApi, ColumnApi, ColDef, 
  IDateFilterParams, 
  ModuleRegistry, 
  IClipboardCopyParams
} from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import React, {
  useCallback,
  useRef,
  useMemo,
  useImperativeHandle,
} from 'react';
import moment from 'moment';
import { NumberFilter } from "./NumberFilter";
import './Grid.css';

const dateFilterParams = {
  
  minValidDate: '2000-01-01',
  maxValidDate: new Date(),
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
  minValidYear: 2000,
  maxValidYear: 2022,
  // inRangeFloatingFilterDateFormat: 'Do MMM YYYY',
};

const dateFormatter = (params:any) => {
  return moment(params.value).format('MM/DD/YYYY');
}

const numberFormatter = (params:any) => {
  if ( typeof params.value === 'number')
    return params.value
  else{
    if (params.colDef.field === "q_au_2") console.log(parseFloat(params.value), params, "why tho")
    return parseFloat(params.value)? parseFloat(params.value):0;
  }
}

const cellRenderFunction = (data:any) => {
  return (data.value === 'Y' ? 'YES':( data.value === 'n/a'? '':'NO') )
}

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation" , filter: 'agTextColumnFilter' },
  { 
    field: "discovery_date", 
    headerName: "Discovery Date" ,
    filter: 'agDateColumnFilter', 
    valueFormatter: dateFormatter,
    filterParams: dateFilterParams,
  },
  { field: "h_mag", headerName: "H (mag)" , filter: 'agNumberColumnFilter', comparator: (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB,  },
  { field: "moid_au", headerName: "MOID (au)" , filter: 'agNumberColumnFilter', comparator: (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB,  },
  { field: "q_au_1", headerName: "q (au)" , filter: 'agNumberColumnFilter', comparator: (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB,  },
  { field: "q_au_2", headerName: "Q (au)" , filter: 'agNumberColumnFilter', comparator: (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB,  },
  { field: "period_yr", headerName: "Period (yr)" , filter: 'agNumberColumnFilter', comparator: (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB,  },
  { field: "i_deg", headerName: "Inclination (deg)" , filter: 'agNumberColumnFilter', comparator: (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB,  },
  { 
    field: "pha", 
    headerName: "Potentially Hazardous" , 
    cellRenderer: cellRenderFunction, 
    filter: 'agTextColumnFilter',
    
  },
  { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, filter: 'agTextColumnFilter' },
];



const NeoGrid = (): JSX.Element => {

  const gridRef = useRef<AgGridReact<any>>(null);

  const clearFilters = useCallback(() => {
    gridRef.current!.api.setFilterModel(null);
  }, [])

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true, sortable: true,
      filterParams: {
        includeBlanksInEquals: false,
        includeBlanksInLessThan: false,
        includeBlanksInGreaterThan: false,
        includeBlanksInRange: false,
      },  
    };
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 750, width: 1530 }}>
      <button className="clear-btn" onClick={clearFilters} > Clear Filters and Sorters </button>
      <br />
      <AgGridReact
        ref={gridRef} // no funciona, documentacion incompleta
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
        copyHeadersToClipboard={true}
        enableRangeSelection={true}
        // rowSelection={'multiple'}
        suppressCopySingleCellRanges={true}
        enableCellTextSelection={true}  //copying cells seem to be working only on the enterprise version
        ensureDomOrder={true}
        // enable_enterprise_modules={true}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default NeoGrid;

// I completed this code while dealing with time restraints, i do not expect consideration but thought I'd explain myself, thanks for the interesting excercise

// pt. 2, I've checked the modules for clues on how to proceed with the other tasks, different instructions than hat seems in the documentation
// I'm afraid i'll leave this test completed up to thia part, as i am still time restrained while looking for job opportunities, although still apreciate your consideration