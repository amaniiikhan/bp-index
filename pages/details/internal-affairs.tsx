import Head from "next/head";
import Footer from "@components/Footer";
import { GetStaticProps } from "next";
import prisma from "lib/prisma";
import PlaceholderTable from "@components/PlaceholderTable";
import content from "../../components/IA.json";
import Chart from "chart.js/auto";
import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BarController } from 'chart.js';
import {
   Chart as ChartJS,
   ArcElement,
   Tooltip,
   Legend,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
 } from "chart.js";
import LargeDataTable from "@components/LargeDataTable";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

 ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   BarController,
   Title,
   Tooltip,
   Legend
 );

 ChartJS.register(ArcElement, Tooltip, Legend);

// export const getStaticProps: GetStaticProps = async () => {
//   const feed = internalaffairs;
//   console.log(feed[1]);
//   return {
//     props: {
//       internal_affairs_cases: JSON.parse(JSON.stringify(feed)),
//     },
//   };
// };

export default function InternalAffairs() {
  const dateValueGetter = (params: GridValueGetterParams) => {
    return new Date(Date.parse(params.row["Completed date"]));
  };

  const dateValueFormatter = (params: GridValueGetterParams) => {
    return params.value.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  const columns: GridColDef[] = [
    { field: "IA No", headerName: "IA No", width: 130, type: "string" },
    {
      field: "Incident type",
      headerName: "Incident type",
      width: 200,
      type: "string",
    },
    {
      field: "Received date",
      headerName: "Received date",
      width: 180,
      type: "dateTime",
      valueFormatter: dateValueFormatter,
      valueGetter: dateValueGetter,
    },
    {
      field: "Title/rank (snap)",
      headerName: "Title/rank (snap)",
      width: 150,
      type: "string",
    },
    {
      field: "First name",
      headerName: "First name",
      width: 150,
      type: "string",
    },
    { field: "Last name", headerName: "Last name", width: 150, type: "string" },
    {
      field: "Allegation",
      headerName: "Allegation",
      width: 250,
      type: "string",
    },
    {
      field: "Disposition",
      headerName: "Disposition",
      width: 150,
      type: "string",
    },
    {
      field: "Completed date",
      headerName: "Completed date",
      width: 180,
      valueFormatter: dateValueFormatter,
      valueGetter: dateValueGetter,
      type: "dateTime",
    },
  ];

  //creates an object to keep count of occurences
   const count = {};
   const data = require('../../utility/extracleandata.json');
   const allegation_data=data.Allegation;
   for (const key in allegation_data) {
     if (count[allegation_data[key]]) {
       count[allegation_data[key]]++;
     } else {
       count[allegation_data[key]] = 1;
     }
   }
   const labels = Object.keys(count);
   const values = Object.values(count);
 //  console.log(count);
   
  // //set values to later use for graph
   const [chartData, setChartData] = useState({
     labels: labels,
     datasets: [
       {
         label: "Allegations:",
         data: values,
         responsive: false,
         backgroundColor: [
           "rgba(255, 99, 132, 0.2)",
           "rgba(54, 162, 235, 0.2)",
           "rgba(255, 206, 86, 0.2)",
           "rgba(75, 192, 192, 0.2)",
           "rgba(153, 102, 255, 0.2)",
        ],
       },
     ],
   });
      var disposition_count = {};
      const d_data = require('../../components/IA.json');
      const disposition_data=d_data.Disposition;
      for (const dkey in disposition_data) {
        if (disposition_count[disposition_data[dkey]]) {
          disposition_count[disposition_data[dkey]]++;
        } else {
            disposition_count[disposition_data[dkey]] = 1;
      }
    }
    const disposition_labels = Object.keys(disposition_count);
    const disposition_values = Object.values(disposition_count);
    console.log(disposition_count);

   const [barData, setbarData] = useState({
    labels: disposition_labels,
    datasets: [{
      label: 'Dispositions',
      data : disposition_values,
      responsive: false,
      backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],    
      borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1

   }]
  });

  return (
    <div>
      <Head>
        <title>Boston Police Index</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Officer Misconduct Information</h1>
      <LargeDataTable column_def={columns} rows={content} />
      <div className="Fio">
        <div style={{
          'height': '550px',
          'width': '550px',
        }}>
         <Pie data={chartData} /> 
      </div>
      </div>
      <div className="chart-container">
      <div style={{
          'height': '550px',
          'width': '550px',
        }}>
         <Bar data={barData}/> 
      </div>
      </div>
      <h2>Analysis</h2>
      Using the Boston Police Internal Affairs Division records, we were able to
      come up with the following data visuals. We found the most common
      allegations in this time frame were negligent duty/unreasonable judgement
      followed by respectful treatment. Over this time frame, allegation volume
      showed a d ownwards sloping trend line. In terms of dispositions, the
      dataset showed 40.1% not sustained, 31.3% sustained, 15.4% unfounded,
      12.8% exonerated, and the remaining 0.4% were withdrawn or filed.
      <Footer />
    </div>
  );
}
