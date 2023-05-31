import React from "react";
import classes from "./ExpenseList.module.css";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import {FaFileDownload} from 'react-icons/fa'
import { CSVLink } from "react-csv";
const ExpenseList = (props) => {
  const expenses = useSelector((state) => state.expense.expenses);
  const headers = [
    {
      label:'money' , key:'money'
    },
    {
      label:'category' , key : 'category'
    },
    {
      label:'description', key : 'description'
    }
  ]
  const csvLInk = {
    filename: 'expenses.csv',
    headers:headers,
    data:expenses
  }
  return (
    <>
      <Container style={{position:"relative",backgroundColor:"",justifyContent:"center",alignItems:"center"}}>
        
        <div className={classes.ExpenseItem}>
        
          <ul>
            {expenses?.map((expenseItem) => {
              return (
                <li style={{ padding: "10px" }} key={expenseItem.id}>
                  <header>
                    <h2>{expenseItem.description}</h2>
                    <h2>${expenseItem.money}</h2>
                  </header>
                  <h4>Category: {expenseItem.category}</h4>
                  <div className={classes.buttonContainer}>
                    <button
                      className="btn btn-secondary"
                      onClick={props.editExpense.bind(
                        null,
                        expenseItem.id,
                        expenseItem.money,
                        expenseItem.description,
                        expenseItem.category
                      )}
                    >
                      Edit
                    </button>

                    
                      <button
                        className="btn btn-danger"
                        onClick={props.deleteExpenseHandler.bind(
                          null,
                          expenseItem.id
                        )}
                      >
                        Delete
                      </button>
                    
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <CSVLink {...csvLInk} className={classes.csv}> 
        <button>
        <FaFileDownload/>
        Download Csv
        </button>
        </CSVLink>
      </Container>
    </>
  );
};
export default ExpenseList;
