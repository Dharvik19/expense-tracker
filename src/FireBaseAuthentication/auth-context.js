import React from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
    userdata:""
});

export default AuthContext;