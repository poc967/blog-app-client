import React, { Component } from 'react'
import { Collapse, Navbar, NavbarToggler, Nav, NavLink, NavItem, Container } from 'reactstrap'
import { IoLogoGithub } from 'react-icons/io'
import { PropTypes } from 'prop-types'

// redux
import { connect } from 'react-redux'
import { destroySession } from '../actions/authActions'

// components 
import NavMessage from './NavMessage'

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

        const navMessage = (
            <NavMessage firstName={this.props.user.firstName} />
        )

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
                                    {this.props.isAuthenticated ? (<NavLink href="#" onClick={this.props.destroySession}>Logout</NavLink>) : (<NavLink href='/users/login'>Log In</NavLink>)}
                                </NavItem>
                                <NavItem>
                                    {this.props.isAuthenticated ? (navMessage) : null}
                                </NavItem>
                                <NavItem>
                                    {this.props.isAuthenticated ? (<NavLink href="/users/profile">Profile</NavLink>) : null}
                                </NavItem>
                                <NavItem>
                                    <NavLink href='http://github.com/poc967/blog-app-client'>
                                        <IoLogoGithub size="25px" />
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div >
        )
    }
}

NavBar.propTypes = {
    isAuthenticated: PropTypes.bool,
    destroySession: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    user: state.auth.user
})

export default connect(mapStateToProps, { destroySession })(NavBar)