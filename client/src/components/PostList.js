import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPost, deletePost, getPosts } from '../features/post/postSlice'
import { selectUser } from '../features/user/userSlice'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import { removeGuestProfile } from '../features/contact/contactSlice'
import { addComment, getComment, removeComment } from '../features/comment/commentSlice'
import CommentList from './CommentList'


const PostList = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(selectUser)
    const { id } = user 

    const post = useSelector(selectPost)
    const { posts, profiles } = post

    const [data, setData] = useState({
        start: 0,
        count: 10,
        coments_open: []
    })

    const [formData, setFormData]= useState({
        comment: ''
    })

    const {comment} = formData

    const {start, count, coments_open} = data

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

    const open_coment = (id) => {
        if(coments_open.find(el=> el===id)!==id) {
            setData({...data, coments_open: coments_open.concat(id)})
            dispatch(getComment(id))
        } else {
            setData({...data, coments_open: coments_open.filter(el=> el!==id)})
            dispatch(removeComment(id)) 
        }
    }

    const onChange = e => {setFormData({
        ...formData, [e.target.name]: e.target.value
    })}



    return (
        <Fragment>
            <InfiniteScroll
            dataLength={posts.length}
            next={()=>{getDataScroll()}}
            hasMore={true}
            loader={<p>...</p>}
            >
            {posts && posts.map(postEl=> <div key={postEl.id} >
                <div onClick={()=>{
                    open_coment(postEl.id)
                    }}>
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
                </div>
             
                { id === postEl.user_id?
                 (<><button onClick={()=>{dispatch(deletePost(postEl.id))}}>Remove post</button> <br/></>) : ('') }

                {coments_open.find(el=> el===postEl.id)? (
                <Fragment>
                    <span>Create comment</span>
                    <form onSubmit={e=>{
                        e.preventDefault()
                        dispatch(addComment(comment, postEl.id))
                        setFormData({...formData, comment: ''})
                    }}>
                        <input onChange={onChange} value={comment} name='comment' placeholder='comment' required /> <br/>
                        <button>create comment</button>
                    </form>



                                    <CommentList post_id={postEl.id}/>



                </Fragment>
                ) : ('')}
                <hr/>
            </div>)}
            </InfiniteScroll>
        </Fragment>
    )
}

export default PostList