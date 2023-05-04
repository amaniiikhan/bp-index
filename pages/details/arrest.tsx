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
import { LogarithmicScale } from 'chart.js';
Chart.register(LogarithmicScale);
import React, { useEffect, useRef, useState, useCallback } from "react";


// presenting data table 
export const getStaticProps: GetStaticProps = async () => {
  // Use the first five rows from the AIData JSON file
  const firstFiveRows = AIData.slice(0, 5);
  const arrestinformtion = AIData;

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
  const totalCount = Object.values(countsByAge).reduce((acc, val) => acc + val, 0);
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
      return `${age}-${Number(age) + 9}`;
    }
  };


  useEffect(() => {
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

    return () => {
      myChart.destroy();
    };
  }, [data, labels, ageGroups]);

  return (
    <canvas ref={chartRef} />
  );
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

        <h3>offense case map</h3>
        <ArrestMap policeDistricts={policeDistricts} />

        <h3>Number of Different Types of Offenses by Age</h3>
        {/* <OffenseBarChart data={offenseCountsDataWithPercentage} labels={sortedOffenseLabels} ageGroups={ageGroups} /> */}

        <h3>Number of Different Types of Offenses by Age</h3>
        <OffenseBarChart data={offenseCountsDataWithPercentage} labels={shortOffenseLabels} ageGroups={ageGroups} />
        <CustomLegend labels={sortedOffenseLabels} />







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