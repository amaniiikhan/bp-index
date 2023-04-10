import * as React from "react";
import ReactDOM from "react-dom/client";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import json2csv from 'json2csv';

/*
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'container-us-west-43.railway.app',
  database: 'railway',
  password: 'iG5CEYV5GU6DaDpBv5Nb',
  port: 5432, // default port for PostgreSQL
});

*/

interface TableData {
  json: string;
}

const OfficerTable:React.FC<TableData> = ({json}) => {
  //JSON.parse(JSON.stringify(json)) is redundant as json should be a string,
  //but code crashes unless written this way
  let parsedJSON = JSON.parse(JSON.stringify(json))
  let jsonArr = Object.keys(parsedJSON).map(key => parsedJSON[key])
  
  const [data, setData] = React.useState(() => [...jsonArr]);
  // const rerender = React.useReducer(() => ({}), {})[1];

  const column = Object.keys(parsedJSON[0]);
  

  const ThData = ()=>{
    return column.map((data)=>{
      return <TableCell key={data}>{data}</TableCell>
    })
  }

  

  return (
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow key="labels">
            {ThData()}
            </TableRow>
        </TableHead>
        <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {column.map((v) => (
              <TableCell key={`${index}-${v}`}>
                {row[v]}
              </TableCell>
            ))}
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
    
    </div>
  );
}


export default OfficerTable;