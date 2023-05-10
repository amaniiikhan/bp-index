import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Grid2 from "@mui/material/Unstable_Grid2";
import DataOverviewCard from "@components/OverviewCard";
import { ThemeProvider } from "@emotion/react";
import { theme } from "theme";
import RoleAverageWage from "@components/PoliceFinancial_RoleAverageWage";
import { yearlyData } from "utility/yearly_information";

export async function getStaticProps() {
  return {
    props: {
      role_average_data: yearlyData,
    },
  };
}

export default function Home({ role_average_data }) {
  const data_cards = [
    <DataOverviewCard
      title="Officer Pay"
      chart={<RoleAverageWage data={role_average_data} />}
      link={"/details/police-financial"}
    />,
    <DataOverviewCard
      title="Department Salaries"
      chart={<p>Testing Content</p>}
      link="/details/police-financial"
    />,
    <DataOverviewCard
      title="Overtime Pay"
      chart={<p>Testing Content</p>}
      link="/details/police-financial"
    />,
    <DataOverviewCard
      title="Forfeitures per XXX"
      chart={<p>Testing Content</p>}
      link="/details/forfeiture"
    />,
    <DataOverviewCard
      title="Detail Pay"
      chart={<p>Testing Content</p>}
      link="/details/police-financial"
    />,
    <DataOverviewCard
      title="FIOs per XXX"
      chart={<p>Testing Content</p>}
      link="/details/fio"
    />,
    <DataOverviewCard
      title="Civil Settlements"
      chart={<p>Testing Content</p>}
      link="/details/settlement"
    />,
    <DataOverviewCard
      title="Arrest data"
      chart={<p>Testing Content</p>}
      link="/details/arrest"
    />,
    <DataOverviewCard
      title="Internal Affairs Open Cases"
      chart={<p>Testing Content</p>}
      link="/details/internal-affairs"
    />,
  ];
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <Head>
          <title>Boston Police Index</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Header title="Welcome to Boston Police Index!" />
          <Grid2 container spacing={2}>
            {data_cards.map((card, index) => (
              <Grid2 sm={12} md={6} lg={4} key={index}>
                {card}
              </Grid2>
            ))}
          </Grid2>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
