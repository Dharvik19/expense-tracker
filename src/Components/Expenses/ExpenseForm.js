import React,{useRef} from "react";
import { Button, Container} from "react-bootstrap";
import { Form } from "react-bootstrap";

const ExpenseForm =(props)=>{
    const userInputAmount = useRef();
    const userInputDescription = useRef();
    const userInputSelect = useRef();

    const handleFormSubmit = (e)=>{
        e.preventDefault();

        const enteredAmount = userInputAmount.current.value;
        const enteredDescription = userInputDescription.current.value;
        const enteredSelect = userInputSelect.current.value;

        const userData = {
            id:Math.random().toString(),
            amount:enteredAmount,
            description:enteredDescription,
            select:enteredSelect
        }
        console.log(userData);
        props.data(userData);
    }

  return(
    <Container>
        <h1>Expense form</h1>
        <Form className="d-flex justify-content-center row align-items-center"style={{border: "solid 2px rgb(211,211,211)", borderRadius:"10px", padding:"10px"}}>
        <Form.Group className="col-12">
        <Form.Label htmlFor="amount" >amount</Form.Label>
        <Form.Control type="number" id='amount' ref={userInputAmount}></Form.Control>
        </Form.Group>
        <Form.Group className="col-12">
        <Form.Label htmlFor="description">description</Form.Label>
        <Form.Control type="text" id='description' ref={userInputDescription}></Form.Control>
        </Form.Group>
        <Form.Group className="col-12">
        <Form.Label htmlFor="select">category</Form.Label>
        <Form.Select ref={userInputSelect} id="select">
            <option>food</option>
            <option>food</option>
            <option>food</option>
            <option>food</option>
        </Form.Select>
        </Form.Group>
        <Form.Group>
        <Button className="col-3 mt-3" onClick={handleFormSubmit}>Add</Button>
        </Form.Group>
        </Form>
    </Container>
  )
}

export default ExpenseForm;