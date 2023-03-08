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
} from "chart.js"
import { Loader } from "~/components";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement,
  Legend
)

interface Props {
  loading: boolean
  data?: Array<any>
  barChartHeight?: number
  lineChartHeight?: number
}

const TrendChart = ({ loading, data, barChartHeight, lineChartHeight }: Props) => {
  return (
    <div>
      {
        loading ? <Loader /> : data && (
          <>
            <LineChart
              height={lineChartHeight}
              values={data.map(item => Number.parseInt(item.price.toFixed()))}
              xAxisLabels={data.map(item => item.xAxisLabel)} />
            <BarChart
              height={barChartHeight}
              values={data.map(item => item.count)}
              xAxisLabels={data.map(item => item.xAxisLabel)} />
          </>
        )
      }
    </div>
  )
}

export default TrendChart
