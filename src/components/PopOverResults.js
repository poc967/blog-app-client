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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span>Jim Halpert</span>
              <Button>Add</Button>
            </div>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

export default PopOverResults;
