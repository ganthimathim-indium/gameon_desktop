import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, MemoryRouter as Router,Redirect, Route, Switch } from "react-router-dom";
import Home from './components/Home/Home'
import SignIn from './components/Login/SignIn';
import SelectPages from './components/SelectPages/SelectPages';
import AppInfo from './components/Sessions/AppInfo'
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import BasicInfo from './components/Home/BasicInfo';

function App() {
  return (
    <div>
      <Router >
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/select-page" component={SelectPages} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/basic-info" component={BasicInfo} />
          <Route exact path="/app-info" component={AppInfo} />
        </Switch>
      </Router>

    </div>
  )
}

export default App;
