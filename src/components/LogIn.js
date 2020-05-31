import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Container, Col, Button, Row } from 'reactstrap'
import SignUp from './SignUp'

const style = {
    minHeight: '100vh'
}

class LogIn extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit')
    }

    render() {

        return (
            <div style={style}>
                <Container className="mt-5">
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Form onSubmit={this.handleSubmit}>
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
                                    onChange={this.handleChange}
                                    required />
                            </FormGroup>
                            <Row>
                                <Col xs="auto">
                                    <Button type="submit" color="primary" outline>Log In</Button>
                                </Col>
                                <Col xs="auto">
                                    <span>Not a member already?<Button color="link" onClick={this.props.toggleOpen}>Sign Up</Button></span>
                                    <SignUp
                                        isOpen={this.props.isOpen}
                                        toggleOpen={this.props.toggleOpen}
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