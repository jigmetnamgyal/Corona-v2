import React, {useState, useEffect} from 'react'
import { Bar } from "react-chartjs-2";
import numeral from 'numeral';

// const options = {
//     legend: {
//       display: false,
//     },
//     elements: {
//       point: {
//         radius: 0,
//       },
//     },
//     maintainAspectRatio: false,
//   };

function PieChart({ countries }) {

    let recovered = countries.recovered;
    let cases = countries.cases;
    return (
        <div>
           {
        <Bar
          data={{
            labels: ['recovered', 'cases'],
            datasets: [
              {
                label: "data Visualiztion with bar graph",
                data: [recovered, cases],
                backgroundColor: ['greenyellow', 'rgb(224, 64, 64)']
              },
            ],
          }}
        />
      }
        </div>
    )
}

export default PieChart;
