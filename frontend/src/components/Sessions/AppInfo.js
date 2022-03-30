import React from "react";
import './AppInfo.css';
import LoginHeader from '../Login/Header';
import CircularProgress from '@mui/material/CircularProgress';

var mapObj = {
    "com": " ",
    ".oneplus": " ",
    ".qualcomm": " ",
    ".android": " ",
    ".display": " ",
    ".google": " ",
    ".tools": " ",
    ".internal": " ",
    ".emulation": " ",
    ".network": " "
};

class AppData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basicInfo: { "appname": this.props.location.state.value, "id": "24", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoicmFodWxAZ21haWwuY29tIiwidXNlcl9yb2xlIjoidXNlciIsInVzZXJfaWQiOjI0LCJpYXQiOjE2NDg1MzkzNDR9.FUmjwywXb9oqxvaeUk4rb2stsbmw4BVD0198C0JgXis" },
            deviceId: "",
            deviceName: "",
            androidVersion: "",
            versionName: "",
            cpuUsage: "",
            appName: "",
            memoryUsage: "",
            GpuUsage: "",
            result: 5,
            loader: false
        };
    }

    componentDidMount() {
        const basicData = JSON.stringify(this.state.basicInfo);
        console.log(this.state.basicInfo)

        console.log(basicData, "basidata")

        window.backend.basiconfo(basicData).then((result) => {
            console.log(result, "result")
            const data = JSON.parse(result)


            this.setState({ appName: this.props.location.state.value, deviceId: data.data.device_id, deviceName: data.data.device_name, androidVersion: data.data.android_version, versionName: data.data.version_name })

        }).catch((err) => {
            console.log(err, "error")
        })

        window.backend.gpumetric(this.props.location.state.value).then((result) => {
            let results = result.substr(18);
            console.log(results)
            console.log(result)

            this.setState({ GpuUsage: results })
        })

        window.backend.memmetric(this.props.location.state.value).then((result) => {
            let results = result.substring(result.indexOf(":") + 1);
            this.setState({ memoryUsage: results })
        })

        window.backend.cpumetric(this.props.location.state.value).then((result) => {
            let results = result.substr(18);
            this.setState({ cpuUsage: results })
        })
    }

    handleStartScan() {
        console.log("scanning started")
        console.log(this.state.result, "onStart")
        window.backend.startscan("com.android.chrome", "true").then((result) => {
            this.setState({ result: result })
            console.log(this.state.result, "onscanning")
        });
        this.setState({ loader: true })



    }

    handleStopScan() {
        console.log("scanning stopped")
        window.backend.stopscan("com.android.chrome", "fales").then((result) => {
            this.setState({ result: result })
            alert(result)
        });

        this.setState({ loader: false })

    }

    render() {
        console.log(this.props.location.state.value)
        return (
            <div className="appInfo">
                <LoginHeader />
                <button className="btn btn-primary" onClick={this.handleStartScan.bind(this)}>Start Scan</button>
                <button className="btn btn-secondary" onClick={this.handleStopScan.bind(this)}>Stop Scan</button>

                {this.state.loader && <h3 >Scanning...</h3>}
                <h1 style={{ textAlign: "center", marginTop: "-10%", fontSize: "27px" }}>Device Metrics</h1>

                <div className="containers">



                    <div class="left">
                        <div>
                            <h3>{this.state.basicInfo.appname.replace(/com|.qualcomm|.oneplus|.android|.display|.google|.tools|.internal|.emulation|.network/gi, function (matched) {
                                return mapObj[matched];
                            })}</h3></div>
                        <div class="row">
                            <div >
                                <div >
                                    <div className="info-card">
                                        <h5 class="card-title" style={{ fontWeight: "bold" }}>Device Info:</h5>
                                        <p class="card-text"> <i class="fa fa-info-circle text-info mx-2"></i><span style={{ fontWeight: "bold" }}>Version:</span><small style={{ marginLeft: "21px", fontSize: "90%", fontWeight: "500" }}>{this.state.versionName}</small>
                                        </p> <p class="card-text"> <i class="fa fa-laptop text-info mx-2"></i><span style={{ fontWeight: "bold" }}>Application Name:</span> <small style={{ marginLeft: "21px", fontSize: "90%", fontWeight: "500" }}>{this.state.appName} </small>
                                        </p> <p class="card-text"> <i class="fa fa-android text-info mx-2"></i><span style={{ fontWeight: "bold" }}>Android version:</span><small style={{ marginLeft: "21px", fontSize: "90%", fontWeight: "500" }}>{this.state.androidVersion} </small>
                                        </p> <p class="card-text"> <i class="fa fa-desktop text-info mx-2"></i><span style={{ fontWeight: "bold" }}>Device Model:</span><small style={{ marginLeft: "21px", fontSize: "90%", fontWeight: "500" }}>{this.state.deviceId} </small>
                                        </p><p class="card-text"> <i class="fa fa-mobile text-info mx-2"></i><span style={{ fontWeight: "bold" }}>Device Name:</span><small style={{ marginLeft: "21px", fontSize: "90%", fontWeight: "500" }}>{this.state.deviceName} </small>
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
                                        <div class="ui-values" style={{ marginTop: "20px" }}>{this.state.cpuUsage && <p>{this.state.cpuUsage}</p>}</div>

                                    </div>
                                </div>

                                <p ><strong>Total CPU Usage</strong></p>
                            </div>


                            <div className="metric-usage">
                                <h5 className="card-title"><b></b></h5>
                                <div class="contain">


                                    <div class="ui-widgets">
                                        <div class="ui-values" style={{ marginTop: "20px" }}>{this.state.memoryUsage && <p>{this.state.memoryUsage}</p>}</div>

                                    </div>
                                </div>
                                <p className="card-text"><strong>Memory Usage
                                </strong></p>
                            </div>



                            <div className="metric-usage">
                                <h5 className="card-title"><b></b></h5>
                                <div class="contain">


                                    <div class="ui-widgets">
                                        <div class="ui-values" style={{ marginTop: "20px" }}>{this.state.GpuUsage && <p>{this.state.GpuUsage}</p>}</div>

                                    </div>
                                </div>
                                <p className="card-text"><strong>
                                    Total GPU Usage
                                </strong></p>
                            </div>


                        </div>
                    </div>



                </div>



            </div>

        );
    }
}
export default AppData;