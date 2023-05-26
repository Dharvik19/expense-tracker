import {configureStore} from '@reduxjs/toolkit';
import AuthReducers from './Auth-Slice';
import ExpenseReducers from './Expense-Slice'
const store = configureStore({
    reducer:{
        Auth:AuthReducers,
        expenseitem: ExpenseReducers,
    }
})

export default store;