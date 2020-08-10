import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const commentSlice = createSlice({
    name: 'comment',
    initialState:{
        loading_comment: true,
        comments: [],
        profiles: []
    },
    reducers: {
        handleAddComment: (state, action)=> {
            return{ ...state, comments: [...action.payload, ...state.comments] , loading_comment: false} 
        },
        handleGetComment: (state, action)=> {
            const {comments, profiles} = action.payload
            if(state.profiles.length < 1 ) {
                return{ ...state, comments: state.comments.concat(comments),
                    profiles: state.profiles.concat(profiles),
                    loading_comment: false}
            } else {
                const arr1 = state.profiles.map(profile => profile.user_id)
                const arr2 = profiles.filter((el) => {
                    return !arr1.includes(el.user_id)
                })
                return{ ...state, comments: state.comments.concat(comments),
                    profiles: state.profiles.concat(arr2),
                    loading_comment: false}
            }
        },
        handleRemoveComment: (state, action)=> {
            return { ...state, comments: state.comments.filter(el=> el.post_id!==action.payload)}
        },
        handleResetComment: state=> {
            return { ...state, loading_comment: true, comments: [], profiles: [] }
        }
    }
})

export const { handleAddComment, handleGetComment,
     handleRemoveComment, handleResetComment } = commentSlice.actions 

export const addComment = (comment, post_id) => async dispatch=> {
    const res = await axios.post('/comment', {comment, post_id})
    dispatch(handleAddComment(res.data))
}

export const getComment = (post_id) => async dispatch => {
    const res = await axios.post('/comment/get', {post_id})
    dispatch(handleGetComment(res.data))
}

export const removeComment = id => dispatch => {
    dispatch(handleRemoveComment(id))
}

export const resetComment = () => dispatch => {
    dispatch(handleResetComment())
}



export const selectComment = state => state.comment

export default commentSlice.reducer