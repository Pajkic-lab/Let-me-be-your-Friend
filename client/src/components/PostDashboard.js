import React from 'react'
import { useSelector } from 'react-redux'
import { selectPost } from '../features/post/postSlice'
import CreatePost from './CreatePost'
import PostList from './PostList'
const spiner = require ('../spiner.gif')

const PostDashboard = () => {

    const post = useSelector(selectPost)
    const { loading } = post

    return (
        <div>
            <CreatePost />
            <PostList />
            { loading===true? (<img src={spiner} alt="loading..." />) :
             ('') }
        </div>
    )
}

export default PostDashboard
