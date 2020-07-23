import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPost, deletePost, getPosts, likePost } from '../features/post/postSlice'
import { selectUser } from '../features/user/userSlice'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import { removeGuestProfile } from '../features/contact/contactSlice'


const PostList = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(selectUser)
    const { id } = user 

    const post = useSelector(selectPost)
    const { posts, profiles } = post

    const [data, setData] = useState({
        start: 0,
        count: 10
    })

    const {start, count} = data

    //const posts_ids = posts.map(post=> post.id)

    useEffect(()=>{
        dispatch(getPosts({start, count}))
        setData({ ...data, start: start + count })
        dispatch(removeGuestProfile())
        // eslint-disable-next-line
    }, [])

    const getDataScroll = async() => {
        setData({ ...data, start: start + count })     
        dispatch(getPosts({start, count}))  
    }

    /*useEffect(()=>{
        //dispatch(getLikes(posts_ids)) //ddddddddddddddddddddddddddddddddddd
        // eslint-disable-next-line
    },[posts_ids])*/

    return (
        <Fragment>
            <InfiniteScroll
            dataLength={posts.length}
            next={()=>{getDataScroll()}}
            hasMore={true}
            loader={<p>...</p>}
            >
            {posts && posts.map(postEl=> <div key={postEl.id}>
                { profiles && profiles.filter(profile=> profile.user_id === postEl.user_id).map(prof=> 
                <div key={uuidv4()}> 
                { id===prof.user_id? (
                    <>
                    <p>{prof.name}</p>
                    <img alt='' src={prof.avatar} style={{width: '100px', height:'100px'}}></img>
                    </>
                ) : (
                    <Link to={`/contact/${prof.user_id}`}>
                    <p>{prof.name}</p>
                    <img alt='' src={prof.avatar} style={{width: '100px', height:'100px'}}></img>
                    </Link>
                ) }
                </div>
                ) }
                <p>{postEl.text}</p>
                <p>{postEl.created_at}</p>
                {postEl.image !== null? (
                    <img alt='' src={postEl.image} style={{width: '200px', height:'300px'}}></img>
                ):('')}
                <br/>
                <span>number off likes:</span> <br/>
                <button onClick={()=>dispatch(likePost(postEl.id))}>like</button>
                {/*dispatch(getLike(postEl.id))*/}
                { id === postEl.user_id?
                 (<button onClick={()=>{dispatch(deletePost(postEl.id))}}>Remove post</button>) : ('') }
                <hr/>
            </div>)}
            </InfiniteScroll>
        </Fragment>
    )
}

export default PostList