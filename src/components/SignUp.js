import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Form, FormFeedback, Alert } from 'reactstrap'
import { confirmPassword, passwordStrength } from '../utils/helperFunctions'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { registerUser } from '../actions/authActions'

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
        confirmPassword: '',
        message: null
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props
        if (error !== prevProps.error) {
            if (error.id === 'REGISTER_FAIL') {
                this.setState({
                    message: error.message
                })
            } else {
                this.setState({
                    message: null
                })
            }
        }
        if (this.props.isOpen && this.props.isAuthenticated) {
            this.props.toggleOpen()
        }
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

        const { firstName, lastName, email, password } = this.state

        if (passwordStrength(password).length !== 0 || !confirmPassword(password, this.state.confirmPassword)) {
            return
        }

        const newUser = {
            firstName,
            lastName,
            email,
            password
        }

        this.props.registerUser(newUser)
    }

    render() {
        const passwordsMatch = confirmPassword(this.state.password, this.state.confirmPassword)
        const strongPassword = passwordStrength(this.state.password)
        const closeButton = <button className="close" onClick={() => this.props.toggleOpen()} style={closeStyle}>&times;</button>

        return (
            <Modal style={modalStyle} className="text-light" isOpen={this.props.isOpen} toggle={() => this.props.toggleOpen()}>
                <ModalHeader className="bg-dark" toggle={() => this.props.toggleOpen()} close={closeButton}>Sign Up</ModalHeader>
                <ModalBody className="bg-dark text-light">
                    {this.state.message ? (<Alert color="danger">{this.state.message}</Alert>) : null}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="John"
                                onChange={this.handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Smith"
                                onChange={this.handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="email@codeblog.com"
                                onChange={this.handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="supersecret"
                                onChange={(e) => { this.handleChange(e); passwordStrength(e.target.value) }}
                                valid={strongPassword.length === 0}
                                invalid={this.state.password ? strongPassword.length !== 0 : null}
                                required
                            />
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
                                required
                            />
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

SignUp.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { registerUser })(SignUp)