import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { signOut } from 'firebase/auth';

const Navbar = ({show,setShow}) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem("token")
  

  useEffect(()=>{
    
    if(user==null || !token){
      navigate('/')
    }
    else if(user.isAdmin==true){
      setAdmin(true);
    }
  },[])

  const logout =async () =>{

    // await signOut();

    Cookies.remove('token');
    localStorage.clear();


    navigate('/');
  }

  const toggleMenu =()=>{
    console.log("clicked")
    setShow(!show);
  }
  return (
    <nav className='h-[8vh] w-full p-4 md:px-8 flex justify-between items-center bg-white'>
        <div>
            <Link to='/' className='text-2xl'>ParkIt</Link>
        </div>

        <div className='hidden md:flex gap-6  justify-between items-center'>
            
              
              <Link to="/home">Home</Link>
            
              <Link to="/detect">Detect</Link>
              
        
            <p onClick={logout} className='cursor-pointer'>Logout</p>
        </div>

        
    </nav>
  )
}

export default Navbar