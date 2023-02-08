import React from "react";
import { BarChart, LineChart } from "./index";
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement,
  Legend
);

const TrendChart = () => {
  return (
    <>
      <LineChart />
      <BarChart />
    </>
  )
}

export default TrendChart
