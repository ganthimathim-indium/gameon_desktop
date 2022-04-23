import React from "react";
import "./AppInfo.css";
import LoginHeader from "../Login/Header";
import CircularProgress from "@mui/material/CircularProgress";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import MetricGraph from "../../Graph/MetricGraph.js";
import PulseLoader from "react-spinners/PulseLoader";
import MetricUsage from "../../MetricUsage/MetricUsage";
import DeviceInfo from "../DeviceInfo/DeviceInfo";
import { withRouter } from "react-router-dom";

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
        id: this.props.location.state.user.id.toString(),
        token: this.props.location.state.user.token,
        // userRole: this.props.location.state.user.userRole,
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
      cpuStart: false,
      cpuValues: [],
      gpuValues: [],
      memValues: [],
      fpsValues: [],
      uploadValues: [],
      downloadValues: [],
      powerValues: [],
      appPowerValues: [],

      timeSeconds: 0,
      timeValues: [],
      userInfo: null,
      power: 0,
      appPower: 0,
      cpuArch: "",
      avgMedianFPS: 0,
      devicetext: " ",
      devicecheck: false,
    };
  }

  componentDidMount() {
    console.log(this.props);
    // console.log(this.props.usersValue)
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

    window.backend.cpuarch(this.props.location.state.value).then((result) => {
      console.log(result);
      let results = result.substring(result.indexOf(":") + 1);
      this.setState({ cpuArch: results });
      console.log(this.state.cpuArch);
    });

    window.backend
      .AndroidCPUCores1(this.props.location.state.value)
      .then((result) => {
        console.log(result);
        let results = result.substring(result.indexOf(":") + 1);
        this.setState({ cpuCores: results });
        console.log(this.state.cpuCores);
      });
  }

  // componentDidUpdate(prevprops) {
  //   if (this.props.userInfo !== prevprops.state) {
  //     this.setState({ userInfo: this.props.userInfo });
  //   }
  // }

  handleCpuStart() {
    console.log(this.state.cpuStart, "cpustrtbefore");

    this.setState({ cpuStart: !this.state.cpuStart }, () => {
      console.log(this.state.cpuStart, "cpustrt");
      if (this.state.cpuStart) {
        const myJson = JSON.stringify(this.state.basicInfo);
        this.setState({ loader: true });

        window.backend.startscan(myJson, "false").then((result) => {
          const data = JSON.parse(result);
          console.log(data, "start data result");
          this.session_id = data.data.session_id;
        });
        //setdeviceId(data.data.session_id)

        // const persons1 = { "appname": "com.google.android.play.games", "id": "1", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmluYXlAZ21haWwuY29tIiwidXNlcl9yb2xlIjoidXNlciIsInVzZXJfaWQiOjIzLCJpYXQiOjE2NDk3MDk3NDl9.ZsLXUGiTpUqQRUvYEcRzDsh5iWl4pVmoNSWm1HvWN3E", "session_id": data.data.session_id }
        // const myJSON1 = JSON.stringify(persons1);

        this.timer = setInterval(() => {
          this.setState({
            timeSeconds: this.state.timeSeconds + 3,
          });
          let time = new Date(this.state.timeSeconds * 1000)
            .toISOString()
            .substr(14, 5);
          if (this.state.timeValues.length < 8) {
            this.setState({
              timeValues: [...this.state.timeValues, time],
            });
          } else {
            this.state.timeValues.shift();
            this.setState({
              timeValues: [...this.state.timeValues, time],
            });
          }
          window.backend
            .cpumetric(this.props.location.state.value)
            .then((result) => {
              let results = result.substr(18);
              this.setState({ cpuUsage: results });
              console.log(this.state.cpuUsage, "cpu");
              if (this.state.cpuValues.length < 8) {
                this.setState({
                  cpuValues: [...this.state.cpuValues, results],
                  // timeValues: [...this.state.timeValues, time],
                });
                console.log(time, "timeeeeeeeeeeeeeeeeee");
              } else {
                this.state.cpuValues.shift();
                // this.state.timeValues.shift();
                this.setState({
                  cpuValues: [...this.state.cpuValues, results],
                  // timeValues: [...this.state.timeValues, time],
                });
              }
            });
          window.backend
            .gpuMetric(this.props.location.state.value)
            .then((result) => {
              console.log(result, "gpu");
              let results = Number(result.substr(18));
              console.log(results);
              console.log(result);
              this.setState({ GpuUsage: results });
              // this.setState({
              //   timeSeconds: this.state.timeSeconds + 3,
              // });
              // let time = new Date(this.state.timeSeconds * 1000)
              //   .toISOString()
              //   .substr(14, 5);
              console.log(this.state.GpuUsage, "gpu");
              if (this.state.gpuValues.length < 8) {
                this.setState({
                  gpuValues: [...this.state.gpuValues, results],
                  // timeValues: [...this.state.timeValues, time],
                });
                console.log(time, "timeeeeeeeeeeeeeeeeee");
              } else {
                this.state.gpuValues.shift();
                // this.state.timeValues.shift();
                this.setState({
                  gpuValues: [...this.state.gpuValues, results],
                  // timeValues: [...this.state.timeValues, time],
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
              if (this.state.memValues.length < 8) {
                this.setState({
                  memValues: [...this.state.memValues, results],
                  // timeValues: [...this.state.timeValues, time],
                });
                console.log(time, "timeeeeeeeeeeeeeeeeee");
              } else {
                this.state.gpuValues.shift();
                // this.state.timeValues.shift();
                this.setState({
                  memValues: [...this.state.memValues, results],
                  // timeValues: [...this.state.timeValues, time],
                });
              }
              console.log(this.state.memoryUsage, "memory");
            });
          window.backend
            .Uploaddata(this.props.location.state.value)
            .then((result) => {
              console.log(result);
              let results = result.substring(result.indexOf(":") + 1);
              this.setState({ Uploaddata: results });
              console.log(this.state.Uploaddata);
              if (this.state.uploadValues.length < 8) {
                this.setState({
                  uploadValues: [...this.state.uploadValues, results],
                  // timeValues: [...this.state.timeValues, time],
                });
                console.log(time, "timeeeeeeeeeeeeeeeeee");
              } else {
                this.state.uploadValues.shift();
                // this.state.timeValues.shift();
                this.setState({
                  uploadValues: [...this.state.uploadValues, results],
                  // timeValues: [...this.state.timeValues, time],
                });
              }
            });
          window.backend
            .AndroidDownloadedData1(this.props.location.state.value)
            .then((result) => {
              console.log(result);
              let results = result.substring(result.indexOf(":") + 1);
              this.setState({ DownloadData: results });
              console.log(this.state.DownloadData);
              if (this.state.downloadValues.length < 8) {
                this.setState({
                  downloadValues: [...this.state.downloadValues, results],
                  // timeValues: [...this.state.timeValues, time],
                });
                console.log(time, "timeeeeeeeeeeeeeeeeee");
              } else {
                this.state.downloadValues.shift();
                // this.state.timeValues.shift();
                this.setState({
                  downloadValues: [...this.state.downloadValues, results],
                  // timeValues: [...this.state.timeValues, time],
                });
              }
            });

          window.backend
            .powermetric(this.props.location.state.value)
            .then((result) => {
              console.log(result);
              let results = result.substring(result.indexOf(":") + 1);
              this.setState({ power: results });
              console.log(this.state.power);
              if (this.state.powerValues.length < 8) {
                this.setState({
                  powerValues: [...this.state.powerValues, results],
                  // timeValues: [...this.state.timeValues, time],
                });
                console.log(time, "timeeeeeeeeeeeeeeeeee");
              } else {
                this.state.powerValues.shift();
                // this.state.timeValues.shift();
                this.setState({
                  powerValues: [...this.state.powerValues, results],
                  // timeValues: [...this.state.timeValues, time],
                });
              }
            });

          window.backend
            .Apppowermetric(this.props.location.state.value)
            .then((result) => {
              console.log(result);
              let results = result.substring(result.indexOf(":") + 1);
              this.setState({ appPower: results });
              console.log(this.state.appPower);
              if (this.state.appPowerValues.length < 8) {
                this.setState({
                  appPowerValues: [...this.state.appPowerValues, results],
                  // timeValues: [...this.state.timeValues, time],
                });
                console.log(time, "timeeeeeeeeeeeeeeeeee");
              } else {
                this.state.appPowerValues.shift();
                // this.state.timeValues.shift();
                this.setState({
                  appPowerValues: [...this.state.appPowerValues, results],
                  // timeValues: [...this.state.timeValues, time],
                });
              }
            });

          window.backend
            .AvgMedianFPS(this.props.location.state.value)
            .then((result) => {
              console.log(result, "fps result");
              let results = result.substring(result.indexOf(":") + 1);
              this.setState({ avgMedianFPS: results });
              console.log(this.state.avgMedianFPS, "fps value");
              if (this.state.fpsValues.length < 8) {
                this.setState({
                  fpsValues: [...this.state.fpsValues, results],
                  // timeValues: [...this.state.timeValues, time],
                });
                console.log(time, "timeeeeeeeeeeeeeeeeee");
              } else {
                this.state.fpsValues.shift();
                // this.state.timeValues.shift();
                this.setState({
                  fpsValues: [...this.state.fpsValues, results],
                  // timeValues: [...this.state.timeValues, time],
                });
              }
            });
        }, 3000);
      }
    });
  }

  handleCpuStop() {
    this.setState({ cpuStart: !this.state.cpuStart });
    this.setState({ loader: false });
    clearInterval(this.timer);
    let stopData = {
      appname: this.props.location.state.value,
      id: this.props.location.state.user.id.toString(),
      token: this.props.location.state.user.token,
      session_id: this.session_id,
      userRole: "user",
    };

    let stopJSON = JSON.stringify(stopData);
    window.backend.stopscan(stopJSON, "false").then((result) => {
      const data = result;
      console.log(data, "stop session");
    });
  }
  handleRedirect() {
    // let history = useHistory();
    window.backend.checkdevice().then((result) => {
      if (result == "Device Attached") {
        this.setState(
          {
            devicecheck: true,
            devicetext: "Device Attached Successfully",
          },
          () => {
            let path = "/home";
            this.props.history.push(path);
          }
        );
      } else {
        this.setState({
          devicecheck: false,
          devicetext: "No Device Attached Kindly Connect Your Device Properly",
        });
      }
    });
  }

  render() {
    console.log(this.props.location.state.value);
    return (
      <div className="appInfo">
        <LoginHeader />

        {/* <h1
          style={{ textAlign: "center", marginTop: "-10%", fontSize: "40px" }}
        >
          Device Metrics
        </h1>

        <div className="buttonStyle">
          <button
            className="btn btn-primary"
            onClick={this.handleCpuStart.bind(this)}
            style={{ align: "center " }}
          >
            Start Scan
          </button>

          {this.state.loader && (
            <h3>
              Scanning
              <PulseLoader
                size={10}
                color={"#123abc"}
                loading={this.state.loader}
              />
            </h3>
          )}

          <button
            className="btn btn-secondary"
            onClick={this.handleCpuStop.bind(this)}
            style={{ align: "center " }}
          >
            Stop Scan
          </button>
        </div> */}
        <div className="appBar">
          <p style={{ float: "left" }}>Application Statistics</p>
          {this.state.cpuStart ? (
            <button
              className="stopButton"
              onClick={this.handleCpuStop.bind(this)}
            >
              Stop Scan
            </button>
          ) : (
            <button
              className="startButton"
              onClick={this.handleCpuStart.bind(this)}
            >
              Start Scan
            </button>
          )}

          <button
            className="backButton"
            onClick={this.handleRedirect.bind(this)}
          >
            Back
          </button>
        </div>

        <div className="container">
          <div class="left">
            <div>
              <DeviceInfo
                osVersion={this.state.versionName}
                androidVersion={this.state.androidVersion}
                appName={this.state.appName}
                deviceId={this.state.deviceId}
                deviceName={this.state.deviceName}
                cpuArch={this.state.cpuArch}
                cpuCores={this.state.cpuCores}
              />
            </div>
          </div>

          <div className="right">
            <div className="right-container">
              <MetricUsage
                value={this.state.cpuUsage}
                text="Total CPU Usage"
                unit="%"
                max={100}
              />
              <MetricUsage
                value={this.state.memoryUsage}
                text="Total Memory Usage"
                unit="MB"
                max={1024}
              />
              <MetricUsage
                value={this.state.GpuUsage}
                text="Total GPU Usage"
                unit="MB"
                max={1024}
              />
              <MetricUsage
                value={this.state.Uploaddata}
                text="Upload data"
                unit="MiB"
                max={2048}
              />
              <MetricUsage
                value={this.state.DownloadData}
                text="Download data"
                unit="MiB"
                max={100000}
              />
              <MetricUsage
                value={this.state.power}
                text="Power"
                unit="%"
                max={100}
              />
              <MetricUsage
                value={this.state.appPower}
                text="App power"
                unit="mAh"
                max={100}
              />
              <MetricUsage
                value={this.state.avgMedianFPS}
                text="Avg Median FPS"
                max={60}
              />
              <div class="graphs">
                <MetricGraph
                  metTime={this.state.timeValues}
                  metValues={this.state.cpuValues}
                  text="CPU Usage"
                  unit="%"
                />
                <MetricGraph
                  metTime={this.state.timeValues}
                  metValues={this.state.gpuValues}
                  text="GPU Usage"
                  unit="%"
                />
                <MetricGraph
                  metTime={this.state.timeValues}
                  metValues={this.state.memValues}
                  text="Memory Usage"
                  unit="%"
                />
                <MetricGraph
                  metTime={this.state.timeValues}
                  metValues={this.state.powerValues}
                  text="Power Usage"
                  unit="%"
                />
                <MetricGraph
                  metTime={this.state.timeValues}
                  metValues={this.state.appPowerValues}
                  text="App Power Usage"
                  unit="%"
                />
                <MetricGraph
                  metTime={this.state.timeValues}
                  metValues={this.state.uploadValues}
                  text="Upload Data"
                  unit="%"
                />
                <MetricGraph
                  metTime={this.state.timeValues}
                  metValues={this.state.downloadValues}
                  text="Download Data"
                  unit="%"
                />
                <MetricGraph
                  metTime={this.state.timeValues}
                  metValues={this.state.fpsValues}
                  text="Median FPS"
                  unit="%"
                />
              </div>
            </div>
          </div>
        </div>
        {console.log(this.state.gpuValues)}
      </div>
    );
  }
}
export default AppData;
