// arrest.tsx
import Head from "next/head";
import Footer from "@components/Footer";
import PlaceholderTable from "@components/PlaceholderTable";
import "leaflet/dist/leaflet.css";
// for map functions 
import dynamic from "next/dynamic";
import { GetStaticProps } from 'next';
import AIData from "components/ArrestData/AI.json" assert { type: 'json' };
import fs from "fs";
import path from "path";
import Chart from "chart.js/auto";
// import { LogarithmicScale } from 'chart.js';
import React, { useEffect, useRef, useState, useCallback } from "react";




// presenting data table 
export const getStaticProps: GetStaticProps = async () => {
  // Use the first five rows from the AIData JSON file
  const firstFiveRows = AIData.slice(0, 5);
  const arrestinformtion = AIData;
  // accessing geojson file 
  const policeDistrictsFilePath = path.join(process.cwd(), "components/ArrestData/Police_Districts.geojson");
  const policeDistrictsFileContents = fs.readFileSync(policeDistrictsFilePath, "utf8");
  const policeDistricts = JSON.parse(policeDistrictsFileContents);
  return {
    props: {
      firstFiveRows,
      arrestinformtion,
      policeDistricts,
    },
  };
};

// Dynamically import the OffenseCaseMap component
const ArrestMap = dynamic(() => import('components/ArrestData/ArrestMap'), {
  ssr: false
});

// bar chart for different type of offense 
const offenseCountsByAge = {};

AIData.forEach((entry) => {
  const age = Math.floor(entry.age_code / 10) * 10;
  const offense = entry.OFFENSE_DESCRIPTION;

  if (!offenseCountsByAge[age]) {
    offenseCountsByAge[age] = {};
  }

  if (offenseCountsByAge[age][offense]) {
    offenseCountsByAge[age][offense]++;
  } else {
    offenseCountsByAge[age][offense] = 1;
  }
});

const ageGroups = Object.keys(offenseCountsByAge).sort((a, b) => Number(a) - Number(b));
const offenseCounts = {};

ageGroups.forEach((age) => {
  Object.entries(offenseCountsByAge[age]).forEach(([offense, count]) => {
    if (!offenseCounts[offense]) {
      offenseCounts[offense] = {};
    }
    offenseCounts[offense][age] = count;
  });
});


const sortedOffenseData = Object.entries(offenseCounts).sort((a, b) => {
  const sumA = Object.values(a[1]).reduce((acc, val) => acc + val, 0);
  const sumB = Object.values(b[1]).reduce((acc, val) => acc + val, 0);
  return sumB - sumA;
}).slice(0, 7); // Add .slice(0, 7) to get the top 7 offenses

const sortedOffenseLabels = sortedOffenseData.map(([offense]) => offense);
const offenseCountsData = sortedOffenseData.map(([, countsByAge]) => countsByAge);

const offenseCountsDataWithPercentage = offenseCountsData.map((countsByAge) => {
  const totalCount = Object.values(countsByAge).reduce((acc, val) => Number(acc) + Number(val), 0);
  const countsWithPercentage = {};

  ageGroups.forEach((age) => {
    const count = countsByAge[age] || 0;
    const percentage = (count / totalCount) * 100;
    countsWithPercentage[age] = { count, percentage };
  });

  return countsWithPercentage;
});

const shortOffenseLabels = sortedOffenseData.map(([offense]) => offense.slice(0, 11));

const CustomLegend = ({ labels }) => {
  return (
    <table>
      <tbody>
        {labels.map((label, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{label}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const OffenseBarChart = ({ data, labels, ageGroups }) => {
  const chartRef = useRef(null);
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#2ecc71'];


  const getAgeGroupLabel = (age) => {
    if (age === 0) {
      return "0-9";
    } else {
      return `${age}-${Number(age)+ 9}`;
    }
  };

  useEffect(() => {
    if (chartRef.current) {
    const myChart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: shortOffenseLabels, // Change this line,
        datasets: ageGroups.map((age, index) => {
          const counts = data.map((countsWithPercentage) => countsWithPercentage[age]?.count || 0);
          return {
            label: getAgeGroupLabel(age),
            data: counts,
            backgroundColor: colors[index % colors.length],
            borderColor: colors[index % colors.length],
            borderWidth: 1
          };
        }),
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const ageGroup = context.dataset.label;
                const offense = context.label;
                const count = context.parsed.y;
                const percentage = data[context.dataIndex][ageGroups[context.datasetIndex]].percentage.toFixed(2);
                return `${offense} 
                (${ageGroup}): ${count} 
                Percentage: ${percentage}%`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            stacked: true
          },
          x: {
            stacked: true
          }
        }
      }
    });

    return () => {myChart.destroy();};
  }

  }, [data, labels, ageGroups]);

  return (
    <canvas ref={chartRef} />
  );
};



// Histogram 

const OffensehisChart = ({ ageGroups }) => {
  const chartRef2 = useRef(null);
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#2ecc71'];
            
  const getAgeGroupLabel = (age) => {
    if (age === 0) {
      return "0-9";
    } else {
      return `${Number(age)}-${Number(age)+9}`;
    }
  };
                        
  const ageGroupCounts = ageGroups.map((age) => {
    const counts = Object.values(offenseCounts).map((offenseCountsForAge) => offenseCountsForAge[age] || 0);
    return counts.reduce((a, b) => a + b, 0);
  });
  
  useEffect(() => {
    if (chartRef2.current) {
      const myChart = new Chart(chartRef2.current, {
        type: "bar",
data: {
  labels: ageGroups.map((age) => getAgeGroupLabel(age)),
  datasets: [
    {
      label: "Offenses by Age Group",
      data: ageGroupCounts,
      backgroundColor: colors[1],
      borderColor: colors[1],
      borderWidth: 1,
      fill: false,
      type: "line",
    },
    {
      label: "Total Number of Offenses",
      data: ageGroupCounts,
      backgroundColor: 'rgba(255, 99, 132, 0.5)', // Set the alpha value to 0.5
      borderColor: colors[0],
      borderWidth: 1,
      barPercentage: 1,
      categoryPercentage: 1,
    }
    ,
  ],
},



        options: {
          scales: {
            y: {beginAtZero: true, stacked: true,},
            x: {stacked: true,
              ticks: {
                stepSize: 1,
                callback: (value, index, values) => getAgeGroupLabel(Number(value)*10+10),},
            },
          },
        },
      });
            
      return () => {myChart.destroy();};
    }
  }, [ageGroups, ageGroupCounts]);
            
  return <canvas ref={chartRef2} />;
};

            







export default function Fio({ firstFiveRows, arrestinformtion, policeDistricts}){

      return (
        <div>
        <Head>
            <title>Boston Police Index</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Arrest Information</h1>
        <PlaceholderTable json={firstFiveRows} />




        <h2>Data Visualization</h2>

        <h3>Map of Offense Occurrence</h3>
        <ArrestMap policeDistricts={policeDistricts} />

        <h3>Number of Different Types of Offenses by Age</h3>
        <OffenseBarChart data={offenseCountsDataWithPercentage} labels={shortOffenseLabels} ageGroups={ageGroups} />
        <CustomLegend labels={sortedOffenseLabels} />



        <h3>Number of Cases by Age Group</h3>
        <OffensehisChart ageGroups = {ageGroups}/>


        <h2>Analysis</h2>
        Our 2 main sources of data were datasets from Boston NIBRS and Analyze Boston. The data collected from these sources were both incomplete and had different categories, but they all had an incident number, an identification used internally by the Boston Police to track all incident data in their own database. Using Python, we wrote a script to do the following:<br />
        - Clean the data to make it easier for the computer to read and operate with<br />
        - Find incident numbers that exist in both datasets, combining the data from them if they do<br />
        - Filter out incomplete data categories to ensure accuracy in our processing and graphing<br />
        <br />
        Once this script finished, we had a combined dataset to work with. Then we used a combination of HTML and Javascript to graph the data and make an interactive webpage so users can interact with it in real time. This graph is a map of the city limits of Boston, with each neighborhood split up by district code, the same method that BPD uses. Each red dot represents an incident in 2019, and when clicked it displays the following:<br />
        - Offense Code: The police internal naming system for incidents, typically used for radio communication<br />
        - Offense Description: A short description of the incident<br />
        - Arrestee information: characteristics of the suspect being arrested. We specifically analyzed age, gender, race, and ethnicity.<br />
        <br />
        Additionally, we added pie charts when a district is clicked on the map. These show the percentage of incidents that occurred and the most common crime in said district. These can also be interacted with.



      <h2>Explanation</h2>
      <strong>Map of Offense Occurrence:</strong><br />
      Out of the 419 incidents we analyzed, we were able to conclude the following: <br />
      Approximately 28% of incidents were in district A1, or Downtown Boston. This is the most populous district in the city, so this result is expected.
      The most common crimes across all districts are drug related crimes or simple assault. 
      Simple assault is defined as any minor verbal or physical action intended to harm a victim. 
      The specifics of these incidents are not publically available, so any conclusions about the nature of them cannot be made.
      <br />

      <strong>Number of Different Types of Offenses by Age:</strong><br />
      The bar graph is shown in 6 different colors with 10 years of age for each, showing the distribution of age in different types of crime. 
      As shown in the graph, most crimes are conducted by people age 20-29 year old, with variation in distribution of other age groups. 
      As an interaction graph, it shows the exact percent of one block occupied in its bar while placing the mouse onto it. 
      One remarkable issue in Boston is drug possession as it has the largest number of violations and all age groups are involved. 
      The largest block in this bar graph is drug violation of age group 20-29 which takes 40.20% of total drug violation caes. 
      One thing interesting is that there isn’t any cases in weapon violation and robbery for age 60-69.<br />

      <strong>Number of Cases by Age Group:</strong><br />
      The data presents the distribution of total cases across various age groups. 
      The age group 20-29 has the highest number of cases (141), followed by the 30-39 age group (116). 
      The other age groups show a decline in the number of cases, with the lowest count in the 60-69 age group (13). 
      This suggests that younger individuals, particularly those aged 20-39, are more likely to be involved in incidents compared to other age groups.
      A explanation for this trend could be that younger individuals, specifically those aged 20-39, 
      tend to be more physically active and energetic, which may lead to a higher likelihood of engaging in risky behaviors or being involved in incidents. 
      Additionally, younger people might still be developing their decision-making skills and may not fully understand the consequences of their actions, 
      leading to a higher number of cases in these age groups. On the other hand, older individuals may have more life experience and better judgment,
       making them less likely to be involved in incidents.


      <Footer />
      </div>
    )
}