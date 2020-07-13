import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const socialSlice = createSlice({
    name: 'social',
    initialState:{
        isLoading: true,
        following: false
    },
    reducers: {
        handleFollow: (state, action)=> {
            return { ...state, following: action.payload, isLoading: false }
        },
        handleGetFollow: (state, action)=> {
            return { ...state, following: action.payload, isLoading: false }
        },
        handleUnFollow: (state, action)=> {
            return { ...state, following: action.payload, isLoading: false }
        }
    }
})

export const { handleFollow, handleGetFollow, handleUnFollow } = socialSlice.actions

export const follow = guestProfile_id => async dispatch => {
    const res = await axios.post('/social', {guestProfile_id})
    dispatch(handleFollow(res.data))
}

export const getFollow = guestProfile_id => async dispatch => {
    const res = await axios.post('/social/get', {guestProfile_id})
    dispatch(handleGetFollow(res.data))
}

export const unFollow = guestProfile_id => async dispatch => {
    const res = await axios.delete('/social', {data:{guestProfile_id}})
    dispatch(handleUnFollow(res.data))
}

export const selectSocial = state => state.social

export default socialSlice.reducer