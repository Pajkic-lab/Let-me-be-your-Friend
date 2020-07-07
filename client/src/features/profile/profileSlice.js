import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const profileSlice = createSlice({
    name: 'profile',
    initialState:  {
        name: null,
        avatar: null,
        status: null
    },
    reducers: {}
})

export default profileSlice.reducer