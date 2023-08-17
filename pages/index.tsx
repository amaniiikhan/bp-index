import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Grid2 from "@mui/material/Unstable_Grid2";
import DataOverviewCard from "@components/OverviewCard";
import { ThemeProvider } from "@emotion/react";
import { theme } from "theme";
import RoleAverageWageChart from "@components/PoliceFinancial_RoleAverageWage";
import ForfeitureTotalAssetsChart from "@components/Forfeiture_TotalAssets";
import {
  ISingleYearSummary,
  get_forfeitures_yearly_summary,
} from "data_handlers/forfeitures";
import {
  get_yearly_wage_data,
} from "data_handlers/police_financial";
import { police_dept_yearly } from "@prisma/client";

interface IHomeProps {
  role_average_data: police_dept_yearly[];
  forfeitures_yearly_summary: ISingleYearSummary[];
}

export async function getStaticProps<NextPage, IHomeProps>() {
  return {
    props: {
      role_average_data: await get_yearly_wage_data(),
      forfeitures_yearly_summary: await get_forfeitures_yearly_summary(),
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
}

export default function Home({
  role_average_data,
  forfeitures_yearly_summary,
}: IHomeProps) {
  const data_cards = [
    <DataOverviewCard
      title="Officer Pay"
      chart={<RoleAverageWageChart data={role_average_data} />}
      link={{
        pathname: "/details/police-financial/[selection]",
        query: { selection: "regular" },
      }}
    />,
    <DataOverviewCard
      title="Department Salaries"
      chart={<p>Testing Content</p>}
      link={{
        pathname: "/details/police-financial/[selection]",
        query: { selection: "retro" },
      }}
    />,
    <DataOverviewCard
      title="Overtime Pay"
      chart={<p>Testing Content</p>}
      link={{
        pathname: "/details/police-financial/[selection]",
        query: { selection: "overtime" },
      }}
    />,
    <DataOverviewCard
      title="Forfeitures per XXX"
      chart={
        <ForfeitureTotalAssetsChart
          yearly_summary_data={forfeitures_yearly_summary}
        />
      }
      link={{
        pathname: "/details/forfeiture"
      }}
    />,
    <DataOverviewCard
      title="Detail Pay"
      chart={<p>Testing Content</p>}
      link={{
        pathname: "/details/police-financial/[selection]",
        query: { selection: "detail" },
      }}
    />,
    <DataOverviewCard
      title="FIOs per XXX"
      chart={<p>Testing Content</p>}
      link={{
        pathname: "/details/fio"
      }}
    />,
    <DataOverviewCard
      title="Civil Settlements"
      chart={<p>Testing Content</p>}
      link={{
        pathname: "/details/settlement"
      }}
    />,
    <DataOverviewCard
      title="Arrest data"
      chart={<p>Testing Content</p>}
      link={{
        pathname: "/details/arrest"
      }}
    />,
    <DataOverviewCard
      title="Internal Affairs Open Cases"
      chart={<p>Testing Content</p>}
      link={{
        pathname: "/details/internal-affairs"
      }}
    />,
    <DataOverviewCard
      title="Sample Office Detail Page"
      chart={<p>Testing Content</p>}
      link={{
        pathname: "/details/officer-profile/[badge_id]",
        query: { badge_id: "123456" },
      }}
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
