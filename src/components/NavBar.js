import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";

import { IoLogoGithub } from "react-icons/io";
import { PropTypes } from "prop-types";

// redux
import { connect } from "react-redux";
import { destroySession } from "../actions/authActions";

class NavBar extends Component {
  state = {
    isOpen: false,
  };

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <Container>
            <NavbarToggler onClick={this.toggleOpen} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/">Home</Link>
                </NavItem>
                <NavItem>
                  <Link to="/blog">Blog</Link>
                </NavItem>
                <NavItem>
                  {this.props.isAuthenticated ? (
                    <Link to="#" onClick={this.props.destroySession}>
                      Logout
                    </Link>
                  ) : (
                    <Link to="/users/login">Log In</Link>
                  )}
                </NavItem>
                <NavItem>
                  {this.props.isAuthenticated ? (
                    <Link to="#">Welcome {this.props.user.firstName}</Link>
                  ) : null}
                </NavItem>
                <NavItem>
                  {this.props.isAuthenticated ? (
                    <Link to="/users/profile">Profile</Link>
                  ) : null}
                </NavItem>
                <NavItem>
                  <Link to="http://github.com/poc967/blog-app-client">
                    <IoLogoGithub size="25px" />
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  destroySession: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { destroySession })(NavBar);
