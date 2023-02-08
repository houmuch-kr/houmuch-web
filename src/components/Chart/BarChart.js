import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const [ data, setData ] = useState({
    labels: [1,2,3,4,5,6,7,8,9,10,11,12],
    datasets: [
      {
        data: [9.8, 10, 5, 4, 6, 8, 11, 14, 16, 20, 15, 18],
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
