import React, { useEffect, useState } from 'react'

import '../CSS/contactDashboard.css'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Button } from '@material-ui/core';

import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { getGuestProfile, selectContact, getContactPosts } from '../features/contact/contactSlice'
import { selectSocial, follow, getFollow, unFollow, getGuestSocNum } from '../features/social/socialSlice'
import { Link } from 'react-router-dom'
import { removePostsProfiles } from '../features/post/postSlice'
import { resetComment, selectComment } from '../features/comment/commentSlice'

const spiner = require ('../spiner.gif')
var dateFormat = require('dateformat')




const Contact = ({match}) => {

    const {guestProfile_id} = match.params

    const dispatch = useDispatch()

    const social = useSelector(selectSocial)
    const { isLoading, following, contactFollowingNumber, contactFollowersNumber } = social

    const contact = useSelector(selectContact)
    const { guestProfile, loading, guestPosts } = contact

    const comment = useSelector(selectComment)
    const { comments} = comment

    const [data, setData] = useState({
        start: 0,
        count: 10
    })

    const {start, count} = data
    
    useEffect (()=>{
            dispatch(getGuestProfile(guestProfile_id))
            dispatch(getFollow(guestProfile_id))
            dispatch(getGuestSocNum(guestProfile_id))
            dispatch(removePostsProfiles())
            dispatch(getContactPosts({guestProfile_id, start, count}))
            setData({ ...data, start: start + count })
        // eslint-disable-next-line
    },[])

    useEffect (()=> {
        if(comments.length>0){
            dispatch(resetComment())
        }
        // eslint-disable-next-line
    }, [comments])

    const getDataScroll = async() => {
        setData({ ...data, start: start + count })     
        dispatch(getContactPosts({guestProfile_id, start, count}))  
    }
    

    return(
        <>
        <div className="contact-profile">
           {loading===true? (<img src={spiner} alt="loading..." />) : (
               <>
               <Link to='/dashboard'><span className="arrow"><ArrowBackIosIcon /></span></Link>
               <img className="contact-image" alt='' src={guestProfile.avatar}></img> <br/>
               <h2>{guestProfile.name}</h2>
               <p>{guestProfile.status}</p>
               { isLoading===true? ('') : (
                   <div className="s2">
                   <span>following: {contactFollowingNumber} </span>
                   <span>followers: {contactFollowersNumber} </span> <br/>
                   </div>
               )}

               { isLoading===true? ('') : (
                <>
                   { following===true?
                    (<Button className="follow-btn" variant="contained" onClick={()=>{
                        dispatch(unFollow(guestProfile_id))
                        dispatch(getGuestSocNum(guestProfile_id))
                    }}>unFollow</Button>) :
                    (<Button className="follow-btn" variant="contained" color="primary" onClick={()=>{
                        dispatch(follow(guestProfile_id))
                        dispatch(getGuestSocNum(guestProfile_id))
                        }}>follow</Button>)}
                </>
               )}
               </>
           )}
           </div>

           {loading===true? ('') : (
               <div className="post-list">
                <InfiniteScroll
                    dataLength={guestPosts.length}
                    next={()=>{getDataScroll()}}
                    hasMore={true}
                    loader={<p>...</p>}
                >
                {guestPosts && guestPosts.map(post=>
                     <div className={ post.image? ("contact-post-img") : ('contact-post') } key={post.id}>
                {post.image !== null? (
                     <img className={post.image? ('contact-post-image') : ('')} alt='' src={post.image}></img>
                 ):('')}
                 <br/><br/><br/>
                 <p className="date">{dateFormat(post.created_at, "mmmm dS yyyy h:MM")}</p><br/>
                 <p className="post-text">{post.text}</p> <br/><br/>
                 <div className="bottom-separation-line"></div>
                </div>
                )}
                </InfiniteScroll>
               </div>
           )}
           
        </>
    )
    
}

export default Contact
