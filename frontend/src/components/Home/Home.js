import React, { useState, Component } from 'react';
import LoginHeader from '../Login/Header';
import {Link,  MemoryRouter as Router,Redirect, Route, Switch } from "react-router-dom";
import './Home.css';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            osname: "",
            deviceid: "",
            applist: [],
            appname: "",
            SelectedList: "",
            openStatus: false
        };
    }
    componentDidMount() {
        (window.backend.basic().then((result) => {
            var num2x;
            const data = JSON.parse(result)
            num2x = data.map((n) => {
                const parsing = JSON.parse(n.applist)
                parsing.map((n) => {
                })
                this.setState({
                    osname: n.osname,
                    deviceid: n.devicename,
                    applist: parsing,
                })
            })
        }));
    }

    openApp = (list) => {
        this.setState({ SelectedList: list, openStatus: true })
        window.backend.openapp(list).then((result) => {
        })
    }


    render() {
        if (this.state.openStatus) {
            return <Redirect to={{
                pathname: "/app-info",
                state: { "value": this.state.SelectedList }
              }}/>
        }
        return (
            <div>
                <LoginHeader />
                <h1 style={{ textAlign: "center", fontSize: "27px", marginTop: "-4%" }}>Device Information</h1>
                <div class="container" style={{ marginTop: "2%" }}>
                    <div class="row">
                        <div class="col-4">
                            <ul class="list-group">
                                <li class="list-group-item active" style={{ fontWeight: "900" }}>Device Details</li>
                                <li class="list-group-item"><i class="fa fa-laptop text-info mx-2"></i> <span style={{ fontWeight: "500" }}> Device Model :</span> {this.state.deviceid} </li>
                                <li class="list-group-item"><i class="fa fa-windows text-info mx-2"></i> <span style={{ fontWeight: "500" }}>Operating System :</span> {this.state.osname} </li>
                            </ul>
                        </div>
                        <div class="col-8">
                            <table id="customers">
                                <thead>
                                    <tr>
                                        <th>Device App List</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.applist.map((list) =>
                                        <tr>
                                            <td>{list}</td>
                                            <td><button className="btn btn-secondary" onClick={() => this.openApp(list)}><i class="fa fa-book blue-color"></i>Open App</button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;


