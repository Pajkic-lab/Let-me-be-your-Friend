import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { getUser, selectUser, remove } from '../features/user/userSlice'

const Profile = () => {

    const dispatch = useDispatch()

    const{ user } = useSelector(selectUser)

    useEffect(()=>{
        dispatch(getUser())
    }, [])

    return (
        <div>
            { user ?
             <Fragment>
                 {user.image && <img  src={user.image} alt='' style={{width: '100px', height:'100px'}}></img>}
                 <h2>{user.name}</h2> 
                 <h3>{user.email}</h3> 
             </Fragment> : 
             <Fragment></Fragment>
            }

            <button onClick={()=>dispatch(remove())}>LogOut</button>

        </div>
    )
}

export default Profile
