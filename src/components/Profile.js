import React, { Component } from "react";
import {
  Col,
  Row,
  Card,
  Button,
  CardBody,
  CardTitle,
  CardText,
  Spinner,
} from "reactstrap";
import { Switch } from "antd";
import { PropTypes } from "prop-types";
import UpdateProfileModal from "./UpdateProfileModal";
import { deleteUser } from "../actions/authActions";

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
    console.log(id);
    this.props.deleteUser(id);
  };

  render() {
    const { email, firstName, lastName, _id, about } = this.props.user;

    return (
      <div style={{ height: "100vh" }}>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Card color="dark" className="mt-3 mb-3" inverse style={cardStyle}>
              <CardBody>
                <CardTitle
                  style={{ fontSize: "2rem" }}
                >{`${firstName} ${lastName}`}</CardTitle>
                <CardText>
                  About me: <br /> {about}
                </CardText>
                <UpdateProfileModal
                  paramToUpdate={"about"}
                  id={_id}
                  type={"textarea"}
                  input={about}
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
              }}
            >
              {this.props.auth.loading ? (
                <div
                  style={{
                    minHeight: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Spinner style={{ width: "4rem", height: "4rem" }} />
                </div>
              ) : (
                <CardBody>
                  <CardTitle style={{ fontSize: "2rem" }}>
                    Account Details
                  </CardTitle>
                  <CardText
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    name="email"
                  >
                    {email}
                    <UpdateProfileModal
                      paramToUpdate={"email"}
                      id={_id}
                      type={"email"}
                      input={email}
                    />
                  </CardText>
                  <CardText
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {firstName}
                    <UpdateProfileModal
                      paramToUpdate={"firstName"}
                      id={_id}
                      type={"text"}
                      input={firstName}
                    />
                  </CardText>
                  <CardText
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {lastName}
                    <UpdateProfileModal
                      paramToUpdate={"lastName"}
                      id={_id}
                      type={"text"}
                      input={lastName}
                    />
                  </CardText>
                  <CardText
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    Password
                    <UpdateProfileModal
                      paramToUpdate={"password"}
                      id={_id}
                      type={"password"}
                    />
                  </CardText>
                </CardBody>
              )}
            </Card>
          </Col>
          <Col sm="12" md={{ size: 4 }}>
            <Card
              className="mb-3"
              color="dark"
              inverse
              style={{ cardStyle, borderTop: "solid #dc3545 5px" }}
            >
              <CardBody>
                <CardTitle style={{ fontSize: "2rem" }}>Delete User</CardTitle>
                <CardText>
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
                      onClick={() => this.handleDelete(_id)}
                    >
                      Delete
                    </Button>
                  ) : null}
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
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteUser })(Profile);
