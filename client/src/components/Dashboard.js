import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../features/user/userSlice'
import { getProfile } from '../features/profile/profileSlice'
import Profile from './Profile'
import { getSocNum } from '../features/social/socialSlice'

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
        </div>
    )
}

export default Dashboard


