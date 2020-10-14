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

// redux
import { connect } from "react-redux";
import { authenticateUser } from "../actions/authActions";

const style = {
  minHeight: "100vh",
};

class LogIn extends Component {
  state = {
    email: "",
    password: "",
    message: null,
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

    this.props.authenticateUser(user);
  };

  render() {
    return (
      <div style={style}>
        <Container className="mt-5">
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
                    <Button color="link" onClick={this.props.toggleOpen}>
                      Sign Up
                    </Button>
                  </span>
                  <SignUp
                    isOpen={this.props.isOpen}
                    toggleOpen={this.props.toggleOpen}
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
};

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, { authenticateUser })(LogIn);
