import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        loading: true,
        posts: []
    },
    reducers: {
        handleCreatePost: (state, action)=> {
            return { ...state, posts: state.posts.concat(action.payload), loading: false }
        },
        handleGetPosts: (state, action)=> {
            return { ...state, posts: action.payload, loading: false}
        },
        handleDeletePost: (state, action)=> {
            return { ...state, posts: state.posts.filter(pos=> pos.id !== action.payload.id )}
        }
    }
})

export const { handleCreatePost, handleGetPosts, handleDeletePost } = postSlice.actions

export const createPost = ({text, image}) => async dispatch => {
    const res = await axios.post('/post', {text, image})
    dispatch(handleCreatePost(res.data))
}

export const getPosts = () => async dispatch => {
    const res = await axios.get('/post')
    dispatch(handleGetPosts(res.data))
}

export const deletePost = id => async dispatch => {
    const res = await axios.post('/post/del', {id})
    dispatch(handleDeletePost(res.data))
}

export const selectPost = state => state.post

export default postSlice.reducer