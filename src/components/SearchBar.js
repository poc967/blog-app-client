import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import PopOverResults from "./PopOverResults";

const SearchBar = (props) => {
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/search-results");
    props.handleSubmit("test");
  };

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
              onChange={props.handleChange}
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
            doesSearchBarHaveContents={props.doesSearchBarHaveContents}
          />
        </Form>
      </div>
    </>
  );
};

export default SearchBar;
