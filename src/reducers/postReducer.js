import { GET_POSTS, ADD_POST, DELETE_POST } from '../actions/types'
import { v4 as uuidv4 } from 'uuid'

const date = new Date()

const initialState = {
    posts: [
        { id: uuidv4(), title: 'Lorem Ipsum', author: 'Patrick OConnor', image: 'https://placeimg.com/640/315/tech', body: 'Lorem Ipsum this is a new post!!', date },
        { id: uuidv4(), title: 'Lorem Ipsum', author: 'Patrick OConnor', image: 'https://placeimg.com/640/315/tech', body: 'Lorem Ipsum this is a new post!!', date },
        { id: uuidv4(), title: 'Lorem Ipsum', author: 'Patrick OConnor', image: 'https://placeimg.com/640/315/tech', body: 'Lorem Ipsum this is a new post!!', date },
        { id: uuidv4(), title: 'Lorem Ipsum', author: 'Patrick OConnor', image: 'https://placeimg.com/640/315/tech', body: 'Lorem Ipsum this is a new post!!', date },
        { id: uuidv4(), title: 'Lorem Ipsum', author: 'Patrick OConnor', image: 'https://placeimg.com/640/315/tech', body: 'Lorem Ipsum this is a new post!!', date }
    ]
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
        default:
            return state
    }
}