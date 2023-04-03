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

interface TableData {
  json: string;
}

const Placeholder:React.FC<TableData> = ({json}) => {
  //JSON.parse(JSON.stringify(json)) is redundant as json should be a string,
  //but code crashes unless written this way
  let parsedJSON
  try {
    parsedJSON = JSON.parse(JSON.stringify(json))
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Invalid JSON:', error.message);
    } else {
      throw error;
    }
  }
  
  let jsonArr = Object.keys(parsedJSON).map(key => parsedJSON[key])
  
  const [data, setData] = React.useState(() => [...jsonArr]);
  // const rerender = React.useReducer(() => ({}), {})[1];

  const column = Object.keys(parsedJSON[0]);

  const ThData = ()=>{
    return column.map((data)=>{
      return <TableCell key={data}>{data}</TableCell>
    })
  }

  const downloadCsv = () => {
    const csvData = json2csv.parse(data); // convert table data to CSV format
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' }); // create a Blob object with the CSV data
    const url = URL.createObjectURL(blob); // create a URL object with the Blob object
    const link = document.createElement('a'); // create a link element
    link.setAttribute('href', url); // set the link's href attribute to the URL
    
    //We need to change "hello.csv" to something dynamic depending on the current page"
    link.setAttribute('download', 'hello.csv'); // set the link's download attribute to the filename

    link.style.display = 'none'; // hide the link
    document.body.appendChild(link); // add the link to the DOM
    link.click(); // click the link
    document.body.removeChild(link); // remove the link from the DOM
    URL.revokeObjectURL(url); // release the URL object
  };

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
    <Button variant="contained" color="primary" onClick={downloadCsv}>
      Download CSV
    </Button>
    </div>
  );
}


export default Placeholder;