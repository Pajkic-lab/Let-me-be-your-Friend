import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { selectUser, remove } from '../features/user/userSlice'
import { createProfile, selectProfile, removeProfile, editProfile, findProfile, removeSearch } from '../features/profile/profileSlice'
import { Link } from 'react-router-dom'
import { selectContact, removeGuestProfile } from '../features/contact/contactSlice'
const isImageUrl = require('is-image-url')
const spiner = require ('../spiner.gif')



const Profile = () => {

    const dispatch = useDispatch()

    const profile = useSelector(selectProfile)
    const searchResult = profile.search

    const { user } = useSelector(selectUser)
    const { email } = user 

    const { guestProfile } =useSelector(selectContact)
    if ( guestProfile !== null) {
        dispatch(removeGuestProfile())
    }
    
    const avatarGeneric = user.image? (user.image) :
    ('https://w0.pngwave.com/png/613/636/computer-icons-user-profile-male-avatar-avatar-png-clip-art.png') //generic avatar

    const [formData, setFormData] = useState({
        name: '',
        avatar: `${avatarGeneric}`,
        status: '',
        switcher: false,
        search: ''
    })

    const { name, avatar, status, switcher, search } = formData

    const onChange = e => {setFormData({
        ...formData, [e.target.name]: e.target.value
    })}

    const onSubmit = e => {
        e.preventDefault()
        if(avatar === '' || isImageUrl(avatar) === false) {
            dispatch(createProfile({email, name, status,
                 avatar:'https://w0.pngwave.com/png/613/636/computer-icons-user-profile-male-avatar-avatar-png-clip-art.png'
                }))  //generic avatar
            //mozda kasnije napisem toast
        } else {
            dispatch(createProfile({email, name, status, avatar}))
        }
        setFormData({...formData, name: '', avatar: '', status: '' })
    }

    const onEdit = e => {
        e.preventDefault()
        if(avatar === '' || isImageUrl(avatar) === false) {
            dispatch(editProfile({name, status,
                 avatar:'https://w0.pngwave.com/png/613/636/computer-icons-user-profile-male-avatar-avatar-png-clip-art.png'
                })) 
        } else {
            dispatch(editProfile({name, status, avatar}))
        }
        setFormData({ ...formData, name: '', avatar: '', status: '', switcher: false })
    }

    const onSearch = e => {
        e.preventDefault()
        dispatch(findProfile(search))
        setFormData({ ...formData, search: '' })
    }

    return (
        <div>
            { profile.loading===true ? (<img src={spiner} alt="loading..." />) : ( 
                profile.id !== null ?   (<Fragment>  
                 {profile.avatar && <img  src={profile.avatar} alt='' style={{height:'100px'}}></img>}
                 <h2>{profile.name}</h2> 
                 <h3>{profile.status}</h3> 
                 <button onClick={()=>{setFormData({ ...formData, switcher: !switcher })}}>Edit profile</button>
                 { switcher===true? ( <>
                     <form onSubmit={onEdit} >
                     <p>Edit profile</p> <br/>
                     <input onChange={onChange} name='name' value={name} placeholder='dispaly name' required /> <br/>
                     <input onChange={onChange} name='avatar' value={avatar} placeholder='link of image of your avatar' /> <br/>
                     <input onChange={onChange} name='status' value={status} placeholder='status' /> <br/>
                     <button>Submit</button>
                 </form> 
                 { avatar!==''? (<img alt='' src={avatar} style={{width: '400px', height:'400px'}}></img>): ('')} <br/>
                 <p>{name}</p>
                 <p>{status}</p>
                 </>
                 ) : (
                     <>
                    <br/>
                    <form>
                        <input onChange={onChange} name='search' value={search} placeholder='find your friend by email' required />
                        <button onClick={onSearch}>Search</button>
                    </form> <br/>

                    <>
                        { searchResult && searchResult.map(guestProfile=>  
                        <div key={guestProfile.id}><Link to={`/contact/${guestProfile.user_id}`} onClick={()=>dispatch(removeSearch())}>
                            <img src={guestProfile.avatar} alt='' style={{width: '50px', height:'50px'}}></img>
                            <p>{guestProfile.name}</p>
                            <p>{guestProfile.email}</p> </Link>
                        </div>
                        
                        )}
                    </>
                    </>
                 )}
                 
             </Fragment>) :     
             (<Fragment>
                 <h1>Hello {user.name} Create profile</h1>
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
             </Fragment>)
            )}

            <button onClick={()=>{
                dispatch(remove())
                dispatch(removeProfile())
                }}>LogOut</button>
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
