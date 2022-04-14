import React from "react";
import "./AppInfo.css";
import LoginHeader from "../Login/Header";
import CircularProgress from "@mui/material/CircularProgress";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import MetricGraph from "../../Graph/MetricGraph.js";

// import { useSelector } from "react-redux";
// import{ selectUser} from "../../features/loginAuth/loginAuthSlice"

const Plot = createPlotlyComponent(Plotly);

var mapObj = {
  com: " ",
  ".oneplus": " ",
  ".qualcomm": " ",
  ".android": " ",
  ".display": " ",
  ".google": " ",
  ".tools": " ",
  ".internal": " ",
  ".emulation": " ",
  ".network": " ",
};

// const user=useSelector(selectUser)

// console.log(user.name,"username")
// console.log(user.id,"id")
// console.log(user.token,"userToken")

// "id": this.props.userInfo.id , "token": this.props.userInfo.token

class AppData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basicInfo: {
        appname: this.props.location.state.value,
        id: "24",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicmFodWxAZ21haWwuY29tIiwidXNlcl9yb2xlIjoidXNlciIsInVzZXJfaWQiOjI0LCJpYXQiOjE2NDg1MzkzNDR9.FUmjwywXb9oqxvaeUk4rb2stsbmw4BVD0198C0JgXis",
      },
      deviceId: "",
      deviceName: "",
      androidVersion: "",
      versionName: "",
      cpuUsage: 0,
      appName: "",
      memoryUsage: 0,
      GpuUsage: 0,
      result: 5,
      Uploaddata: 0,
      cpuCores: 0,
      DownloadData: 0,
      loader: false,
      cpuStart: true,
      cpuValues: [],
      gpuValues: [],
      timeSeconds: 0,
      timeValues: [],
      userInfo: null,
    };
  }

  componentDidMount() {
    console.log(this.props.state, "state value");

    // console.log(this.props.user);
    // console.log(this.props.usersValue)
    console.log(this.state.userData);
    const basicData = JSON.stringify(this.state.basicInfo);
    console.log(this.state.basicInfo);

    console.log(basicData, "basidata");

    window.backend
      .basiconfo(basicData)
      .then((result) => {
        console.log(result, "result");
        const data = JSON.parse(result);

        this.setState({
          appName: this.props.location.state.value,
          deviceId: data.data.device_id,
          deviceName: data.data.device_name,
          androidVersion: data.data.android_version,
          versionName: data.data.version_name,
        });
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }
  // componentDidUpdate(prevprops) {
  //   if (this.props.userInfo !== prevprops.state) {
  //     this.setState({ userInfo: this.props.userInfo });
  //   }
  // }

  handleCpuStart() {
    if (this.state.cpuStart) {
      setInterval(() => {
        window.backend
          .cpumetric(this.props.location.state.value)
          .then((result) => {
            let results = result.substr(18);
            this.setState({ cpuUsage: results });
            console.log(this.state.cpuUsage, "cpu");
          });

        window.backend
          .gpuMetric(this.props.location.state.value)
          .then((result) => {
            let results = Number(result.substr(18));
            console.log(results);
            console.log(result);
            this.setState({ GpuUsage: results });
            this.setState({
              timeSeconds: this.state.timeSeconds + 1,
            });
            let time = new Date(this.state.timeSeconds * 1000)
              .toISOString()
              .substr(14, 5);
            console.log(this.state.GpuUsage, "gpu");

            if (this.state.gpuValues.length < 8) {
              this.setState({
                gpuValues: [...this.state.gpuValues, results],
                timeValues: [...this.state.timeValues, time],
              });
              console.log(time, "timeeeeeeeeeeeeeeeeee");
            } else {
              this.state.gpuValues.shift();
              this.state.timeValues.shift();
              this.setState({
                gpuValues: [...this.state.gpuValues, results],
                timeValues: [...this.state.timeValues, time],
              });
            }

            console.log(this.state.gpuValues, "gpuValues");
            console.log(this.state.timeValues, "timeValues");
          });

        window.backend
          .memmetric(this.props.location.state.value)
          .then((result) => {
            let results = result.substring(result.indexOf(":") + 1);
            this.setState({ memoryUsage: results });
            console.log(this.state.memoryUsage, "memory");
          });
        window.backend
          .Uploaddata(this.props.location.state.value)
          .then((result) => {
            console.log(result);
            let results = result.substring(result.indexOf(":") + 1);
            this.setState({ Uploaddata: results });
            console.log(this.state.Uploaddata);
          });

        window.backend
          .AndroidDownloadedData1(this.props.location.state.value)
          .then((result) => {
            console.log(result);
            let results = result.substring(result.indexOf(":") + 1);
            this.setState({ DownloadData: results });
            console.log(this.state.DownloadData);
          });

        window.backend
          .AndroidCPUCores1(this.props.location.state.value)
          .then((result) => {
            console.log(result);
            let results = result.substring(result.indexOf(":") + 1);
            this.setState({ cpuCores: results });
            console.log(this.state.cpuCores);
          });
      }, 1000);
    }
  }

  handleStartScan() {
    console.log("scanning started");
    console.log(this.state.result, "onStart");
    window.backend.startscan("com.android.chrome", "true").then((result) => {
      this.setState({ result: result });
      console.log(this.state.result, "onscanning");
    });
    this.setState({ loader: true });
  }

  handleStopScan() {
    console.log("scanning stopped");
    window.backend.stopscan("com.android.chrome", "fales").then((result) => {
      this.setState({ result: result });
      alert(result);
    });

    this.setState({ loader: false });
  }

  render() {
    console.log(this.props.location.state.value);
    return (
      <div className="appInfo">
        <LoginHeader />

        {/* <button className="btn btn-primary" onClick={this.handleStartScan.bind(this)}>Start Scan</button>
<button className="btn btn-secondary" onClick={this.handleStopScan.bind(this)}>Stop Scan</button> */}

        {this.state.loader && <h3>Scanning...</h3>}
        <h1
          style={{ textAlign: "center", marginTop: "-10%", fontSize: "27px" }}
        >
          Device Metrics
        </h1>

        <div className="container">
          <div class="left">
            <button
              className="btn btn-primary"
              onClick={this.handleCpuStart.bind(this)}
              style={{ align: "center " }}
            >
              Start Scan
            </button>
            <br />
            <br />

            <div class="row">
              <div>
                <div>
                  <div className="info-card">
                    <h5 class="card-title" style={{ fontWeight: "bold" }}>
                      Device Info:
                    </h5>
                    <p class="card-text">
                      {" "}
                      <i class="fa fa-info-circle text-info mx-2"></i>
                      <span style={{ fontWeight: "bold" }}>Version:</span>
                      <small
                        style={{
                          marginLeft: "21px",
                          fontSize: "90%",
                          fontWeight: "500",
                        }}
                      >
                        {this.state.versionName}
                      </small>
                    </p>{" "}
                    <p class="card-text">
                      {" "}
                      <i class="fa fa-laptop text-info mx-2"></i>
                      <span style={{ fontWeight: "bold" }}>
                        Application Name:
                      </span>{" "}
                      <small
                        style={{
                          marginLeft: "21px",
                          fontSize: "90%",
                          fontWeight: "500",
                        }}
                      >
                        {this.state.basicInfo.appname.replace(
                          /com|.qualcomm|.oneplus|.android|.display|.google|.tools|.internal|.emulation|.network/gi,
                          function (matched) {
                            return mapObj[matched];
                          }
                        )}{" "}
                      </small>
                    </p>{" "}
                    <p class="card-text">
                      {" "}
                      <i class="fa fa-android text-info mx-2"></i>
                      <span style={{ fontWeight: "bold" }}>
                        Android version:
                      </span>
                      <small
                        style={{
                          marginLeft: "21px",
                          fontSize: "90%",
                          fontWeight: "500",
                        }}
                      >
                        {this.state.androidVersion}{" "}
                      </small>
                    </p>{" "}
                    <p class="card-text">
                      {" "}
                      <i class="fa fa-desktop text-info mx-2"></i>
                      <span style={{ fontWeight: "bold" }}>Device Model:</span>
                      <small
                        style={{
                          marginLeft: "21px",
                          fontSize: "90%",
                          fontWeight: "500",
                        }}
                      >
                        {this.state.deviceId}{" "}
                      </small>
                    </p>
                    <p class="card-text">
                      {" "}
                      <i class="fa fa-mobile text-info mx-2"></i>
                      <span style={{ fontWeight: "bold" }}>Device Name:</span>
                      <small
                        style={{
                          marginLeft: "21px",
                          fontSize: "90%",
                          fontWeight: "500",
                        }}
                      >
                        {this.state.deviceName}{" "}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="right-container">
              <div className="metric-usage">
                <h5 className="card-title">
                  <b></b>
                </h5>
                <div class="contain">
                  <div class="ui-widgets">
                    <div class="ui-values" style={{ marginTop: "20px" }}>
                      {this.state.cpuUsage && (
                        <p className="font">{this.state.cpuUsage}</p>
                      )}
                    </div>
                  </div>
                </div>

                <p>
                  <strong>Total CPU Usage</strong>
                </p>
              </div>

              <div className="metric-usage">
                <h5 className="card-title">
                  <b></b>
                </h5>
                <div class="contain">
                  <div class="ui-widgets">
                    <div class="ui-values" style={{ marginTop: "20px" }}>
                      {this.state.memoryUsage && (
                        <p className="font">{this.state.memoryUsage}</p>
                      )}
                    </div>
                  </div>
                </div>
                <p className="card-text">
                  <strong>Memory Usage</strong>
                </p>
              </div>

              <div className="metric-usage">
                <h5 className="card-title">
                  <b></b>
                </h5>
                <div class="contain">
                  <div class="ui-widgets">
                    <div class="ui-values" style={{ marginTop: "20px" }}>
                      {this.state.GpuUsage && (
                        <p className="font">{this.state.GpuUsage} MB</p>
                      )}
                    </div>
                  </div>
                </div>
                <p className="card-text">
                  <strong>Total GPU Usage</strong>
                </p>
              </div>

              <div className="metric-usage">
                <h5 className="card-title">
                  <b></b>
                </h5>
                <div class="contain">
                  <div class="ui-widgets">
                    <div class="ui-values" style={{ marginTop: "20px" }}>
                      {this.state.Uploaddata && (
                        <p className="font">{this.state.Uploaddata}</p>
                      )}
                    </div>
                  </div>
                </div>
                <p className="card-text">
                  <strong>Upload Data</strong>
                </p>
              </div>

              <div className="metric-usage">
                <h5 className="card-title">
                  <b></b>
                </h5>
                <div class="contain">
                  <div class="ui-widgets">
                    <div class="ui-values" style={{ marginTop: "20px" }}>
                      {this.state.DownloadData && (
                        <p className="font">{this.state.DownloadData}</p>
                      )}
                    </div>
                  </div>
                </div>
                <p className="card-text">
                  <strong>Download Data</strong>
                </p>
              </div>

              <div className="metric-usage">
                <h5 className="card-title">
                  <b></b>
                </h5>
                <div class="contain">
                  <div class="ui-widgets">
                    <div class="ui-values" style={{ marginTop: "20px" }}>
                      {this.state.cpuCores && (
                        <p className="font">{this.state.cpuCores}</p>
                      )}
                    </div>
                  </div>
                </div>
                <p className="card-text">
                  <strong>Cpu Cores</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        {console.log(this.state.gpuValues)}

        <div class="graphs">
          <Plot
            data={[
              {
                x: this.state.timeValues,
                y: this.state.gpuValues,
                type: "scatter",
                mode: "line",

                marker: { enabled: false },
                line: { shape: "spline", smoothing: 1.06 },
                marker: { color: "#87CEEB", size: "0" },
              },
            ]}
            layout={{
              width: 1150,
              height: 300,
              margin: { l: 40 },
              padding: {
                t: 0,
                r: 0,
                b: 0,
                l: 0,
                pad: -20,
              },
              text: this.state.GpuUsage,
              borderRadius: "15px",
              xaxis: {
                autorange: true,
                rangeslider: {
                  range: ["00:00:00", "00:01:60"],
                },
              },
              plot_bgcolor: "#F5F5F5",
              plot_height: 300,
            }}
          />
        </div>

        {/* <MetricGraph
          metValues={this.state.gpuValues}
          metTime={this.state.timeValues}
        /> */}
      </div>
    );
  }
}
export default AppData;
