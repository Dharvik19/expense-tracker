import React, { useState,useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import * as AiIcons from "react-icons/ai";
import ExpenseList from "./ExpenseList";
import { deleteExpenseFetching, getExpenseFetching } from "../../Store/ExpenseActions";
import EditExpenseForm from "./EditExpenseForm";
import { useDispatch } from "react-redux";
const ExpenseData = (props) => {
  const dispatch = useDispatch();
  const [editForm, setEditForm] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [editExpense, setEditExpense] = useState("");

  const emailId = localStorage.getItem("email");
 const regex = /[.@]/g;
 const email = emailId.replace(regex, '')
 
  const editExpenseHandler = (id, money, description, category) => {
    setEditForm(true);
    const expense = {
      id: id,
      money: money,
      description: description,
      category: category,
    };
    setEditExpense(expense);
  };
  const addExpenseHandler = () => {
    setAddForm(true);
  };
  const deleteExpenseHandler = (id) => {
    dispatch(deleteExpenseFetching(id, email));
  };
  const onCloseEditStateHandler = () => {
    setEditForm(false);
  };
  const onCloseAddStateHandler = () => {
    setAddForm(false);
  };
  useEffect(() => {
    dispatch(getExpenseFetching(email));
  }, [dispatch, email]);
  return (
    <>
      
      <div>
        <button
          style={{
            textDecoration: "none",
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px 10px 10px",
            borderRadius: "10px",
          }}
          onClick={addExpenseHandler}
        >
          <AiIcons.AiOutlinePlusCircle
            style={{ position: "relative", bottom: "2px" }}
          ></AiIcons.AiOutlinePlusCircle>{" "}
          Add Expense
        </button>
      </div>
      <div>
        <ExpenseList 
          editExpense={editExpenseHandler}
          deleteExpenseHandler={deleteExpenseHandler}
        ></ExpenseList>
      </div>
      {addForm && <ExpenseForm onClose={onCloseAddStateHandler}></ExpenseForm>}
      {editForm && (
        <EditExpenseForm onClose={onCloseEditStateHandler} editExpense={editExpense}></EditExpenseForm>
      )}
    </>
  );
};

export default ExpenseData;
