import React from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token)=> {},
    logout: ()=> {},
    addUserToLocal: (user)=> {}
})

export default AuthContext;