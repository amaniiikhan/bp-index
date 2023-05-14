import Head from "next/head";
import Footer from "@components/Footer";
import { GetStaticProps } from "next";
import prisma from "lib/prisma";
import PlaceholderTable from "@components/PlaceholderTable";

// export const getStaticProps: GetStaticProps = async () => {
//     const feed = await prisma.field_Contacts.findMany({
//       take: 1000,
//     });
//     return {
//       props: {
//         users: JSON.parse(JSON.stringify(feed))
//       }
//     };
// };


export default function Fio({users}){
    return (
        <div>
        <Head>
            <title>Boston Police Index</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Field Interrogation and Observation (FIO)</h1>

        <PlaceholderTable json={users}/>

        <h2>Analysis</h2>

        <p>
        The data we use is  from BPD's FIO (https://data.boston.gov/dataset/boston-police-department-fio).
        We merged across years and cleaned in two analysis-ready CSV
        files: fio_people and fio_contacts. The merged files include
         data from the second half of 2015 through the end of 2022.
        </p>

        <p>
        With the lack of Field Interrogation and Observation (FIO) data
        by the Boston Police Department we had numerous issues with cleaning
        our data from nulls to finding a statistical model to best highlight
        our data. To better analyze implicit bias based on different
        cultural backgrounds, we re-categorized race and ethnic origin and
        obtained a significant statistical analysis. We were recombining
        race and ethnicity based on the category “hispanic”. In order
        to best represent the racial disparities that exist in our
        data we thought it was best to combine the two to have
        categories such as “white hispanic”, “white non hispanic”,
        “black hispanic”, etc. This re-differentiation allowed for
        a more accurate examination of the impact of implicit bias
        on various cultural groups. By utilizing this approach,
        we were able to gain deeper insights into the prevalence
        of implicit bias within the Boston Police Department's
        practices, particularly in relation to individuals of non-Hispanic
        Black origin.
        </p>

        <h2>Explanation</h2>

        <p>The data of FIO is crucial for residents of the Boston area,
         as it relates to their potential and unexpected encounters
         with law enforcement. The quality of these interactions can
         have a direct impact on the public's perception of safety
         within the community. Therefore, analyzing FIO data is vital
         in assessing the effectiveness of police practices and ensuring
         that they promote safety and security among all members of the
        community. By doing so, law enforcement agencies work towards
           building trust and positive relationships with the communities
            that they serve.</p>
            <p>​Analyzing FIOs is important in order to discover trends in
              the data. In Boston, the data proves that there is a racial
              bias in FIOs, so that relative to white suspects, black
              suspects are more likely to be observed, interrogated,
              and frisked or searched for gang membership and prior
              arrest history. After inspecting the race and ethnicity
              categories in our visualization, it is clear that a
              significant proportion of non-Hispanic Black individuals
              are subjected to FIOs by the Boston Police Department,
              highlighting the presence of implicit bias in their
              policing practices. Even further, high crime areas
              and minority neighborhoods are more subject to FIOs.
              To address these injustices and ensure fair treatment
              for all, it is essential that the Boston Police Department
              consult with experts in the field who can provide guidance
              on how to address implicit biases and reduce racial
              disparities in policing. By making timely adjustments to
              their policies and continuing to collect and analyze data,
              the department can work towards creating a more just and
              equitable system that ensures the safety and protection of all
              individuals, regardless of their race or ethnicity.
              </p>


        <Footer />
        </div>
    )
}