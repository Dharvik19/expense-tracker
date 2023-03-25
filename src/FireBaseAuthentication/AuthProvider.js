import React,{useState} from "react";
import AuthContext from "./auth-context";
import { useHistory } from "react-router-dom";
const AuthProvider =(props)=>{
    const history = useHistory();
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    }
    const logoutHandler = () => {
        setToken(null);
        localStorage.clear('token');
        history.replace('/login');
    }

    const authContextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };
    return (
        <AuthContext.Provider value={authContextValue}>
            {props.children}
        </AuthContext.Provider>
    );

    
}

export default AuthProvider;