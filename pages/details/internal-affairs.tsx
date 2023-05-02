import Head from "next/head";
import Footer from "@components/Footer";
import { GetStaticProps } from "next";
import prisma from "lib/prisma";
import PlaceholderTable from "@components/PlaceholderTable";
import internalaffairs from "pages/details/IA.json";



export const getStaticProps: GetStaticProps = async () => {
  const feed = internalaffairs
  console.log(feed)
  return {
    props: {
      table: JSON.parse(JSON.stringify(feed))
    }
  };
};


export default function Fio({users}){
    return (
        <div>
        <Head>
            <title>Boston Police Index</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>REPLACE-ME Information</h1>

        <PlaceholderTable json={users}/>

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