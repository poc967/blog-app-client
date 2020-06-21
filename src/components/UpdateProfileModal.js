import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label, Form } from 'reactstrap'
import { connect } from 'react-redux'
import { updateUser } from '../actions/authActions'
import PropTypes from 'prop-types'

class UpdateProfileModal extends Component {

    state = {
        isOpen: false,
        email: this.props.input,
        firstName: this.props.input,
        lastName: this.props.input,
        about: this.props.input
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

        switch (this.props.paramToUpdate) {
            case 'about':
                payload = {
                    id: this.props.id,
                    data: { about: this.state.about }
                }
                break
            case 'email':
                payload = {
                    id: this.props.id,
                    data: { email: this.state.email }
                }
                break
            case 'firstName':
                payload = {
                    id: this.props.id,
                    data: { firstName: this.state.firstName }
                }
                break
            case 'lastName':
                payload = {
                    id: this.props.id,
                    data: { lastName: this.state.lastName }
                }
                break
            default:
                return null
        }

        this.props.updateUser(payload)
    }

    valueHandler = (value) => {
        switch (value) {
            case 'about':
                return this.state.about
            case 'email':
                return this.state.email
            case 'firstName':
                return this.state.firstName
            case 'lastName':
                return this.state.lastName
            default:
                return null
        }
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
                                    type={this.props.type}
                                    name={this.props.paramToUpdate}
                                    onChange={this.handleChange}
                                    value={this.valueHandler(this.props.paramToUpdate)}
                                />
                            </FormGroup>
                            <ModalFooter>
                                <Button color="primary" type="submit">Update</Button>
                                <Button color="secondary" onClick={this.toggleOpen}>Close</Button>
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