import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPost, deletePost } from '../features/post/postSlice'

const PostList = () => {

    const dispatch = useDispatch()

    const post = useSelector(selectPost)
    const { posts } = post

    return (
        <Fragment>
            {posts.map(postEl=> <div key={postEl.id}>
                <p>{postEl.text}</p>
                <p>{postEl.created_at}</p>
                {postEl.image !== null? (
                    <img alt='' src={postEl.image} style={{width: '200px', height:'300px'}}></img>
                ):('')}
                <br/>
                <button onClick={()=>{dispatch(deletePost(postEl.id))}}>Remove post</button>
                <hr/>
            </div>)}
        </Fragment>
    )
}

export default PostList
