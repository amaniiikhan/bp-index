import Head from "next/head";
import Footer from "@components/Footer";
import { GetStaticProps } from "next";
import prisma from "lib/prisma";
import PlaceholderTable from "@components/forfeituretable";
import forfeiture from "pages/details/forfeiture.json" assert { type: 'json' };
import ChartComponent from '@components/ChartComponent';
import { Chart } from 'chart.js';
import { ChartConfiguration } from 'chart.js/auto';
import { BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';
import styles from "./styles.module.css";
// import { TimeScale } from 'chart.js';
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  // TimeScale
);
function prepareChartData(tableData: any[]) {

  const yearlySums: { [key: string]: number } = {};

  tableData.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear().toString();
      const amount = item.amount;
      if (yearlySums[year]) {
        yearlySums[year] += amount;
      } else {
        yearlySums[year] = amount;
      }


  });

  const labels = Object.keys(yearlySums);
  const data = labels.map((label) => yearlySums[label]);
  const filteredLabels = labels.filter((label) => !isNaN(label));

  // const labels = Object.keys(yearlySums).map((year) => new Date(year));
  // const data = labels.map((label) => yearlySums[label.getFullYear().toString()]);


  return { labels: filteredLabels, data };
}

function prepareBarChartData(tableData: any[]) {
  const courtSums: { [key: string]: number } = {};

  tableData.forEach((item) => {
    const courtName = item.court_name;
    const amount = item.amount;

    if (courtSums[courtName]) {
      courtSums[courtName] += amount;
    } else {
      courtSums[courtName] = amount;
    }
  });

  const labels = Object.keys(courtSums);
  const data = labels.map((label) => courtSums[label]);

  return { labels, data };
}



export const getStaticProps: GetStaticProps = async () => {
    const feed = await prisma.forfeiture_data.findMany({
      take: 200,
    });
    return {
      props: {
        table: JSON.parse(JSON.stringify(feed))
      }
    };
};


export default function Fio({ table }) {
  const { labels, data } = prepareChartData(table);
  const { labels: barLabels, data: barData } = prepareBarChartData(table);

  const chartConfig = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Total Amount Seized',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          tension: 0.4,
          fill: false,
        },
      ],
    },
    options: {
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: 'Total Amount Seized by Year',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Total Amount',
          },
        },
        x: {
          // type: 'time',
          // ticks: {
          //   max: new Date('2015'), // Set the maximum value for the x-axis
          // },
          title: {
            display: true,
            text: 'Year',
          },
        },
      },
    },
  };

  const barChartConfig: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: barLabels,
      datasets: [
        {
          label: 'Total Amount Seized by Court',
          data: barData,
          backgroundColor: barLabels.map(
            () => 'rgba(255, 99, 132, 0.2)'
          ),
          borderColor: barLabels.map(() => 'rgba(255, 99, 132, 1)'),
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: 'Total Amount Seized by Court',
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: 'Sum of Amount',
          },
        },
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Court Name',
          },
        },
      },
    }
  };

    return (
        <div>
        <Head>
            <title>Boston Police Index</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Forfeiture Information</h1>

        <h3 className={styles.section}>Total amount of asset from 2001 to 2015</h3>
        <div className={styles.chart}>
        <ChartComponent config={chartConfig} />
        </div>
        <p className={styles.paragraph}>
        The total amount of forfeited assets trended up, resulting in a 4,304.78% increase between 2001 and 2015. <br />
        Specifically, the yearly amount started trending up on 2009, rising by 592.10% (726,570.75) in 6 years.
        It jumped from 122710 to 849,280.75 during its steepest incline between 2009 and 2015.
        </p>
        <h3 className={styles.section}>Total amount seized by court</h3>
        <div className={styles.chart}>
        <ChartComponent config={barChartConfig} />
        </div>
        <p className={styles.paragraph}>
        Superior Court is the court that processing most of forfeiture cases, with 7 times more than other courts in the areas.
        It can be said that most of forfeiture cases need to be determined by Superior Court, but not the lower ones.
        </p>
        <h2 className={styles.section}>Analysis</h2>

        <p className={styles.paragraph}>

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

        </p>

        <h2 className={styles.section}>Explanation</h2>

        <p className={styles.paragraph}>

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
        </p>

        <Footer />
        </div>
    )
}