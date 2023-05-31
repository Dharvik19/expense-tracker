import React, { Fragment, useState } from "react";
import { Button, Nav, Container, Navbar } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";
import * as GrIcons from "react-icons/gr";
import "./Header.css";
import { AuthActions } from "../../Store/Auth-Slice";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../Store/Theme-Slice";
import { CSVLink } from "react-csv";
const Header = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [dark, setDark] = useState(false);
  const [premiumButton, setPremiumButton] = useState(true);
  const [premiumItem, setPremiumItem] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.Auth);

  const theme = useSelector((state) => state.theme.theme);
  const amount = useSelector((state)=>state.expense.expensesAmount);
  
  const logoutHandler = () => {
    dispatch(AuthActions.logOut());
    history.replace("/login");
  };

  const activatePremium=()=>{
    setPremiumButton(false);
    setPremiumItem(true);
    console.log(amount)
  }
  const darkModeActicate=()=>{
    dispatch(themeActions.switchTheme())
    setDark(!dark);
  }
  return (
    <Fragment>
      <Navbar className={dark ? `darkNav`: 'lightNav'} expand="lg">
        <Container fluid>
          <Navbar.Brand href="/home">
            <GrIcons.GrMoney /> Expense Tracker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "150px" }}
              navbarScroll
            >
              <ul className="navbar-nav mr-auto ms-sm-3">
                {isLoggedIn && (
                  <li className="nav-item">
                    <NavLink to="/home" className="nav-link fs-5">
                      <AiIcons.AiOutlineHome
                        style={{ position: "relative", bottom: "3px" }}
                      />{" "}
                      Home
                    </NavLink>
                  </li>
                )}
                {!isLoggedIn && (
                  <li className="nav-item ">
                    <NavLink to="/login" className="nav-link fs-5">
                      <AiIcons.AiOutlineLogin
                        style={{ position: "relative", bottom: "3px" }}
                      />{" "}
                      Login
                    </NavLink>
                  </li>
                )}
                {!isLoggedIn && (
                  <li className="nav-item ">
                    <NavLink to="/" className="nav-link fs-5">
                      <BsIcons.BsFillClipboard2PlusFill
                        style={{ position: "relative", bottom: "3px" }}
                      />{" "}
                      SignUp Up
                    </NavLink>
                  </li>
                )}
                {isLoggedIn && (
                  <li className="nav-item ">
                    <NavLink to="/home/profile" className="nav-link fs-5 me-2">
                      <CgIcons.CgProfile
                        style={{ position: "relative", bottom: "2px" }}
                      />{" "}
                      My Profile
                    </NavLink>
                  </li>
                )}
                {isLoggedIn && (
                  <li className="nav-item d-flex justify-content-center align-items-center">
                    <Button
                      style={{
                        border: "none",
                        backgroundColor: "",
                        padding: "5px 5px 5px 3px",
                      }}
                      variant="light"
                      onClick={logoutHandler}
                      className="fs-5"
                    >
                      <AiIcons.AiOutlineLogout
                        style={{ position: "relative", bottom: "2px" }}
                      />{" "}
                      Logout
                    </Button>
                  </li>
                )}
                {isLoggedIn && amount>10000 && premiumButton &&(
                  <li
                    style={{ position: "absolute", right: "20px" }}
                    className="nav-item d-flex justify-content-center  align-items-center"
                  >
                    <Button
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        background:
                          "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,0.7) 50%, rgba(252,176,69,1) 100%)",
                        padding: "5px",
                      }}
                      
                      onClick={activatePremium}
                      className="fs-5"
                    >
                      Activate Premium
                    </Button>
                  </li>
                )}
                {isLoggedIn && amount>10000 && premiumItem &&(
                  <li
                    style={{ position: "absolute", right: "20px" }}
                    className="nav-item d-flex justify-content-center  align-items-center"
                  >
                    <button 
                      onClick={darkModeActicate}
                      className={`fs-5 ${!dark ? 'darkButton' : 'lightButton'}`}
                    >
                      {!theme ? 'dark ': 'light '}
                    </button>
                  </li>
                )}
                

              </ul>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Header;
