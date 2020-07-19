import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPost, deletePost, getPosts } from '../features/post/postSlice'
import { selectUser } from '../features/user/userSlice'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const PostList = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(selectUser)
    const { id } = user 

    const post = useSelector(selectPost)
    const { posts, profiles } = post

    const [data, setData] = useState({
        start: 1,
        count: 10
    })

    let {start, count} = data

    useEffect(()=>{
        dispatch(getPosts({start, count}))
        // eslint-disable-next-line
    }, [])

    const fetchData = () => {
        setData({ start: start + count }) //does not work
        console.log(count, start)
        dispatch(getPosts({start, count}))
    }

    return (
        <Fragment>
            <InfiniteScroll
            dataLength={posts.length}
            next={()=>{fetchData()}}
            hasMore={true}
            loader={<p>Loading...</p>}
            >
            {posts && posts.map(postEl=> <div key={postEl.id}>
                { profiles.filter(profile=> profile.user_id === postEl.user_id).map(prof=> 
                <div key={prof.id}>
                <p>{prof.name}</p>
                <img alt='' src={prof.avatar} style={{width: '100px', height:'100px'}}></img>
                </div>
                )}
                <p>{postEl.text}</p>
                <p>{postEl.created_at}</p>
                {postEl.image !== null? (
                    <img alt='' src={postEl.image} style={{width: '200px', height:'300px'}}></img>
                ):('')}
                <br/>
                { id === postEl.user_id?
                 (<button onClick={()=>{dispatch(deletePost(postEl.id))}}>Remove post</button>) : ('') }
                <hr/>
            </div>)}
            </InfiniteScroll>
        </Fragment>
    )
}

export default PostList