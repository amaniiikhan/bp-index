import * as React from "react";
import { useState, useEffect } from 'react';
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
import * as pg from 'pg';
import InfiniteScroll from 'react-infinite-scroll-component';

interface TableData {
  json: string;
  limit: number;
}

const Placeholder:React.FC<TableData> = ({json, limit}) => {
  // const { Sequelize } = require('sequelize');
  // const sequelize = new Sequelize('postgresql://postgres:iG5CEYV5GU6DaDpBv5Nb@containers-us-west-43.railway.app:7705/railway')

  // async function connect() {
  //   try {
  //     await sequelize.authenticate();
  //     console.log('Connection has been established successfully.');
  //   } catch (error) {
  //     console.error('Unable to connect to the database:', error);
  //   }
  // }

  // connect()
  
  //JSON.parse(JSON.stringify(json)) is redundant as json should be a string,
  //but code crashes unless written this way

  // console.log(json)
  
  let parsedJSON = ""
  try {
    parsedJSON = JSON.parse(JSON.stringify(json))
    let jsonArr = Object.keys(parsedJSON).map(key => parsedJSON[key])
    const [data, setData] = React.useState(() => [...jsonArr]);
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

    const [currentLimit, setCurrentLimit] = useState(limit);
    const [displayData, setDisplayData] = useState(data.slice(0, limit));
    
    useEffect(() => {
        setDisplayData(data.slice(0, currentLimit));
      }, [data, currentLimit]);

    const handleLoadMore = () => {
      const newLimit = currentLimit + 10; // increase the limit by 10
      setCurrentLimit(newLimit);
      console.log(newLimit)
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
          <Table style={{ tableLayout: "fixed" }}></Table>
            <TableBody>
            {displayData.map((row, index) => (
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

      {displayData.length < data.length && (
        <Button onClick={handleLoadMore}>Load More</Button>
      )}


      <Button variant="contained" color="primary" onClick={downloadCsv}>
        Download CSV
      </Button>
      </div>
    );
  } catch (error) {
      console.error('Invalid JSON:', error.message);
      return <div>Invalid JSON data</div>
  }

}


export default Placeholder;