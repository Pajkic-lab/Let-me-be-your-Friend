import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../features/post/postSlice'
import { selectProfile } from '../features/profile/profileSlice'
const isImageUrl = require('is-image-url')

const CreatePost = () => {

    const [formData, setFormData] = useState({
        text: '',
        image: ''
    })

    const { text, image } = formData

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
            <h2>Create Post</h2>
            <form onSubmit={onSubmit}>
            <input onChange={onChange} value={text} name='text' placeholder='post' required /><br/>
            <input onChange={onChange} value={image} name='image' placeholder='image' /><br/>
            <button>Submit post</button>
            </form>
            {image === null? ('') : (<img alt='' src={image} style={{width: '300px', height:'400px'}} />)}
        </div>
    )
}

export default CreatePost
