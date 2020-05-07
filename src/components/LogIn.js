import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Container, Col, Button, Row } from 'reactstrap'
import SignUp from './SignUp'

const style = {
    minHeight: '100vh'
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
        return (
            <div style={style}>
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
                                    <Button color="primary" outline>Log In</Button>
                                </Col>
                                <Col xs="auto">
                                    <span>Not a member already?<Button color="link" onClick={this.toggleOpen}>Sign Up</Button></span>
                                    <SignUp
                                        isOpen={this.state.isOpen}
                                        toggleOpen={this.toggleOpen}
                                    />
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