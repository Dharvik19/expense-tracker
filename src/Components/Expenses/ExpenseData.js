import React,{useState} from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
const ExpenseData=(props)=>{
    // const [formData, setFormData] = useState([]);

    // const handleFormData = (data)=>{
    //    setFormData((prevData)=>{
    //     return [...prevData,data];
    //    })


    // }
    return(
        <div>
            <ExpenseForm></ExpenseForm>
            {/* <ExpenseList value={formData}></ExpenseList> */}
            
        </div>
    )
}

export default ExpenseData;