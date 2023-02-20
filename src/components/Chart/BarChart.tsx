import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

interface Props {
  xAxisLabels: Array<string>
  values: Array<number>
}
const BarChart = ({ xAxisLabels, values }: Props) => {
  const [ data, setData ] = useState({
    labels: xAxisLabels,
    datasets: [
      {
        data: values,
        backgroundColor: 'rgba(255, 52, 53, 0.2)',
        tension: 0.4,
        maxBarThickness: 10
      }
    ],
  });
  return (
    <>
      <div>
        <Bar height={80} options={{
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
            },
            y: {
              position: "right",
            }
          }
        }} data={data} />
      </div>
    </>
  )
}

export default BarChart
