import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Form } from 'reactstrap'

class UpdateProfileModal extends Component {

    state = {
        isOpen: false,
        userInput: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    toggleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div>
                <Button color="danger" outline onClick={this.toggleOpen}>Button</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleOpen} backdrop={false} className="bg-dark">
                    <ModalHeader className="bg-dark text-light" toggle={this.toggleOpen}>Modal title</ModalHeader>
                    <ModalBody className="bg-dark text-light">
                        <Form>
                            <FormGroup>
                                <Label></Label>
                                <Input></Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter className="bg-dark text-light">
                        <Button color="primary">Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggleOpen}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default UpdateProfileModal