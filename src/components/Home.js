import React from 'react'
import '../styles/Home.css'
import '../styles/App.css'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate=useNavigate();
  return (
    <div className='content-box home-content'>
      
      
        <h1>Welcome Home</h1>


      <div className='img-container'>

          <img
          src='/images/Blogging.jpg'
          alt='blogger home image'
          className='blogging-img'
          />
     
      
      
    </div>  

    <br/>
      
    <Button variant='contained' onClick={()=> navigate('/blogs/create')}>get Started Blogging</Button>

    </div>
  )
}
