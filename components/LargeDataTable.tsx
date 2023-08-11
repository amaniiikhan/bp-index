import * as React from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";

interface TableData {
  column_def: GridColDef[];
  rows: GridRowsProp;
  isLoading: boolean;
}

const LargeDataTable: React.FC<TableData> = ({ column_def, rows, isLoading }) => {
  return (
    <>
      <DataGrid
        rows={rows}
        columns={column_def}
        slots={{ toolbar: GridToolbar }}
        loading={isLoading}
        initialState={{
          pagination: {paginationModel: {pageSize: 20}}
        }}
      />
    </>
  );
};

export default LargeDataTable;
