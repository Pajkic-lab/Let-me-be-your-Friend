import React from 'react'
import CreatePost from './CreatePost'
import PostList from './PostList'
import { useSelector } from 'react-redux'
import { selectProfile } from '../features/profile/profileSlice'

const PostDashboard = () => {


    const { id } = useSelector(selectProfile)

    return (
        <div>
            { id === null ? ('') : (
            <CreatePost />
            )}
            <PostList />
        </div>
    )
}

export default PostDashboard
