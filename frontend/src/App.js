import React, { useState } from "react";
import "./App.css";
import {
  Link,
  MemoryRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import SignIn from "./components/Login/SignIn";
import SelectPages from "./components/SelectPages/SelectPages";
import AppInfo from "./components/Sessions/AppInfo";
// import AppInf from "./components/Sessions/AppInf";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
// import Home from "./components/Home/Home";
import { useSelector } from "react-redux";
import { selectUser } from "./features/loginAuth/loginAuthSlice";
import BasicInfo from "./components/Home/BasicInfo.js";
import Heloo from "./components/HelloWorld.js"

function App() {
  const user = useSelector(selectUser);
  console.log(user, "redux user");

  // const [user, setUser] = useState(null);
  // const callbackFunction = (childData) => {
  //   setUser(childData);
  // };
  // console.log(user, "message");
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />

          <Route exact path="/select-page" component={SelectPages} />
          <Route exact path="/home" component={BasicInfo} />

          <Route exact path="/app-info" component={AppInfo} />
        </Switch>
      </Router>
      {/* <Route exact path="/app-info" component={AppInf} /> */}

      {/* <Route exact path="/home" component={BasicInfo} /> */}

      {/* <Heloo></Heloo> */}
    </div>
  );
}

export default App;
