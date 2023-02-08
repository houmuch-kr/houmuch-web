import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Color } from "../../constants";

const LineChart = () => {
  const [ data, setData ] = useState({
    labels: [1,2,3,4,5,6,7,8,9,10,11,12],
    datasets: [
      {
        data: [9.8, 10, 5, 4, 6, 8, 11, 14, 16, 20, 15, 18],
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
              min: 0,
              max: 30,
              position: "right",
              ticks: {
                stepSize: 5,
              }
            }
          }
        }} data={data} />
      </div>
    </>
  )
}

export default LineChart
