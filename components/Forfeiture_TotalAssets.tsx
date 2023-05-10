import { nameof } from "ts-simple-nameof";
import ChartComponent from "@components/ChartComponent";
import { Chart, Tooltip } from "chart.js";
import { LinearScale } from "chart.js";
import { ISingleYearSummary } from "data_handlers/forfeitures";
Chart.register(LinearScale, Tooltip);

interface IForfeitureTotalAssetsChartProps {
  yearly_summary_data: ISingleYearSummary[];
}

const ForfeitureTotalAssetsChart = ({
  yearly_summary_data,
}: IForfeitureTotalAssetsChartProps): JSX.Element => {
  const chartConfig = {
    type: "line",
    data: {
      labels: yearly_summary_data.map((item) => item.year.getFullYear()),
      datasets: [
        {
          label: "Total Amount Seized",
          data: yearly_summary_data,
          parsing: {
            xAxisKey: nameof<ISingleYearSummary>((c) => c.year),
            yAxisKey: nameof<ISingleYearSummary>((c) => c.year_sum),
          },
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
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
          text: "Total Amount Seized by Year",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Total Amount",
          },
        },
        x: {
          title: {
            display: true,
            text: "Year",
          },
        },
      },
    },
  };

  return <ChartComponent config={chartConfig} />;
};

export default ForfeitureTotalAssetsChart;
