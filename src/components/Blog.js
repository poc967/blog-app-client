import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button, Container, Col, Row
} from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { v4 as uuidv4 } from 'uuid'

// redux
import { connect } from 'react-redux'
import { getPosts } from '../actions/postActions'

const cardStyle = {
    boxShadow: '0 .5rem 1rem rgba(0,0,0,.9)'
}

class Blog extends Component {

    componentDidMount() {
        this.props.getPosts()
    }

    render() {
        const { posts } = this.props.post
        return (
            <div>
                <Container className="mt-3" style={{ minHeight: '100vh' }}>
                    <Row>
                        <Col sm="auto">
                            <Button color="primary"
                                className="mb-3"
                                onClick={() => {
                                    const title = prompt('enter title')
                                    const author = prompt('enter author')
                                    const body = prompt('enter post')
                                    if (title && author && body) {
                                        this.setState({
                                            posts: [...posts, { id: uuidv4(), title, author, body }]
                                        })
                                    }
                                }}>New Post</Button>
                        </Col>
                        <Col sm="12" md={{ size: 9, offset: 0 }}>
                            <TransitionGroup className="blog-posts">
                                {posts.map(({ id, title, author, body, image, date }) => (
                                    <CSSTransition key={id} timeout={500} classNames="fade">
                                        <Card color="dark" inverse className="mb-5" style={cardStyle}>
                                            <CardImg top width="100%" src={image} alt="Card image cap" />
                                            <CardBody>
                                                <CardTitle className="font-weight-bold">{author} || {title} </CardTitle>
                                                <CardText>{date.toUTCString()}</CardText>
                                                <Button>See More</Button>
                                                <Button color="danger"
                                                    className="ml-3"
                                                    onClick={() => {
                                                        this.setState({
                                                            posts: posts.filter((post) => post.id !== id)
                                                        })
                                                    }}>Remove</Button>
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
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post.state
})

export default connect(mapStateToProps, { getPosts })(Blog)