import React from 'react'
import { Bar } from "react-chartjs-2";
import {Card} from "@material-ui/core";
import './bar.css';

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

        <Card className="bar">
          <h2 className="chart_title">Data visualiztion of Cases and Recovered by bar graph</h2>
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
        </Card>
    )
}

export default PieChart;
