import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types'
import axios from 'axios'
import { returnErrors } from './errorActions'

export const getUser = () => async (dispatch, getState) => {
    dispatch(setUserLoading())

    try {
        const response = await axios.get('/users', setupConfig(getState))
        dispatch({
            type: USER_LOADED,
            payload: response.data
        })
    } catch (error) {
        dispatch(returnErrors(error.response.data.message, error.response.status))
        dispatch({
            type: AUTH_ERROR,
        })
    }
}

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}

export const registerUser = (newUser) => async (dispatch) => {
    const { firstName, lastName, email, password } = newUser

    const body = { firstName, lastName, email, password }

    try {
        const response = await axios.post('/users', body)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL
        })
        dispatch(returnErrors(error.response.data.message, error.response.status, "REGISTER_FAIL"))
    }

}

export const setupConfig = async (getState) => {
    const token = await getState().auth.token

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if (token) {
        config.headers['x-auth-token'] = token
    }

    return config
}