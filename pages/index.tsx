import Head from "next/head";
import Link from 'next/link'
import Header from "@components/Header";
import Footer from "@components/Footer";
import Grid2 from '@mui/material/Unstable_Grid2';
import Item from '@mui/material/Unstable_Grid2';

const trends = {
    "Officer Pay": "police-financial",
    "Department Salaries": "police-financial",
    "OT Pay": "police-financial",
    "Forfeitures per XXX": "forfeiture",
    "Detail Pay": "police-financial",
    "FIOs per XXX": "fio",
    "Civil Settlements": "settlement",
    "Arrest data": "arrest",
    "Internal Affairs Open Cases": "internal-affairs"
  };

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Boston Police Index</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to Boston Police Index!" />
        <Grid2 container spacing={{ xs: 2, md: 3 }}>
        {Object.keys(trends).map(key => (
            <><Grid2 xs={4} key={key}>
              <Item><Link href={`/details/${encodeURIComponent(trends[key])}`}>{key}</Link></Item>
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
