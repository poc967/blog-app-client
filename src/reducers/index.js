import { combineReducers } from 'redux'
import postReducer from './postReducer'
import errorReducer from './errorReducer'

export default combineReducers({
    post: postReducer,
    error: errorReducer
})