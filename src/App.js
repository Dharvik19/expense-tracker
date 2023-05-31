import React, { useEffect } from "react";
import {Button} from 'react-bootstrap';
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import Signup from "./Components/Pages/Signup";
import Profile from "./Components/Pages/Profile";
import Header from "./Components/Layout/Header";
import PasswordChange from "./Components/Pages/PasswordChange";
import ExpenseForm from "./Components/Expenses/ExpenseForm";
import ExpenseData from "./Components/Expenses/ExpenseData";
import { useDispatch, useSelector } from "react-redux";
import { fectingAllData } from "./Store/ExpenseActions";
import classes from './App.module.css';
// import { fetchData, sendData } from "./Store/ExpenseActions";
// import AuthProvider from "./FireBaseAuthentication/AuthProvider";
//https://expensetracker-fdd18-default-rtdb.firebaseio.com
function App() {
  
const theme = useSelector((state)=>state.theme.theme);
let themeValue;
if (theme) {
  themeValue = classes.Appdark;
} else {
  themeValue = classes.Applight;
}  
  return (
    <div className={themeValue}>
    <Header/>
      <Switch>
        <Route exact path='/'><Signup/></Route>
        <Route  path='/Login'><Login/></Route>
        <Route exact path='/home'><Home/></Route>
        <Route path="/changePassword"><PasswordChange></PasswordChange></Route>
        <Route path='/home/profile'><Profile/></Route>
        <Route path='/expenses'><ExpenseData/></Route>
        <Route path='/AddExpense'><ExpenseForm/></Route>
      </Switch>

    </div>
  );
}

export default App;
