import React from "react";
import { Container } from "react-bootstrap";
const ExpenseList=(props)=>{

    return(
        <>
         <Container>
        <div>
            <ul>
                {props.value.map((item)=>(
                    <li key={item.id}>{`Category: ${item.select} -- Description: ${item.description} -- Price: ${item.amount}`}</li>
                ))}
            </ul>
        </div>
    </Container> 
        </>
    )

}
export default ExpenseList;