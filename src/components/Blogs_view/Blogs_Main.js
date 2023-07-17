
import React, { useEffect,useState } from 'react'
import { Link,Outlet,useNavigate} from 'react-router-dom';
import { Button,AppBar,Toolbar,Typography,Box } from '@mui/material';
import { UseAuth } from '../protected_view/Auth';
import '../../styles/App.css'
function Blogs_Main() {
  const navigate=useNavigate();
  const Auth=UseAuth();


  return (
    <div className='content-box'>
   
    <nav>
      <ul className='blog-nav'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blogs/create">Create Blog</Link></li>
        <li><Link to="/blogs/view">View Blogs</Link></li>
        <li><Link to="/login">{!Auth.isloggedin?'login':'logout'}</Link></li>
      </ul>
    </nav>
    <hr />

  



    <br/>
    <br/>


    
    

   
   <Outlet/>
   <br/>
   <hr />
  
    <div className='blog-back-button'>
    <Button variant='contained' onClick={()=>navigate(-1)}>go back</Button>
    </div>
    


    </div>
  )
}

export default Blogs_Main