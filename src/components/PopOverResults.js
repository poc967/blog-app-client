import React, { Component } from "react";
import { Popover, PopoverBody, Button, Spinner } from "reactstrap";
import axios from "axios";

class PopOverResults extends Component {
  handleSubmit = async (id) => {
    await axios.post(`/users/add_followers/${this.props.currentUser._id}`, {
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
                    <Button onClick={() => this.handleSubmit(_id)}>Add</Button>
                  </div>
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

export default PopOverResults;
