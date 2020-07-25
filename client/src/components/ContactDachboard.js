import React, { useEffect, Fragment, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { getGuestProfile, selectContact, getContactPosts } from '../features/contact/contactSlice'
import { selectSocial, follow, getFollow, unFollow, getGuestSocNum } from '../features/social/socialSlice'
import { Link } from 'react-router-dom'
import { removePostsProfiles } from '../features/post/postSlice'
import { resetComment } from '../features/comment/commentSlice'
const spiner = require ('../spiner.gif')




const Contact = ({match}) => {

    const {guestProfile_id} = match.params

    const dispatch = useDispatch()

    const social = useSelector(selectSocial)
    const { isLoading, following, contactFollowingNumber, contactFollowersNumber } = social

    const contact = useSelector(selectContact)
    const { guestProfile, loading, guestPosts } = contact

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
            dispatch(resetComment())
            setData({ ...data, start: start + count })
        // eslint-disable-next-line
    },[])

    const getDataScroll = async() => {
        setData({ ...data, start: start + count })     
        dispatch(getContactPosts({guestProfile_id, start, count}))  
    }
    

    return(
        <Fragment>
            <Link to='/dashboard'><h2>go Back</h2></Link>
           {loading===true? (<img src={spiner} alt="loading..." />) : (
               <>
               <img alt='' src={guestProfile.avatar} style={{width: '200px', height:'200px'}}></img> <br/>
               <h2>{guestProfile.name}</h2>
               <p>{guestProfile.email}</p>
               <p>{guestProfile.status}</p>
               { isLoading===true? (<span>Loading...</span>) : (
                   <>
                   <span>following: {contactFollowingNumber} </span>
                   <span>followers: {contactFollowersNumber} </span> <br/>
                   </>
               )}

               { isLoading===true? (<span>Loading...</span>) : (
                <>
                   { following===true?
                    (<button onClick={()=>{
                        dispatch(unFollow(guestProfile_id))
                        dispatch(getGuestSocNum(guestProfile_id))
                    }}>unFollow</button>) :
                    (<button onClick={()=>{
                        dispatch(follow(guestProfile_id))
                        dispatch(getGuestSocNum(guestProfile_id))
                        }}>follow</button>)}
                </>
               )}
               </>
           )}
           <hr/>

           {loading===true? (<img src={spiner} alt="loading..." />) : (
               <Fragment>
                   <InfiniteScroll
                    dataLength={guestPosts.length}
                    next={()=>{getDataScroll()}}
                    hasMore={true}
                    loader={<p>...</p>}
                >
                {guestPosts && guestPosts.map(post=> <div key={post.id}>
                <p>{post.text}</p>
                <p>{post.created_at}</p>
                {post.image !== null? (
                     <img alt='' src={post.image} style={{width: '200px', height:'300px'}}></img>
                 ):('')}
                 <hr/>
                </div>
                )}
                </InfiniteScroll>
               </Fragment>
           )}
           
        </Fragment>
    )
    
}

export default Contact
