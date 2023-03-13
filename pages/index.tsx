import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Grid2 from '@mui/material/Unstable_Grid2';
import Item from '@mui/material/Unstable_Grid2';

import PlaceholderTable from '@components/PlaceholderTable'

const trends = ["Officer Pay", "Department Salaries", "OT Pay",
  "Forfeitures per XXX", "Detail Pay", "FIOs per XXX", "Civil Settlements",
  "Arrest data","Internal Affairs Open Cases"];

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        <PlaceholderTable/>
        <Grid2 container spacing={{ xs: 2, md: 3 }}>
          {Array.from(trends).map((subj, index) => (
            <><Grid2 xs={4} key={index}>
              <Item>{subj}</Item>
            </Grid2><Grid2 xs={8}>
                <Item>trend line</Item>
              </Grid2></>
          ))}
        </Grid2>
      </main>

      <Footer />
    </div>
  );
}
