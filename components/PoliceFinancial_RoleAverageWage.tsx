import { ChartData } from "chart.js/dist/types/index";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export interface ILineChartDataPoint {
  year: number
}

interface IRoleAverageWageProps {
  data: ILineChartDataPoint[];
}

const RoleAverageWageChart = ({ data }: IRoleAverageWageProps) => {
  const chart_options = {
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

  const datasets: ChartData<"line", ILineChartDataPoint[]> = {
    // Not sure why this is required, I thought it could get this from the x-axis but it doesn't work atm.
    labels: data.map((point) => point.year),
    datasets: [
      {
        // Add dollar sign to the tooltip
        label: "Wage",
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
        data: data,
        parsing: {
          xAxisKey: "year",
          yAxisKey: "infl_adj_total",
        },
      },
    ],
  };

  return <Line options={chart_options} data={datasets} />;
};

export default RoleAverageWageChart;
