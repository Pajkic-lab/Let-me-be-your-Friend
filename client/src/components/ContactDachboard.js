import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { withRouter } from "react-router"
import { getGuestProfile, selectContact } from '../features/contact/contactSlice'
const spiner = require ('../spiner.gif')


const Contact = ({match}) => {

    const {guestProfile_id} = match.params

    const dispatch = useDispatch()

    const contact = useSelector(selectContact)
    const { guestProfile, loading } = contact
    
    useEffect (()=>{
            dispatch(getGuestProfile(guestProfile_id))
        // eslint-disable-next-line
    },[])
    useEffect (()=>{
        if(guestProfile === null){
            dispatch(getGuestProfile(guestProfile_id))
        }
    // eslint-disable-next-line
    },[])

    return(
        <Fragment>
           {loading===true? (<img src={spiner} alt="loading..." />) : (
               <>
               <h2>{guestProfile.name}</h2>
               <p>{guestProfile.email}</p>
               <p>{guestProfile.status}</p>
               <img alt='' src={guestProfile.avatar} style={{width: '200px', height:'200px'}}></img>
               </>
           )}
        </Fragment>
    )
    
}

export default Contact
