import React, { Component } from "react";
import logo from "../../asset/game.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class LoginHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      connection: false,
    };
  }

  redirect = () => {
    if (this.props.history.location.pathname) {
      let redirect_path = `/signin?continue=${window.location.href
        .split("/")
        .slice(3)
        .join("/")}`;
      this.props.history.push(redirect_path)
    }
  };

  logout = () => {
    var email = localStorage.getItem("email");
    var password = localStorage.getItem("password");
    var rememberMe = localStorage.getItem("rememberMe");
    var login_email = localStorage.getItem("login_email");
    localStorage.clear();
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("rememberMe", rememberMe);
    localStorage.setItem("login_email", login_email);
    window.location = "/aladdin-landing";
  };



  render() {
    var profile = (
      <i
        className="bi bi-person-square iconStyleHeader"
      ></i>
    );

    let data;
    data = (
      <div>
              <h5 style={{display: "inline"}}>Ganthimathi</h5> 
              <span style={{ marginLeft: "55%" }}>{profile}</span>
              </div>
          
      )

    return (
      <div>
        <header>
          <nav className="navbar navbarX  navbar-light bg-grey">
            <div className="container-fluid col-10">
              <Link
                style={{ textDecoration: "none" }}
                to={{ pathname: "/" }}
              >
               
              </Link>
             
              {data}
            </div>
          </nav>
        </header>
        <div style={{ height: "80px" }}></div>
      </div>
    );
  }
}


export default (withRouter(LoginHeader));
