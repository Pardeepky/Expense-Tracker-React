import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const LoginScreen = () => {
    const [isLogging, setIsLogging] = useState(true);
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

    return (isLogging ? <Login setIsLogging={setIsLogging} /> : <Signup setIsLogging={setIsLogging} />);
}

export default LoginScreen