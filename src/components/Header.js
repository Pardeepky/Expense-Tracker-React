import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, Button } from 'reactstrap';

function Header() {
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
                            <Button color="primary" className="ml-2">
                                <NavLink to="/complete-profile" className="text-white">Complete Now</NavLink>
                            </Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    );
}

export default Header;