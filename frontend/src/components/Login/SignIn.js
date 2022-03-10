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
      <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '100vh', backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <div className="container">
          <Box sx={{ flexGrow: 1 }}>
            <StyledToolbar>
              <Card elevation={20} style={paperStyle1}>
                <Grid align="center">
                  <Box
                    component="img"
                    sx={{
                      height: "auto",
                      width: 250,
                      maxHeight: { xs: 450, md: 450 },
                      maxWidth: { xs: 450, md: 450 },
                    }}
                    alt="GameOn"
                    src={GameOn}
                  />
                  <Typography variant="h5">
                    Ingenious way to test Digital Apps
                  </Typography>
                  {/* {this.state.result && <Link to="/select-page"></Link>} */}
                </Grid>
                  <div className="login-form">
                    <form onSubmit={this.handleSubmit}>
                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="pills-home"
                          role="tabpanel"
                          aria-labelledby="pills-home-tab"
                        >
                          <div className="mb-2">
                            <div
                              className={
                                this.state.mobile && this.state.mobile.length > 0
                                  ? "form-group signin-div mb-0 inputPhone"
                                  : "form-group signin-div mb-0"
                              }
                            >
                              <i
                                className="bi bi-envelope mx-1"
                                style={{ fontSize: "26px", color: "#436fb6" }}
                              ></i>
                              <input
                                type="text"
                                className="form-control signin-form"
                                value={this.state.email}
                                onChange={this.onEmailChange}
                                placeholder='Enter Email'
                                disabled={
                                  this.state.mobile && this.state.mobile.length > 0
                                    ? true
                                    : false
                                }
                              />
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
                          </div>
                          <div className="form-group">
                            <div className="input-group signin-div">
                              <i
                                className="fa fa-lock mx-1"
                                style={{ fontSize: "34px", color: "#436fb6" }}
                              ></i>
                              <input
                                type={this.state.types}
                                className="form-control signin-form"
                                value={this.state.password}
                                onChange={this.onPasswordChange}
                                placeholder="Enter Password"
                              />
                              <div className="input-group-append">
                                <span
                                  className="input-group-text"
                                  style={{
                                    padding: "0.6rem 0.75rem",
                                    border: "none",
                                    cursor: "pointer",
                                  }}
                                  onClick={this.pwdhandleClick}
                                >
                                  {this.state.types === "text" ? (
                                    <i>{eye}</i>
                                  ) : (
                                    <i>{eyeslash}</i>
                                  )}
                                </span>
                              </div>
                            </div>
                            {this.state.validPassword && (
                              <div className="validCred">*Password cannot be empty</div>
                            )}
                          </div>
                          <input
                            type="submit"
                            className="btn btn-block btn-lg"
                            value="Login"
                            style={{ marginTop: "6%" }}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                <br></br>
              </Card>
            </StyledToolbar>
          </Box>
        </div>
      </div>
    );
  }
}

export default (SignIn);
