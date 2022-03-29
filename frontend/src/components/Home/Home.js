import React, { useState, Component } from 'react';
import LoginHeader from '../Login/Header';
import {Link,  MemoryRouter as Router,Redirect, Route, Switch } from "react-router-dom";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import './Home.css';


var mapObj = {
    "com":" ",
    ".oneplus":" ",
    ".qualcomm":" ",
    ".android":" ",
    ".display":" ",
    ".google":" ",
    ".tools":" ",
    ".internal":" ",
    ".emulation":" ",
    ".network":" "
 };

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
                <h3>Device Information</h3>

        <p className="list">No of applications:{this.state.applist.length+1}</p>

     <div className="big-container">
        
     <div className="container">
    {this.state.applist.map((list) =>(
          <div className="mini-card">
              <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2aEE0AUQIbPgaoWSwIl-fTVQA8tIfTcFkow&usqp=CAU" alt="" />
             </div>
              <div>
                   <small >{list.replace(/com|.qualcomm|.oneplus|.android|.display|.google|.tools|.internal|.emulation|.network/gi, function(matched){
                return mapObj[matched];
            })}</small>
              <button onClick={() => this.openApp(list)}><p>Open App</p></button>
              </div>
             
          </div>
    ))}
     
    </div>

    <div className="device-info">
               <p>Device Model:{this.state.deviceid} </p>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8AAADi4uL8/PwaGhp2dnbx8fHu7u74+Pjl5eXX19eWlpZeXl48PDwYGBiKioowMDBNTU2ysrKenp4SEhKEhIRvb28NDQ1DQ0POzs7a2trGxsYqKiofHx+oqKhQUFAE4D5fAAADLUlEQVR4nO3a63KiQBRFYREjiHjDW3Q08/5vOaZSM4lKlW179mmGWut/TvorWmhJBoP48mpaz+aZtvmsnlb5C6uMb7wYiXHfjRZjf+B64+b7bLN29pUrV99nq9ITOPTboN+Nhn7A4pwAmGXnwk3ov0W/WnkBt4mAWbbwARbJgFnms093CYU7D2DgJazy56rCxnpcxCZoJc8/oD+C5jYC0W110Eqef3ZNgubWAtFN5TJoJRGTg+Yu9SebYh+0koiFBM3d6z+IYZspq54efAwbPBGYrhuGLWT79ODAc4T+cBoozD6GzxV2K+2SUBVChAgRIkSI0F345lNCofy3fZVQ6PMXkxyhbQgFITQOoSCExiEUhNA4hIIQGodQEELjEApCaBxCQQiNQygIoXEIBSE0DqEghMYhFITQOISCEBqHUBBC4xAKQmgcQkEIjUMoCKFxCAUhNA6hIITGIRSE0DiEghAah1AQQuMQCkJoHEJBCI1DKAihcQgFITQOoSCExiEUhNA4hIIQGodQEELjEApCaBxCQQiNQygIoXEIBSE0DqEghMYhFITQOISCEBqHUBBC4xAKQmgcQkEIjUMoCKFxCAUhNA6hIITGIRSE0DiEghAah1AQQuMQCkJoHEJBCI27EhZjj4qEwpFPCYUJQogQIUKECBEiRIgQIcJVU+R5XjS/eyp8P/wbcnjvo3B3Neatf8L6Zk7dN+Hy7qXVrGfCX3eDfvVL+N4yKe5u01XhtGXStFfCQ8ukQ6+Ebeuym9QFYdEyqXj8Y/+R8Ngy6dgr4f3DIvZx0VXhtmXStlfC0/3f4fJTr4TZ+m7QR9ygzgqzyc2cSeSc7gpP5dWYyD3aZWF2+nkVJ7HALgsvh9O/l7GMO5J2X3j5nt9Ux6rZvTJCL4y9Q1h1e8eyr9gnBe7bTri2lcukwmX5eImvFvsKyabbF1qKmqTCxkEY97XOKv3H8NJLN/sX2z1enkEpL6LLJYz9YmfRwgc4GKwSAVdewEFxTgI8O+3Rz4abBMC5/kj6o9J/o64cTjNXrX0v4+b+NYi88WL0eGFGjRZjf+ClvJrWs7kYN5/V0+qV/5j/A0yhSG4wfo1TAAAAAElFTkSuQmCC" alt="" />
               <p>Operting system: {this.state.osname}</p>
         </div>
              
     </div>           
     
            </div>
        );
    }
}

export default Home;


