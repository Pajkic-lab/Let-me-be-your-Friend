import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { remove } from '../features/user/userSlice'
import { getUser } from '../features/user/userSlice'

const Dashboard = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        //dispatch(getUser())
    }, [])
    return (
        <div>
            <Fragment>
                <button onClick={()=>dispatch(remove())}>LogOut</button>
            </Fragment>
        </div>
    )
}

export default Dashboard
