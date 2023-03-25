import React from "react";
import { NavLink } from "react-router-dom";
const Home =()=>{
    return(
        <>
        <h1>Welcome to Expense tracker</h1>

        <p> your profile is incomplete,<NavLink to='/home/profile'>complete your profile</NavLink></p>
        </>

    )

}

export default Home;