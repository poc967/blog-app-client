import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Form,
  FormFeedback,
  Alert,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux";
import { updateUser } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import PropTypes from "prop-types";

// helpers
import { confirmPassword, passwordStrength } from "../utils/helperFunctions";

class UpdateProfileModal extends Component {
  state = {
    isOpen: false,
    email: this.props.input,
    firstName: this.props.input,
    lastName: this.props.input,
    about: this.props.input,
    password: "",
    confirmPassword: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggleOpen = () => {
    this.props.clearErrors();
    this.setState({
      isOpen: !this.state.isOpen,
      email: this.props.input,
      firstName: this.props.input,
      lastName: this.props.input,
      about: this.props.input,
      password: "",
      confirmPassword: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let payload;

    switch (this.props.paramToUpdate) {
      case "about":
        payload = {
          id: this.props.id,
          data: { about: this.state.about },
        };
        break;
      case "email":
        payload = {
          id: this.props.id,
          data: { email: this.state.email },
        };
        break;
      case "firstName":
        payload = {
          id: this.props.id,
          data: { firstName: this.state.firstName },
        };
        break;
      case "lastName":
        payload = {
          id: this.props.id,
          data: { lastName: this.state.lastName },
        };
        break;
      case "password":
        payload = {
          id: this.props.id,
          data: { password: this.state.password },
        };
        break;
      default:
        return null;
    }

    if (
      this.props.paramToUpdate === "password" &&
      (!confirmPassword(this.state.password, this.state.confirmPassword) ||
        !passwordStrength(this.state.password))
    ) {
      return console.log("password does not satisfy requirements");
    } else {
      this.props.updateUser(payload);
    }
  };

  valueHandler = (value) => {
    switch (value) {
      case "about":
        return this.state.about;
      case "email":
        return this.state.email;
      case "firstName":
        return this.state.firstName;
      case "lastName":
        return this.state.lastName;
      case "password":
        return this.state.password;
      default:
        return null;
    }
  };

  render() {
    const passwordsMatch = confirmPassword(
      this.state.password,
      this.state.confirmPassword
    );
    const strongPassword = passwordStrength(this.state.password);

    return (
      <>
        <Button color="info" outline onClick={this.toggleOpen}>
          Update
        </Button>
        <Modal
          isOpen={this.state.isOpen}
          toggle={this.toggleOpen}
          backdrop={false}
          className="bg-dark"
        >
          <ModalBody>
            {this.props.error.status === 11000 ? (
              <Alert
                color={this.props.error.status !== 200 ? "danger" : "success"}
              >
                {this.props.error.message}
              </Alert>
            ) : null}
            <Form onSubmit={this.handleSubmit}>
              {this.props.paramToUpdate === "password" ? (
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="supersecret"
                    onChange={(e) => {
                      this.handleChange(e);
                      passwordStrength(e.target.value);
                    }}
                    valid={strongPassword.length === 0}
                    invalid={
                      this.state.password ? strongPassword.length !== 0 : null
                    }
                    required
                  />
                  {strongPassword.map((message, index) => (
                    <FormFeedback key={index}>{message}</FormFeedback>
                  ))}
                  <Label for="confirmPassword">Confirm Password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    id="exampleConfirmPassword"
                    placeholder="supersecret"
                    valid={
                      this.state.confirmPassword
                        ? passwordsMatch
                        : !passwordsMatch
                    }
                    invalid={!passwordsMatch}
                    onChange={(e) => {
                      this.handleChange(e);
                      confirmPassword(e.target.value, this.state.password);
                    }}
                    required
                  />
                  <FormFeedback valid={passwordsMatch}>
                    {passwordsMatch
                      ? "Passwords match!"
                      : "Passwords do not match"}
                  </FormFeedback>
                </FormGroup>
              ) : (
                <FormGroup>
                  <Label>Update data</Label>
                  <Input
                    required
                    type={this.props.type}
                    name={this.props.paramToUpdate}
                    onChange={this.handleChange}
                    value={this.valueHandler(this.props.paramToUpdate)}
                  />
                </FormGroup>
              )}
              <ModalFooter>
                {this.props.loading ? (
                  <div
                    style={{
                      color: "green",
                      paddingRight: "1rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Spinner />
                  </div>
                ) : (
                  <Button color="primary" type="submit">
                    Update
                  </Button>
                )}
                <Button color="secondary" onClick={this.toggleOpen}>
                  Close
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

UpdateProfileModal.propTypes = {
  updateUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, { updateUser, clearErrors })(
  UpdateProfileModal
);
