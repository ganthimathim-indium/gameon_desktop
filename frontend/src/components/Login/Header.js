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
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown my-auto headerElement">
            <div className="d-flex justify-content-center">
              <h5>Ganthimathi</h5> <span style={{ marginLeft: "40%" }}>{profile}</span>
            </div>
          </li>
        </ul>
      </div>)

    return (
      <div>
        <header>
          <nav className="navbar navbarX navbar-expand-lg navbar-light bg-white">
            <div className="container-fluid col-10">
              <Link
                style={{ textDecoration: "none" }}
                to={{ pathname: "/" }}
              >
                <div className="me-lg-4 aladdinLogoDiv">
                  <img className="aladdinLogo" src={logo} alt="" />
                </div>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
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
