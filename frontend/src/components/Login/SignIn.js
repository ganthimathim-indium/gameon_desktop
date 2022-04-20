import React, { Component, useState, useEffect } from "react";
import "./SignIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import background from "../../asset/pc-game.jpg";
import image from "../../asset/img.png";
import indlogo from "../../asset/Group.png";
import {
  Link,
  MemoryRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import GameOn from "./GameOn.png";
import { Grid, Typography, Toolbar } from "@material-ui/core";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { login } from "../../features/loginAuth/loginAuthSlice.js";

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

const SignIn = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    mobile: "",
    password: "",
    token: "",
    id: null,
    validEmail: false,
    isEmptyEmail: false,
    validPassword: false,
    type: "password",
    types: "password",
    showElement: true,
    result: false,
    name: "",
    session_id: null,
    userRole: "",
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  function onEmailChange(e) {
    var email = e.target.value;
    if (e.target.value != "") {
      setState((ps) => {
        return { ...ps, email: e.target.value, isEmptyEmail: false };
      });
      validateEmail(email);
    } else {
      setState((ps) => {
        return {
          ...ps,
          email: e.target.value,
          isEmptyEmail: false,
          validEmail: false,
        };
      });
    }
  }
  function validateEmail(email) {
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
      setState((ps) => {
        return { ...ps, validEmail: "true" };
      });
    } else {
      setState((ps) => {
        return { ...ps, validEmail: false };
      });
    }
    if (num == 0) {
      if (num == 0) {
        setState({
          validEmail: "true",
        });
      } else {
        setState((ps) => {
          return { ...ps, validEmail: false };
        });
      }
    }
  }

  function onPasswordChange(e) {
    if (e.target.value != "") {
      setState((ps) => {
        return { ...ps, password: e.target.value, validPassword: false };
      });
    } else {
      setState((ps) => {
        return { ...ps, password: e.target.value, validPassword: false };
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (state.email && !state.validEmail && state.password) {
      const { email, password } = state;

      const data = {
        email: email,
        password: password,
      };
      const myJSON = JSON.stringify(data);
      window.backend.mylogin(myJSON).then((result) => {
        const userObj = JSON.parse(result);
        console.log(userObj, "userObj");
        var data = [];
        data.push(userObj);
        if (data.length > 0) {
          setState((ps) => {
            return {
              ...ps,
              result: true,
              name: userObj.user_Name,
              id: userObj.id,
              token: userObj.token,
              userRole: userObj.role,
            };
          });
          console.log(userObj.role, "role in sign");
          dispatch(
            login({
              name: userObj.user_Name,
              id: userObj.id,
              token: userObj.token,
              userRole: userObj.role,
            })
          );
        } else {
          alert("login failed");
        }
      });
    } else {
      if (state.email == "") {
        setState((ps) => {
          return { ...ps, isEmptyEmail: "true" };
        });
      }
      if (state.password == "") {
        setState((ps) => {
          return { ...ps, validPassword: "true" };
        });
      }
    }
  }

  // const handleClick = () =>
  //   setState(({ type }) => ({
  //     type: type === "text" ? "password" : "text",
  //   }));

  // const pwdhandleClick = () =>
  //   setState(({ types }) => ({
  //     types: types === "text" ? "password" : "text",
  //   }));

  if (state.result) {
    return (
      <Redirect
        to={{
          pathname: "/select-page",
          state: { name: state.name },
        }}
      />
    );
  }
  return (
    <>
      <div className="log">
        <div>
          <img
            src={indlogo}
            alt=""
            style={{ float: "left", width: "15%", height: "15%" }}
          />
          <h2
            style={{
              float: "right",
              marginRight: "10%",
              fontSize: "25px",
              marginTop: "1.5%",
              marginLeft: "0.7%",
            }}
          >
            GameOn
          </h2>
          <img
            src={indlogo}
            alt=" "
            style={{ width: "5%", height: "5%", float: "right" }}
          />
        </div>
        <div className="box-container">
          <div className="box">
            <div className="left-side">
              <Grid align="center">
                <h5 className="left-top">GameOn</h5>
                <img src={image} alt="" className="login_image" />
                <h5 className="left_bottom"> Smart way to test Game App </h5>

                {/* {state.result && <Link to="/select-page"></Link>} */}
              </Grid>
            </div>

            <div className="right-side">
              <div className="contents">
                <form onSubmit={handleSubmit}>
                  <h3
                    style={{
                      textAlign: "left",
                      marginTop: "10%",
                      marginBottom: "10%",
                    }}
                  >
                    Login
                  </h3>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <div>
                        <div
                          className={
                            state.mobile && state.mobile.length > 0
                              ? ""
                              : " mb-0"
                          }
                        >
                          <TextField
                            id="standard-basic"
                            variant="standard"
                            value={state.email}
                            onChange={onEmailChange}
                            style={{ position: "absolute", width: "23%" }}
                            placeholder="Enter Email"
                            disabled={
                              state.mobile && state.mobile.length > 0
                                ? true
                                : false
                            }
                          />
                          <i
                            className="bi bi-envelope "
                            style={{
                              fontSize: "26px",
                              color: "#FEA14A",
                              position: "relative",
                              marginLeft: "75%",
                            }}
                          ></i>
                        </div>
                        {(state.validEmail || state.isEmptyEmail) && (
                          <div className="validCred">*Enter a valid Email</div>
                        )}
                      </div>
                      {/* <div
                    className={
                      state.email.length > 0
                        ? "form-group inputPhone"
                        : "form-group"
                    }
                  ></div> */}
                      <div>
                        <div>
                          <TextField
                            id="standard-basic"
                            variant="standard"
                            value={state.password}
                            onChange={onPasswordChange}
                            style={{ position: "absolute", width: "23%" }}
                            placeholder="Enter Password"
                          />

                          <button
                            style={{
                              background: "none",
                              color: "#FEA14A",
                              border: "none",
                              cursor: "pointer",
                              postion: "relative",
                              marginTop: "-2%",
                              bottom: 1500,
                              marginLeft: "75%",
                              display: "inline",
                            }}
                            // onClick={pwdhandleClick}
                          >
                            {state.types === "text" ? (
                              <i>{eye}</i>
                            ) : (
                              <i>{eyeslash}</i>
                            )}
                          </button>
                        </div>
                        {state.validPassword && (
                          <div className="validCred">
                            *Password cannot be empty
                          </div>
                        )}
                      </div>
                      <input
                        type="submit"
                        value="Login"
                        style={{
                          marginTop: "15%",
                          background: "#278EF1",
                          borderRadius: "20px",
                          width: "84%",
                          height: "5%",
                          padding: "3px",
                        }}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <br></br>
          </div>
        </div>
      </div>
    </>
  );
};

// class SignIn extends Component {
//   constructor(props) {
//     super(props);
//     state = {
//       email: "",
//       mobile: "",
//       password: "",
//       token: "",
//       id: null,
//       validEmail: false,
//       isEmptyEmail: false,
//       validPassword: false,
//       type: "password",
//       types: "password",
//       showElement: true,
//       result: false,
//       name: "",
//     };
//   }

//   componentDidMount() {
//     window.scrollTo({
//       top: 0,
//       behavior: "instant",
//     });
//   }

//   onEmailChange = (e) => {
//     var email = e.target.value;
//     if (e.target.value != "") {
//       setState({ email: e.target.value, isEmptyEmail: false });
//       validateEmail(email);
//     } else {
//       setState({
//         email: e.target.value,
//         isEmptyEmail: false,
//         validEmail: false,
//       });
//     }
//   };

//   validateEmail = (email) => {
//     const regex =
//       /^(?!\.)(?!.*\.$)(?!.*?\.\.)[.a-zA-Z0-9]+(?!\.)@[a-zA-Z0-9]+\.[A-Za-z]+$/;
//     var str = email.split("@");
//     var x = str[0];
//     var num = 0;
//     for (var i = 0; i < x.length; i++) {
//       if (
//         (x.charCodeAt(i) >= 65 && x.charCodeAt(i) <= 90) ||
//         (x.charCodeAt(i) >= 97 && x.charCodeAt(i) <= 122)
//       ) {
//         num = num + 1;
//       }
//     }
//     if (!email || regex.test(email) === false) {
//       setState({ validEmail: "true" });
//     } else {
//       setState({ validEmail: false });
//     }
//     if (num == 0) {
//       if (num == 0) {
//         setState({
//           validEmail: "true",
//         });
//       } else {
//         setState({ validEmail: false });
//       }
//     }
//   };

//   onPasswordChange = (e) => {
//     if (e.target.value != "") {
//       setState({ password: e.target.value, validPassword: false });
//     } else {
//       setState({ password: e.target.value, validPassword: false });
//     }
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     if (state.email && !state.validEmail && state.password) {
//       const { email, password } = state;

//       const data = {
//         email: email,
//         password: password,
//       };
//       const myJSON = JSON.stringify(data);
//       window.backend.mylogin(myJSON).then((result) => {
//         const userObj = JSON.parse(result);
//         var data = [];
//         data.push(userObj);
//         if (data.length > 0) {
//           setState({
//             result: true,
//             name: userObj.name,
//             id: userObj.id,
//             token: userObj.token,
//           });
//           dispatch(
//             login({
//               name: state.name,
//               id: state.id,
//               token: state.token,
//             })
//           );
//           props.parentCallback({
//             id: state.id,
//             token: state.token,
//           });
//         } else {
//           alert("login failed");
//         }
//       });
//     } else {
//       if (state.email == "") {
//         setState({ isEmptyEmail: "true" });
//       }
//       if (state.password == "") {
//         setState({ validPassword: "true" });
//       }
//     }
//   };

//   handleClick = () =>
//     setState(({ type }) => ({
//       type: type === "text" ? "password" : "text",
//     }));

//   pwdhandleClick = () =>
//     setState(({ types }) => ({
//       types: types === "text" ? "password" : "text",
//     }));

//   render() {
//     if (state.result) {
//       return (
//         <Redirect
//           to={{
//             pathname: "/select-page",
//             state: { name: state.name },
//           }}
//         />
//       );
//     }
//     return (
//       <div className="login">
//         <p>h </p>
//         <div className="containers">
//           <div className="left-side">
//             <Grid align="center">
//               <h5 className="left-top">GameOn</h5>
//               <h5 className="left_bottom"> Smart way to test GameOn </h5>

//               {/* {state.result && <Link to="/select-page"></Link>} */}
//             </Grid>
//           </div>

//           <div className="right-side">
//             <div className="contents">
//               <form onSubmit={handleSubmit}>
//                 <h3 style={{ textAlign: "left" }}>Login</h3>
//                 <div className="tab-content" id="pills-tabContent">
//                   <div
//                     className="tab-pane fade show active"
//                     id="pills-home"
//                     role="tabpanel"
//                     aria-labelledby="pills-home-tab"
//                   >
//                     <div>
//                       <div
//                         className={
//                           state.mobile && state.mobile.length > 0
//                             ? ""
//                             : " mb-0"
//                         }
//                       >
//                         <TextField
//                           id="standard-basic"
//                           variant="standard"
//                           value={state.email}
//                           onChange={onEmailChange}
//                           style={{ position: "absolute", width: "23%" }}
//                           placeholder="Enter Email"
//                           disabled={
//                             state.mobile && state.mobile.length > 0
//                               ? true
//                               : false
//                           }
//                         />
//                         <i
//                           className="bi bi-envelope "
//                           style={{
//                             fontSize: "26px",
//                             color: "black",
//                             position: "relative",
//                             marginLeft: "75%",
//                           }}
//                         ></i>
//                       </div>
//                       {(state.validEmail || state.isEmptyEmail) && (
//                         <div className="validCred">*Enter a valid Email</div>
//                       )}
//                     </div>
//                     <div
//                       className={
//                         state.email.length > 0
//                           ? "form-group inputPhone"
//                           : "form-group"
//                       }
//                     ></div>
//                     <div>
//                       <div>
//                         <TextField
//                           id="standard-basic"
//                           variant="standard"
//                           value={state.password}
//                           onChange={onPasswordChange}
//                           style={{ position: "absolute", width: "23%" }}
//                           placeholder="Enter Password"
//                         />

//                         <button
//                           style={{
//                             background: "none",
//                             border: "none",
//                             cursor: "pointer",
//                             postion: "relative",
//                             marginTop: "-2%",
//                             bottom: 1500,
//                             marginLeft: "75%",
//                             display: "inline",
//                           }}
//                           onClick={pwdhandleClick}
//                         >
//                           {state.types === "text" ? (
//                             <i>{eye}</i>
//                           ) : (
//                             <i>{eyeslash}</i>
//                           )}
//                         </button>
//                       </div>
//                       {state.validPassword && (
//                         <div className="validCred">
//                           *Password cannot be empty
//                         </div>
//                       )}
//                     </div>
//                     <input
//                       type="submit"
//                       value="Login"
//                       style={{
//                         marginTop: "15%",
//                         background: "grey",
//                         borderRadius: "8px",
//                         width: "84%",
//                         padding: "3px",
//                       }}
//                     />
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>

//           <br></br>
//         </div>
//       </div>
//     );
//   }
// }

export default SignIn;
