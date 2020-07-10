import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGuestProfile, selectProfile } from '../features/profile/profileSlice'


const Contact = ({match}) => {

    const guestProfile_id = match.params.guestProfile_id

    const dispatch = useDispatch()

    const profile = useSelector(selectProfile)
    const { guestProfile } = profile
    console.log(guestProfile)
    
    useEffect (()=>{
        dispatch(getGuestProfile(guestProfile_id))
        // eslint-disable-next-line
    },[])

    return(
        <Fragment>
            <h1>{guestProfile && guestProfile.name}</h1>
        </Fragment>
    )
    
}

export default Contact
