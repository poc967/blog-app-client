import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ isLoggedIn, ...props }) => {
    return (
        isLoggedIn ? <Route {...props} /> : <Redirect to='/users/login' />
    )
}

export default PrivateRoute