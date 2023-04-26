import Head from "next/head";
import Footer from "@components/Footer";
import { GetStaticProps } from "next";
import prisma from "lib/prisma";
import PlaceholderTable from "@components/forfeituretable";
import forfeiture from "pages/details/forfeiture.json" assert { type: 'json' };

export const getStaticProps: GetStaticProps = async () => {
    //const feed = await prisma.forfeiture_Cases.findMany();
    const feed = forfeiture
    console.log(feed)
    return {
      props: {
        table: JSON.parse(JSON.stringify(feed))
      }
    };
};


export default function Fio({table}){
    return (
        <div>
        <Head>
            <title>Boston Police Index</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Forfeiture Information</h1>

        <PlaceholderTable json={table} limit={10}/>

        <h2>Analysis</h2>

        There are a number of metrics that may be useful when analyzing 
        forfeiture data such as the total value of seized assets, types of 
        assets seized, sources of seized assets, disposition of forfeited 
        assets, and number of legal issues concerning forfeiture. While the 
        total value and type of assets seized are easily-understood metrics, the 
        purpose for reporting sources, disposition, and number of legal 
        issues is less intuitive. Assessing the sources of forfeited assets would 
        provide a window to understand any trends for the types of criminals that 
        law enforcement is chasing, understanding the disposition of seized assets 
        could help determine if forfeiture is being used to fund bonuses rather than 
        public goods, and finally the number of legal challenges to forfeiture cases 
        could indicate a trend in unconstitutional search and seizure of assets. 
        There is no “norm” of forfeiture metrics as it is highly dependent upon many 
        different internal and external factors, and there is no ground truth. However, 
        an analysis of the location, types of crime, and disposition of assets together 
        could lead to better understanding of how forfeiture is used.

        <h2>Explanation</h2>

        Forfeiture is the process in which law enforcement seize the property, 
        assets, and/or cash of people involved in criminal activity. It is 
        not uncommon for forfeiture to be abused by individual police officers 
        and/or departments. For example, departments may “police for profit,” 
        in which they focus on seizing high value assets to generate revenue 
        instead of eradicating the criminal activity that threatens public safety. 
        State laws also allow assets to be seized without a proper conviction, and 
        therefore insufficiently protect innocent individuals. The Institute of 
        Justice awarded the state of Massachusetts with a grade of F for their 
        forfeiture laws based on insufficient protections for innocent individuals, 
        incentives for police to seize property for revenue, and the allowance of 
        “probable cause” to seize property. By default, law enforcement agencies 
        are not transparent about what liabilities have been seized and for what 
        purposes. Therefore, it is important to point a spotlight on the forfeiture 
        activities of police departments so that the public can gain insight into 
        how law enforcement agencies are using this tool, and whether there are any 
        trends that point to an abuse of power.


        <Footer />
        </div>
    )
}