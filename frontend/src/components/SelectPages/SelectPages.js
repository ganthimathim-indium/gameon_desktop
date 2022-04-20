import React, { Component } from "react";
import { Link, MemoryRouter as Router, Route, Switch } from "react-router-dom";
// import Home from '../Home/Home';
import BasicInfo from "../Home/BasicInfo";
import LoginHeader from "../Login/Header";
import "./SelectPage.css";

export default class SelectPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devicetext: " ",
      devicecheck: false,
    };
  }

  componentDidMount() {
    window.backend.checkdevice().then((result) => {
      console.log(result, "connectivity");
      if (result === "Device Attached") {
        this.setState({
          devicecheck: true,
          devicetext: "Device Attached Successfully",
        });
      } else if (result === "No Device Attached") {
        this.setState({
          devicecheck: false,
          devicetext: "No Device Attached Kindly Connect Your Device Properly",
        });
      }
    });
  }

  connectdevice = () => {
    window.backend.checkdevice().then((result) => {
      if (result == "Device Attached") {
        this.setState({
          devicecheck: true,
          devicetext: "Device Attached Successfully",
        });
      } else {
        this.setState({
          devicecheck: false,
          devicetext: "No Device Attached Kindly Connect Your Device Properly",
        });
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.devicecheck == true ? (
          <BasicInfo />
        ) : (
          <div>
            <LoginHeader />
            <div className="page_container">
              <img
                src={mobile}
                alt=" "
                style={{ width: "25%", height: "70%", marginLeft: "13%" }}
              />
              <div
                style={{
                  float: "right",
                  color: "#FFFFFF",
                  display: "inline",
                  marginRight: "10%",
                }}
              >
                <p>No Device</p>
                <h1>Attached</h1>
                <small>Kindly connect your device!</small>
                <button
                  style={{
                    width: "50%",
                    height: "30px",
                    color: "black",
                    marginTop: "30px",
                    background: "#FFFFFF",
                    border: "1px solid white",
                    borderRadius: "20px",
                  }}
                  onclick={this.connectdevice}
                >
                  Connect Device
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
