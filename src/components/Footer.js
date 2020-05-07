import React from 'react'
import { AiFillFacebook, AiOutlineTwitter, AiOutlineInstagram } from 'react-icons/ai'
import { Container, Col } from 'reactstrap'

const divStyle = {
    textAlign: 'center',
    display: 'flex',
    height: '5rem',
    alignItems: 'center',
    justifyContent: 'center'
}


const Footer = () => {
    return (
        <div className="footer text-light bg-dark" style={divStyle}>
            <Container>
                <Col xs="12" md={{ size: 4, offset: 4 }} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <AiFillFacebook size="30px" color="" />
                    <AiOutlineInstagram size="30px" color="" />
                    <AiOutlineTwitter size="30px" color="" />
                </Col>
            </Container>
        </div>
    )
}

export default Footer