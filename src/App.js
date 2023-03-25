import React from "react";
import {Button} from 'react-bootstrap';
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
function App() {
  return (
    <>
      <Switch>
        <Route exact path='/'><Login/></Route>
        <Route path='/home'><Home/></Route>
      </Switch>
    </>
  );
}

export default App;
