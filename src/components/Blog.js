import React, { Component } from "react";
import { PropTypes } from "prop-types";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Container,
  Col,
  Row,
  Spinner,
  Badge,
  UncontrolledCollapse,
} from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// components
import NewPost from "./NewPost";
import FilterPosts from "./Filter";

// redux
import { connect } from "react-redux";
import { getPosts, deletePost } from "../actions/postActions";

// helpers
import { calcDate, pillColor, borderColor } from "../utils/helperFunctions";

// styles
const cardStyle = {
  boxShadow: "0 .5rem 1rem rgba(0,0,0,.9)",
  borderRadius: "0",
};

const cardBodyStyle = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

const spinnerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

class Blog extends Component {
  state = {
    selectedOptions: [],
    isOpen: false,
  };

  addSelectedOptions = (selectedOptions) => {
    this.setState({
      selectedOptions,
    });
  };

  componentDidMount() {
    this.props.getPosts();
  }

  componentDidUpdate(prevProps) {}

  onDeleteClick = (id) => {
    this.props.deletePost(id);
  };

  render() {
    const { posts, loading } = this.props.post;
    console.log(posts);
    const options =
      this.state.selectedOptions === null
        ? []
        : this.state.selectedOptions.map((option) => option.value);
    const filteredPosts =
      this.state.selectedOptions === null ||
      this.state.selectedOptions.length === 0
        ? posts
        : posts.filter((post) => options.includes(post.category));

    return loading ? (
      <Container style={spinnerStyle}>
        <Spinner color="info" style={{ width: "7rem", height: "7rem" }} />
      </Container>
    ) : (
      <div>
        <Container className="mt-3" style={{ minHeight: "100vh" }}>
          <Row>
            <Col sm="auto">
              <NewPost block />
              <Button block id="toggler" className="mb-3">
                Filter
              </Button>
            </Col>
            <Col sm="12" md={{ size: 9, offset: 0 }}>
              <UncontrolledCollapse toggler="#toggler">
                <FilterPosts
                  postCategories={posts}
                  addSelectedOptions={this.addSelectedOptions}
                  selectedOptions={this.state.selectedOptions}
                  class="mb-3"
                />
              </UncontrolledCollapse>
              <TransitionGroup className="blog-posts">
                {filteredPosts.map(
                  ({ _id, title, author, body, category, createdAt }) => (
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                      <Card className="mb-5" style={cardStyle}>
                        <CardBody
                          style={{
                            borderRight: `solid ${borderColor(category)} 20px`,
                          }}
                        >
                          <CardTitle
                            className="font-weight-bold"
                            style={{
                              cardBodyStyle,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            {title} ||{" "}
                            {`${author.firstName} ${author.lastName}`}
                            <Badge color={pillColor(category)} pill>
                              {category}
                            </Badge>
                          </CardTitle>
                          <CardText>
                            Date Created: {calcDate(createdAt)}
                          </CardText>
                          <CardText style={cardBodyStyle}>{body}</CardText>
                          <Button color="dark" outline>
                            See More
                          </Button>
                          {this.props.user._id === author._id ? (
                            <Button
                              color="danger"
                              outline
                              className="ml-3"
                              onClick={() => this.onDeleteClick(_id)}
                            >
                              Remove
                            </Button>
                          ) : null}
                        </CardBody>
                      </Card>
                    </CSSTransition>
                  )
                )}
              </TransitionGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Blog.propTypes = {
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  post: state.post,
  loading: state.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getPosts, deletePost })(Blog);
