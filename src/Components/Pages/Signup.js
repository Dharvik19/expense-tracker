import React,{useRef, useState, } from "react";
import { Container,Row,Col,Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import classes from './Login.module.css';

const Signup =()=>{ 
    const emailInputRef = useRef();
    const passwordInputref = useRef();
    const confirmPasswordRef = useRef();
    const [created, setCreated] = useState(false);
    const [error, setError] = useState(false);
    const history = useHistory();
    const onSubmitHandler= async (e)=>{
        e.preventDefault();
        setCreated(false);
        if (!emailInputRef.current.value.includes('@') || passwordInputref.current.value.length < 6 || passwordInputref.current.value !== confirmPasswordRef.current.value) {
            setError(true);
            return;
        }
        setError(false);
        const user = {
            email: emailInputRef.current.value,
            password: passwordInputref.current.value
        }
        try {
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDp4Bq20RRH5ry4TmqXE2ScDwgc2wi3cHA';
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ ...user, returnSecureToken: true }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const transformedResponse = await response.json();
            if (response.ok) {
                setCreated(true);
            } else {
                let errorMessage = 'Authentication Failed!';
                if (transformedResponse.error.message) {
                    errorMessage = transformedResponse.error.message;
                }
                throw new Error(errorMessage);
            }
        } catch (err) {
            alert(err.message);
        }
    }
    const onLoginClickHandler = () => {
        history.replace('/login');
    }
    return(
    <>
    <Container  className="justify-content-center " style={{backgroundColor:"",minHeight:"500px",marginTop:"10rem"}}>
      <Row className="d-flex justify-content-center align-items-center" style={{width:"350px",margin:"0 auto"}}>
      <Col  style={{marginTop:"3rem"}}className={classes.auth}>
        <h1>Sign Up</h1>
       {created &&  <p>account created successfully</p>}
        <form onSubmit={onSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input
              type='password'
              id='password'
              required
              ref={passwordInputref}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Confirm password</label>
            <input type='password' id='confirmPassword' required ref={confirmPasswordRef} />
          </div>
          <div className={classes.actions}>
            <button onClick={onSubmitHandler}> 'Create Account'</button>
          </div>
        </form>
      </Col>
      
      </Row >
      <Row className="justify-content-center ">
                <Col xs={4}>
                    <div className="d-grid">
                        <Button onClick={onLoginClickHandler}>Have an account? Login</Button>
                    </div>
                </Col>
     </Row>
        
      </Container>
    </>)
}

export default Signup;