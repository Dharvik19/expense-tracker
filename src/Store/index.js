import {configureStore} from '@reduxjs/toolkit';
import AuthReducers from './Auth-Slice'
const store = configureStore({
    reducer:{
        Auth:AuthReducers,
    }
})

export default store;