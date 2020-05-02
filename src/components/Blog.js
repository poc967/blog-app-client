import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Col, Row
} from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { v4 as uuidv4 } from 'uuid'


const cardStyle = {
    boxShadow: '0 .5rem 1rem rgba(0,0,0,.9)'
}

class Blog extends Component {

    state = {
        posts: [
            { id: uuidv4(), title: 'my first post', author: 'Pat O.', image: 'https://placeimg.com/640/315/tech', body: 'Lorem Ipsum this is a new post!!' },
            { id: uuidv4(), title: 'my first post', author: 'Pat O.', image: 'https://placeimg.com/640/240/tech', body: 'Lorem Ipsum this is a new post!!' },
            { id: uuidv4(), title: 'my first post', author: 'Pat O.', image: 'https://placeimg.com/640/240/tech', body: 'Lorem Ipsum this is a new post!!' },
            { id: uuidv4(), title: 'my first post', author: 'Pat O.', image: 'https://placeimg.com/640/240/tech', body: 'Lorem Ipsum this is a new post!!' },
            { id: uuidv4(), title: 'my first post', author: 'Pat O.', image: 'https://placeimg.com/640/240/tech', body: 'Lorem Ipsum this is a new post!!' }
        ],
        isOpen: false
    }

    render() {
        const { posts } = this.state

        return (
            <div>
                <Container className="mt-5">
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
                                {posts.map(({ id, title, author, body, image }) => (
                                    <CSSTransition key={id} timeout={500} classNames="fade">
                                        <Card color="secondary" outline className="mb-5" style={cardStyle}>
                                            {/* <Card color="dark" dark inverse className="mb-5" style={cardStyle}> */}
                                            <CardImg top width="100%" src='https://placeimg.com/640/315/tech' alt="Card image cap" />
                                            <CardBody>
                                                <CardTitle className="font-weight-bold">{title}</CardTitle>
                                                <CardSubtitle className="font-weight-bold">{author}</CardSubtitle>
                                                <CardText>{body}</CardText>
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

export default Blog