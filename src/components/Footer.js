import React from 'react'
import { AiFillFacebook, AiOutlineTwitter, AiOutlineInstagram } from 'react-icons/ai'
import { Container, Col } from 'reactstrap'

const divStyle = {
    textAlign: 'center',
    display: 'flex',
    height: '5rem',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#878b8f'
}


const Footer = () => {
    return (
        <div className="footer bg-dark light-text-white" style={divStyle}>
            <Container>
                <Col xs="12" md={{ size: 4, offset: 4 }} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <AiFillFacebook size="30px" className="light-text-white" />
                    <AiOutlineInstagram size="30px" className="light-text-white" />
                    <AiOutlineTwitter size="30px" className="light-text-white" />
                </Col>
            </Container>
        </div>
    )
}

export default Footer