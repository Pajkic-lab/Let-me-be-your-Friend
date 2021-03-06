import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '../features/user/userSlice'
import { getProfile } from '../features/profile/profileSlice'
import Profile from './Profile'
import { getSocNum } from '../features/social/socialSlice'
import PostDashboard from './PostDashboard'

const Dashboard = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getUser())
        dispatch(getProfile())
        dispatch(getSocNum())
        // eslint-disable-next-line
    },[])

    return (
        <div>
            <Profile />
            <PostDashboard />
        </div>
    )
}

export default Dashboard


