import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Form } from 'reactstrap'
import { connect } from 'react-redux'
import { updateUser } from '../actions/authActions'
import PropTypes from 'prop-types'

class UpdateProfileModal extends Component {

    state = {
        isOpen: false,
        email: '',
        firstName: '',
        lastName: ''
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

    handleSubmit = (e) => {
        e.preventDefault()

        let payload

        if (this.state.email) {
            payload = {
                id: this.props.id,
                data: {
                    email: this.state.email
                }
            }
        }

        if (this.state.firstName) {
            payload = {
                id: this.props.id,
                data: { firstName: this.state.firstName }
            }
        }

        if (this.state.lastName) {
            payload = {
                id: this.props.id,
                data: { lastName: this.state.lastName }
            }
        }

        this.props.updateUser(payload)
    }

    render() {
        return (
            <div>
                <Button color="danger" outline onClick={this.toggleOpen}>Update</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleOpen} backdrop={false} className="bg-dark">
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label>Update data</Label>
                                <Input
                                    required
                                    type={this.props.paramToUpdate === 'email' ? 'email' : 'text'}
                                    name={this.props.paramToUpdate}
                                    onChange={this.handleChange} />
                            </FormGroup>
                            <ModalFooter>
                                <Button color="primary" type="submit">Update</Button>
                                <Button color="secondary" onClick={this.toggleOpen}>Cancel</Button>
                            </ModalFooter>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

UpdateProfileModal.propTypes = ({
    updateUser: PropTypes.func.isRequired
})

export default connect(null, { updateUser })(UpdateProfileModal)