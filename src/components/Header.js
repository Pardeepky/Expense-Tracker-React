import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, Button } from 'reactstrap';
import { authActions } from '../store/auth';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        navigate('/');
        localStorage.removeItem('token');
        localStorage.removeItem('userName')
        dispatch(authActions.logout())
    }

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand>
                Welcome to Expense Tracker!!!
            </NavbarBrand>
            <NavbarToggler />
            <div className='float-right'>
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem className='float-right'>
                            Your Profile is Incomplete
                            <Button color="primary" className="m-2">
                                <NavLink to="/home/complete-profile" className="text-white">Complete Now</NavLink>
                            </Button>
                        </NavItem>
                        <Button color="primary" className="m-2" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    );
}

export default Header;