import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Form } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid'

// redux
import { connect } from 'react-redux'
import { addPost } from '../actions/postActions'

// For modals, should probably embed the open button inside the modal component rather than the parent component

const date = new Date()

class NewPost extends Component {

    state = {
        title: '',
        author: '',
        body: ''
    }

    onChange = (e) => {
        const key = e.target.name
        const value = e.target.value

        this.setState({
            [key]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const newPost = {
            id: uuidv4(),
            title: this.state.title,
            author: this.state.author,
            body: this.state.body,
            date
        }

        this.props.addPost(newPost)

        this.setState = ({
            title: '',
            author: '',
            body: ''
        })

        this.props.toggleOpen()
    }

    render() {

        const closeButton = <button className="close" onClick={() => this.props.toggleOpen()}>&times;</button>

        return (
            <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggleOpen()}>
                <ModalHeader className="bg-dark text-light" toggle={() => this.props.toggleOpen()} close={closeButton}>New Post</ModalHeader>
                <ModalBody className="bg-dark text-light">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" name="title" id="title" placeholder="Lorem Ipsum" onChange={this.onChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="author">Author</Label>
                            <Input type="text" name="author" id="author" placeholder="John Smith" onChange={this.onChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="body">Body</Label>
                            <Input type="textarea" name="body" id="body" placeholder="Write post here..." onChange={this.onChange} />
                        </FormGroup>
                        <ModalFooter>
                            <Button type="submit" color="primary" block>Submit</Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    post: state.post
})

export default connect(mapStateToProps, { addPost })(NewPost)