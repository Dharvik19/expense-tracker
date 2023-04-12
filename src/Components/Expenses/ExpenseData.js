import React,{useState} from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
const ExpenseData=(props)=>{
    const [formData, setFormData] = useState(["hello", "hello"]);

    const handleFormData = (data)=>{
       setFormData((prevData)=>{
        return [...prevData,data];
       })


    }
    return(
        <div>
            <ExpenseForm data={handleFormData}></ExpenseForm>
            <ExpenseList value={formData}></ExpenseList>
        </div>
    )
}

export default ExpenseData;