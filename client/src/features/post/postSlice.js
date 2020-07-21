import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        loading: true,
        posts: [],
        profiles: []
    },
    reducers: {
        handleCreatePost: (state, action)=> {
            return { ...state, posts: state.posts.concat(action.payload), loading: false }
        },
        handleGetPosts: (state, action)=> {
            const {posts, profiles} = action.payload
            if(state.profiles.length < 1 ) {
                return { ...state, posts: state.posts.concat(posts),
                     profiles: state.profiles.concat(profiles) , loading: false }
            } else {
                const arr1 = state.profiles.map(profile => profile.user_id)
                const arr2 = profiles.filter((el) => {
                    return !arr1.includes(el.user_id)
                })
                return { ...state, posts: state.posts.concat(posts),
                     profiles: state.profiles.concat(arr2) , loading: false }
            }
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

export const getPosts = ({start, count}) => async dispatch => {
    const res = await axios.get(`/post?count=${count}&start=${start}`)
    dispatch(handleGetPosts(res.data))
}

export const deletePost = id => async dispatch => {
    const res = await axios.post('/post/del', {id})
    dispatch(handleDeletePost(res.data))
}

export const selectPost = state => state.post

export default postSlice.reducer 