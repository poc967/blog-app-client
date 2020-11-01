import React, { Component } from "react";
import { Popover, PopoverBody, Button } from "reactstrap";

class PopOverResults extends Component {
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
            {this.props.searchResults.data ? (
              this.props.searchResults.data.map(
                ({ _id, firstName, lastName }) => (
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
                    <Button>Add</Button>
                  </div>
                )
              )
            ) : (
              <span>No results found</span>
            )}
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

export default PopOverResults;
