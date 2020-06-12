import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types'

const initialState = {
    isAuthenticated: false,
    loading: false,
    user: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        case USER_LOADED:
            localStorage.setItem('user_id', action.payload._id)
            localStorage.setItem('isAuthenticated', true)
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: {
                    id: action.payload._id,
                    email: action.payload.email,
                    firstName: action.payload.firstName
                }
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('user_id', action.payload._id)
            localStorage.setItem('isAuthenticated', true)
            return {
                ...state,
                user: {
                    id: action.payload._id,
                    email: action.payload.email,
                    firstName: action.payload.firstName
                },
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
        case AUTH_ERROR:
            localStorage.removeItem('user_id')
            localStorage.setItem('isAuthenticated', false)
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        default:
            return {
                state
            }
    }
}