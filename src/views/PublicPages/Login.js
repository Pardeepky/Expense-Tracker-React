import React, { useContext, useRef, useState } from "react";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";
import classes from './Login.module.css';
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context-store/Auth-Context";

const Login = ({ setIsLogging }) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true);
            const enteredEmail = emailRef.current.value;
            const enteredPassword = passwordRef.current.value;

            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!emailRegex.test(enteredEmail)) {
                setFormErrors({ ...formErrors, email: 'Please enter a valid email address' });
            } else {
                setFormErrors({ ...formErrors, email: '' });
            }
            // Validate password
            if (enteredPassword.length < 8) {
                setFormErrors({ ...formErrors, password: 'Password must be at least 8 characters long' });
            } else {
                setFormErrors({ ...formErrors, password: '' });
            }

            // Submit form if there are no errors
            if (!formErrors.email && !formErrors.password) {

                const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMDLGHFhbo5zks5z75xyYouKUnd1pG7R0', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    authCtx.login(data.idToken);
                    navigate('/');
                    emailRef.current.value = '';
                    passwordRef.current.value = '';
                } else {
                    const err = await res.json();
                    alert(err.error.message)

                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClick = () => {
        setIsLogging(prevState => !prevState);
    }

    return (
        <>
            <div className={`${classes.loginWrapper} mt-5`}>
                <h2 className="text-center">Login</h2>
                <Form onSubmit={onSubmit}>
                    <FormGroup floating>
                        <Input
                            id="login-email"
                            placeholder="Enter Email"
                            type="email"
                            innerRef={emailRef}
                            name='email'
                        />
                        <Label for="login-email">Email:</Label>
                        {formErrors.email && <span className="error">{formErrors.email}</span>}
                    </FormGroup>
                    <FormGroup floating>
                        <Input
                            id="password"
                            placeholder="Enter Password"
                            type='password'
                            innerRef={passwordRef}
                            name='password'
                        />
                        <Label for="password">Password</Label>
                        {formErrors.password && <span className="error">{formErrors.password}</span>}
                    </FormGroup>
                    {!isLoading && <div className="text-center d-grid gap-2"><Button type="submit" variant="primary" className="text-center">Log In</Button></div>}
                    {isLoading && <div className="text-center d-grid gap-2"><Button>Submitting...</Button></div>}
                </Form>
            </div>
            <div className={classes.loginWrapper}>
                <p className="text-center">New User? <span style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold' }} onClick={handleClick}>Signup</span></p>
            </div>
        </>
    );
};

export default Login;
