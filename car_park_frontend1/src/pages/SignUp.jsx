import React,{useState,useContext} from 'react'
import img from '../assets/register-bg.jpg'

import { Link, json, useNavigate } from 'react-router-dom'
import HostContext from '../context/HostContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { Auth } from 'firebase/auth'
import {auth} from "../firebase"

const SignUp = () => {
    const {host} = useContext(HostContext);
    const navigate = useNavigate();
   
   
    const [credentials,setCredentials] = useState({name:'',email:'',password:'',confirmPassword:''});

    const onchange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }

    const onsubmit=async(e)=>{
        e.preventDefault();
        // navigate('/home');
        if(credentials.password!==credentials.confirmPassword){
            alert('Passwords do not Match!');
            setCredentials({...credentials,password:'',confirmPassword:''})
            return;
        }

        const res = await createUserWithEmailAndPassword(auth,credentials.email,credentials.password);
        console.log(res);
        const user = res.user;

        localStorage.setItem("token",user.accessToken);
        localStorage.setItem("user",JSON.stringify(user));
       
        
        setCredentials({name:'',email:'',password:'',confirmPassword:''})
        navigate('/');
    }

  return (
    <div className='h-[120vh] md:h-[100vh] w-[100%] relative bg-[#2A4D77]'>
        <img src={img} alt="" className='absolute h-[120vh] md:h-[100vh] w-[100%] object-cover top-0 left-0'/>

        <div className='absolute text-white left-[5%] md:left-[10%] top-[2%] md:top-[10%] w-[40%]'>
            <h1 className='text-[50px] md:text-[80px] font-bold' >ParkIt</h1>
            <p className='hidden md:block text-2xl font-semibold'>Hop on board! Sign up now for seamless rides and friendly journeys.</p>
        </div>
        <form className='p-8 w-[90%] md:w-[30%] bg-white rounded-xl z-50 absolute  left-[50%] translate-x-[-50%] md:left-auto md:translate-x-[0%] md:right-[10%] top-[52%] md:top-[50%] translate-y-[-50%]' onSubmit={onsubmit}>

            <h2 className='font-bold text-3xl'>Register Today</h2>
            <p className='mb-8 mt-2 text-gray-500 font-semibold'>Welcome to the Parking Stop Detecttion App!</p>

            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Name</label>
                <input type="text" name='name' value={credentials.name} placeholder='John Doe' className='w-full p-2 outline-none rounded-xl border-gray-500 border-2' onChange={onchange} required/>
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Email</label>
                <input type="email" name='email' value={credentials.email} placeholder='username@gmail.com' className='w-full p-2 outline-none rounded-xl border-gray-500 border-2' onChange={onchange} required/>
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Password</label>
                <input type="password" name='password' value={credentials.password} placeholder='**********' className='w-full p-2 outline-none rounded-xl border-gray-500 border-2' onChange={onchange} required/>
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Confirm Password</label>
                <input type="password" name='confirmPassword' value={credentials.confirmPassword} placeholder='**********' className='w-full p-2 outline-none rounded-xl border-gray-500 border-2' onChange={onchange} required/>
            </div>

            <button className='bg-[#214264] hover:bg-[#19314a] cursor-pointer text-white py-2 text-lg w-full rounded-xl mt-6' type='submit'>Register</button>
            <p className='mt-2 text-center'> Already Registered? <Link to='/' className='font-semibold'>Login here</Link> </p>
        </form>
    </div>
  )
}

export default SignUp