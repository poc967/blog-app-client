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

import SearchBar from "./SearchBar";

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
        <Navbar color="dark" dark expand="md" style={{ minHeight: "70px" }}>
          <Container>
            <NavbarToggler onClick={this.toggleOpen} />
            <Collapse isOpen={this.state.isOpen} navbar>
              {this.props.isAuthenticated ? (
                <SearchBar
                  handleChange={this.props.handleChange}
                  handleSubmit={this.props.handleSubmit}
                  doesSearchBarHaveContents={
                    this.props.doesSearchBarHaveContents
                  }
                />
              ) : null}
              <Nav
                className="ml-auto"
                navbar
                color
                style={{
                  width: "40vw",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <NavItem>
                  <Link to="/" style={{ color: "grey" }}>
                    Home
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/blog" style={{ color: "grey" }}>
                    Blog
                  </Link>
                </NavItem>
                <NavItem>
                  {this.props.isAuthenticated ? (
                    <Link
                      to="#"
                      style={{ color: "grey" }}
                      onClick={this.props.destroySession}
                    >
                      Logout
                    </Link>
                  ) : (
                    <Link to="/users/login" style={{ color: "grey" }}>
                      Log In
                    </Link>
                  )}
                </NavItem>
                <NavItem>
                  {this.props.isAuthenticated ? (
                    <Link to="#" style={{ color: "grey" }}>
                      Welcome {this.props.user.firstName}
                    </Link>
                  ) : null}
                </NavItem>
                <NavItem>
                  {this.props.isAuthenticated ? (
                    <Link to="/users/profile" style={{ color: "grey" }}>
                      Profile
                    </Link>
                  ) : null}
                </NavItem>
                <NavItem>
                  <Link
                    to="http://github.com/poc967/blog-app-client"
                    style={{ color: "grey" }}
                  >
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
