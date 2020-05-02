import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Container, Col, Button, Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const modalStyle = {
    backgroundColor: '#343a40',
    color: 'white',
}

const closeStyle = {
    textShadow: 'none'
}

class LogIn extends Component {

    state = {
        isOpen: false
    }

    toggleOpen = (e) => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {

        const closeButton = <button className="close" onClick={this.toggleOpen} style={closeStyle}>&times;</button>

        return (
            <div>
                <Container className="mt-5">
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Form>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="email@codeblog.com" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="supersecret" />
                            </FormGroup>
                            <Row>
                                <Col xs="auto">
                                    <Button color="primary">Log In</Button>
                                </Col>
                                <Col xs="auto">
                                    <span>Not a member already?<Button color="link" onClick={this.toggleOpen}>Sign Up</Button></span>
                                    <Modal isOpen={this.state.isOpen} toggle={this.toggleOpen}>
                                        <ModalHeader toggle={this.toggleOpen} close={closeButton}>Sign Up</ModalHeader>
                                        <ModalBody >
                                            <FormGroup>
                                                <Label for="firstName">First Name</Label>
                                                <Input type="email" name="firstName" id="firstName" placeholder="John" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="lastName">Last Name</Label>
                                                <Input type="email" name="lastName" id="lastName" placeholder="Smith" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <Input type="email" name="email" id="exampleEmail" placeholder="email@codeblog.com" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="password">Password</Label>
                                                <Input type="password" name="password" id="examplePassword" placeholder="supersecret" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="password">Confirm Password</Label>
                                                <Input type="password" name="confirmPassword" id="exampleConfirmPassword" placeholder="supersecret" />
                                            </FormGroup>
                                            <ModalFooter>
                                                <Button outline color="primary">Get Started!</Button>
                                            </ModalFooter>
                                        </ModalBody>
                                    </Modal>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Container>
            </div>
        )
    }
}

export default LogIn