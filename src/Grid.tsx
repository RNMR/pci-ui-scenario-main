import { AgGridReact } from "ag-grid-react";
import { GridReadyEvent, GridApi, ColumnApi, ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import React, {
  useCallback,
  useRef,
  useMemo,
} from 'react';
import moment from 'moment';
import { NumberFilter } from "./NumberFilter";

const dateFormatter = (params:any) => {
  console.log("p", params)
  return moment(params.value).format('MM/DD/YYYY');
}

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation" , filter: 'agTextColumnFilter', sortable: true},
  { 
    field: "discovery_date", 
    headerName: "Discovery Date" , 
    valueFormatter: dateFormatter,
    sortable: true
  },
  { field: "h_mag", headerName: "H (mag)" , filter: 'agNumberColumnFilter', sortable: true},
  { field: "moid_au", headerName: "MOID (au)" , filter: 'agNumberColumnFilter', sortable: true},
  { field: "q_au_1", headerName: "q (au)" , filter: 'agNumberColumnFilter', sortable: true},
  { field: "q_au_2", headerName: "Q (au)" , filter: 'agNumberColumnFilter', sortable: true},
  { field: "period_yr", headerName: "Period (yr)" , filter: 'agNumberColumnFilter', sortable: true},
  { field: "i_deg", headerName: "Inclination (deg)" , filter: 'agNumberColumnFilter', sortable: true},
  { 
    field: "pha", 
    headerName: "Potentially Hazardous" , 
    cellRenderer: (data:any) => {
      return (data.value === 'Y' ? 'YES':'NO' )
    }, 
    filter: 'agTextColumnFilter',
    sortable: true
  },
  { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, filter: 'agTextColumnFilter',  sortable: true },
];

// const defaultColDef = useMemo(() => { 
// 	return {
//         sortable: true
//     };
// }, []);



const NeoGrid = (): JSX.Element => {
  const gridRef = useRef();

  const resetFilters = useCallback(() => {
    // gridRef.current.api.setFilterModel(null)
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <button onClick={resetFilters} > RESET FILTERS </button>
      <br />
      <AgGridReact
        // ref={gridRef} // no funciona, documentacion incompleta
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
        copyHeadersToClipboard={true}
        // enableRangeSelection={true}
        // rowSelection={'multiple'}
        suppressCopySingleCellRanges={true}
        enableCellTextSelection={true}  //copying cells seem to be working only on the enterprise version
        // defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default NeoGrid;

// I completed this code while dealing with time restraints, i do not expect consideration but thought I'd explain myself, thanks for the interesting excercise