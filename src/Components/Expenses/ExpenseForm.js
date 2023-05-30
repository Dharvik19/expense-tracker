import React,{useRef, useState} from "react";
import { Button, Container} from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addExpenseFetching } from "../../Store/ExpenseActions";
import classes from './ExpenseForm.Module.css'
import * as AiIcons from 'react-icons/ai'


const ExpenseForm =(props)=>{
const id = document.getElementById("EditModalOverlay");
const dispatch = useDispatch();

  const moneyRef = useRef("");
  const descRef = useRef("");
  const categoryRef = useRef("");
  const [error, setError] = useState(false);

let email = localStorage.getItem('email').replace('@','').replace('.','').replace('.','');
  
const addExpenseHandler = (event) => {
  if (moneyRef.current.value < 1 || descRef.current.value === '') {
            setError(true);
            return;
        }
  event.preventDefault();
  const expense = {
    money: moneyRef.current.value,
    description: descRef.current.value,
    category: categoryRef.current.value,
  };
  dispatch(addExpenseFetching(expense, email));

  moneyRef.current.value = "";
  descRef.current.value = "";
  categoryRef.current.value = "Food";

  setTimeout(() => {
    props.onClose();
  }, 1000);
};
  return(
    <Container style={{width:"800px",backgroundColor:"", marginTop:"30px", padding:"20px"}}>
      <div style={{position:"relative"}}>
        <h1 style={{position:"absolute", left:"10px"}}>ExpenseForm</h1>
        <AiIcons.AiOutlineCloseCircle onClick={props.onClose} style={{position:"absolute",right:"10px",width:"50px", height:"50px",padding:"0"}}/>
      </div>
        <div style={{marginTop:"60px",backgroundColor:""}}>
        <Form onSubmit={addExpenseHandler} className="d-flex justify-content-center row align-items-center"style={{border: "solid 2px rgb(211,211,211)", borderRadius:"10px", padding:" 10px"}}>
        {error && <p className="text-center text-danger">Enter complete details.</p>}
        <Form.Group className="col-12"style={{marginBottom:"10px"}}>
        <Form.Label htmlFor="amount" >Price</Form.Label>
        <Form.Control type="number" name="price" id='amount' ref={moneyRef} ></Form.Control>
        </Form.Group>
        <Form.Group className="col-12" style={{marginBottom:"10px"}}>
        <Form.Label htmlFor="description">Description</Form.Label>
        <Form.Control type="text" name="description" id='description' ref={descRef} ></Form.Control>
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
        </div>
        <Container  style={{margin:"2rem auto"}}>
        
        {/* {expenseArr?.map((item) => (
        <ExpenseList
          key={item._id}
          id={item.id}
          item={item}
          
        />
      ))} */}
      </Container>

    </Container>
    
  )
    
    
    return (
      <>
       {/* {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, id)}
      {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, id)} */}
      </>
    )
}

export default ExpenseForm;