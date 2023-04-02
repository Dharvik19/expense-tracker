import React,{useRef, useState} from "react";
import { Button, Container, useAccordionButton } from "react-bootstrap";
import classes from "./Login.module.css";

const PasswordChange = () => {
    const emailInputRef = useRef();
   
    const [error, setError] = useState(false);
    const submitHandler = async(event)=>{
        event.preventDefault();
        if (!emailInputRef.current.value.includes('@') ) {
            setError(true);
            setInterval(()=>{
                setError(false);
            },3000);
            return;
        }
        // const user = {
        //     enteredEmail:emailInputRef.current.value,
        //     enteredPassword:passwordInputref.current.value
        // }
        // console.log(user);
        try{
          const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD0qHk06VD0uXuNSkkxGbWLMEmmbEgQ4zc';
          const response = await fetch(url, {
            method:"POST",
            body:JSON.stringify({
              requestType: 'PASSWORD_RESET',
              email: emailInputRef.current.value
            }),
            headers:{
              'Content-Type': 'application/json'  
            }
          });
          const transformedResponse = await response.json();
          console.log(response);
          console.log(transformedResponse);
          if(response.ok){
            console.log("hehehe");
          }else{
            throw new Error(transformedResponse.error.message);
          }
        }catch(err){
          alert(err.message);
        }
    }
  return (
    <Container>
      
      <form style={{position:"relative"}}>
        <div  className={classes.auth}>
        <h1>change password</h1> 
        {error && <p>please enter valid credentials</p>}
        <hr></hr>
        
          <div className={classes.control}>
            <label>Enter registered email</label>
            <input type="email" ref={emailInputRef} required></input>
          </div>
          
         <div className={classes.actions}>
         { <button onClick={submitHandler}>Submit</button>}
         </div>
        
        </div>
      </form>
    </Container>
  );
};

export default PasswordChange;
