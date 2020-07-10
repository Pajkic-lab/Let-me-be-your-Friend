import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const profileSlice = createSlice({
    name: 'profile',
    initialState:  {
        id: null,
        name: null,
        avatar: null,
        status: null,
        loading: true,
        err: null,
        search: [],
        guestProfile: null
    },
    reducers: {
        handleCreateProfile: (state, action) => {
            const {id, name, status, avatar} = action.payload
            return { ...state, id: id, name: name, avatar: avatar, status: status, loading: false }
        },
        handleGetProfile: (state, action) => {
            const {id, name, status, avatar} = action.payload
            return { ...state, id: id, name: name, avatar: avatar, status: status, loading: false }
        },
        handleRemoveProfile: (state) => {
            return { ...state, id: null, name: null, avatar: null, status: null,
                 err: null, search: null, guestProfile: null, loading: true }
        },
        handleError: (state, action) => {
            const err = action.payload
            return { ...state, err: err, loading: false }
        },
        handleEditProfile: (state, action) => {
            const {id, name, status, avatar} = action.payload
            return { ...state, id: id, name: name, avatar: avatar, status: status, loading: false }
        },
        handleSearch: (state, action) => {
            const searchResult = action.payload
            return { ...state, search: searchResult }
        },
        handleGuestProfile: (state, action) => {
            const guestProfile = action.payload
            return { ...state, guestProfile: guestProfile }
        }
    }
})

export const { handleCreateProfile, handleGetProfile, handleRemoveProfile,
     handleError, handleEditProfile, handleSearch, handleGuestProfile } = profileSlice.actions

export const createProfile = ({email, name, status, avatar}) => async dispatch => {
    try {
        const res = await axios.post('/profile', {email, name, status, avatar})
        dispatch(handleCreateProfile(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const getProfile = () => async dispatch => {
    try {
        const res = await axios.get('/profile')
        dispatch(handleGetProfile(res.data))
    } catch (err) {
        const error = err.response.data.error
        dispatch(handleError(error))
    }
}

export const removeProfile = () => dispatch => {
    dispatch(handleRemoveProfile())
}

export const editProfile = ({name, status, avatar}) => async dispatch => {
    const res = await axios.put('/profile', {name, status, avatar})
    dispatch(handleEditProfile(res.data))
}

export const findProfile = search => async dispatch => {
    const res = await axios.post('/search', {search})
    dispatch(handleSearch(res.data))
}

export const getGuestProfile = (guestProfile_id) => async dispatch => {
    try {
        const res = await axios.post('/profile/contact', {guestProfile_id})
        dispatch(handleGuestProfile(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const selectProfile = state => state.profile

export default profileSlice.reducer

