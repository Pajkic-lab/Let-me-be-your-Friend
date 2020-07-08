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
        err: null
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
            return { ...state, id: null, name: null, avatar: null, status: null, loading: true }
        },

        handleError: (state, action) => {
            const err = action.payload
            return { ...state, err: err, loading: false }
        },

        handleEditProfile: (state, action) => {
            const {id, name, status, avatar} = action.payload
            return { ...state, id: id, name: name, avatar: avatar, status: status, loading: false }
        }
    }
})

export const { handleCreateProfile, handleGetProfile, handleRemoveProfile, handleError, handleEditProfile } = profileSlice.actions

export const createProfile = ({name, status, avatar}) => async dispatch => {
    try {
        const res = await axios.post('/profile', {name, status, avatar})
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

export const selectProfile = state => state.profile

export default profileSlice.reducer

/*
{
[0]   id: 1,
[0]   name: 'Marko Pajkic',
[0]   status: 'developing',
[0]   avatar: 'https://worlddatingguides.com/wp-content/uploads/2019/10/meet-single-girls-near-you-belgrade-get-laid-nightclubs-bars.jpg'
[0] }
 */