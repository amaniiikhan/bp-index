import Head from "next/head";
import Footer from "@components/Footer";
import { GetStaticProps } from "next";
import prisma from "lib/prisma";
import PlaceholderTable from "@components/PlaceholderTable";

export const getStaticProps: GetStaticProps = async () => {
    const feed = await prisma.internal_Affairs.findMany();
    console.log(feed)
    return {
      props: {
        users: JSON.parse(JSON.stringify(feed))
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