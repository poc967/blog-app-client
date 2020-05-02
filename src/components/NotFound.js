import React from 'react'
import { Container, Col } from 'reactstrap'
import { TiWarningOutline } from 'react-icons/ti'

const divStyle = {
    textAlign: 'center'
}

const NotFound = () => {
    return (
        <div>
            <Container className="mt-5">
                <Col sm="12" md={{ size: 6, offset: 3 }} style={divStyle}>
                    <TiWarningOutline size="100px" color="#343a40" />
                    <h1 className="display-4">404</h1>
                    <span className="lead">Not Found</span>
                </Col>
            </Container>
        </div>
    )
}

export default NotFound