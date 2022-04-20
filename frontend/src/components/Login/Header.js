import React, { Component, useState } from "react";
import logo from "../../asset/game.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import indlogo from "../../asset/Group.png";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/loginAuth/loginAuthSlice";

const LoginHeader = () => {
  let users = useSelector(selectUser);
  console.log(users, "user");

  // const [state, setState] = useState({
  //   isChecked: false,
  //   connection: false,
  // });

  // const redirect = () => {
  //   if (props.history.location.pathname) {
  //     let redirect_path = `/signin?continue=${window.location.href
  //       .split("/")
  //       .slice(3)
  //       .join("/")}`;
  //     props.history.push(redirect_path);
  //   }
  // };

  // const logout = () => {
  //   var email = localStorage.getItem("email");
  //   var password = localStorage.getItem("password");
  //   var rememberMe = localStorage.getItem("rememberMe");
  //   var login_email = localStorage.getItem("login_email");
  //   localStorage.clear();
  //   localStorage.setItem("email", email);
  //   localStorage.setItem("password", password);
  //   localStorage.setItem("rememberMe", rememberMe);
  //   localStorage.setItem("login_email", login_email);
  //   window.location = "/aladdin-landing";
  // };

  return (
    <div className="header">
      <header>
        <Link style={{ textDecoration: "none" }} to={{ pathname: "/" }}></Link>
        <img
          src={indlogo}
          alt=" "
          style={{
            float: "left",
            marginLeft: "3%",
            width: "4%",
            objectFit: "contain",
          }}
        />
        <h2
          style={{
            float: "left",
            marginLeft: "10px",
            fontSize: "22px",
            paddingTop: "1%",
          }}
        >
          GameOn
        </h2>
        <p
          style={{
            float: "right",
            marginRight: "10%",
            paddingTop: "1%",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          Vivek
        </p>
      </header>
    </div>
  );
};

// class LoginHeader extends Component {
//   constructor(props) {
//     super(props);
//     state = {
//       isChecked: false,
//       connection: false,
//     };
//   }

//   redirect = () => {
//     if (props.history.location.pathname) {
//       let redirect_path = `/signin?continue=${window.location.href
//         .split("/")
//         .slice(3)
//         .join("/")}`;
//       props.history.push(redirect_path);
//     }
//   };

//   logout = () => {
//     var email = localStorage.getItem("email");
//     var password = localStorage.getItem("password");
//     var rememberMe = localStorage.getItem("rememberMe");
//     var login_email = localStorage.getItem("login_email");
//     localStorage.clear();
//     localStorage.setItem("email", email);
//     localStorage.setItem("password", password);
//     localStorage.setItem("rememberMe", rememberMe);
//     localStorage.setItem("login_email", login_email);
//     window.location = "/aladdin-landing";
//   };

//   render() {
//     var profile = <i className="bi bi-person-square iconStyleHeader"></i>;

//     return (
//       <div className="header">
//         <header>
//           <Link
//             style={{ textDecoration: "none" }}
//             to={{ pathname: "/" }}
//           ></Link>
//           <img
//             src={indlogo}
//             alt=" "
//             style={{
//               float: "left",
//               marginLeft: "3%",
//               width: "4%",
//               objectFit: "contain",
//             }}
//           />
//           <h2
//             style={{
//               float: "left",
//               marginLeft: "10px",
//               fontSize: "22px",
//               paddingTop: "1%",
//             }}
//           >
//             GameOn
//           </h2>
//           <p style={{ float: "right", marginRight: "10%", paddingTop: "2%" }}>
//             {user.name}
//           </p>
//         </header>
//       </div>
//     );
//   }
// }

export default withRouter(LoginHeader);
