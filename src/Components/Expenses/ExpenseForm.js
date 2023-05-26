import React,{useRef, useState,useEffect} from "react";
import { Button, Container} from "react-bootstrap";
import { Form } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { ExpenseActions } from "../../Store/Expense-Slice";
const ExpenseForm =()=>{
 const expenseArr = useSelector((state)=>(state.expense.items));
  const amountRef = useRef('');
  const titleRef = useRef('');
  const categoryRef = useRef('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const addExpenseHandler = () => {
    if (amountRef.current.value < 1 || titleRef.current.value === '') {
        setError(true);
        return;
    }
    setError(false);
    const expense = {
        id: titleRef.current.value+amountRef.current.value,
        category: categoryRef.current.value,
        title: titleRef.current.value,
        price: amountRef.current.value
    };
    dispatch(ExpenseActions.addExpense({expense: expense}));
}
  return(
    <Container style={{width:"800px"}}>
        <h1>Expense form</h1>
        <Form onSubmit={addExpenseHandler} className="d-flex justify-content-center row align-items-center"style={{border: "solid 2px rgb(211,211,211)", borderRadius:"10px", padding:"10px"}}>
        {error && <p className="text-center text-danger">Enter complete details.</p>}
        <Form.Group className="col-12"style={{marginBottom:"10px"}}>
        <Form.Label htmlFor="amount" >Price</Form.Label>
        <Form.Control type="number" name="price" id='amount' ref={amountRef} ></Form.Control>
        </Form.Group>
        <Form.Group className="col-12" style={{marginBottom:"10px"}}>
        <Form.Label htmlFor="description">Description</Form.Label>
        <Form.Control type="text" name="description" id='description' ref={titleRef} ></Form.Control>
        </Form.Group>
        <Form.Group className="col-12"style={{marginBottom:"10px"}}>
        <Form.Label htmlFor="select">Category</Form.Label>
        <Form.Select ref={categoryRef} name="category" id="select" >
            <option>food</option>
            <option>clothes</option>
            <option>teavel</option>
            <option>extras</option>
        </Form.Select>
        </Form.Group>
        <Form.Group>
        <Button type='submit' style={{marginTop:"10px", padding:"5px 20px"}}  >Add</Button>
        </Form.Group>
        </Form>
        <Container  style={{margin:"2rem auto"}}>
        
        {expenseArr?.map((item) => (
        <ExpenseList
          key={item._id}
          id={item.id}
          item={item}
          
        />
      ))}
      </Container>

    </Container>
    
  )
}

export default ExpenseForm;