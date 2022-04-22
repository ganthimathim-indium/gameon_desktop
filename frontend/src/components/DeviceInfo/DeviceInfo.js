import React from "react";
import osVersion from "../../asset/version.png";
import "./DeviceInfo.css";
import androidLogo from "../../asset/androidlogo.png";
import mini from "../../asset/mini.png";
import appVersion from "../../asset/appVersion.png";
import charge from "../../asset/charge.png";
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

function DeviceInfo(props) {
  return (
    <>
      {/* <div className="name-info-style">
        <div className="name-info-sub">
          <div>
            <img src={charge} alt=" " className="app-info-image" />
          </div>
          <div className="name-info-text">
            <p style={{ fontSize: "22px", fontWeight: "400" }}>
              {props.appName}
            </p>
            <p style={{ marginTop: "-10px", fontSize: "9px", color: "black" }}>
              App Name
            </p>
          </div>
        </div>
      </div> */}
      <div className="device-info-style">
        <div className="device-info-sub">
          <div>
            <img src={osVersion} alt=" " className="device-info-image" />
          </div>
          <div className="device-info-text">
            <p style={{ fontSize: "9px", fontWeight: "200" }}>
              {props.androidVersion}
            </p>
            <p style={{ marginTop: "-10px" }}>App Version</p>
          </div>
        </div>
        <hr className="device-divider-style" />
        <div className="device-info-sub">
          <div>
            <img src={charge} alt=" " className="device-info-image" />
          </div>
          <div className="device-info-text">
            <p style={{ fontSize: "9px", fontWeight: "200" }}>
              {props.appName}
            </p>
            <p style={{ marginTop: "-10px" }}>App Name</p>
          </div>
        </div>
      </div>

      <div className="app-info-style">
        <div className="app-info-sub">
          <p>Device Info</p>
        </div>
        <hr className="app-divider-style" />
        <div className="app-info-sub">
          <div>
            <img src={appVersion} alt=" " className="app-info-image" />
          </div>
          <div className="device-info-text">
            <p style={{ fontSize: "9px", fontWeight: "200" }}>
              {props.osVersion}
            </p>
            <p style={{ marginTop: "-12px" }}>OS Version</p>
          </div>
        </div>
        <hr className="app-divider-style" />
        <div className="app-info-sub">
          <div>
            <img src={mini} alt=" " className="app-info-image" />
          </div>
          <div className="device-info-text">
            <p style={{ fontSize: "9px", fontWeight: "200" }}>
              {props.deviceId}
            </p>
            <p style={{ marginTop: "-12px" }}>Market Name</p>
          </div>
        </div>
        <hr className="app-divider-style" />
        <div className="app-info-sub">
          <div>
            <img src={androidLogo} alt=" " className="app-info-image" />
          </div>
          <div className="device-info-text">
            <p style={{ fontSize: "9px", fontWeight: "200" }}>
              {props.deviceName}
            </p>
            <p style={{ marginTop: "-12px" }}>Device name</p>
          </div>
        </div>

        <hr className="app-divider-style" />
        <div className="app-info-sub">
          <div>
            <img src={androidLogo} alt=" " className="app-info-image" />
          </div>
          <div className="device-info-text">
            <p style={{ fontSize: "9px", fontWeight: "200" }}>
              {props.cpuArch}
            </p>
            <p style={{ marginTop: "-10px" }}>CPU Arch</p>
          </div>
        </div>
        <hr className="app-divider-style" />
        <div className="app-info-sub">
          <div>
            <img src={androidLogo} alt=" " className="app-info-image" />
          </div>
          <div className="device-info-text">
            <p style={{ fontSize: "9px", fontWeight: "200" }}>
              {props.cpuCores}
            </p>
            <p style={{ marginTop: "-10px" }}>CPU cores</p>
          </div>
        </div>
      </div>
    </>

    // <div className="info-card">
    //   <h5 class="card-title" style={{ fontWeight: "bold" }}>
    //     Device Info:
    //   </h5>
    //   <p class="card-text">
    //     {" "}
    //     <i class="fa fa-info-circle text-info mx-2"></i>
    //     <span style={{ fontWeight: "bold" }}>OS Version:</span>
    //     <small
    //       style={{
    //         marginLeft: "21px",
    //         fontSize: "90%",
    //         fontWeight: "500",
    //       }}
    //     >
    //       {props.osVersion}
    //     </small>
    //   </p>{" "}
    //   <p class="card-text">
    //     {" "}
    //     <i class="fa fa-laptop text-info mx-2"></i>
    //     <span style={{ fontWeight: "bold" }}>Application Name:</span>{" "}
    //     <small
    //       style={{
    //         marginLeft: "21px",
    //         fontSize: "90%",
    //         fontWeight: "500",
    //       }}
    //     >
    //       {props.appName
    //         .replace(
    //           /com|.qualcomm|.oneplus|.android|.display|.google|.tools|.internal|.emulation|.network/gi,
    //           function (matched) {
    //             return mapObj[matched];
    //           }
    //         )
    //         .split(".")}
    //     </small>
    //   </p>{" "}
    //   <p class="card-text">
    //     {" "}
    //     <i class="fa fa-android text-info mx-2"></i>
    //     <span style={{ fontWeight: "bold" }}>App version:</span>
    //     <small
    //       style={{
    //         marginLeft: "21px",
    //         fontSize: "90%",
    //         fontWeight: "500",
    //       }}
    //     >
    //       {props.androidVersion}{" "}
    //     </small>
    //   </p>{" "}
    //   <p class="card-text">
    //     {" "}
    //     <i class="fa fa-desktop text-info mx-2"></i>
    //     <span style={{ fontWeight: "bold" }}>Device Model:</span>
    //     <small
    //       style={{
    //         marginLeft: "21px",
    //         fontSize: "90%",
    //         fontWeight: "500",
    //       }}
    //     >
    //       {props.deviceId}{" "}
    //     </small>
    //   </p>
    //   <p class="card-text">
    //     {" "}
    //     <i class="fa fa-mobile text-info mx-2"></i>
    //     <span style={{ fontWeight: "bold" }}>Device Name:</span>
    //     <small
    //       style={{
    //         marginLeft: "21px",
    //         fontSize: "90%",
    //         fontWeight: "500",
    //       }}
    //     >
    //       {props.deviceName}
    //     </small>
    //   </p>
    // </div>
  );
}

export default DeviceInfo;
