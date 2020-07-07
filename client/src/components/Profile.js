import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { selectUser, remove } from '../features/user/userSlice'
const isImageUrl = require('is-image-url')

const Profile = () => {

    const{ user } = useSelector(selectUser)
    const avatarGoogle = user.image? (user.image) : ('')
    const avatarGeneric = 'https://w0.pngwave.com/png/613/636/computer-icons-user-profile-male-avatar-avatar-png-clip-art.png'

    const [formData, setFormData] = useState({
        name: '',
        avatar: `${avatarGoogle}`,
        status: ''
    })

    const { name, avatar, status } = formData

    const dispatch = useDispatch()

    const onChange = e => {setFormData({
        ...formData, [e.target.name]: e.target.value
    })}

    const onSubmit = e => {
        e.preventDefault()
        if(avatar === '' || isImageUrl(avatar) === false) {
            //dispatch(createProfile({name, status, avatarGeneric}))
        } else {
            //dispatch(createProfile({name, status, avatar}))
        }
    }

    return (
        <div>
            { !user ?  //profile? (profile) : (create profile)
             <Fragment>
                 {user.image && <img  src={user.image} alt='' style={{height:'100px'}}></img>}
                 <h2>{user.name}</h2> 
                 <h3>{user.email}</h3> 
                 <form>
                     <input placeholder='find your friend by email' />
                     <button>Search</button>
                 </form> <br/>
             </Fragment> : 
             <Fragment>
                 <h1>Create profile</h1>
                 <form onSubmit={onSubmit}>
                     <p>few words about yourself XD</p> <br/>
                     <input onChange={onChange} name='name' value={name} placeholder='dispaly name' required /> <br/>
                     <input onChange={onChange} name='avatar' value={avatar} placeholder='link of image of your avatar' /> <br/>
                     <input onChange={onChange} name='status' value={status} placeholder='status' /> <br/>
                     <button>Submit</button>
                 </form> <br/>
                 { avatar!==''? (<img alt='' src={avatar} style={{width: '400px', height:'400px'}}></img>): ('')} <br/>
                 <h2>{name}</h2>
                 <p>{status}</p>
                <br/> <br/>
             </Fragment>
            }

            <button onClick={()=>dispatch(remove())}>LogOut</button>
            <hr/>

        </div>
    )
}

export default Profile

/*
    profile: {
        name: '',
        avatar: '',
        status: ''
    }

    { image!==''? (<img alt='' src={image} style={{width: '100', height:'100'}}></img>): ('')}
*/

//  user    name    avatar    status    ||    id    user    folowing\number   ||    id    user    followers\number
