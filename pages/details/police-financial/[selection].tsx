import Head from "next/head";
import Footer from "@components/Footer";
import { GetServerSideProps } from "next";
import prisma from "lib/prisma";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  ChartData,
} from "chart.js";
import { Pie, Doughnut, Bar, Line } from "react-chartjs-2";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const selection = context.params?.selection as string;

  const financialData = await prisma.police_financial.findMany()
  const roleEarningData = await prisma.police_officer_role_earnings.findMany()
  const yearlyDeptData = await prisma.police_dept_yearly.findMany()

  const handleMapAdd = (
    tmpMap: Map<string, number>,
    fieldName: string,
    obj: object
  ) => {
    tmpMap.set(
      fieldName,
      (tmpMap.get(fieldName) === undefined ? 0 : tmpMap.get(fieldName)) +
        parseInt(obj[fieldName] === "" ? 0 : obj[fieldName])
    );
  };
  
  let combineMap = new Map();
  financialData.map((obj: object) => {
    handleMapAdd(combineMap, "other", obj);
    handleMapAdd(combineMap, "quinn", obj);
    handleMapAdd(combineMap, "injured", obj);
    handleMapAdd(combineMap, "overtime", obj);
    handleMapAdd(combineMap, "regular", obj);
    handleMapAdd(combineMap, "retro", obj);
    handleMapAdd(combineMap, "detail", obj);
  });

  let roleMap = new Map();
  roleEarningData.map((obj: object) => {
    roleMap.set(obj["role"], obj["yearly_earnings"]);
  });

  let yearlyMap = new Map();
  yearlyDeptData.map((obj: object) => {
    yearlyMap.set(obj["year"], obj["infl_adj_total"]);
  });

  let selectionMap = new Map();
  financialData.map((obj: object) => {
    handleMapAdd(selectionMap, "total_earnings", obj);
    handleMapAdd(selectionMap, selection, obj);
  });

  const initChartData: ChartData = {
      labels: [],
      datasets: [
        {
          label: "Dollar value ",
          data: [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 255, 255, 0.2)",
            "rgba(0, 0, 0, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(0, 0, 0, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

  let selectionData = initChartData;
  selectionMap.forEach((value, key) => {
    selectionData["labels"].push(
      key.charAt(0).toUpperCase() + key.substring(1, key.length)
    );
    selectionData["datasets"][0]["data"].push(value);
  });

  let overallData = initChartData;
  combineMap.forEach((value, key) => {
    overallData["labels"].push(
      key.charAt(0).toUpperCase() + key.substring(1, key.length)
    );
    overallData["datasets"][0]["data"].push(value);
  });

  let roleData = initChartData;
  roleMap.forEach((value, key) => {
    roleData["labels"].push(
      key.charAt(0).toUpperCase() + key.substring(1, key.length)
    );
    roleData["datasets"][0]["data"].push(value);
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Role Average Wage",
      },
    },
  };

  const roleOption = options;

  let yearData = {
    labels: [],
    datasets: [
      {
        label: "Wage",
        data: [],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  yearlyMap.forEach((value, key) => {
    yearData["labels"].push(key);
    yearData["datasets"][0]["data"].push(value);
  });

  const yearOption = options;

  return {
    props: {
      selection,
      overallData,
      selectionData,
      roleOption,
      roleData,
      yearOption,
      yearData,
    }
  };
};



ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Fio({
  selection,
  overallData,
  selectionData,
  roleOption,
  roleData,
  yearOption,
  yearData,
}) {
  
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Boston Police Index</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Police Financial Information</h1>

      {/* <PlaceholderTable json={users}/> */}
      <div
        style={{
          display: "grid",
          placeContent: "center",
        }}
      >
        <div
          style={{
            height: "400px",
            width: "800px",
            display: "flex",
          }}
        >
          <Pie data={overallData} />
          <div>
            <div
              style={{
                display: "grid",
                placeContent: "center",
              }}
            >
              <select
                defaultValue={selection}
                onChange={(e) => router.push({
                  pathname: "/details/police-financial/[selection]",
                  query: { selection: e.target.value },
                })}
              >
                <option value="regular"> Regular Pay </option>
                <option value="retro"> Retro Pay </option>
                <option value="injured"> Injured Pay </option>
                <option value="detail"> Detail Pay </option>
                <option value="quinn"> Quinn Pay </option>
                <option value="overtime"> Overtime Pay </option>
                <option value="other"> Other Pay </option>
              </select>
            </div>
            <Doughnut data={selectionData} />
          </div>
        </div>

        <div
          style={{
            height: "400px",
            width: "800px",
          }}
        >
          <Bar options={roleOption} data={roleData} />
        </div>

        <div
          style={{
            height: "400px",
            width: "800px",
          }}
        >
          <Line options={yearOption} data={yearData} />
        </div>
      </div>

      <h2>Analysis</h2>
      <p>
        Data taken from Boston Gov. Employees Earnings Reports 2011-2020. <br />
        1: Individuals’ total pay breakdown is broken down into regular,
        overtime, detail, injury, Quinn, and other. <br />
        2: The following visualization can then select one portion of the pay
        and compare it to the rest. <br />
        3: Each total pay was then grouped into police ranks/roles.
      </p>

      <h2> Explanation </h2>

      <p>
        When we first began to analyze our researched datasets, we quickly
        noticed that only one would be of any use; the other four were some
        combination of redundant, too small, or downright useless for the scale
        of our project. The PCIPP dataset, for example, contains what is
        essentially our only clear data on Quinn payments — but it’s only a
        sample of 141 entries. We decided that the only data we could truly
        analyze with any statistical confidence was the 2011-2020 earnings
        report, as it contained over 30,000 entries of relevant police financial
        information despite being painfully disorganized.
        <br />
        <br />
        Cleaning the data was especially demanding for this project as our
        primary dataset was largely unclean. After clearing oddities such as
        invalid characters and null values, we had to find some way to deal with
        the countless names that different teams assign their officers,
        including stylistic differences such as “Police Offc.” vs. “Police
        Officer” and various role modifiers that complicated the merging
        process. In order to construct a solution, we first met as a team to
        discern which specific roles we wanted to represent in our
        visualizations. After analyzing the data, we settled on 13 distinct
        titles to categorize officers to both allow for an effective
        visualization without miscategorizing or misrepresenting certain
        positions. We included the distinction between an officer role and
        detective role for a given rank as there was evidence of a significant
        difference in salary between the two. Finally, with some pandas
        scripting and data prepping, we iterated through the dataset, sorting
        each entry by role and taking the average of their yearly total
        earnings. From this standpoint, we were able to more easily modify our
        existing code to make new visualizations including individual salary
        breakdowns and year-on-year average salary charts.
        <br />
        <br />
        For the graph which analyzes individuals’ total pay breakdown, we
        cleaned the data by removing records without employee_id, converting
        salary information from string to integer, and removing any extra
        spacings and commas.
      </p>

      <Footer />
    </div>
  );
}
