import Head from "next/head";
import Footer from "@components/Footer";
import { GetStaticProps } from "next";
import prisma from "lib/prisma";
import PlaceholderTable from "@components/PlaceholderTable";
import {data} from '../../utility/2011_2020_bpd_earnings_with_ids.xlsx - 2011_2020_bpd_earnings_with_ids';
import {roleDataOri} from '../../utility/pd_earning_role'
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Doughnut, Bar } from 'react-chartjs-2';


// export const getStaticProps: GetStaticProps = async () => {
//     const feed = await prisma.officer_Pay.findMany();
//     console.log(feed)
//     return {
//       props: {
//         users: JSON.parse(JSON.stringify(feed))
//       }
//     };
// };

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend)

export default function Fio({users}){
  const [combineMap, setCombineMap] = useState<Map<string, number>>(new Map());
  const [overallData, setOverallData] = useState<object>(null);

  const [roleMap, setRoleMap] = useState<Map<string, number>>(new Map());
  const [roleData, setRoleData] = useState<object>(null);
  const [roleOptions, setRoleOptions] = useState<object>(null);

  // Honestly can factorize it into better stuff
  const handleMapAdd = (tmpMap: Map<string, number>, fieldName: string, obj: object) => {
      tmpMap.set(fieldName, (tmpMap.get(fieldName) === undefined? 0: tmpMap.get(fieldName)) + parseInt(obj[fieldName] === ""? 0: obj[fieldName]))
  }

  useEffect(() => {
    if (combineMap.size === 0) {
      // Combine Data
      let tmpMap = combineMap
      data.map((obj: object) => {
        handleMapAdd(tmpMap, 'other', obj)
        handleMapAdd(tmpMap, 'quinn', obj)
        handleMapAdd(tmpMap, 'injured', obj)
        handleMapAdd(tmpMap, 'overtime', obj)
        handleMapAdd(tmpMap, 'regular', obj)
        handleMapAdd(tmpMap, 'retro', obj)
        handleMapAdd(tmpMap, 'detail', obj)
      })
      setCombineMap(tmpMap)

    } 

    if (roleMap.size === 0) {
      let tmpMap = roleMap
      roleDataOri.map((obj: object) => {
        tmpMap.set(obj['Role'], obj['Yearly Earnings (USD)'])
      })

      setRoleMap(tmpMap)
    }
  
  }, [])

  useEffect(() => {
    let tmpData = {
      'labels': [],
      'datasets': [
        {
          label: 'Combine Dollar vote ',
          data: [],
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
          'borderColor': [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          'borderWidth': 1,
        },
      ],
    };

    combineMap.forEach((value, key) => {
      tmpData['labels'].push(key.charAt(0).toUpperCase() + key.substring(1, key.length))
      tmpData['datasets'][0]['data'].push(value)
    })

    setOverallData(tmpData);
  }, [combineMap])

  useEffect(() => {
    let options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Role Average Wage',
        },
      },
    };

    let tmpData = {
      'labels': [],
      'datasets': [
        {
          label: 'Wage',
          data: [],
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
          'borderColor': [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          'borderWidth': 1,
        },
      ],
    };

    roleMap.forEach((value, key) => {
      tmpData['labels'].push(key.charAt(0).toUpperCase() + key.substring(1, key.length))
      tmpData['datasets'][0]['data'].push(value)
    })

    setRoleData(tmpData)
    setRoleOptions(options)
  }, [roleMap])

    return (
        <div>
        <Head>
            <title>Boston Police Index</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Police Financial Information</h1>

        {/* <PlaceholderTable json={users}/> */}
        <div style={{
          display: 'grid',
          placeContent: 'center'
        }}>
          <div style={{
            'height': '400px',
            'width': '800px',
            'display': 'flex'
          }}>
            {overallData && <Pie data={overallData}/>}
            {overallData && <Doughnut data={overallData}/>}
          </div>

          <div style={{
            'height': '400px',
            'width': '800px'
          }}>
              {roleData && <Bar options={roleOptions} data={roleData}/>}
          </div>

        </div>

        <h2>Analysis</h2>

        We don’t serve their kind here!
        What?
        Your droids.
        They’ll have to wait outside.
        We don’t want them here.
        Listen, why don’t you wait out by the speeder.
        We don’t want any trouble.
        I heartily agree with you sir.
        Negola dewaghi wooldugger?!?
        He doesn’t like you.
        I’m sorry.
        I don’t like you either You just watch yourself.
        We’re wanted men.
        I have the death sentence in twelve systems.
        I’ll be careful than.
        You’ll be dead.
        This little one isn’t worth the effort.
        Come let me buy you something…

        ## Explanation

        We don’t serve their kind here!
        What?
        Your droids.
        They’ll have to wait outside.
        We don’t want them here.
        Listen, why don’t you wait out by the speeder.
        We don’t want any trouble.
        I heartily agree with you sir.
        Negola dewaghi wooldugger?!?
        He doesn’t like you.
        I’m sorry.
        I don’t like you either You just watch yourself.
        We’re wanted men.
        I have the death sentence in twelve systems.
        I’ll be careful than.
        You’ll be dead.
        This little one isn’t worth the effort.
        Come let me buy you something…


        <Footer />
        </div>
    )
}