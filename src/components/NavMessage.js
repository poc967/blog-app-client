import React from 'react'
import { NavLink } from 'reactstrap'

const WelcomeMessage = (props) => {
    return (
        <NavLink href='#'>Welcome {props.firstName}</NavLink>
    )
}

export default WelcomeMessage