import React, { useState } from 'react'

import '../CSS/createPost.css'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../features/post/postSlice'
import { selectProfile } from '../features/profile/profileSlice'
const isImageUrl = require('is-image-url')

const CreatePost = () => {

    const [formData, setFormData] = useState({
        text: '',
        image: '',
        switcher: false
    })

    const { text, image, switcher } = formData

    const dispatch = useDispatch()

    const { profile } = useSelector(selectProfile)
    profile && console.log(profile)

    const onChange = e => {setFormData({
        ...formData, [e.target.name]: e.target.value
    })}

    const onSubmit = e => {
        e.preventDefault()
        if (isImageUrl(image) === false) {
            if (image === '') {} else window.alert('Your post image URL is not valid!')
        } if (image === '') {
            dispatch(createPost({text, image}))
        } else {
            dispatch(createPost({text, image}))
        }
        setFormData({ ...formData, text: '', image: '' })
    }

    return (
        <div className='create-post'>
            {switcher===false? (
            <span onClick={()=>{setFormData({...formData, switcher: !switcher})}}>
                <AddIcon style={{fontSize: 80}} />
            </span> 
            ) : (
            <span onClick={()=>{setFormData({...formData, switcher: !switcher})}}>
                <CloseIcon style={{fontSize: 80}} /> <br/><br/><br/>
            </span> 
            )}
        {switcher===false? ('') : (
            <>
            <h2>Create Post</h2><br/>
            <form onSubmit={onSubmit}>
            <TextField onChange={onChange} variant="outlined" value={text} name='text' label='post' required /><br/><br/>
            <TextField onChange={onChange} variant="outlined" value={image} name='image' label='img-link' /><br/><br/>
            <Button type="submit" variant="contained" color="primary">Post</Button>
            </form><br/>
            {image === null? ('') : (<img alt='' src={image} style={{width: '300px', height:'400px'}} />)}<br/><br/>
            </>
        )}
        </div>
    )
}

export default CreatePost
