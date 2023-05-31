import {configureStore} from '@reduxjs/toolkit';
import AuthReducers from './Auth-Slice';
import ExpenseReducers from './Expense-Slice'
import ThemeReducers from './Theme-Slice';
const store = configureStore({
    reducer:{
        Auth:AuthReducers,
        expense: ExpenseReducers,
        theme: ThemeReducers
    }
})

export default store;