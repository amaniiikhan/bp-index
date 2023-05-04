import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

interface TableData {
  json: Object[];
}

const PlaceholderTable:React.FC<TableData> = ({json}) => {
  try {
    const rows = json
    const rowsWithId : Object[] = rows.map((row, index) => ({...row, id: index}))
    const temp = rowsWithId[0]
    let columns = []
    for (const key in temp) {
      columns.push({ field: key, headerName: key,  flex: 1 } )
    }
    
    return <Box sx={{ height: 600, width: "100%" }}>
    <DataGrid rows={rowsWithId} columns={columns} slots={{ toolbar: GridToolbar }}/>;
  </Box>

  } catch (e) {
    return <div>Invalid JSON</div>
  }
}


export default PlaceholderTable;