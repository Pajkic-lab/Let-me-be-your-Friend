import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGuestProfile, selectContact } from '../features/contact/contactSlice'
import { selectSocial, follow, getFollow, unFollow, getGuestSocNum } from '../features/social/socialSlice'
import { Link } from 'react-router-dom'
const spiner = require ('../spiner.gif')


const Contact = ({match}) => {

    const {guestProfile_id} = match.params

    const dispatch = useDispatch()

    const social = useSelector(selectSocial)
    const { isLoading, following, contactFollowingNumber, contactFollowersNumber } = social

    const contact = useSelector(selectContact)
    const { guestProfile, loading } = contact
    
    useEffect (()=>{
            dispatch(getGuestProfile(guestProfile_id))
            dispatch(getFollow(guestProfile_id))
            dispatch(getGuestSocNum(guestProfile_id))
        // eslint-disable-next-line
    },[])
    

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
        </Fragment>
    )
    
}

export default Contact
