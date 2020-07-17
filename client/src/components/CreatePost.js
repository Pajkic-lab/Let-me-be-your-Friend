import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPost } from '../features/post/postSlice'
const isImageUrl = require('is-image-url')

const CreatePost = () => {

    const [formData, setFormData] = useState({
        text: '',
        image: ''
    })

    const { text, image } = formData

    const dispatch = useDispatch()

    const onChange = e => {setFormData({
        ...formData, [e.target.name]: e.target.value
    })}

    const onSubmit = e => {
        e.preventDefault()
        if(isImageUrl(image) === false) {
            window.alert('Your post image URL is not valid!')
        } else {
            dispatch(createPost({text, image}))
        }
        setFormData({ ...formData, text: '', image: '' })
    }

    return (
        <Fragment>
            <h2>Create Post</h2>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={text} name='text' placeholder='post' required /><br/>
                <input onChange={onChange} value={image} name='image' placeholder='image' /><br/>
                <button>Submit post</button>
            </form>
            {image === null? ('') : (<img alt='' src={image} style={{width: '300px', height:'400px'}} />)}
        </Fragment>
    )
}

export default CreatePost
