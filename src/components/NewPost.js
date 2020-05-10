import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap'

// redux


class NewPost extends Component {
    render() {

        const closeButton = <button className="close" onClick={() => this.props.toggleOpen()}>&times;</button>

        return (
            <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggleOpen()}>
                <ModalHeader toggle={() => this.props.toggleOpen()} close={closeButton}>New Post</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" placeholder="Lorem Ipsum" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="author">Author</Label>
                        <Input type="text" name="author" id="author" placeholder="John Smith" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="body">Body</Label>
                        <Input type="textarea" name="body" id="body" placeholder="Write post here..." />
                    </FormGroup>
                    <ModalFooter>
                        <Button type="submit" color="primary">Submit</Button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        )
    }
}

export default NewPost