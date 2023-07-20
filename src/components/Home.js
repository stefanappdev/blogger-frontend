import React, {useState,useEffect,useContext} from 'react'
import '../styles/Home.css'
import '../styles/App.css'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { UseAuth } from './protected_view/Auth'
export default function Home() {

const Auth=UseAuth();

  const navigate=useNavigate();
  return (
    <div className='content-box home-content'>
      
      
        <h1>{Auth.Username?`Welcome ${Auth.Username}`:'Welcome Guest'}</h1>

       

      <div className='img-container'>

          <img
          src='/images/Blogging.jpg'
          alt='blogger home image'
          className='blogging-img'
          />
     
      
      
    </div>  

    <br/>
      
    <Button variant='contained' onClick={()=>Auth.User?navigate('/blogs/create'):navigate('/login')}>get Started Blogging</Button>

    </div>
  )
}
