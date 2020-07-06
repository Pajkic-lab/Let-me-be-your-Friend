import React, { Fragment } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { selectUser, remove } from '../features/user/userSlice'

const Profile = () => {

    const dispatch = useDispatch()

    const{ user } = useSelector(selectUser)

    return (
        <div>
            { user ?
             <Fragment>
                 {user.image && <img  src={user.image} alt='' style={{width: '100px', height:'100px'}}></img>}
                 <h2>{user.name}</h2> 
                 <h3>{user.email}</h3> 
             </Fragment> : 
             <Fragment>
                 <h1>Something went wrong !!!</h1>
             </Fragment>
            }

            <button onClick={()=>dispatch(remove())}>LogOut</button>
            <hr/>

        </div>
    )
}

export default Profile
