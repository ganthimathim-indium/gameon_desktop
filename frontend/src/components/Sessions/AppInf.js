import React, { useState, useEffect, useRef } from "react";
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

// "id": props.userInfo.id , "token": props.userInfo.token

const AppInf = (props) => {
  console.log("work");
  console.log(props);
  const timescaleRef = useRef([]);
  const [state, setMetric] = useState({
    basicInfo: {
      appname: props.location.state.value,
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
    cpuCores: "",
    DownloadData: 0,
    loader: false,
    cpuValues: [],

    userInfo: null,
  });
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [gpuValues, setGpuValues] = useState([]);
  const [timeValues, setTimeValues] = useState([]);
  const [start, setStart] = useState(true);

  useEffect(
    (props) => {
      const basicData = JSON.stringify(state.basicInfo);
      console.log(state.basicInfo);

      console.log(basicData, "basidata");

      window.backend
        .basiconfo(basicData)
        .then((result) => {
          console.log(result, "result");
          const data = JSON.parse(result);

          setMetric((ps) => {
            return {
              ...ps,
              // appName: props.location.state.value,
              deviceId: data.data.device_id,
              deviceName: data.data.device_name,
              androidVersion: data.data.android_version,
              versionName: data.data.version_name,
            };
          });
        })
        .catch((err) => {
          console.log(err, "error");
        });
    },
    [timeSeconds]
  );

  function handleCpuStart() {
    if (start) {
      var timer = setInterval(() => {
        // window.backend.cpumetric(props.location.state.value).then((result) => {
        //   let results = result.substr(18);
        //   console.log(results, "cpuresults");
        //   setMetric((ps) => {
        //     return { ...ps, cpuUsage: results };
        //   });
        //   console.log(state.cpuUsage, "cpu");
        // });

        window.backend.gpumetric(props.location.state.value).then((result) => {
          let results = Number(result.substr(18));
          console.log(timescaleRef.current, "first current");

          var timeSecond = timeSeconds;

          console.log(results);
          console.log(result);
          setMetric((ps) => {
            return { ...ps, GpuUsage: results };
          });
          setTimeSeconds((ps) => {
            return ps + 1;
          });

          console.log(timeSeconds, "TimeSeconds");
          let time = new Date(timeSecond * 1000).toISOString().substr(14, 5);
          console.log(state.GpuUsage, "gpu");

          // push

          // if greater than 10 - remove ooooooone value from the front
          // time value remove
          // remove y value

          // y value update

          if (gpuValues.length < 10) {
            console.log(gpuValues.length, "length");
            console.log(results, "reeeeeeeeeeeesults");
            console.log(timescaleRef.current, "current");
            let temp1 = gpuValues.push(results);
            setGpuValues(temp1);
            // setGpuValues((pv) => [...pv, results]);
            console.log(gpuValues, "gpuValues");
            // let temp2 = timeValues.push(timeSeconds);
            // setTimeValues(temp2);
            // setTimeValues((pv) => [...pv, time]);
            // console.log(timeValues, "timeValues");
            // console.log(time, "timeeeeeeeeeeeeeeeeee");
            if (!timescaleRef.current[0]) {
              timescaleRef.current[0] = timescaleRef.current.push(0);
            } else {
              let len = timescaleRef.current.length;
              timescaleRef.current.push(timescaleRef.current[len - 1] + 1);
              console.log(timescaleRef.current, "timescaleRef.current");
            }
          } else {
            gpuValues.shift();
            timescaleRef.current.shift();
            let temp1 = gpuValues.push(results);
            setGpuValues(temp1);
            // let temp2 = timeValues.push(timeSeconds);
            // setTimeValues(temp2);
            // setGpuValues((ps) => [...ps, results]);
            // setTimeValues((ps) => [...ps, time]);
            let len = timescaleRef.current.length;
            timescaleRef.current.push(timescaleRef.current[len - 1] + 1);
            console.log(timescaleRef.current, "timescaleRef.current");
          }

          console.log(gpuValues, "gpuValues");
          console.log(timescaleRef.current, "timeValues");
        });

        // window.backend.memmetric(props.location.state.value).then((result) => {
        //   let results = result.substring(result.indexOf(":") + 1);
        //   setMetric((ps) => {
        //     return { ...ps, memoryUsage: results };
        //   });
        //   console.log(state.memoryUsage, "memory");
        // });
        // window.backend.Uploaddata(props.location.state.value).then((result) => {
        //   console.log(result);
        //   let results = result.substring(result.indexOf(":") + 1);
        //   setMetric((ps) => {
        //     return { ...ps, Uploaddata: results };
        //   });
        //   console.log(state.Uploaddata);
        // });

        // window.backend
        //   .AndroidDownloadedData1(props.location.state.value)
        //   .then((result) => {
        //     console.log(result);
        //     let results = result.substring(result.indexOf(":") + 1);
        //     setMetric((ps) => {
        //       return { ...ps, DownloadData: results };
        //     });
        //     console.log(state.DownloadData);
        //   });

        // window.backend
        //   .AndroidCPUCores1(props.location.state.value)
        //   .then((result) => {
        //     console.log(result);
        //     let results = result.substring(result.indexOf(":") + 1);
        //     setMetric((ps) => {
        //       return { ...ps, cpuCores: results };
        //     });
        //     console.log(state.cpuCores);
        //   });
      }, 1000);
    }
  }

  return (
    <div className="appInfo">
      <LoginHeader />

      {/* <button className="btn btn-primary" onClick={handleStartScan.bind(}>Start Scan</button>
  <button className="btn btn-secondary" onClick={handleStopScan.bind(}>Stop Scan</button> */}

      {state.loader && <h3>Scanning...</h3>}
      <h1 style={{ textAlign: "center", marginTop: "-10%", fontSize: "27px" }}>
        Device Metrics
      </h1>

      <div className="container">
        <div class="left">
          <button
            className="btn btn-primary"
            onClick={handleCpuStart}
            style={{ align: "center " }}
          >
            Start Scan
          </button>

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
                      {state.versionName}
                    </small>
                  </p>{" "}
                  <p class="card-text">
                    {" "}
                    <i class="fa fa-laptop text-info mx-2"></i>
                    <span style={{ fontWeight: "bold" }}>
                      Application Name:
                    </span>
                    <small
                      style={{
                        marginLeft: "21px",
                        fontSize: "90%",
                        fontWeight: "500",
                      }}
                    >
                      {/* {state.appName &&
                        state.appName.replace(
                          /com|.qualcomm|.oneplus|.android|.display|.google|.tools|.internal|.emulation|.network/gi,
                          function (matched) {
                            return mapObj[matched];
                          }
                        )} */}
                    </small>
                  </p>
                  <p class="card-text">
                    <i class="fa fa-android text-info mx-2"></i>
                    <span style={{ fontWeight: "bold" }}>Android version:</span>
                    <small
                      style={{
                        marginLeft: "21px",
                        fontSize: "90%",
                        fontWeight: "500",
                      }}
                    >
                      {state.androidVersion}
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
                      {state.deviceId}
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
                      {state.deviceName}
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
              <div class="contain">
                <div class="ui-widgets">
                  <div class="ui-values" style={{ marginTop: "20px" }}>
                    {state.cpuUsage && <p className="font">{state.cpuUsage}</p>}
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
                    {state.memoryUsage && (
                      <p className="font">{state.memoryUsage}</p>
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
                    {state.GpuUsage && <p className="font">{state.GpuUsage}</p>}
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
                    {state.Uploaddata && (
                      <p className="font">{state.Uploaddata}</p>
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
                    {state.DownloadData && (
                      <p className="font">{state.DownloadData}</p>
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
                    {state.cpuCores && <p className="font">{state.cpuCores}</p>}
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
      {console.log(state.GpuUsage)}
      {console.log(timeSeconds, "finallllllllmksbdkbjvzkbj")}
      {console.log(timescaleRef.current, "time scale laaaaaaaast")}

      <MetricGraph metValues={gpuValues} metTime={timescaleRef.current} />
    </div>
  );
};

export default AppInf;
