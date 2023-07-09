import React, { useEffect, useState } from 'react'

import {BrowserRouter as Router, Routes, Route,Link,useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Createblog from './components/Blogs_view/createblog';
import Blogs_Main from './components/Blogs_view/Blogs_Main';
import Showblogs from './components/Blogs_view/showblogs';
import Error404 from './components/404';
import Blogdetails from './components/Blogs_view/Blogdetails';
import './styles/App.css'
import { AppBar,Toolbar,Typography, Button, Menu, MenuItem,IconButton,Box }  from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function App() {


  const [AnchorEl,setAnchorEl]=useState();
  const navigate= useNavigate();

  const handleClick=(event)=>{
    setAnchorEl(event.currentTarget);
  }

  const handleClose=()=>{
    setAnchorEl(null);
  }

  const createblog=()=>{
      navigate('/blogs/create')
  }

  const showBlogs=()=>{
    navigate('/blogs/view')
}


  const open=()=>{Boolean(AnchorEl)};

  
  return (
    <div>

     


      
     


        <AppBar variant='contained' >
          <Toolbar>
            

            <MenuIcon 
              sx={{marginRight:'auto'}}
              id="menu-button" 
              onClick={handleClick} 
              aria-controls={open?'main-menu':'undefined'}
              aria-haspopup="true"
              aria-expanded={open?'true':'undefined'}
              />


            <Button sx={{fontWeight:'bold'}} variant='text'> <Link to="/" id='home'> Sample Blog App </Link> </Button> 
            

         
            <Menu id="main-menu" 
            anchorEl={AnchorEl} 
            open={Boolean(AnchorEl)} 
            onClose={handleClose}
            menuListProps={{'aria-labelledby':"menu-button"}}
            >

            <MenuItem onClick={createblog}>Create a blog</MenuItem>
            <MenuItem onClick={showBlogs}>see all blogs</MenuItem>


            </Menu>
            

              
            <Button sx={{marginLeft:'auto'}} variant='text'> <Link to="/" id='home'> Home</Link> </Button>  
            <Button sx={{marginLeft:'10px'}} variant='text'> <Link to="/blogs/view" id='blogs'>blogs</Link> </Button>

          
          </Toolbar>
        </AppBar>


        

          <Routes>

              <Route path="/" element={<Home/>}/>
         
              <Route path="blogs" element={<Blogs_Main/>}>
                <Route path="/blogs/create" element={<Createblog/>}/>

                <Route path="/blogs/view" element={<Showblogs/>}/>

                <Route path="/blogs/details/:id" element={<Blogdetails/>}/> 
               
                

              </Route>

              <Route path="*" element={<Error404/>}/>

        </Routes>
     
    </div>
  )
}

export default App