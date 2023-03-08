import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Color } from "../../constants";

interface Props {
  xAxisLabels: Array<string>
  values: Array<number>
  height?: number
}

const LineChart = ({ xAxisLabels, values, height }: Props) => {
  const [ data, setData ] = useState({
    labels: xAxisLabels,
    datasets: [
      {
        data: values,
        borderColor: Color.DEFAULT,
        borderWidth: 2,
        pointBackgroundColor: '#FF3435',
        tension: 0.4,
      }
    ],
  });
  return (
    <>
      <div>
        <Line height={height + "px"} options={{
          layout: {
            autoPadding: true
          },
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              position: "right",
              ticks: {

              }
            }
          }
        }} data={data} />
      </div>
    </>
  )
}

export default LineChart
