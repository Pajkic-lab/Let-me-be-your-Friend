import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const socialSlice = createSlice({
    name: 'social',
    initialState:{
        isLoading: true,
        following: false,
        followingNumber: null,
        followersNumber: null
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
        },
        handleGetSocNum: (state, action)=> {
            const {followingNumber, followersNumber} = action.payload
            return{ ...state, followingNumber, followersNumber, isLoading: false }
        },
        handleRemoveSocial: state => {
            return{ ...state, isLoading: true, following: false, followingNumber: null, followersNumber: null }
        }
    }
})

export const { handleFollow, handleGetFollow, handleUnFollow, handleGetSocNum, handleRemoveSocial } = socialSlice.actions

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

export const getSocNum = () => async dispatch => {
    const res = await axios.get('/social/getnumber')
    dispatch(handleGetSocNum(res.data))
}

export const removeSocial = () => dispatch => {
    dispatch(handleRemoveSocial())
}

export const selectSocial = state => state.social

export default socialSlice.reducer