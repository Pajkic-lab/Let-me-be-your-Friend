import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '../features/user/userSlice'
import { getProfile } from '../features/profile/profileSlice'

import Profile from './Profile'

const Dashboard = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getUser())
        dispatch(getProfile())
        // eslint-disable-next-line
    },[])

    return (
        <div>
            <Profile />
        </div>
    )
}

export default Dashboard


