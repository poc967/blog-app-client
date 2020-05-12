import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import {
    Card, CardText, CardBody, CardTitle, Button, Container, Col, Row
} from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import NewPost from './NewPost'

// redux
import { connect } from 'react-redux'
import { getPosts, deletePost } from '../actions/postActions'

const cardStyle = {
    boxShadow: '0 .5rem 1rem rgba(0,0,0,.9)'
}

const cardBodyStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
}

class Blog extends Component {

    componentDidMount() {
        console.log('fetching')
        this.props.getPosts()
    }

    onDeleteClick = (id) => {
        this.props.deletePost(id)
    }

    state = {
        isOpen: false
    }

    toggleOpen = (e) => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { posts } = this.props.post
        return (
            <div>
                <NewPost isOpen={this.state.isOpen} toggleOpen={this.toggleOpen} />
                <Container className="mt-3" style={{ minHeight: '100vh' }}>
                    <Row>
                        <Col sm="auto">
                            <Button color="primary"
                                className="mb-3" onClick={this.toggleOpen}>New Post</Button>
                        </Col>
                        <Col sm="12" md={{ size: 9, offset: 0 }}>
                            <TransitionGroup className="blog-posts">
                                {posts.map(({ id, title, author, body, date }) => (
                                    <CSSTransition key={id} timeout={500} classNames="fade">
                                        <Card color="dark" inverse className="mb-5" style={cardStyle}>
                                            <CardBody>
                                                <CardTitle className="font-weight-bold">{title} || {author}</CardTitle>
                                                <CardText>{date.toUTCString()}</CardText>
                                                <CardText style={cardBodyStyle}>{body}</CardText>
                                                <Button color="secondary" inverse>See More</Button>
                                                <Button color="danger"
                                                    outline
                                                    className="ml-3"
                                                    onClick={() => this.onDeleteClick(id)}>Remove</Button>
                                            </CardBody>
                                        </Card>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </ Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

Blog.propTypes = {
    getPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts, deletePost })(Blog)