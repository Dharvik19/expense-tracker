import React from "react";
import {Button} from 'react-bootstrap';
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import Signup from "./Components/Pages/Signup";
import Profile from "./Components/Pages/Profile";
function App() {
  return (
    <>
      <Switch>
        <Route exact path='/'><Signup/></Route>
        <Route  path='/Login'><Login/></Route>
        <Route  path='/home'><Home/></Route>
        <Route path='/home/profile'><Profile/></Route>
      </Switch>
    </>
  );
}

export default App;
