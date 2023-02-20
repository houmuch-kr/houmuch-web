import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Color } from "../../constants";

interface Props {
  xAxisLabels: Array<string>
  values: Array<number>
}

const LineChart = ({ xAxisLabels, values }: Props) => {
  console.log('values', values)
  console.log('xAxisLabels', xAxisLabels)
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
        <Line options={{
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
