import React, { Component } from "react";
import {
  Col,
  Row,
  Card,
  Button,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import { Switch } from "antd";
import { PropTypes } from "prop-types";
import UpdateProfileModal from "./UpdateProfileModal";
import { deleteUser } from "../actions/authActions";
import { deleteFollower } from "../actions/authActions";

// redux
import { connect } from "react-redux";

// styles
const cardStyle = {
  boxShadow: "0 .5rem 1rem rgba(0,0,0,.9)",
  borderRadius: "0",
  border: "0",
  display: "flex",
};

class Profile extends Component {
  state = {
    active: false,
  };

  onChange = (e) => {
    this.setState({
      active: !this.state.active,
    });
  };

  handleDelete = (id) => {
    this.props.deleteUser(id);
  };

  handleSubmit = (id) => {
    this.props.deleteFollower({
      currentUser: this.props.user.id,
      userToUnfollow: id,
    });
  };

  render() {
    const { email, firstName, lastName, id, about } = this.props.user;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "white",
        }}
      >
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Card
              color="dark"
              className="mt-3 mb-3"
              inverse
              style={{ borderRadius: "0.5rem" }}
            >
              <CardBody>
                <CardTitle
                  style={{ fontSize: "2rem" }}
                >{`${firstName} ${lastName}`}</CardTitle>
                <hr style={{ color: "white" }} />
                <CardText style={{ fontWeight: "200" }}>
                  About: <br /> {about}
                </CardText>
                <UpdateProfileModal
                  paramToUpdate={"about"}
                  id={id}
                  type={"textarea"}
                  input={about}
                  loading={this.props.auth.loading}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 4, offset: 2 }}>
            <Card
              className="mb-3"
              color="dark"
              inverse
              style={{
                cardStyle,
                borderTop: "solid #17a2b8 5px",
                minHeight: "40vh",
                display: "flex",
                borderRadius: "0.5rem",
              }}
            >
              <CardBody style={{ borderRadius: "0.5rem" }}>
                <CardTitle style={{ fontSize: "2rem" }}>
                  Account Details
                </CardTitle>
                <CardText
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: "200",
                  }}
                  name="email"
                >
                  {email}
                  <UpdateProfileModal
                    paramToUpdate={"email"}
                    id={id}
                    type={"email"}
                    input={email}
                    loading={this.props.auth.loading}
                  />
                </CardText>
                <CardText
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: "200",
                  }}
                >
                  {firstName}
                  <UpdateProfileModal
                    paramToUpdate={"firstName"}
                    id={id}
                    type={"text"}
                    input={firstName}
                    loading={this.props.auth.loading}
                  />
                </CardText>
                <CardText
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: "200",
                  }}
                >
                  {lastName}
                  <UpdateProfileModal
                    paramToUpdate={"lastName"}
                    id={id}
                    type={"text"}
                    input={lastName}
                    loading={this.props.auth.loading}
                  />
                </CardText>
                <CardText
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: "200",
                  }}
                >
                  Password
                  <UpdateProfileModal
                    paramToUpdate={"password"}
                    id={id}
                    type={"password"}
                    loading={this.props.auth.loading}
                  />
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md={{ size: 4 }}>
            <Card
              className="mb-3"
              color="dark"
              inverse
              style={{ borderTop: "solid #dc3545 5px", borderRadius: "0.5rem" }}
            >
              <CardBody>
                <CardTitle style={{ fontSize: "2rem" }}>Delete User</CardTitle>
                <CardText style={{ fontWeight: "200" }}>
                  Select the button below to delete this user from the system
                  <br />
                  WARNING: This cannot be undone
                </CardText>
                <div
                  className="switches"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    w_idth: "40%",
                    justifyContent: "space-between",
                  }}
                >
                  <Switch onChange={() => this.onChange()} className="mb-3" />
                  {this.state.active ? (
                    <Button
                      color="danger"
                      onClick={() => this.handleDelete(id)}
                    >
                      Delete
                    </Button>
                  ) : null}
                </div>
              </CardBody>
            </Card>
            <Card
              className="mb-3"
              color="dark"
              inverse
              style={{ borderTop: "solid orange 5px", borderRadius: "0.5rem" }}
            >
              <CardBody>
                <CardTitle style={{ fontSize: "2rem" }}>
                  Followed Accounts
                </CardTitle>
                <div>
                  {this.props.user.followedAccounts.map(
                    ({ _id, firstName, lastName }) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "Row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <span
                          style={{ fontWeight: "200" }}
                        >{`${firstName} ${lastName}`}</span>
                        <Button
                          outline
                          color="light"
                          onClick={() => this.handleSubmit(_id)}
                        >
                          Unfollow
                        </Button>
                      </div>
                    )
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
  deleteFollower: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteUser, deleteFollower })(
  Profile
);
