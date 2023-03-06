import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Signup from './Signup';
import classes from './Login.module.css'

const LoginScreen = () => {
    const [isLogging, setIsLogging] = useState(true);
    const [forgotPassword, setForgotPassword] = useState(false);
    const navigate = useNavigate();

    const stayHome = () => {
        let token = localStorage.getItem('token')
        let isLoggedIn = !!token
        if (isLoggedIn) {
            navigate('/home');
        }
    }

    useEffect(() => {
        stayHome();
    })

    return (<>
        <div className={classes.loginWrapper}>
            {isLogging && !forgotPassword && <Login setIsLogging={setIsLogging} setForgotPassword={setForgotPassword} />}
            {!isLogging && <Signup setIsLogging={setIsLogging} />}
            {forgotPassword && <ForgotPassword setIsLogging={setIsLogging} setForgotPassword={setForgotPassword} />}
        </div>
    </>);
}

export default LoginScreen