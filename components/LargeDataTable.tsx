import * as React from "react";
import ReactDOM from "react-dom/client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import json2csv from "json2csv";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";

interface TableData {
  column_def: GridColDef[];
  rows: GridRowsProp;
}

const LargeDataTable: React.FC<TableData> = ({ column_def, rows }) => {
  return (
    <>
      <DataGrid
        rows={rows}
        columns={column_def}
        initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
        slots={{ toolbar: GridToolbar }}
      />
    </>
  );
};

export default LargeDataTable;
