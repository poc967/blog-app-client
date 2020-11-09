import React, { Component } from "react";
import { Popover, PopoverBody, Button, Spinner } from "reactstrap";
import { addFollower } from "../actions/authActions";
import { connect } from "react-redux";
import { FiUserCheck } from "react-icons/fi";
import PropTypes from "prop-types";

class PopOverResults extends Component {
  handleSubmit = async (id) => {
    this.props.addFollower({
      currentUser: this.props.currentUser._id,
      userToFollow: id,
    });
  };

  render() {
    return (
      <div>
        <Popover
          isOpen={Boolean(this.props.doesSearchBarHaveContents)}
          target="search"
          placement="bottom"
          style={{ width: "35vw" }}
        >
          <PopoverBody>
            {!this.props.isLoading ? (
              this.props.searchResults.length !== 0 ? (
                this.props.searchResults.map(({ _id, firstName, lastName }) => (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        marginBottom: "1rem",
                      }}
                      key={_id}
                    >
                      <span>{`${firstName} ${lastName}`}</span>
                      {this.props.currentUser.followedAccounts
                        .map((follower) => follower._id)
                        .includes(_id) ? (
                        <FiUserCheck
                          style={{ color: "green", marginRight: "0.8rem" }}
                          size="25px"
                        />
                      ) : this.props.currentUser._id !== _id ? (
                        <Button onClick={() => this.handleSubmit(_id)}>
                          Add
                        </Button>
                      ) : (
                        <Button>View</Button>
                      )}
                    </div>
                    <hr />
                  </>
                ))
              ) : (
                <span>No results found</span>
              )
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Spinner style={{ testAlign: "center" }} />
              </div>
            )}
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

PopOverResults.propTypes = {
  addFollower: PropTypes.func.isRequired,
};

export default connect(null, { addFollower })(PopOverResults);
