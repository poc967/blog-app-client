import React from 'react'
import { Jumbotron, Button, Container, Row, Col } from 'reactstrap'
import { RiArrowDownSLine } from 'react-icons/ri'
import Water from '../images/water.jpg'
import camel from '../images/camel.jpg'
import sky from '../images/sky.jpg'
import night from '../images/night.jpg'

const divStyle = {
    borderRadius: '0px',
    backgroundColor: 'white',
    color: 'white',
    minHeight: 'calc(100vh - 58.3px)',
    marginBottom: '0',
    background: `url(${night}) no-repeat center center`,
    backgroundSize: 'cover'
}

const arrowStyle = {
    textAlign: 'center',
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0'
}

const jumbotronStyle = {
    backgroundColor: 'transparent'
}

const imgStyle = {
    borderRadius: '5px',
    height: 'auto',
    marginBottom: '2rem',
    boxShadow: '0 .5rem 1rem rgba(0,0,0,.9)'
}

const colStyle = {
    textAlign: 'center'
}

const pStyle = {
    fontSize: '0.9rem',
    lineHeight: '2.2rem',
    marginBottom: '3rem',
    marginTop: '3rem',
    color: '#6c757d'
}

const secondaryContentDiv = {
    paddingTop: '3rem',
    backgroundColor: 'white',
}

const Home = () => {
    return (
        <div>
            <div style={divStyle}>
                <Jumbotron style={jumbotronStyle}>
                    <Container >
                        <h1 className="display-4">Code Blog</h1>
                        <hr className="my-3" color="white" />
                        <p className="h2 mb-3">This is a simple react blog designed for developers to showcase react designs</p>
                        <Row>
                            <Col xs="12" md={{ size: 3, offset: 0 }}>
                                <Button outline color="primary">Sign Up Now</Button>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
                <Col style={arrowStyle} xs="12">
                    <RiArrowDownSLine size="60px" className="pulse" />
                </Col>
            </div>
            <div style={secondaryContentDiv}>
                <Container>
                    <Row>
                        <Col xs="12" style={colStyle}>
                            <img width="100%" src="https://placeimg.com/650/220/tech" alt="tech img" style={imgStyle} className="img-fluid" data-aos="fade-left" data-aos-duration="1000" data-aos-offset="400" />
                        </Col>
                    </Row>
                    <Row style={pStyle}>
                        <Col xs="12" md={{ size: 6 }}>
                            <p data-aos="fade-right" data-aos-duration="1000" data-aos-offset="400" style={{ marginBottom: '3rem' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam quisque id diam vel quam elementum pulvinar etiam non. Urna molestie at elementum eu facilisis sed. Faucibus et molestie ac feugiat.</p>
                            <p data-aos="fade-up" data-aos-duration="1000" data-aos-offset="200">1Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam quisque id diam vel quam elementum pulvinar etiam non. Urna molestie at elementum eu facilisis sed. Faucibus et molestie ac feugiat.</p>
                        </Col>
                        <Col xs="12" md={{ size: 6 }}>
                            <p data-aos="fade-left" data-aos-duration="1000" data-aos-offset="400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam quisque id diam vel quam elementum pulvinar etiam non. Urna molestie at elementum eu facilisis sed. Faucibus et molestie ac feugiat.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div >
    )
}

export default Home