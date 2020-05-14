import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap'

const closeStyle = {
    textShadow: 'none'
}

const modalStyle = {
    borderRadius: '0'
}

const SignUp = (props) => {

    const closeButton = <button className="close" onClick={() => props.toggleOpen()} style={closeStyle}>&times;</button>

    return (
        <Modal style={modalStyle} className="text-light" isOpen={props.isOpen} toggle={() => props.toggleOpen()}>
            <ModalHeader className="bg-dark" toggle={() => props.toggleOpen()} close={closeButton}>Sign Up</ModalHeader>
            <ModalBody className="bg-dark text-light">
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input type="email" name="firstName" id="firstName" placeholder="John" required />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="email" name="lastName" id="lastName" placeholder="Smith" required />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="email@codeblog.com" required />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="supersecret" required />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Confirm Password</Label>
                    <Input type="password" name="confirmPassword" id="exampleConfirmPassword" placeholder="supersecret" required />
                </FormGroup>
                <ModalFooter>
                    <Button outline color="primary" block>Get Started!</Button>
                </ModalFooter>
            </ModalBody>
        </Modal>
    )
}

export default SignUp