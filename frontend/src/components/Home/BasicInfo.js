import React, { useState, useEffect } from "react";
import LoginHeader from "../Login/Header";
import {
  Link,
  MemoryRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import phone from "../../asset/Phone.png";
import ellipse from "../../asset/Ellipse.png";
import android from "../../asset/Android.png";
import searchIcon from "../../asset/Icon-search.png";
import "./Home.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/loginAuth/loginAuthSlice";
import sort from "../../asset/sort.png";
import loader from "../../asset/loader.png";
import refresh from "../../asset/refresh.png";
import appVersion from "../../asset/appVersion.png";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/loginAuth/loginAuthSlice.js";

import p1 from "../../asset/p1.png";
import p2 from "../../asset/p2.png";
import p3 from "../../asset/p3.png";
import p4 from "../../asset/p4.png";
import p5 from "../../asset/p5.png";
import p6 from "../../asset/p6.png";
import p7 from "../../asset/p7.png";
import p8 from "../../asset/p8.png";
import p9 from "../../asset/p9.png";
import p10 from "../../asset/p10.png";
import p11 from "../../asset/p11.png";

var mapObj = {
  com: " ",
  ".oneplus": " ",
  ".qualcomm": " ",
  ".android": " ",
  ".display": " ",
  ".google": " ",
  ".tools": " ",
  ".internal": " ",
  ".emulation": " ",
  ".network": " ",
  ".dragonfistztamilan": " ",
};

const BasicInfo = (props) => {
  const user = useSelector(selectUser);
  // console.log(user, "redux user");
  const dispatch = useDispatch();

  const [state, setState] = useState({
    osname: "",
    deviceid: "",
    applist: [],
    appname: "",
    SelectedList: "",
    openStatus: false,
    loading: true,
    refresh: true,
  });
  const [sortby, setSortby] = useState();

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  let imgArr = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11];

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = state.applist.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(state.applist);
    }
  };

  console.log(state.applist);

  useEffect(() => {
    console.log("hi");
    // window.backend.basic().then((result) => {
    //   console.log(result, "result for execution");
    // });
    window.backend.basic().then((result) => {
      console.log(result, "result for execution");
      var num2x;
      const data = JSON.parse(result);
      num2x = data.map((n) => {
        const parsing = JSON.parse(n.applist);
        parsing.map((n) => {});
        setState((ps) => {
          return {
            ...ps,
            osname: n.osname,
            deviceid: n.deviceName,
            applist: parsing,
            loading: false,
          };
        });
      });
    });
  }, [state.refresh]);

  function ascorder() {
    setSortby(
      state.applist.sort(function (a, b) {
        return a.localeCompare(b);
      })
    );
  }

  const refreshPage = () => {
    setState((ps) => {
      return { ...ps, refresh: !state.refresh };
    });
  };
  const openApp = (list) => {
    dispatch(
      login({
        ...user,
        backClick: false,
      })
    );

    console.log(user, "hello user");
    setState((ps) => {
      return { ...ps, SelectedList: list, openStatus: true };
    });
    window.backend.openApp(list).then((result) => {});
  };

  if (state.openStatus) {
    console.log(state.selectedList, "selected list");
    return (
      <Redirect
        to={{
          pathname: "/app-info",
          state: { user: user, value: state.SelectedList, store: props.store },
        }}
      />
    );
  }

  // if (user.backClick) {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          background: "#f2f8ff",
        }}
      >
        <LoginHeader />

        <div style={{ marginLeft: "9.8%", marginTop: "4%", fontWeight: 600 }}>
          List of Applications
          <img
            src={refresh}
            alt=""
            className="refreshImg"
            onClick={refreshPage}
          />
        </div>

        <div className="nolist">
          <p className="list" style={{ display: "inline" }}>
            Installed Applications:
            <p style={{ color: "#278EF1", display: "inline" }}>
              {state.applist.length}
            </p>
          </p>
          <input
            style={{
              width: "19%",
              height: "15%",
              background: "white",
              border: "2px solid white",
              borderRadius: "5px",
              marginLeft: "26%",
              position: "relative",
              boxShadow: "0px 3px 6px #0000001A",
            }}
            placeholder="Search app here"
            type="text"
            onChange={(e) => searchItems(e.target.value)}
          />
          <img
            src={searchIcon}
            alt=""
            style={{
              position: "relative",
              width: "12px",
              height: "12px",
              right: 15,
            }}
          />
          <img src={sort} alt="" className="sortImageStyle" />
          <p className="sortStyle" onClick={ascorder}>
            Sort
          </p>
        </div>

        <div className="big-container">
          <div className="container">
            {searchInput.length > 1
              ? filteredResults.map((list) => {
                  return (
                    <div className="mini-card">
                      {/* <div>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2aEE0AUQIbPgaoWSwIl-fTVQA8tIfTcFkow&usqp=CAU"
                      alt=""
                    />
                  </div> */}

                      <div className="basic-info-sub">
                        <div>
                          <img
                            src={
                              imgArr[Math.floor(Math.random() * imgArr.length)]
                            }
                            alt=" "
                            className="basic-info-image"
                          />
                        </div>
                        <div>
                          <p
                            style={{
                              display: "inline",
                              color: "#3B3B3B",
                              marginTop: "-1%",
                            }}
                          >
                            {list.replace(
                              /com|.qualcomm|.oneplus|.android|.display|.google|.tools|.internal|.emulation|.dragonfistztamilan|.network/gi,
                              function (matched) {
                                return mapObj[matched];
                              }
                            )}
                          </p>
                          <button
                            className="basicButton"
                            onClick={() => openApp(list)}
                          >
                            Open App>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : state.applist.map((list) => (
                  <div className="mini-card">
                    {/* <div>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2aEE0AUQIbPgaoWSwIl-fTVQA8tIfTcFkow&usqp=CAU"
                      alt=""
                    />
                  </div> */}

                    <div className="basic-info-sub">
                      <div>
                        <img
                          src={
                            imgArr[Math.floor(Math.random() * imgArr.length)]
                          }
                          alt=" "
                          className="basic-info-image"
                        />
                      </div>
                      <div style={{ overflow: " hidden" }}>
                        <p
                          style={{
                            display: "inline",
                            color: "#3B3B3B",
                            marginTop: "-1%",
                            marginLeft: "10%",
                            // textOverflow: "ellipsis",
                            // maxWidth: "50px",
                          }}
                        >
                          {list.replace(
                            /com|.qualcomm|.oneplus|.android|.display|.google|.tools|.internal|.emulation|.dragonfistztamilan|.network/gi,
                            function (matched) {
                              return mapObj[matched];
                            }
                          )}
                        </p>
                        <button
                          className="basicButton"
                          onClick={() => openApp(list)}
                        >
                          Open App>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          <div className="device-info">
            {/* <p>Device Model:{state.deviceid} </p> */}
            <p>Device Info</p>
            <hr style={{ color: "white" }} />
            <p
              style={{
                fontSize: "20px",
                color: "white",
                textAlign: "center",
                display: "inline",
                marginLeft: "20%",
              }}
            >
              {state.deviceid}
            </p>
            <p
              style={{
                fontSize: "10px",
                color: "white",
                marginLeft: "27%",
                marginTop: "-3%",
              }}
            >
              Device Name
            </p>
            <div style={{ positon: "relative" }}>
              {/* <img
                    src={ellipse}
                    alt=""
                    style={{
                      position: "absolute",
                      top: "12%",
    
                      width: "10%",
                      objectFit: "contain",
                      marginLeft: "10%",
                      zIndex: 10,
                    }}
                  /> */}

              <img
                src={phone}
                alt=""
                style={{
                  // position: "absolute",
                  width: "50%",
                  height: "50%",
                  marginLeft: "23%",
                  // top: "20%",
                }} // apimain = "http://52.39.98.71:3000/"
              />
            </div>
            <div className="android-container">
              <img src={android} alt="" className="android" />
            </div>
          </div>
        </div>
      </div>

      {state.loading && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            background: "#00000036",
            position: "absolute",
            top: 0,

            zIndex: 99,
          }}
        >
          <img
            src={loader}
            alt=""
            style={{
              width: "13%",
              objectFit: "contain",

              marginLeft: "45vw",
            }}
          />
        </div>
      )}
    </div>
  );
  // }
};

export default BasicInfo;
