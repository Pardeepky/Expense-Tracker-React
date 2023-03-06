import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, Button } from 'reactstrap';
import AuthContext from '../context-store/Auth-Context';

function Header() {
    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);

    const handleLogout = () => {
        navigate('/');
        authCtx.logout();
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