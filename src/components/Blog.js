import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Card, CardText, CardBody, CardTitle, Button, Container, Col, Row, Spinner, Badge } from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

// components
import NewPost from './NewPost'
import FilterPosts from './Filter'

// redux
import { connect } from 'react-redux'
import { getPosts, deletePost } from '../actions/postActions'

// styles
const cardStyle = {
    boxShadow: '0 .5rem 1rem rgba(0,0,0,.9)',
    borderRadius: '0'
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
    state = {
        selectedOptions: []
    }

    addSelectedOptions = (selectedOptions) => {
        this.setState({
            selectedOptions
        })
    }

    componentDidMount() {
        this.props.getPosts()
    }

    onDeleteClick = (id) => {
        this.props.deletePost(id)
    }

    getAllCategories = (categories) => {
        const results = []
        for (let i = 0; i < categories.length; i++) {
            if (!results.includes(categories[i])) {
                results.push(categories[i])
            }
        }
        return results
    }

    calcDate = (isoDate) => {
        const parsedDate = new Date(isoDate)
        const month = parsedDate.getUTCMonth() + 1
        const day = parsedDate.getUTCDate()
        const year = parsedDate.getUTCFullYear()
        const hour = parsedDate.getUTCHours()
        const min = parsedDate.getUTCMinutes()
        return `${month}-${day}-${year} ${hour}:${min}`
    }

    pillColor = (category) => {
        switch (category) {
            case 'Mystery':
                return 'success'
            case 'Drama':
                return 'danger'
            case 'Recipe':
                return 'info'
            case 'How-to':
                return 'danger'
            default:
                return 'secondary'
        }
    }

    borderColor = (category) => {
        switch (category) {
            case 'Mystery':
                return '#28a745'
            case 'Recipe':
                return '#17a2b8'
            case 'Drama':
                return '#dc3545'
            case 'How-to':
                return '#dc3545'
            default:
                return 'grey'
        }
    }

    render() {

        const { posts, loading } = this.props.post

        const options = this.state.selectedOptions === null ? [] : this.state.selectedOptions.map(option => option.value)

        const filteredPosts = (this.state.selectedOptions === null || this.state.selectedOptions.length === 0) ? posts : posts.filter(post => options.includes(post.category))

        if (loading) return <Container style={spinnerStyle}><Spinner color="info" style={{ width: '7rem', height: '7rem' }} /></Container>

        return (
            < div >
                <Container className="mt-3" style={{ minHeight: '100vh' }}>
                    <Row>
                        <Col sm="auto">
                            <NewPost />
                        </Col>
                        <Col sm="12" md={{ size: 9, offset: 0 }}>
                            <FilterPosts getAllCategories={this.getAllCategories} postCategories={posts} addSelectedOptions={this.addSelectedOptions} selectedOptions={this.state.selectedOptions} />
                            <TransitionGroup className="blog-posts">
                                {filteredPosts.map(({ _id, title, author, body, category, createdAt }) => (
                                    <CSSTransition key={_id} timeout={500} classNames="fade">
                                        <Card className="mb-5" style={cardStyle}>
                                            <CardBody style={{ borderRight: `solid ${this.borderColor(category)} 20px` }}>
                                                <CardTitle className="font-weight-bold" style={{ cardBodyStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    {title} || {author}<Badge color={this.pillColor(category)} pill>{category}</Badge>
                                                </CardTitle>
                                                <CardText>Date Created: {this.calcDate(createdAt)}</CardText>
                                                <CardText style={cardBodyStyle}>{body}</CardText>
                                                <Button color="dark" outline>See More</Button>
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
            </div >
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