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
import start from "../../asset/start.svg";
import stop from "../../asset/stop.svg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, connect } from "react-redux";
import { login } from "../../features/loginAuth/loginAuthSlice";
import back from "../../asset/back.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import download from "../../asset/download.png";
import timer from "../../asset/timer.png";
import TextField from "@mui/material/TextField";

// import { useSelector } from "react-redux";
// import { selectUser } from "../../features/loginAuth/loginAuthSlice";

const Plot = createPlotlyComponent(Plotly);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",

  boxShadow: 24,
};
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  padding: 4,

  boxShadow: 24,
};

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
// const user = useSelector(selectUser);
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
      fpsStabilityValues: [],
      uploadValues: [],
      downloadValues: [],
      powerValues: [],
      appPowerValues: [],
      peakMemoryValues: [],

      timeSeconds: 0,
      timerTimeSeconds: 0,
      timeValues: [],
      userInfo: null,
      power: 0,
      appPower: 0,
      fpsStability: 0,
      peakMemory: 0,
      cpuArch: "",
      avgMedianFPS: 0,
      devicetext: " ",
      devicecheck: false,
      open: false,
      openTitle: false,
      openBack: false,
      back: true,
      avgCPU: "",
      avgGPU: "",
      avgMem: "",
      avgFps: "",
      avgPower: "",
      AvgFpsStability: "",
      avgPeakMemory: "",
      avgAppPower: "",
      avgUpload: "",
      avgDownload: "",
      popDuration: "",
      sessionName: "",
      popsession_id: "",
      timer: "",
      timerClock: "",
      sessionTitle: "",
      totalTime: "",
    };
  }

  handleClose = () => this.setState({ open: false });
  handleTitleClose = () => {
    let stopData = {
      appname: this.props.location.state.value,
      id: this.props.location.state.user.id.toString(),
      token: this.props.location.state.user.token,
      session_id: this.session_id,
      userRole: "user",
      sessionname: this.state.sessionTitle,
      Avg_time: this.state.timerClock,
    };

    let stopJSON = JSON.stringify(stopData);
    window.backend.stopScan(stopJSON, "false").then((result) => {
      const data = JSON.parse(result);
      console.log(data, "data");
      console.log(data.average_values, "avaerage values");
      this.setState({
        avgCPU: data.average_values.cpu_usage,
        avgGPU: data.average_values.gpu_usage,
        avgMem: data.average_values.memory_usage,
        avgFps: data.average_values.avgfps_app_usage,
        avgPower: data.average_values.power_usage,
        avgAppPower: data.average_values.apppower_app_usage,
        avgUpload: data.average_values.upload_data_usage,
        avgDownload: data.average_values.download_data_usage,
        popDuration: data.total_duraton,
        popsession_id: data.session_id,
        sessionName: data.sessionname,
        totalTime: data.totaltime,
        // avgPeakMemory: data.peak_memory,
        avgFpsStability: data.fps_stabliy,
      });
      console.log(data, "stop session");
    });

    this.setState({ openTitle: false, open: true });
  };
  // handleBackClose = () => this.setState({ openBack: false });

  componentDidMount() {
    console.log(this.props);
    // console.log(this.props.usersValue)
    const basicData = JSON.stringify(this.state.basicInfo);
    console.log(this.state.basicInfo);

    console.log(basicData, "basidata");

    window.backend
      .basicInfo(basicData)
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

    window.backend.cpuArch(this.props.location.state.value).then((result) => {
      console.log(result);
      let results = result.substring(result.indexOf(":") + 1);
      this.setState({ cpuArch: results });
      console.log(this.state.cpuArch);
    });

    window.backend.cpuCores(this.props.location.state.value).then((result) => {
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
    // setInterval(() =>{
    //   let time = new Date(this.state.timeSeconds * 1000)
    //   .toISOString()
    //   .substr(14, 5);
    //    this.setState({timer:time})

    // })

    this.setState({ cpuStart: !this.state.cpuStart, back: false }, () => {
      console.log(this.state.cpuStart, "cpustrt");
      if (this.state.cpuStart) {
        const myJson = JSON.stringify(this.state.basicInfo);
        this.setState({ loader: true });

        window.backend.startScan(myJson, "false").then((result) => {
          const data = JSON.parse(result);
          console.log(data, "start data result");
          this.session_id = data.data.session_id;
        });
        //setdeviceId(data.data.session_id)

        // const persons1 = { "appname": "com.google.android.play.games", "id": "1", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmluYXlAZ21haWwuY29tIiwidXNlcl9yb2xlIjoidXNlciIsInVzZXJfaWQiOjIzLCJpYXQiOjE2NDk3MDk3NDl9.ZsLXUGiTpUqQRUvYEcRzDsh5iWl4pVmoNSWm1HvWN3E", "session_id": data.data.session_id }
        // const myJSON1 = JSON.stringify(persons1);
        this.timerTimeclock = setInterval(() => {
          this.setState({ timerTimeSeconds: this.state.timerTimeSeconds + 1 });
          console.log(this.state.timerTimeSeconds);
          let timerTime = new Date(this.state.timerTimeSeconds * 1000)
            .toISOString()
            .substr(14, 5);
          this.setState({ timerClock: timerTime });
          console.log(this.state.timerClock);
        }, 1000);

        this.timer = setInterval(() => {
          this.setState({
            timeSeconds: this.state.timeSeconds + 3,
          });

          let time = new Date(this.state.timeSeconds * 1000)
            .toISOString()
            .substr(14, 5);
          // this.setState({ timer: timerTime });
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
            .cpuMetric(this.props.location.state.value)
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
            .memoryMetric(this.props.location.state.value)
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
            .uploadData(this.props.location.state.value)
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
            .downloadedData(this.props.location.state.value)
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
            .powerMetric(this.props.location.state.value)
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
            .appPowerMetric(this.props.location.state.value)
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

          // window.backend
          //   .Peakmomery(this.props.location.state.value)
          //   .then((result) => {
          //     console.log(result, "fps result");
          //     let results = result.substring(result.indexOf(":") + 1);
          //     this.setState({ peakMemory: results });
          //     console.log(this.state.peakMemory, "fps value");
          //     if (this.state.peakMemoryValues.length < 8) {
          //       this.setState({
          //         peakMemoryValues: [...this.state.peakMemoryValues, results],
          //         // timeValues: [...this.state.timeValues, time],
          //       });
          //       console.log(time, "timeeeeeeeeeeeeeeeeee");
          //     } else {
          //       this.state.peakMemoryValues.shift();
          //       // this.state.timeValues.shift();
          //       this.setState({
          //         peakMemoryValues: [...this.state.peakMemoryValues, results],
          //         // timeValues: [...this.state.timeValues, time],
          //       });
          //     }
          //   });

          window.backend
            .AvgFPSStablity(this.props.location.state.value)
            .then((result) => {
              console.log(result, "fps stability result");
              let results = result.substring(result.indexOf(":") + 1);
              this.setState({ fpsStability: results });
              console.log(this.state.fpsStability, "fps value");
              if (this.state.fpsStabilityValues.length < 8) {
                this.setState({
                  fpsStabilityValues: [
                    ...this.state.fpsStabilityValues,
                    results,
                  ],
                  // timeValues: [...this.state.timeValues, time],
                });
                console.log(time, "timeeeeeeeeeeeeeeeeee");
              } else {
                this.state.fpsStabilityValues.shift();
                // this.state.timeValues.shift();
                this.setState({
                  fpsStabilityValues: [
                    ...this.state.fpsStabilityValues,
                    results,
                  ],
                  // timeValues: [...this.state.timeValues, time],
                });
              }
            });
        }, 3000);
      }
    });
  }

  handleCpuStop() {
    this.setState({
      cpuStart: !this.state.cpuStart,
      back: true,
    });
    clearInterval(this.timerTimeclock);
    clearInterval(this.timer);
    this.setState({ openTitle: true });
    this.setState({ loader: false });

    // this.setState({ timer: new Date(0).toISOString().substr(14, 5) });
  }
  handleRedirect() {
    console.log(this.props.location.state, "find");

    if (this.state.back) {
      let path = "/select-page";
      this.props.history.push(path);
    }
  }

  handleDownload() {
    console.log("buton clicked");
    console.log(this.state.popsession_id);
    let baseURL = "http://52.39.98.71:3000/getReport?sessionID=";

    // axios
    //   .get({
    //     url: `http://52.39.98.71:3000/getReport?sessionID=${this.state.popsession_id}`,
    //     responseType: "blob",
    //   })
    //   .then((response) => {
    //     console.log(response, "report");
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement("a");
    //     link.href = url;
    //     document.body.appendChild(link);
    //     link.click();
    //   });
  }

  handleTitleChange(e) {
    var sessionTitle = e.target.value;
    this.setState({ sessionTitle: e.target.value });
  }

  render() {
    console.log(this.props.location.state.value);
    if (!this.props.location.state.user.backClick) {
      return (
        <div style={{ position: "relative" }}>
          <div className="appInfo">
            <LoginHeader />

            <div className="appBar">
              <p style={{ float: "left" }}>Application Statistics</p>

              <img
                src={download}
                alt=""
                className="downloadImg"
                onClick={() => {
                  if (this.state.popsession_id !== "") {
                    window.open(
                      `http://52.39.98.71:3000/getReport?sessionID=${this.state.popsession_id}`
                    );
                  }
                }}
              />
              <p className="timerPara">{this.state.timerClock}</p>

              {this.state.cpuStart ? (
                <div className="start-div">
                  <img src={stop} alt="" className="start-image-style" />
                  <button
                    className="stopButton"
                    onClick={this.handleCpuStop.bind(this)}
                  >
                    Stop Scan
                  </button>
                </div>
              ) : (
                <div className="start-div">
                  <img src={start} alt="" className="start-image-style" />
                  <button
                    className="startButton"
                    onClick={this.handleCpuStart.bind(this)}
                  >
                    Start Scan
                  </button>
                </div>
              )}

              {!this.state.cpuStart && (
                <div className="start-div">
                  <img src={back} alt="" className="back-button-image-style" />
                  <button
                    className="backButton"
                    onClick={this.handleRedirect.bind(this)}
                  >
                    Back
                  </button>
                </div>
              )}

              <img src={timer} alt="" className="timerImg" />
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
                    unit="%"
                    max={100}
                  />
                  <MetricUsage
                    value={this.state.Uploaddata}
                    text="Upload data"
                    unit="MiB"
                    max={3072}
                  />
                  <MetricUsage
                    value={this.state.DownloadData}
                    text="Download data"
                    unit="MiB"
                    max={100000}
                  />
                  {/* <MetricUsage
                    value={this.state.power}
                    text="Power"
                    unit="%"
                    max={100}
                  /> */}
                  <MetricUsage
                    value={this.state.appPower}
                    text="App power"
                    unit="mAh"
                    max={100}
                  />
                  <MetricUsage
                    value={this.state.avgMedianFPS}
                    text="Avg Median FPS"
                    max={1}
                  />
                  {/* <MetricUsage
                    value={this.state.peakMemory}
                    text="Avg Peak Memory"
                    max={1}
                  /> */}
                  <MetricUsage
                    value={this.state.fpsStability}
                    text="FPS Stability"
                    unit=""
                    max={100}
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
                      unit="MB"
                    />
                    {/* <MetricGraph
                      metTime={this.state.timeValues}
                      metValues={this.state.powerValues}
                      text="Power Usage"
                      unit="%"
                    /> */}
                    <MetricGraph
                      metTime={this.state.timeValues}
                      metValues={this.state.appPowerValues}
                      text="App Power Usage"
                      unit="mAh"
                    />
                    <MetricGraph
                      metTime={this.state.timeValues}
                      metValues={this.state.uploadValues}
                      text="Upload Data"
                      unit="MiB"
                    />
                    <MetricGraph
                      metTime={this.state.timeValues}
                      metValues={this.state.downloadValues}
                      text="Download Data"
                      unit="MiB"
                    />
                    <MetricGraph
                      metTime={this.state.timeValues}
                      metValues={this.state.fpsValues}
                      text="Median FPS"
                      unit=""
                    />
                    {/* <MetricGraph
                      metTime={this.state.timeValues}
                      metValues={this.state.peakMemoryValues}
                      text="Peak Memory"
                      unit=""
                    /> */}
                    <MetricGraph
                      metTime={this.state.timeValues}
                      metValues={this.state.fpsStabilityValues}
                      text="FPS Stablity"
                      unit="%"
                    />
                  </div>
                </div>
              </div>
            </div>
            {console.log(this.state.gpuValues)}
          </div>

          {this.state.openTitle && (
            <div>
              <Modal
                open={this.state.openTitle}
                onClose={this.handleTitleClose.bind(this)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style1}>
                  <p style={{ color: "#278ef1", fontSize: "17px" }}>
                    Session Title
                  </p>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    type="name"
                    placeholder="Session Title"
                    onChange={this.handleTitleChange.bind(this)}
                    sx={{ width: "100%", marginBottom: 2 }}
                  />
                  <div className="ok">
                    <button onClick={this.handleTitleClose.bind(this)}>
                      Ok
                    </button>
                  </div>
                </Box>
              </Modal>
            </div>
          )}

          {this.state.open && (
            <div>
              <Modal
                open={this.state.open}
                onClose={this.handleClose.bind(this)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div sx={{ p: 4 }}>
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "19px",
                        color: "#278EF1",
                        paddingTop: "1.3%",
                      }}
                    >
                      Average Metric
                    </p>
                  </div>
                  <hr />
                  <div className="duration">
                    <p>Session Title : {this.state.sessionTitle}</p>
                    <p>Session ID : {this.state.popsession_id}</p>
                    <p>Total Duration : {this.state.totalTime} </p>
                  </div>
                  <div className="popup-div">
                    <p className="popup-p">
                      Avg CPU value :
                      {" " + Math.round(this.state.avgCPU * 100) / 100 + " "}%
                    </p>
                    <p>
                      Avg GPU value :
                      {" " + Math.round(this.state.avgGPU * 100) / 100 + " "}%
                    </p>

                    <p>
                      Avg memory :
                      {" " + Math.round(this.state.avgMem * 100) / 100 + " "}MB
                    </p>

                    <p>
                      Avg uploaded data:
                      {" " + Math.round(this.state.avgUpload * 100) / 100 + " "}
                      MiB
                    </p>
                    <p>
                      Avg downloaded data :
                      {" " +
                        Math.round(this.state.avgDownload * 100) / 100 +
                        " "}
                      MiB
                    </p>
                    <p>
                      Avg fps value :
                      {" " + Math.round(this.state.avgFps * 100) / 100 + " "}
                    </p>

                    <p>
                      Avg App Power value :
                      {" " + Math.round(this.state.avgPower * 100) / 100 + " "}
                      mAh
                    </p>
                    {/* <p>
                      Avg Peak Memory value :
                      {" " +
                        Math.round(this.state.avgPeakMemory * 100) / 100 +
                        " "}
                    </p> */}
                    <p>
                      Avg FPS Stablity value :
                      {" " +
                        Math.round(this.state.AvgFpsStability * 100) / 100 +
                        " "}
                    </p>
                  </div>
                  <div className="note">
                    <p>
                      If you want to look for the detailed session details check{" "}
                    </p>
                    <p>for the web app.</p>
                  </div>
                  <hr />
                  <div className="ok">
                    <button onClick={this.handleClose.bind(this)}>Ok</button>
                  </div>
                </Box>
              </Modal>
            </div>
          )}
        </div>
      );
    }
  }
}

// const mapStateToProps = (state) =>{" "+
//   return {
//     login: state.login,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     login: { ...dispatch, backClick: true },
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps())(AppData);
export default AppData;
