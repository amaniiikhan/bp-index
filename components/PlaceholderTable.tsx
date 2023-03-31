import * as React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumn,
  ColumnDef
} from "@tanstack/react-table";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("visits", {
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
    footer: (info) => info.column.id,
  }),
];

interface TableData {
  json: string;
}

const PlaceholderTable:React.FC<TableData> = ({json}) => {
  //JSON.parse(JSON.stringify(json)) is redundant as json should be a string,
  //but code crashes unless written this way
  let parsedJSON = JSON.parse(JSON.stringify(json))
  let jsonArr = Object.keys(parsedJSON).map(key => parsedJSON[key])
  
  const [data, setData] = React.useState(() => [...jsonArr]);
  // const rerender = React.useReducer(() => ({}), {})[1];

  const column = Object.keys(parsedJSON[0]);

  const ThData =()=>{
    return column.map((data)=>{
      return <th key={data}>{data}</th>
    })
  }

  const tdData =() =>{
    return data.map((data)=>{
      return(
        <tr>
          {
            column.map((v)=>{
              return <td>{data[v]}</td>
            })
          }
        </tr>
      )
    })
}

  return (
    <table className="table">
      <thead>
       <tr>{ThData()}</tr>
      </thead>
      <tbody>
      {tdData()}
      </tbody>
     </table>
)
}


export default PlaceholderTable;