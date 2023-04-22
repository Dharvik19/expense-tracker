import React, { useCallback, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
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

  function deleteExpensehandler(id){
    const response = fetch(`https://expense-tracker-d0790-default-rtdb.firebaseio.com/${enteredEmail}/${id}.json`,
    {
      method:"DELETE",
    }
    );
    if(response.ok){
      console.log("expense deleted");
    }
  }
  const editExpense=(item)=>{
    const filteredExpense = expense.filter((list)=>list.description === item.description);
    for( let i = 0; i < expense.length; i++){ 

      if ( expense[i] === filteredExpense[0]) { 

          const amount = prompt('Enter the Amount', expense[i].amount);
          const description  = prompt('Enter the Description', expense[i].description);
          const select = prompt('Enter the Category', expense[i].select); 
          expense.splice(i, 1,{amount:amount,description:description,select:select});
      }
      putRequest(expense).then(res=>{setExpense([...expense])})
  }
    console.log(filteredExpense);
  }
  async function putRequest(expenseList){
    await fetch(`https://expense-tracker-d0790-default-rtdb.firebaseio.com/${enteredEmail}.json`, 
    {
      method:"PUT",
      body:JSON.stringify(expenseList)
    })
  }
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
              ><div className="row"><div className="col d-flex align-items-center">{`Category: ${item.select} -- Description: ${item.description} -- Price: ${item.amount}`}</div> <div className="col d-grid gap-2 d-md-flex justify-content-md-end"><Button variant="danger" onClick={()=>deleteExpensehandler(item.id)}>Delete</Button> <Button onClick={()=>{editExpense(item)}} variant="secondary">Edit</Button></div></div></li>
            ))}
          </ul>
        
      </Container>
    </>
  );
};
export default ExpenseList;
