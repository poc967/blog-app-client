import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import {
    Card, CardText, CardBody, CardTitle, Button, Container, Col, Row, Spinner, Badge
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

const spinnerStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

class Blog extends Component {

    componentDidMount() {
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

        const { posts, loading } = this.props.post

        if (loading) return <Container style={spinnerStyle}><Spinner color="info" style={{ width: '7rem', height: '7rem' }} /></Container>

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
                                {posts.map(({ _id, title, author, body, category, createdAt }) => (
                                    <CSSTransition key={_id} timeout={500} classNames="fade">
                                        <Card color="dark" inverse className="mb-5" style={cardStyle}>
                                            <CardBody style={{ borderRight: 'solid #28a745 20px' }}>
                                                <CardTitle className="font-weight-bold" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>{title} || {author}<Badge color="success" pill>{category}</Badge></CardTitle>
                                                <CardText>Date Created: {createdAt}</CardText>
                                                <CardText style={cardBodyStyle}>{body}</CardText>
                                                <Button color="secondary">See More</Button>
                                                <Button color="danger"
                                                    outline
                                                    className="ml-3"
                                                    onClick={() => this.onDeleteClick(_id)}>Remove</Button>
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
    post: state.post,
    loading: state.loading
})

export default connect(mapStateToProps, { getPosts, deletePost })(Blog)