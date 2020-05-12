import { GET_POSTS, ADD_POST, DELETE_POST, POSTS_LOADING } from '../actions/types'

const date = new Date()

const initialState = {
    posts: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.payload)
            }
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case POSTS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}