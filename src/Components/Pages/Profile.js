import React,{useRef,useContext} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import AuthContext from "../../FireBaseAuthentication/auth-context";
const Profile =()=>{
    const authCtx = useContext(AuthContext);
    const nameRef = useRef();
    const photoRef = useRef();
    
    const onSubmitHandler=(e)=>{
        e.preventDefault();

        const enteredName = nameRef.current.value;
        const enteredImageUrl = photoRef.current.value;
        console.log(enteredName + " " +enteredImageUrl );
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDp4Bq20RRH5ry4TmqXE2ScDwgc2wi3cHA',
        {
            method:'POST',
            body:JSON.stringify({
                idToken:authCtx.token,
                displayName:enteredName,
                displayPhoto:enteredImageUrl, 
                returnSecureToken:true,
                headers:{
                    'Content-Type': "application/json"
                }
            })   
        }) .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let erroMessage = "Authentication failed!";
              if (data && data.error && data.error.message) {
                erroMessage = data.error.message;
              }
              throw new Error(erroMessage);
            });
          }
        })
        
        .then((data)=>{
            console.log(data)
            console.log('seccess')
          }).catch((err)=>{
            alert(err.message);
          })
    }
    console.log(authCtx.profile.users[0].displayName,'profileform data')
    const getdata = authCtx.profile.users[0]
    return(
        <>  
            <Row>
                <Col ><h3>Winners never quit , quiters never win</h3></Col>
                <Col xs={4}> Your profile is 64% completes. A complete Profile has Higher chances
          of landing a job.</Col>
            </Row>
            
            
            <hr></hr>
            <form onSubmit={onSubmitHandler}>
        <Container >
            <Row>
          <div>
            <h2>Contact Details </h2>
            
          </div>
          <div >
            <div>
              <label htmlFor="name">Full Name:</label>
            </div>
            <div>
              <input type="text" defaultValue={getdata.displayName} ref={nameRef} ></input>
            </div>
            <div>
              <label htmlFor="img"> Profile Photo URL</label>
            </div>
            <div>
              <input type="text" defaultValue={getdata.displayPhoto} ref={photoRef} ></input>
            </div>
          </div>
          <div>
            <Button type="submit" >Update</Button>
          </div>
          <hr />
          </Row>
        </Container>
      </form>
        </>
    )
}
export default Profile