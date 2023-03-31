import * as React from "react";
import ReactDOM from "react-dom/client";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface TableData {
  json: string;
}

const Placeholder:React.FC<TableData> = ({json}) => {
  //JSON.parse(JSON.stringify(json)) is redundant as json should be a string,
  //but code crashes unless written this way
  let parsedJSON = JSON.parse(JSON.stringify(json))
  let jsonArr = Object.keys(parsedJSON).map(key => parsedJSON[key])
  
  const [data, setData] = React.useState(() => [...jsonArr]);
  // const rerender = React.useReducer(() => ({}), {})[1];

  const column = Object.keys(parsedJSON[0]);

  const ThData = ()=>{
    return column.map((data)=>{
      return <TableCell>{data}</TableCell>
    })
  }

  const tdData = (row) =>{
      return(
        column.map((v)=>{
            return <TableCell>{row[v]}</TableCell>
        })
      )
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {ThData()}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow>
                {tdData(row)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default Placeholder;