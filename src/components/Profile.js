import React, { Component } from 'react'
import { Col, Row, Card, Button, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap'
import { PropTypes } from 'prop-types'
import UpdateProfileModal from './UpdateProfileModal'

// redux
import { connect } from 'react-redux'

// styles
const cardStyle = {
    boxShadow: '0 .5rem 1rem rgba(0,0,0,.9)',
    borderRadius: '0',
    border: '0',
    display: 'flex'
}

class Profile extends Component {
    render() {
        const { email, firstName, lastName, _id, about } = this.props.user
        const keys = Object.keys(this.props.user)
        console.log(keys)

        return (
            <div>
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <Card color="dark" className="mt-3 mb-3" inverse style={cardStyle}>
                            <div style={{ position: 'relative' }}>
                                <CardImg top width="100%" src="https://placeimg.com/1100/600/nature" alt="Card image cap" />
                                <img style={{ border: 'solid white 5px', position: 'absolute', width: '25%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} src="https://placeimg.com/600/600/people" alt="alt text" />
                            </div>
                            <CardBody>
                                <CardTitle style={{ fontSize: '2rem' }}>{`${firstName} ${lastName}`}</CardTitle>
                                <CardText>About me: <br /> {about}</CardText>
                                <UpdateProfileModal paramToUpdate={'about'} id={_id} type={'textarea'} input={about} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md={{ size: 4, offset: 2 }}>
                        <Card className="mb-3" color="dark" inverse style={{ cardStyle, borderTop: 'solid #17a2b8 5px' }}>
                            <CardBody>
                                <CardTitle style={{ fontSize: '2rem' }}>Account Details</CardTitle>
                                <CardText style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} name="email">{email}<UpdateProfileModal paramToUpdate={'email'} id={_id} type={'email'} input={email} /></CardText>
                                <CardText style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>{firstName}<UpdateProfileModal paramToUpdate={'firstName'} id={_id} type={'text'} input={firstName} /></CardText>
                                <CardText style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>{lastName}<UpdateProfileModal paramToUpdate={'lastName'} id={_id} type={'text'} input={lastName} /></CardText>
                                <CardText style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><UpdateProfileModal paramToUpdate={'password'} id={_id} type={'password'} /></CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md={{ size: 4 }}>
                        <Card className="mb-3" color="dark" inverse style={{ cardStyle, borderTop: 'solid #dc3545 5px' }}>
                            <CardBody>
                                <CardTitle style={{ fontSize: '2rem' }}>Card title</CardTitle>
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

Profile.propTypes = {
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps, null)(Profile)