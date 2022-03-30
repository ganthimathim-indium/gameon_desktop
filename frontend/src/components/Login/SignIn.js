import React, { Component } from "react";
import "./SignIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import background from "../../asset/pc-game.jpg";
import {Link,  MemoryRouter as Router,Redirect, Route, Switch } from "react-router-dom";
import GameOn from './GameOn.png';
import {
  Grid,
  Typography,
  Toolbar,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import { grey } from "@mui/material/colors";


const eye = <FontAwesomeIcon icon={faEye} />;
const eyeslash = <FontAwesomeIcon icon={faEyeSlash} />;
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  "@media all": {
    minHeight: 10,
  },
}));
const paperStyle1 = {
  padding: 20,
  height: "60",
  width: 450,
  margin: "70px auto",
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      mobile: "",
      password: "",
      validEmail: false,
      isEmptyEmail: false,
      validPassword: false,   
      type: "password",
      types: "password",
      showElement: true,
      result:false,
      name: ""
    };
  }

  componentDidMount() {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  onEmailChange = (e) => {
    var email = e.target.value;
    if (e.target.value != "") {
      this.setState({ email: e.target.value, isEmptyEmail: false });
      this.validateEmail(email);
    } else {
      this.setState({
        email: e.target.value,
        isEmptyEmail: false,
        validEmail: false,
      });
    }
  };

  validateEmail = (email) => {
    const regex =
      /^(?!\.)(?!.*\.$)(?!.*?\.\.)[.a-zA-Z0-9]+(?!\.)@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    var str = email.split("@");
    var x = str[0];
    var num = 0;
    for (var i = 0; i < x.length; i++) {
      if (
        (x.charCodeAt(i) >= 65 && x.charCodeAt(i) <= 90) ||
        (x.charCodeAt(i) >= 97 && x.charCodeAt(i) <= 122)
      ) {
        num = num + 1;
      }
    }
    if (!email || regex.test(email) === false) {
      this.setState({ validEmail: "true" });
    } else {
      this.setState({ validEmail: false });
    }
    if (num == 0) {
      if (num == 0) {
        this.setState({
          validEmail: "true",
        });
      } else {
        this.setState({ validEmail: false });
      }
    }
  };

  onPasswordChange = (e) => {
    if (e.target.value != "") {
      this.setState({ password: e.target.value, validPassword: false });
    } else {
      this.setState({ password: e.target.value, validPassword: false });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
      if (this.state.email && !this.state.validEmail && this.state.password) {
        const { email, password } = this.state;

        const data = {
          email: email,
          password: password,
        };
        const myJSON = JSON.stringify(data);
        window.backend.mylogin(myJSON).then((result) => {
          const userObj = JSON.parse(result)
          var data = [];
          data.push(userObj)
          if (data.length > 0) {
            this.setState({result: true, name: userObj.name})
          }
          else {
            alert("login failed");
          }
        }
        );
      } else {
        if (this.state.email == "") {
          this.setState({ isEmptyEmail: "true" });
        }
        if (this.state.password == "") {
          this.setState({ validPassword: "true" });
        }
      }
  };

  handleClick = () =>
    this.setState(({ type }) => ({
      type: type === "text" ? "password" : "text",
    }));

  pwdhandleClick = () =>
    this.setState(({ types }) => ({
      types: types === "text" ? "password" : "text",
    }));

  render() {
    if(this.state.result){
      return <Redirect to={{
        pathname: "/select-page",
        state: { "name": this.state.name }
      }}/>
    }
    return (
      <div className="login">
       <p>h </p>
        <div className="containers">
         
         
            
              


              <div className="left-side">
                <Grid align="center">
              
                <h5 className="left-top">GameOn</h5>
                  <h5 className="left_bottom">  Smart way to test GameOn </h5>
                   
                  
                  {/* {this.state.result && <Link to="/select-page"></Link>} */}

                 
                </Grid>
                </div>

                <div className="right-side">
                <div className="contents">
                 
                    <form onSubmit={this.handleSubmit}>
                    <h3 style={{textAlign: 'left'}}>Login</h3>
                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="pills-home"
                          role="tabpanel"
                          aria-labelledby="pills-home-tab"
                        >
                          <div >
                            <div
                              className={
                                this.state.mobile && this.state.mobile.length > 0
                                  ? ""
                                  : " mb-0"
                              }
                            >
                              
                              <TextField id="standard-basic"   variant="standard"
                                value={this.state.email}
                                onChange={this.onEmailChange}
                                style={{position: "absolute",width:"23%"}}
                                placeholder='Enter Email'
                                disabled={
                                  this.state.mobile && this.state.mobile.length > 0
                                    ? true
                                    : false
                                }
                              />
                              <i
                                className="bi bi-envelope "
                                
                                style={{ fontSize: "26px", color: "black",
                              position: "relative",marginLeft: "75%" }}
                              ></i>
                            </div>
                            {(this.state.validEmail || this.state.isEmptyEmail) && (
                              <div className="validCred">*Enter a valid Email</div>
                            )}
                          </div>
                          <div
                            className={
                              this.state.email.length > 0
                                ? "form-group inputPhone"
                                : "form-group"
                            }
                          >
                          </div >
                          <div >
                            <div>
                           
                             
                              <TextField id="standard-basic"   variant="standard"
                                value={this.state.password}
                                onChange={this.onPasswordChange}
                                style={{position: "absolute",width:"23%"}}
                                placeholder="Enter Password"
                              
                              />
                               
                                <button
                                  
                                  style={{
                                    background:"none",
                                    border: "none",
                                    cursor: "pointer",
                                    postion:"relative",
                                      marginTop:"-2%",
                                    bottom:1500,
                                    marginLeft:"75%",
                                    display: "inline"
                                  }}
                                  onClick={this.pwdhandleClick}
                                >
                                  {this.state.types === "text" ? (
                                    <i>{eye}</i>
                                  ) : (
                                    <i>{eyeslash}</i>
                                  )}
                                </button>
                             
                              
                            </div>
                            {this.state.validPassword && (
                              <div className="validCred">*Password cannot be empty</div>
                            )}
                          </div>
                          <input
                            type="submit"
                            value="Login"
                            style={{ marginTop: "15%",background:"grey",
                          borderRadius: "8px",width:"84%",padding: "3px"}}
                          />
                        </div>
                      </div>
                    </form>
                  </div>

                  
                </div>
                  
                <br></br>
            
           
         
        </div>
       
        
      </div>
    );
  }
}

export default (SignIn);
