import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('token');

const initialData = {
    token: token,
    isLoggedIn : !!token
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialData,
    reducers:{
        login: (state,action)=>{
            state.isLoggedIn=true;
            state.token=action.payload;
            localStorage.setItem('token', state.token)

        },
        logout:(state)=>{
            state.isLoggedIn=false;
            state.token=null;
            localStorage.removeItem('token');
        }
    }
})

export const AuthActions = AuthSlice.actions;

export default AuthSlice.reducer;