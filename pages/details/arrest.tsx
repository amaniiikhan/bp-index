import Head from "next/head";
import Footer from "@components/Footer";
import { GetStaticProps } from "next";
import prisma from "lib/prisma";
import PlaceholderTable from "@components/PlaceholderTable";
import Papa from 'papaparse';
import "leaflet/dist/leaflet.css";
// for map functions 
import { useEffect, useRef } from "react";
import L from "leaflet";
import { Chart } from "chart.js";



// presenting data table 
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://raw.githubusercontent.com/JQJQrush/DS4G/main/AI.csv');
  const csvContent = await response.text();

  const parsedData = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
  });

  const firstFiveRows = parsedData.data.slice(0, 5);

  return {
    props: {
      users: firstFiveRows,
    },
  };
};



export default function Fio({users}){
    return (
        <div>
        <Head>
            <title>Boston Police Index</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Arrest Information</h1>

        <PlaceholderTable json={users}/>



        <h2>Data Visualization</h2>
        <h3>offense case map</h3>







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