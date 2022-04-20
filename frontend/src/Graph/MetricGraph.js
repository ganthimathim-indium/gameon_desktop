import React from "react";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import "./metricGraph.css";
import { blue } from "@mui/material/colors";

const Plot = createPlotlyComponent(Plotly);

function MetricGraph(props) {
  console.log(props.metValues, "graph value");
  console.log(props.metTime, "graph time");
  return (
    <>
      <div>MetricGraph</div>
      <div class="graphs">
        <Plot
          data={[
            {
              x: props.metTime,
              y: props.metValues,
              type: "scatter",
              mode: "line",

              marker: { enabled: false },
              line: { shape: "spline", smoothing: 0.8 },
              marker: { color: "#87CEEB", size: "0" },
            },
          ]}
          layout={{
            X: 0,
            xanchor: "left",
            title: "Total GPU Usage",
            width: 1150,
            height: 250,
            margin: { l: 22, r: 20, b: 20, t: 20, pad: 5 },
            title: false,
            xref: 400,

            text: "GpuUsage",
            borderRadius: 20,
            xaxis: {
              autorange: true,
              // rangeslider: {
              //   range: ["00:00:00", "00:01:60"],
              //   borderColor: "blue",
              //   bgColor: "grey",
              // },
            },
            plot_bgcolor: "#F5F5F5",
            // paper_bgcolor: "",

            plot_height: 300,
          }}
        />
      </div>
    </>
  );
}

export default MetricGraph;

// import React from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// function MetricGraph(props) {
//   console.log(props.metValue, "graph value");
//   console.log(props.metTime, "graph time");
//   const options = {
//     xAxis: {
//       categories: [1, 2, 3],
//     },
//     series: [
//       {
//         data: [1, 2, 3],
//       },
//     ],
//     // events: {
//     //   load: function () {
//     //     // set up the updating of the chart each second
//     //     var series = this.series[0];
//     //     var x = new Date(props.time * 1000).toISOString().substr(14, 5);
//     //     var y = props.value;
//     //     series.addPoint([x, y], true, true);
//     //   },
//     // },
//   };

//   return (
//     <div>
//       <HighchartsReact highcharts={Highcharts} options={options} />
//       <h1>{/* {props.value},{props.time} */}</h1>
//     </div>
//   );
// }

// export default MetricGraph;
