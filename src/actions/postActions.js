import { GET_POSTS, ADD_POST, DELETE_POST } from './types'

export const getPosts = () => {
    return {
        type: GET_POSTS
    }
}