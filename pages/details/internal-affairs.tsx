import Head from "next/head";
import Footer from "@components/Footer";
import { GetStaticProps } from "next";
import prisma from "lib/prisma";
import PlaceholderTable from "@components/PlaceholderTable";
<<<<<<< HEAD
import internalaffairs from "@components/IA.json"
=======
//import data from "../../utility/cleaned_data.json";
import Chart from 'chart.js/auto'
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
>>>>>>> bf6945c023df0e9084b4f5be0bc3385ffef90a85

ChartJS.register(ArcElement, Tooltip, Legend);

<<<<<<< HEAD
export const getStaticProps: GetStaticProps = async () => {
  const feed = internalaffairs
  console.log(feed)
  return {
    props: {
      table: JSON.parse(JSON.stringify(feed))
    }
  };
};
=======
ChartJS.register(CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend)

//export const getStaticProps: GetStaticProps = async () => {
 //   const feed = internalaffairs;
//    console.log(feed)
//    return {
//      props: {
//        table: JSON.parse(JSON.stringify(feed))
//      }
//    };
//};
>>>>>>> bf6945c023df0e9084b4f5be0bc3385ffef90a85

export default function Fio({users}){

  const data = require('../../utility/extracleandata.json');

  const allegation_data = data.Allegation

  //creates an object to keep count of occurences
  const count = {};
    for (const key in allegation_data) {
      if (count[allegation_data[key]]) {
        count[allegation_data[key]]++;
      } else {
        count[allegation_data[key]] = 1;
      }
    }
  const labels = Object.keys(count);
  const values = Object.values(count);
  
  //set values to later use for graph
  const [chartData, setChartData] = useState({ 
    labels: labels,
    datasets: [
      {
        label: "Allegations:",
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 255, 255, 0.2)',
            'rgba(0, 0, 0, 0.2)',
        ],
      }
    ],
  });

    return (
        <div>
        <Head>
            <title>Boston Police Index</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Officer Misconduct Information</h1>

        <PlaceholderTable json={users}/>

    
        <div className="Fio">
          <style> 'height': 400px, 'width': 800px </style>
          <Pie data={chartData}/>
        </div>

        <h2>Analysis</h2>

        Using the Boston Police Internal Affairs Division records, we were able to 
        come up with the following data visuals. We found the most common allegations
         in this time frame were negligent duty/unreasonable judgement followed by 
         respectful treatment. Over this time frame, allegation volume showed a d
         ownwards sloping trend line. In terms of dispositions, the dataset showed 
         40.1% not sustained, 31.3% sustained, 15.4% unfounded, 12.8% exonerated, and the 
         remaining 0.4% were withdrawn or filed. 

        


        <Footer />
        </div>
    )
}
