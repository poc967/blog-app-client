import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Col,
  Button,
  Row,
  Alert,
} from "reactstrap";
import SignUp from "./SignUp";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { authenticateUser } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";

const style = {
  minHeight: "100vh",
  backgroundColor: "white",
  paddingTop: "2rem",
};

class LogIn extends Component {
  state = {
    email: "",
    password: "",
    message: null,
    isOpen: false,
  };

  componentDidUpdate = (prevProps) => {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        this.setState({
          message: error.message,
        });
      } else {
        this.setState({
          message: null,
        });
      }
    }
  };

  toggleOpen = (e) => {
    this.props.clearErrors();
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    const user = {
      email,
      password,
    };

    try {
      this.props.authenticateUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    if (this.props.isAuthenticated) return <Redirect to="/blog" />;
    return (
      <div style={style}>
        <Container>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            {this.state.message ? (
              <Alert color="danger">{this.state.message}</Alert>
            ) : null}
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="email@codeblog.com"
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="supersecret"
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <Row>
                <Col xs="auto">
                  <Button color="primary" outline onClick={this.handleSubmit}>
                    Log In
                  </Button>
                </Col>
                <Col xs="auto">
                  <span>
                    Not a member already?
                    <Button color="link" onClick={this.toggleOpen}>
                      Sign Up
                    </Button>
                  </span>
                  <SignUp
                    isOpen={this.state.isOpen}
                    toggleOpen={this.toggleOpen}
                  />
                </Col>
              </Row>
            </Form>
          </Col>
        </Container>
      </div>
    );
  }
}

LogIn.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { authenticateUser, clearErrors })(
  LogIn
);
