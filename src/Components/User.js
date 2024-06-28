import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';



const User = () => {
const navigate= useNavigate();
const handleChange = () => {
 navigate('/reset');
}

  return (
    <div>
     <Navbar/>
    </div>
  )
}

export default User
