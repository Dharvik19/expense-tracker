import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import classes from './ExpenseList.module.css'
const ExpenseList = (props) => {
  const enteredEmail = localStorage.getItem('email').replace('@','').replace('.','');
  const [expense, setExpense] = useState([]);

  const fetchDataHandler = useCallback(async()=>{
    try{
      const response = await fetch(`https://expense-tracker-d0790-default-rtdb.firebaseio.com/${enteredEmail}.json`)
      const data = await response.json();
      console.log(data);
      const transformedResponse = [];

      for(const key in data){
        transformedResponse.push({
          id:key,
          select:data[key].select,
          description:data[key].description,
          amount:data[key].amount
        })
      }
      setExpense(transformedResponse);
    }catch(error){
        console.log(error.message);
    }
  },[])

  useEffect(()=>{
    fetchDataHandler();
  },[fetchDataHandler]);
  return (
    <>
      <Container className={classes.container} >
        
        <h3>Expenses</h3>
        <ul className={classes.ul} >
            {expense.map((item) => (
              <li 
                className={classes.listItem}
                // style={{ backgroundColor: "rgba( 255, 255, 255,0.7)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)", color:"rgba(32, 16, 57,1)",borderBottom:"4px solid rgba(82, 40, 145, 1)", padding:"10px 20px", borderRadius:"10px", margin:"5px 0" }}
                key={item.id}
              >{`Category: ${item.select} -- Description: ${item.description} -- Price: ${item.amount}`}</li>
            ))}
          </ul>
        
      </Container>
    </>
  );
};
export default ExpenseList;
