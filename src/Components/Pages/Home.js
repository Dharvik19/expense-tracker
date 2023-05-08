import React,{useEffect,useState,useContext} from "react";
import ExpenseForm from "../Expenses/ExpenseForm";
import AuthContext from "../../FireBaseAuthentication/auth-context";
import { NavLink } from "react-router-dom";
import ExpenseData from "../Expenses/ExpenseData";
import { Container } from "react-bootstrap";
const Home =()=>{
    const [profileCompleted, setProfileCompleted] = useState(false);
    const authCtx = useContext(AuthContext);
    const [data, setData] = useState('');
    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDNiGP2YbgqnIMHk-jicOFmjCh_0TUERf8';
    //             const response = await fetch(url, {
    //                 method: 'POST',
    //                 body: JSON.stringify({ idToken: authCtx.token }),
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             });
    //             const transformedResponse = await response.json();
    //             console.log(response);
    //             console.log(transformedResponse);
    //             if (response.ok) {
    //                 if (transformedResponse.users[0].displayName) {
    //                     setProfileCompleted(true);
    //                 } else {
    //                     setProfileCompleted(false);
    //                 }
    //             } else {
    //                 let errorMessage = 'Authentication Failed!';
    //                 if (transformedResponse.error.message) {
    //                     errorMessage = transformedResponse.error.message;
    //                 }
    //                 throw new Error(errorMessage);
    //             }
    //         } catch (err) {
    //             alert(err.message);
    //         }

    //     }
    //     getData();
    // }, [authCtx.token]);
    useEffect(()=>{
        const getUserData =async ()=>{

            try{
              const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCwMDX9N75ItzaRn3-M0Qq5IyropmV10uM",{
              method:"POST",
              body:JSON.stringify({
                idToken:authCtx.token
              })
              
            })
    
            const transformedResponse = await response.json();
            if(response.ok){
              console.log(transformedResponse);
              console.log(transformedResponse.users[0].displayName);
              setData(transformedResponse.users[0].displayName)
            }else{
              let errorMessage = "getting details failed";
              if(transformedResponse.error.message){
                errorMessage = transformedResponse.error.message;
                throw new Error(errorMessage)
              }
            }
            
            }catch(err){
              console.log(err);
            }
        }
        getUserData();
    })
    return(
        <Container style={{width:"700px",}}>
            {data && <div>
            <h1>Welcome to Expense tracker </h1>
            <h1>{data}</h1>
            </div>}
       
        <p> your profile is incomplete,<NavLink to='/home/profile'>complete your profile</NavLink></p>
        <br></br>
       
        <ExpenseData></ExpenseData>
        </Container>

    )

}

export default Home;