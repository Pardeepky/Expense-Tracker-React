import React, { useRef, useState } from "react";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";
import classes from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [isLogging, setIsLogging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true);
            const enteredEmail = emailRef.current.value;
            const enteredPassword = passwordRef.current.value;
            const confirmPassword = confirmPasswordRef.current.value;

            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!emailRegex.test(enteredEmail)) {
                setFormErrors({ ...formErrors, email: 'Please enter a valid email address' });
            } else {
                setFormErrors({ ...formErrors, email: '' });
            }
            // Validate password
            if (enteredEmail.length < 8) {
                setFormErrors({ ...formErrors, password: 'Password must be at least 8 characters long' });
            } else {
                setFormErrors({ ...formErrors, password: '' });
            }
            // Validate confirm password
            if (confirmPassword !== enteredPassword) {
                setFormErrors({ ...formErrors, confirmPassword: 'Passwords do not match' });
            } else {
                setFormErrors({ ...formErrors, confirmPassword: '' });
            }
            // Submit form if there are no errors
            if (!formErrors.email && !formErrors.password && !formErrors.confirmPassword) {
                if (isLogging) {
                    // for login
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
                        window.alert('User Logged In')
                    } else {
                        const err = await res.json();
                        alert(err.error.message)
                    }
                } else {
                    //for signup
                    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDMDLGHFhbo5zks5z75xyYouKUnd1pG7R0', {
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
                        window.alert('User Signed Up succesfully')
                    } else {
                        const err = await res.json();
                        alert(err.error.message)
                    }
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            emailRef.current.value = '';
            passwordRef.current.value = '';
            confirmPasswordRef.current.value = '';
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <div className={`${classes.loginWrapper} mt-5`}>
                <h2 className="text-center">{isLogging ? 'Login' : 'Signup'}</h2>
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
                            type={showPassword ? 'text' : 'password'}
                            innerRef={passwordRef}
                            name='password'
                        />
                        {/* <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} /> */}
                        <Label for="password">Password</Label>
                        {formErrors.password && <span className="error">{formErrors.password}</span>}
                    </FormGroup>
                    <FormGroup floating>
                        <Input
                            id="confirPassword"
                            placeholder="Enter Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            innerRef={confirmPasswordRef}
                            name='confirmPassword'
                        />
                        {/* <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} onClick={toggleConfirmPasswordVisibility} /> */}
                        <Label for="confirPassword">Confirm Password</Label>
                        {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
                    </FormGroup>
                    {!isLoading && <div className="text-center d-grid gap-2"><Button type="submit" variant="primary" className="text-center">{isLogging ? 'Log In' : 'Sign Up'}</Button></div>}
                    {isLoading && <div className="text-center d-grid gap-2"><Button>Submitting...</Button></div>}
                </Form>
            </div>
            <div className={classes.loginWrapper}>
                <p className="text-center">{!isLogging ? 'Already have an account?' : 'New User?'} <span style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setIsLogging(prevIsLogging => !prevIsLogging)}>{!isLogging ? 'Login' : 'Signup'}</span></p>
            </div>
        </>
    );
};

export default Login;
