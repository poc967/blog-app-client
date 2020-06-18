import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    UPDATE_USER
} from '../actions/types'

const initialState = {
    isAuthenticated: false,
    loading: false,
    user: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        case USER_LOADED:
        case UPDATE_USER:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                user: action.payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
        case AUTH_ERROR:
            return {
                isAuthenticated: false,
                loading: false,
                user: {}
            }
        default:
            return state
    }
}

export default authReducer