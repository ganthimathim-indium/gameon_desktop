import React, { Component } from 'react'
import { Link, MemoryRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../Home/Home';
import LoginHeader from '../Login/Header';

export default class SelectPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devicetext: " ",
      devicecheck: false,
    };
  }

  componentDidMount() {
    (window.backend.checkdevice().then((result) => {
      if (result == "Device Attached") {
        this.setState({ devicecheck: true, devicetext: "Device Attached Successfully" })
      } else {
        this.setState({ devicecheck: false, devicetext: "No Device Attached Kindly Connect Your Device Properly" })
      }
    }));
  }

  connectdevice = () => {
    (window.backend.checkdevice().then((result) => {
      if (result == "Device Attached") {
        this.setState({ devicecheck: true, devicetext: "Device Attached Successfully" })
      } else {
        this.setState({ devicecheck: false, devicetext: "No Device Attached Kindly Connect Your Device Properly" })
      }
    }));
  }

  render() {
    return (
      <div>
        {
          this.state.devicecheck == true ?
            <Home />
            : <div>
              <LoginHeader />
              <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "23px" }}>No Device Attached, Kindly Connect Your Device..</p>
              <button className="btn btn-primary" style={{ marginLeft: "45%" }} onClick={this.connectdevice}>Connect Device</button>
            </div>
        }
      </div>
    )
  }
}

