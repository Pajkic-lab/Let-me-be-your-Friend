import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const userSlice = createSlice({
    name: 'user',
    initialState:  {
        user: null,
        isAuthenticated: false
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
        }
    }
})

export const { handleRegister, handleLogin, handleLogout, handleGetuser } = userSlice.actions 

export const reg = ({name, email, password}) => async dispatch => {
    try {
        const res = await axios.post('/user', {name, email, password} )
        dispatch(handleRegister(res.data))
    } catch (error) {
        console.log(error)   
    }
}

export const log = ({email, password}) => async dispatch => {
    try {
        const res = await axios.post('/auth', {email, password})
        dispatch(handleLogin(res.data))
    } catch (err) {
        console.log(err)
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
        //console.log(res.data)
    } catch (err) {
        console.log(err)
    }
}

export const selectUser = state => state.user

export default userSlice.reducer