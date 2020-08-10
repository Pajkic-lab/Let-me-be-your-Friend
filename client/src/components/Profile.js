import React, { useState } from 'react'

import '../CSS/createProfile.css'
import '../CSS/profileMain.css'
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Modal from 'react-modal';

import { useDispatch, useSelector  } from 'react-redux'
import { selectUser, remove } from '../features/user/userSlice'
import { createProfile, selectProfile, removeProfile, editProfile, findProfile, removeSearch } from '../features/profile/profileSlice'
import { Link } from 'react-router-dom'
import { selectContact, removeGuestProfile } from '../features/contact/contactSlice'
import { selectSocial, removeSocial } from '../features/social/socialSlice'
import { removePostsProfiles } from '../features/post/postSlice'
import { resetComment } from '../features/comment/commentSlice'
const isImageUrl = require('is-image-url')
const spiner = require ('../spiner.gif')




const Profile = () => { 

    const dispatch = useDispatch()

    const social = useSelector(selectSocial)
    const { isLoading, followingNumber, followersNumber} = social

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
        switcherEdit: false,
        search: ''
    })

    const { name, avatar, status, switcherEdit, search } = formData

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

    Modal.setAppElement('#root')
    return (
        <div>
            { profile.loading===true ? (<img src={spiner} alt="loading..." />) : ( 
                profile.id !== null ?   (<div className="profile-main">  
                    <div className='logo'>
                        <h1>Friends</h1>
                    </div>
                 <div className="profile-data">
                 {profile.avatar && <img className="main-avatar"  src={profile.avatar} alt=''></img> }
                 <br/><br/>
                 <h2>{profile.name}</h2> 
                 <h3>{profile.status}</h3> {
                     isLoading===true? ('Loading...') : (
                         <div className="s1">
                        <span>following: {followingNumber} </span>
                        <span> followers: {followersNumber} </span> <br/>
                        </div>
                     )}
                </div>
                <div className="top-right-corner">
                    <form onSubmit={onSearch}>
                        <TextField size="small" onChange={onChange} name='search' value={search} placeholder='your friends email' required />
                        <span className="search-button" onClick={onSearch} ><SearchIcon /></span>
                    </form> 
                 <span className="edit-button" onClick={()=>{setFormData({ ...formData, switcherEdit: !switcherEdit })}}>
                     <AddIcon />
                </span>
                <span className="exit-button" onClick={()=>{
                    dispatch(remove())
                    dispatch(removeProfile())
                    dispatch(removeSocial())
                    dispatch(removePostsProfiles())
                    dispatch(resetComment())
                }}><CloseIcon /></span>
                </div>
                

                 <Modal
                    isOpen={switcherEdit}
                    onRequestClose={()=>{setFormData({ ...formData, switcherEdit: !switcherEdit })}}
                    style={
                        {
                            overlay: {
                                background: 'linear-gradient(to bottom, #f0f0f0, #ccc9de, #a8a4cd, #8281bb, #5a5faa, 0.900)' 
                            },
                            content : {
                                top: '45%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)'
                              }
                        }
                    }
                 >
                     <div className='edit-profile'>
                     <span className="exit-button" onClick={()=>{setFormData({ ...formData, switcherEdit: !switcherEdit })}}><CloseIcon /></span>
                     <form onSubmit={onEdit} > <br/>
                     <h2>Edit profile</h2> <br/><br/>
                     <TextField onChange={onChange} variant="outlined" name='name' value={name} placeholder='dispaly name' required /> <br/><br/>
                     <TextField onChange={onChange} variant="outlined" name='avatar' value={avatar} placeholder='link of image of your avatar' /> <br/><br/>
                     <TextField onChange={onChange} variant="outlined" name='status' value={status} placeholder='status' /> <br/><br/>
                     <Button type="submit" variant="contained" color="primary">Submit</Button><br/><br/>
                    </form> 
                 { avatar!==''? (<img alt='' src={avatar} style={{width: '300px', height:'300px'}}></img>): ('')} <br/>
                    </div>
                 </Modal>

                    <>

                    { searchResult !==null? ( 
                        <Modal
                        isOpen={true}
                        onRequestClose={()=>dispatch(removeSearch())}
                        style={
                            {
                                overlay: {
                                    background: 'linear-gradient(to bottom, #f0f0f0, #ccc9de, #a8a4cd, #8281bb, #5a5faa, 0.900)' 
                                },
                                content : {
                                    top: '45%',
                                    left: '50%',
                                    right: 'auto',
                                    bottom: 'auto',
                                    marginRight: '-50%',
                                    transform: 'translate(-50%, -50%)'
                                  }
                            }
                        }
                        >
                        <div className="search-container">
                        <span className="exit-button" onClick={()=>dispatch(removeSearch())}>
                            <CloseIcon />
                        </span><br/><br/>
                        { searchResult && searchResult.map(guestProfile=>  
                        <div className="search-guest-profile" key={guestProfile.id}><Link
                         to={`/contact/${guestProfile.user_id}`}
                         onClick={()=>dispatch(removeSearch())}> 
                            <img src={guestProfile.avatar} alt=''></img>
                            <p>{guestProfile.name}</p>
                            <p>{guestProfile.email}</p> </Link>
                        </div>
                        )}
                        </div>
                        </Modal>
                    ) : ('')}

                    </>
                 </div>
                 
             ) :     
             (<div className="create-profile-container">
                 <h1>Hello {user.name} Create profile</h1> <br/> 
                 <form onSubmit={onSubmit}> <br/>
                     <p>few words about yourself XD</p> <br/><br/>
                     <TextField onChange={onChange} name='name' value={name} placeholder='dispaly name' required /> <br/>
                     <TextField onChange={onChange} name='avatar' value={avatar} placeholder='link of image of your avatar' /> <br/>
                     <TextField onChange={onChange} name='status' value={status} placeholder='status' /> <br/> <br/>
                     <Button type="submit" variant="contained" color="primary">Submit</Button>
                 </form> <br/><br/>
                 { avatar!==''? (<img alt='' src={avatar}></img>): ('')} <br/><br/>
                 <h2>{name}</h2>
                 <p>{status}</p>
                <br/> <br/>

                <Button variant="contained" color="default" onClick={()=>{
                dispatch(remove())
                dispatch(removeProfile())
                dispatch(removeSocial())
                dispatch(removePostsProfiles())
                dispatch(resetComment())
                }}>LogOut</Button>

             </div>)
            )}
    
        </div>
    )
}

export default Profile