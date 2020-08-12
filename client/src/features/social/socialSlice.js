import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const socialSlice = createSlice({
    name: 'social',
    initialState:{
        isLoading: true,
        following: false,
        followingNumber: null,
        followersNumber: null,
        contactFollowingNumber: null,
        contactFollowersNumber: null
    },
    reducers: {
        handleFollow: (state, action)=> {
            return { ...state, following: action.payload,
                 contactFollowersNumber: state.contactFollowersNumber + 1, isLoading: false }
        },
        handleGetFollow: (state, action)=> {
            return { ...state, following: action.payload, isLoading: false }
        },
        handleUnFollow: (state, action)=> {
            return { ...state, following: action.payload,
                 contactFollowersNumber: state.contactFollowersNumber - 1, isLoading: false }
        },
        handleGetSocNum: (state, action)=> {
            const {followingNumber, followersNumber} = action.payload
            return{ ...state, followingNumber: followingNumber,
                 followersNumber: followersNumber, isLoading: false }
        },
        handleRemoveSocial: state => {
            return{ ...state, isLoading: true, following: false, followingNumber: null,
                 followersNumber: null, contactFollowingNumber: null, contactFollowersNumber: null }
        },
        handleGetGuestSocNum : (state, action)=> {
            const {ContactfollowingNumber, ContactfollowersNumber} = action.payload
            return { ...state, contactFollowingNumber: ContactfollowingNumber,
                 contactFollowersNumber: ContactfollowersNumber, isLoading: false }
        }
    }
})

export const { handleFollow, handleGetFollow, handleUnFollow, handleGetSocNum,
     handleRemoveSocial, handleGetGuestSocNum } = socialSlice.actions

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

export const getGuestSocNum = guestProfile_id => async dispatch => {
    const res = await axios.post('/social/getguestnumber', {guestProfile_id})
    dispatch(handleGetGuestSocNum(res.data))
}

export const selectSocial = state => state.social

export default socialSlice.reducer