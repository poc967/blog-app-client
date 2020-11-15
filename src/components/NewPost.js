import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  Form,
} from "reactstrap";
import { PropTypes } from "prop-types";

// redux
import { connect } from "react-redux";
import { addPost } from "../actions/postActions";

class NewPost extends Component {
  state = {
    title: "",
    author: "",
    body: "",
    isOpen: false,
  };

  onChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    this.setState({
      [key]: value,
    });
  };

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title: this.state.title,
      author: this.props.user.id,
      body: this.state.body,
      category: this.state.category,
    };

    this.props.addPost(newPost);

    this.toggleOpen();
  };

  render() {
    const closeButton = (
      <button className="close" onClick={this.toggleOpen}>
        &times;
      </button>
    );

    return (
      <div>
        <Button color="primary" className="mb-3" onClick={this.toggleOpen}>
          New Post
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggleOpen}>
          <ModalHeader
            className="bg-dark text-light"
            toggle={this.toggleOpen}
            close={closeButton}
          >
            New Post
          </ModalHeader>
          <ModalBody className="bg-dark text-light">
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Lorem Ipsum"
                  required
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="category">Category</Label>
                <Input
                  type="select"
                  name="category"
                  id="category"
                  placeholder="Mystery"
                  required
                  onChange={this.onChange}
                >
                  <option>Drama</option>
                  <option>Mystery</option>
                  <option>Recipe</option>
                  <option>Thriller</option>
                  <option>How-to</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="body">Body</Label>
                <Input
                  type="textarea"
                  name="body"
                  id="body"
                  placeholder="Write post here..."
                  required
                  onChange={this.onChange}
                />
              </FormGroup>
              <ModalFooter>
                <Button type="submit" color="primary" block>
                  Submit
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

NewPost.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  post: state.post,
  user: state.auth.user,
});

export default connect(mapStateToProps, { addPost })(NewPost);
