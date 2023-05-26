import React, { useCallback, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import classes from './ExpenseList.module.css'
import { useSelector, useDispatch } from "react-redux";
import { ExpenseActions } from "../../Store/Expense-Slice";
 import { removingExpense } from "../../Store/ExpenseActions";
const ExpenseList = (props) => {

  const dispatch = useDispatch();

  const deleteHandler = (item)=>{
    dispatch(removingExpense(item.id));
  }
  const edithandler =(item)=>{
    props.EditExpenseHandler(item);
  } 
  return (
    <>
         <React.Fragment>
        <div >
        <ul style={{justifyContent:"center", alignItems:"center",padding:0}}>
          <li className={classes.listItem}>
            <label>Expense Amount</label>
            <span >{props.item.enteredExpense} </span>
            <label>Details</label>
            <span > {props.item.enteredDetails}</span>
            <label>Category</label>
            <span > {props.item.enteredCategory}</span>
            <span>
              <button className="btn btn-secondary"onClick={() => edithandler(props.item)}>Edit</button>
            </span>
            <span>
              <button className="btn btn-danger"onClick={() => deleteHandler(props.item)}>Delete</button>
            </span>
            
          </li>
        </ul>
      </div>
    </React.Fragment>
     
    </>
  );
};
export default ExpenseList;
