import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Form, FormFeedback } from 'reactstrap'

import { confirmPassword, passwordStrength } from '../utils/helperFunctions'

const closeStyle = {
    textShadow: 'none'
}

const modalStyle = {
    borderRadius: '0'
}

class SignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    handleChange = (e) => {
        const key = e.target.name
        const value = e.target.value

        this.setState({
            [key]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render() {

        const passwordsMatch = confirmPassword(this.state.password, this.state.confirmPassword)
        const strongPassword = passwordStrength(this.state.password)
        const closeButton = <button className="close" onClick={() => this.props.toggleOpen()} style={closeStyle}>&times;</button>

        return (
            <Modal style={modalStyle} className="text-light" isOpen={this.props.isOpen} toggle={() => this.props.toggleOpen()}>
                <ModalHeader className="bg-dark" toggle={() => this.props.toggleOpen()} close={closeButton}>Sign Up</ModalHeader>
                <ModalBody className="bg-dark text-light">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="John"
                                onChange={this.handleChange}
                                required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Smith"
                                onChange={this.handleChange}
                                required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="email@codeblog.com"
                                onChange={this.handleChange}
                                required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="supersecret"
                                onChange={(e) => { this.handleChange(e); passwordStrength(e.target.value) }}
                                valid={strongPassword.length === 0}
                                invalid={strongPassword.length !== 0}
                                required />
                            {strongPassword.map((message, index) => (
                                <FormFeedback key={index}>{message}</FormFeedback>
                            ))}
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="password"
                                name="confirmPassword"
                                id="exampleConfirmPassword"
                                placeholder="supersecret"
                                valid={this.state.confirmPassword ? passwordsMatch : !passwordsMatch}
                                invalid={!passwordsMatch}
                                onChange={(e) => { this.handleChange(e); confirmPassword(e.target.value, this.state.password) }}
                                required />
                            <FormFeedback valid={passwordsMatch}>{passwordsMatch ? 'Passwords match!' : 'Passwords do not match'}</FormFeedback>
                        </FormGroup>
                        <ModalFooter>
                            <Button color="primary" block>Get Started!</Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal >
        )
    }
}

export default SignUp