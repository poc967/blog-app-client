import React from 'react'
import { Jumbotron, Button, Container, Row, Col } from 'reactstrap'
import { AiFillFacebook, AiOutlineTwitter, AiOutlineInstagram } from 'react-icons/ai'

const divStyle = {
    borderRadius: '0px',
    height: '100vh',
    backgroundColor: 'white',
    color: '#343a40'
}

const Home = () => {
    return (
        <div>
            <Jumbotron style={divStyle}>
                <Container className="mt-5 align-baseline">
                    <h1 className="display-2">Code Blog</h1>
                    <p className="h2 mb-3">This is a simple react blog designed for developers to showcase react designs</p>
                    <Row>
                        <Col xs="12" md={{ size: 2, offset: 0 }}>
                            <Button outline color="primary">Sign Up Now</Button>
                        </Col>
                        <Col xs="12" md={{ size: 3, offset: 0 }}>
                            <AiFillFacebook size="32px" color="#3B5998" className="" />
                            <AiOutlineTwitter size="32px" color="#00ACEE" className="ml-2" />
                            <AiOutlineInstagram size="32px" color="#8a3ab9" className="ml-2" />
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        </div>
    )
}

export default Home