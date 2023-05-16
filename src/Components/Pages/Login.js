import React,{useState,useRef,useContext} from "react";
import { Container } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { AuthActions } from "../../Store/Auth-Slice";
import {useDispatch} from 'react-redux';
// import AuthContext from "../../FireBaseAuthentication/auth-context";
import classes from './Login.module.css';
const Login =()=>{
    const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputref = useRef();
    const confirmPasswordRef = useRef();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    // const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const onSubmitHandler = async (event)=>{
      event.preventDefault();
  
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputref.current.value;
      if (!emailInputRef.current.value.includes('@') || passwordInputref.current.value.length < 6) {
        setError(true);
        return;
    }
      // localStorage.setItem('email',enteredEmail);
      const user = {
        email: emailInputRef.current.value,
        password: passwordInputref.current.value
    }
      try{
       const url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwMDX9N75ItzaRn3-M0Qq5IyropmV10uM';
       const response = await fetch(url, {
          method:"POST",
          body:JSON.stringify({
            ...user,
            returnSecureToken:true
          }),
          headers: {
            'Content-Type': 'application/json'
        }
        
       })
      
       let transformedResponse = await response.json();
       console.log(transformedResponse);
       if(response.ok){
        // authCtx.login(transformedResponse.idToken);
        dispatch(AuthActions.login(transformedResponse.idToken));
        localStorage.setItem('token',transformedResponse.idToken);
        localStorage.setItem('email',transformedResponse.email);
        console.log(user);
        history.replace('/home');
       }else{
        let errorMessage = 'Authentication Failed!';
                if (transformedResponse.error.message) {
                    errorMessage = transformedResponse.error.message;
                }
                throw new Error(errorMessage);
       }
      } catch(err){
          alert(err);
      }     
      
    }
    return (
      <section className={classes.loginbox}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={onSubmitHandler}>
          <div className={classes.userbox}>
            <input type='email' id='email' required ref={emailInputRef} />
            <label htmlFor='email'>Your Email</label>
          </div>
          <div className={classes.userbox}>
            <input
              type='password'
              id='password'
              required
              ref={passwordInputref}
            />
            <label htmlFor='password'>Your Password</label>
          </div>
          {/* <div className={classes.control}>
            <label htmlFor='password'>Confirm password</label>
            <input type='password' id='confirmPassword' required ref={confirmPasswordRef} />
          </div> */}
          <div className={classes.actions}>
            {!loading && <button>
              <span></span><span></span><span></span><span></span>login</button>}
            {loading && <p>Sending Request....</p>}
            <NavLink
             to="/changePassword"
              className={classes.toggle}
              style={{textDecoration:"none"}}
            >
              forgot password
            </NavLink>
          </div>
        </form>
      </section>
      
    );
  };
//AIzaSyD0qHk06VD0uXuNSkkxGbWLMEmmbEgQ4zc

export default Login;