import React from "react";
import './AppInfo.css';
import LoginHeader from '../Login/Header';


class AppData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basicInfo: { "appname": this.props.location.state.value, "id": "1", "token": "ffjjifd" },
            deviceId: "",
            deviceName: "",
            androidVersion: "",
            versionName: "",
            cpuUsage: "",
            appName: "",
            memoryUsage: "",
            GpuUsage: "",
            result:5,
            loader:false
        };
    }

    componentDidMount() {
        window.backend.gpumetric(this.props.location.state.value).then((result) => {
            let results = result.substr(18);
            console.log(results)
            console.log(result)

            this.setState({ GpuUsage: results })
        })
        const basicData = JSON.stringify(this.state.basicInfo);
        window.backend.basiconfo(basicData).then((result) => {
            const data = JSON.parse(result)
            data.data.map((val) => {
                this.setState({ appName: this.props.location.state.value, deviceId: val.device_id, deviceName: val.device_name, androidVersion: val.android_version, versionName: val.version_name })
            })
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

    handleStartScan(){
        console.log("scanning started")
        console.log(this.state.result,"onStart")
        window.backend.startscan("com.android.chrome", "true").then((result) => {
            this.setState({result:result})
            console.log(this.state.result,"onscanning")
        });
        this.setState({loader:true})



    }

    handleStopScan(){
        console.log("scanning stopped")
        window.backend.stopscan("com.android.chrome", "true").then((result) => this.setState({result:result}));
        this.setState({loader:false})

    }

    render() {
        console.log(this.props.location.state.value)
        return (
            <div>
                <LoginHeader />
                <button className="btn btn-primary" onClick={this.handleStartScan.bind(this)}>Start Scan</button>
                <button className="btn btn-secondary" onClick={this.handleStopScan.bind(this)}>Stop Scan</button>
              
              {this.state.loader && <h3 >Scanning...</h3>}
                <h1 style={{ textAlign: "center", marginTop: "-4%", fontSize: "27px" }}>Device Metrics</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mt-5">
                            <div className="row">
                                <div className="col-md-4 m-2 m-md-0">
                                    <div className="card borderCard shadow-lg p-3 mb-5 bg-white">
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="col-md-4" className="iconTradeBackground">
                                                    <i className='fa fa-laptop Iconwhite1'></i>
                                                </div>
                                                <div className="col-md-8">
                                                    <h5 className="card-title"><b>{this.state.cpuUsage && <p>{this.state.cpuUsage}</p>}</b></h5>
                                                    <p className="card-text"><strong>Total CPU Usage</strong></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 m-2 m-md-0">
                                    <div className="card borderCard shadow-lg p-3 mb-5 bg-white">
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="col-md-4" className="iconTradeBackground">
                                                    <i className='fa fa-laptop Iconwhite2'></i>
                                                </div>
                                                <div className="col-md-8">
                                                    <h5 className="card-title"><b>{this.state.memoryUsage && <p>{this.state.memoryUsage}</p>}</b></h5>
                                                    <p className="card-text"><strong>Memory Usage
                                                    </strong></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 m-2 m-md-0">
                                    <div className="card borderCard shadow-lg p-3 mb-5 bg-white">
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="col-md-4" className="iconTradeBackground">
                                                    <i className='fa fa-laptop Iconwhite3' ></i>
                                                </div>
                                                <div className="col-md-8">
                                                    <h5 className="card-title"><b>{this.state.GpuUsage && <p>{this.state.GpuUsage}</p>}</b></h5>
                                                    <p className="card-text"><strong>
                                                        Total GPU Usage
                                                    </strong></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-8">
                            <div class="card shadow-lg p-3 mb-5 bg-white">
                                <div class="card-body">
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
            </div>
        );
    }
}
export default AppData;