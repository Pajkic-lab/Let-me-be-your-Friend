import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reg, log, selectUser,  getUser, removeErr } from '../features/user/userSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


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

    const swop = () => {setFormData({...formData, switcher: !switcher })}

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
        setTimeout(()=> { dispatch(removeErr()) }, 500);
    }

    return (
        <div>
            <ToastContainer />
            { switcher===true? (
            <Fragment>
            <h1>LOGIN</h1> <br/> <br/>
            <a href="https://probamoheroku2.herokuapp.com/auth/google">GOOGLE</a>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} placeholder='email' name='email' value={email} required /><br/>
                <input onChange={onChange} placeholder='password' name='password' value={password} required /><br/> <br/>
                <button>LOGIN</button>
            </form>
            </Fragment>) :

            (
            <Fragment>
            <h1>REGISTER</h1> <br/> <br/>
            <a  href="http://localhost:5000/auth/google">GOOGLE</a>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} placeholder='name' name='name' value={name} required /><br/>
                <input onChange={onChange} placeholder='email' name='email' value={email} required /><br/>
                <input onChange={onChange} placeholder='password' name='password' value={password} required /><br/>
                <input onChange={onChange} placeholder='pleas repeat password' name='passwordRep' value={passwordRep} required /><br/> <br/>
                <button>REGISTER</button>
            </form>
            </Fragment>)}

            <br/><br/>
            {switcher===true? 'Need new account?' : 'Alredy have account?'}<br/>
            <button onClick={swop}>{switcher===true? 'REGISTER':'LOGIN'}</button>
        </div>
    )
}

export default LandingPage



