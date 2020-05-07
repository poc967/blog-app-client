import React, { Component } from 'react'
import { Collapse, Navbar, NavbarToggler, Nav, NavLink, NavItem, Container } from 'reactstrap'
import { IoLogoGithub } from 'react-icons/io'

class NavBar extends Component {

    state = {
        isOpen: false
    }

    toggleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <Container>
                        <NavbarToggler onClick={this.toggleOpen} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href='/'>Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href='/blog'>Blog</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href='/users/login'>Log In</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href='http://github.com/poc967'>
                                        <IoLogoGithub size="25px" />
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default NavBar