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
};

const BasicInfo = () => {
  const user = useSelector(selectUser);
  // console.log(user, "redux user");

  const [state, setState] = useState({
    osname: "",
    deviceid: "",
    applist: [],
    appname: "",
    SelectedList: "",
    openStatus: false,
  });
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
    window.backend.basic().then((result) => {
      var num2x;
      const data = JSON.parse(result);
      num2x = data.map((n) => {
        const parsing = JSON.parse(n.applist);
        parsing.map((n) => {});
        setState((ps) => {
          return {
            ...ps,
            osname: n.osname,
            deviceid: n.devicename,
            applist: parsing,
          };
        });
      });
    });
  });

  const openApp = (list) => {
    setState((ps) => {
      return { ...ps, SelectedList: list, openStatus: true };
    });
    window.backend.openapp(list).then((result) => {});
  };

  if (state.openStatus) {
    console.log(state.selectedList, "selected list");
    return (
      <Redirect
        to={{
          pathname: "/app-info",
          state: { user: user, value: state.SelectedList },
        }}
      />
    );
  }
  return (
    <div>
      <LoginHeader />
      <div style={{ marginLeft: "9.5%", marginTop: "4%" }}>
        List of Applications
      </div>

      <div className="nolist">
        <p className="list" style={{ display: "inline" }}>
          Installed Applications:{state.applist.length}
        </p>
        <input
          style={{
            width: "20%",
            height: "9%",
            background: "white",
            border: "2px solid white",
            borderRadius: "7px",
            marginLeft: "20%",
            position: "relative",
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
            right: 13,
          }}
        />
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
                    <div>
                      <p style={{ display: "inline" }}>
                        {list.replace(
                          /com|.qualcomm|.oneplus|.android|.display|.google|.tools|.internal|.emulation|.network/gi,
                          function (matched) {
                            return mapObj[matched];
                          }
                        )}
                      </p>
                      <button
                        className="basicButton"
                        onClick={() => openApp(list)}
                      >
                        Open App
                      </button>
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
                  <div>
                    <p style={{ display: "inline" }}>
                      {list.replace(
                        /com|.qualcomm|.oneplus|.android|.display|.google|.tools|.internal|.emulation|.network/gi,
                        function (matched) {
                          return mapObj[matched];
                        }
                      )}
                    </p>
                    <button
                      className="basicButton"
                      onClick={() => openApp(list)}
                    >
                      Open App
                    </button>
                  </div>
                </div>
              ))}
        </div>

        <div className="device-info">
          {/* <p>Device Model:{state.deviceid} </p> */}
          <p>Device Info</p>
          <div style={{ positon: "relative" }}>
            <img
              src={ellipse}
              alt=""
              style={{
                position: "absolute",
                top: 115,
                right: 70,
                width: "13%",
                objectFit: "contain",
              }}
            />
            <img
              src={phone}
              alt=""
              style={{
                position: "relative",
                width: "50%",
                height: "60%",
                marginLeft: "25%",
              }}
            />
          </div>
          <div className="android-container">
            <img src={android} alt="" className="android" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
