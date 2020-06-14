import React, { Component } from 'react'
import { Col, Row, Card, Button, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap'

// styles
const cardStyle = {
    boxShadow: '0 .5rem 1rem rgba(0,0,0,.9)',
    borderRadius: '0',
    border: '0'
}

class Profile extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <Card color="dark" className="mt-3 mb-3" dark inverse style={cardStyle}>
                            <CardImg top width="100%" src="https://placeimg.com/640/300/nature" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>firstName lastName</CardTitle>
                                <CardText>About me: Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md={{ size: 4, offset: 2 }}>
                        <Card className="mb-3" color="dark" dark inverse style={cardStyle}>
                            <CardBody>
                                <CardTitle>Account Details</CardTitle>
                                <CardText>Email: email <Button color="danger" outline>Update</Button></CardText>
                                <CardText>First Name: firstName <Button color="danger" outline>Update</Button></CardText>
                                <CardText>Last Name: lastName <Button color="danger" outline>Update</Button></CardText>
                                <CardText>Password: password <Button color="danger" outline>Update</Button></CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md={{ size: 4 }}>
                        <Card className="mb-3" color="dark" dark inverse style={cardStyle}>
                            <CardBody>
                                <CardTitle>Card title</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Profile