import React, { Component } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import PopOverResults from "./PopOverResults";
import axios from "axios";

class SearchBar extends Component {
  state = {
    search: "",
    loading: false,
    results: [],
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.findUsers(e.target.value);
  };

  findUsers = async (firstName) => {
    try {
      const results = await axios.post("/users/search", { firstName });
      this.setState({
        results,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  render() {
    return (
      <>
        <div>
          <Form
            style={{
              width: "38vw",
              padding: "0.5rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormGroup style={{ margin: "0 auto", width: "85%" }}>
              <Input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Link to="#">
              <FaRegArrowAltCircleRight
                //   onClick={(event) => handleSubmit(event)}
                size="25px"
                style={{ color: "grey" }}
              />
            </Link>
            <PopOverResults
              doesSearchBarHaveContents={this.state.search}
              searchResults={this.state.results}
            />
          </Form>
        </div>
      </>
    );
  }
}

export default SearchBar;
