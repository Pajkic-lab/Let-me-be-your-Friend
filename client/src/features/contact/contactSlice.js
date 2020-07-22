import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const contactSlice = createSlice({
    name: 'contact',
    initialState:{
        loading: true,
        guestProfile: null,
        guestPosts: []
    },
    reducers: {
        handleGuestProfile: (state, action) => {
            const guestProfile = action.payload
            return { ...state, guestProfile: guestProfile, loading: false }
        },
        handleRemoveGuestProfile: state => {
            return { ...state, guestProfile: null, guestPosts: [], loading: true }
        },
        handleContactPosts: (state, action) => {
            return { ...state, guestPosts: state.guestPosts.concat(action.payload)}
        }
    }
})

export const { handleGuestProfile, handleRemoveGuestProfile, handleContactPosts } = contactSlice.actions

export const getGuestProfile = (guestProfile_id) => async dispatch => {
    try {
        const res = await axios.post('/profile/contact', {guestProfile_id})
        dispatch(handleGuestProfile(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const removeGuestProfile = () => dispatch => {
    dispatch(handleRemoveGuestProfile())
}

export const getContactPosts = ({guestProfile_id, start, count}) => async dispatch => {
    try {
        const res = await axios.post('/post/contact', {guestProfile_id, start, count})
        dispatch(handleContactPosts(res.data))
    } catch (err) {
        console.log(err)
    }
}


export const selectContact = state => state.contact

export default contactSlice.reducer