import React, { useEffect } from 'react'

import '../CSS/postList.css'
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

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

var dateFormat = require('dateformat')



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
        <div className='post-list'>
            <InfiniteScroll
            dataLength={posts.length}
            next={()=>{getDataScroll()}}
            hasMore={true}
            loader={<p>...</p>}
            >
            {posts && posts.map(postEl=>
            <div className={postEl.image? ('post-img') : ('post')} key={postEl.id} > 
                <div onClick={()=>{
                    open_coment(postEl.id)
                    }}>
                { profiles && profiles.filter(profile=> profile.user_id === postEl.user_id).map(prof=> 
                <div key={uuidv4()}> 
                { id===prof.user_id? (
                    <div className={postEl.image? ('profile-post-img') : ('profile-post')}>
                    <img alt='' src={prof.avatar}></img>
                    <p>{prof.name}</p>
                    </div>  
                ) : (
                    <div className={postEl.image? ('profile-post-img') : ('profile-post')}>
                    <Link to={`/contact/${prof.user_id}`}>
                    <img alt='' src={prof.avatar} ></img>
                    <p>{prof.name}</p>
                    </Link>
                    </div>
                ) }
                </div>
                ) }
                
                {postEl.image !== null? (
                    <img className={postEl.image? ('image') : ('')} alt='' src={postEl.image}></img>
                ):('')}
                <br/><br/>
                <p className="date">{dateFormat(postEl.created_at, "mmmm dS yyyy h:MM")}</p><br/>
                <p className="post-text">{postEl.text}</p>
                
                <br/>
                </div>
             
                { id === postEl.user_id?
                 (<>
                 <span className={postEl.image? ('span-image') : ('span-')}  onClick={()=>{dispatch(deletePost(postEl.id))}}>
                     <CloseIcon style={{fontSize: 30}} />
                 </span> <br/>
                </>) : ('') }

                {coments_open.find(el=> el===postEl.id)? (
                <div>
                    <form onSubmit={e=>{
                        e.preventDefault()
                        dispatch(addComment(comment, postEl.id))
                        setFormData({...formData, comment: ''})
                    }}>
                        <TextField variant="outlined" onChange={onChange} value={comment} name='comment' label='comment' required /> <br/><br/>
                        <span className="add-comment-icon" >
                            <AddIcon style={{fontSize: 30}} onClick={e=>{
                        e.preventDefault()
                        dispatch(addComment(comment, postEl.id))
                        setFormData({...formData, comment: ''})
                    }} />
                        </span><br/><br/>
                    </form>



                                    <CommentList post_id={postEl.id}/>


                </div>
                ) : ('')}
                <div className="bottom-separation-line"></div>
            </div>
            )}
            </InfiniteScroll>
        </div>
    )
}

export default PostList