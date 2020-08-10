import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reg, log, selectUser,  getUser, removeErr } from '../features/user/userSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../CSS/landingPage.css'

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';



const LandingPage = ({history}) => {
    const [formData, setFormData] = useState({
        switcher: true,
        name: '',
        email: '',
        password: '',
        passwordRep: ''
    })

    const{switcher, name, email, password, passwordRep} = formData

    const dispatch = useDispatch()

    const swop = () => {setFormData({ ...formData, switcher: !switcher })}

    const onChange = e => {setFormData({
        ...formData, 
        [e.target.name]: e.target.value
    })}

    const onSubmit = e => {
        e.preventDefault()
        if(switcher === true ) {
            dispatch(log({email, password}))
        } else {
            if(password === passwordRep) {
                dispatch(reg({name, email, password}))
            } else {
                toast.error('password does not match')
            }
        }
        setFormData({ ...formData, name:'', email:'', password:'', passwordRep:''})
    }

    const{ isAuthenticated, error } = useSelector(selectUser)

    useEffect(()=>{
        dispatch(getUser())
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        if(isAuthenticated === true) {
            history.push('/dashboard')
        }
        // eslint-disable-next-line
    }, [isAuthenticated])

    if(error !== null) {
        toast.error(error)
        setTimeout(()=> { dispatch(removeErr()) }, 500)
    }

    return (
        <div className="landing-page-container">
            <div className="focus">
                <h1>Let me be your Friend !!!</h1>
                <h3>'cause you are awesome.</h3> 
                <p>Sign up with</p>
                <br/>
                <Button variant="contained" color="secondary" href="http://localhost:5000/auth/google">GOOGLE</Button>
            </div>
        <div className="form">
            <ToastContainer />
            { switcher===true? (
            <div className="login-page">
            <h1>Login</h1> <br/> <br/>
            <form onSubmit={onSubmit}>
                <TextField onChange={onChange} variant="outlined" name='email' value={email} required label="email" /><br/> <br/>
                <TextField onChange={onChange} variant="outlined" name='password' value={password} required label="password" /><br/> <br/>
                <Button type="submit" variant="contained" color="primary">LOGIN</Button>
            </form> 
            </div>) :

            (
            <div className="register-page">
            <h1>Register</h1> <br/> <br/>
            <form onSubmit={onSubmit}>
                <TextField onChange={onChange} variant="outlined" label='name' name='name' value={name} required /><br/> <br/>
                <TextField onChange={onChange} variant="outlined" label='email' name='email' value={email} required /><br/> <br/>
                <TextField onChange={onChange} variant="outlined" label="password" name='password' value={password} required /><br/> <br/>
                <TextField onChange={onChange} variant="outlined" label='confirm password' name='passwordRep' value={passwordRep} required /><br/> <br/>
                <Button type="submit" variant="contained" color="primary">REGISTER</Button>
            </form>
            </div>)}

                <br/><br/>
            {switcher===true? <p onClick={swop}>Need new account?</p> : <p onClick={swop}>Alredy have account?</p> }<br/> <br/> <br/> <br/>
            
            {switcher===true? <h4>Sign In with Google</h4> : <h4>Sign Up with Google</h4> } <br/>

            <Button type="submit" variant="contained" color="primary" href="http://localhost:5000/auth/google">GOOGLE</Button>
        </div>
        </div>
    )
}

//http://localhost:5000/auth/google
//https://probamoheroku2.herokuapp.com/auth/google

export default LandingPage



