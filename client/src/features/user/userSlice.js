import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const userSlice = createSlice({
    name: 'user',
    initialState:  {
        user: null,
        isAuthenticated: false,
        error: null
    },
    reducers: {
        handleRegister: (state, action) => {
            const { name, email, id, googleId, image } = action.payload
            return { ...state, isAuthenticated: true, user: { id, name, email, googleId, image } }
        },
        handleLogin: (state, action) => {
            const { name, email, id, googleId, image } = action.payload
            return { ...state, isAuthenticated: true, user: { id, name, email, googleId, image } }
        },
        handleLogout: (state, action) => {
            return { ...state, isAuthenticated: false, user: null }
        },
        handleGetuser: (state, action) => {
            const { name, email, id, googleId, image } = action.payload
            return { ...state, isAuthenticated: true, user: { id, name, email, googleId, image } }
        },
        handleError: (state, action) => {
            const err = action.payload
            return { ...state, error: err }
        },
        handleRemoveError: (state) => {
            return { ...state, error: null }
        }
    }
})

export const { handleRegister, handleLogin, handleLogout, handleGetuser, handleError, handleRemoveError } = userSlice.actions 

export const reg = ({name, email, password}) => async dispatch => {
    try {
        const res = await axios.post('/user', {name, email, password} )
        dispatch(handleRegister(res.data))
    } catch (err) {
        const error = err.response.data.error
        dispatch(handleError(error))
    }
}

export const log = ({email, password}) => async dispatch => {
    try {
        const res = await axios.post('/auth', {email, password})
        dispatch(handleLogin(res.data))
    } catch (err) {
        const error = err.response.data.error
        dispatch(handleError(error))
    }
}

export const remove = () => async dispatch => {
    try {
        const res = await axios.delete('/auth')
        dispatch(handleLogout(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const getUser = () => async dispatch => {
    try {
        const res = await axios.get('/getuser')
        dispatch(handleGetuser(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const removeErr = () => dispatch => {
    dispatch(handleRemoveError())
}


export const selectUser = state => state.user

export default userSlice.reducer