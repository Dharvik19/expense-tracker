import React from "react";
import classes from "./ExpenseList.module.css";
import { useSelector} from "react-redux";

const ExpenseList = (props) => {
  const expenses = useSelector((state) => state.expense.expenses);
  return (
    <>
      <React.Fragment>
        <div style={{backgroundColor:"",color:""}} className={classes.ExpenseItem}> 
          
          <ul>
            {expenses?.map((expenseItem) => {
              return(
              <li key={expenseItem.id}>
                <header>
                <h2>{expenseItem.description}</h2>
                <h2>${expenseItem.money}</h2>
                </header>
                <h4>Category: {expenseItem.category}</h4>
                <div>
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
                
                <span>
                  <button
                    className="btn btn-danger"
                    onClick={props.deleteExpenseHandler.bind(null, expenseItem.id)}
                  >
                    Delete
                  </button>
                </span>
                </div>
              </li>
              
            )})}
          </ul>
        </div>
      </React.Fragment>
    </>
  );
};
export default ExpenseList;
