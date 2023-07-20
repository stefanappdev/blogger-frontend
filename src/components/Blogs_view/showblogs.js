import { Button } from '@mui/material';
import React,{useState,useEffect} from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom';
import { UseAuth } from '../protected_view/Auth';
 function Showblogs() {

  const navigate=useNavigate();
  const [blogs,setblogs]=useState([]);
  const [message,setmessage]=useState();
  const [Status,setStatus]=useState();
  const Auth=UseAuth();

  const fetchBlogs=async(api)=>
  {await fetch(api,{
    method:'GET', 
    'Content-Type':'application/json',
  })
  .then(resp=> resp.json())
  .then(data=>{
    
    setblogs(data);
  })
  }

  useEffect(()=>{
     fetchBlogs(`${process.env.REACT_APP_SERVER_URL}/blogs`)
  .catch(err=>{
    console.log('Something went wrong',err.message)
  })
  },[])


  /*const deleteAllBlogs=async()=>{
    try{
      fetch(`${process.env.REACT_APP_SERVER_URL}/blogs`,{
        method:'DELETE', 
        'Content-Type':'application/json',
      })
      .then(resp=>{
        
        setStatus(resp.status);
      })
      
        delay();
      
    }
    catch(err){
      console.log('Something went wrong',err.message)
    }
  }

  const delay=()=>{
    if(Status===200){

      setmessage(" All Blogs Deleted,Redirecting to blogs page...")
      setTimeout(()=>{
      
      navigate('/blogs/view')
    },5000)

  }else if (Status===404){
    setmessage("Something went wrong,Redirecting to blogs page...")
    setTimeout(()=>{
    navigate('/blogs/view')
  },5000)

}}*/


  const userblogs=blogs.filter((blog)=>blog._id_User===Auth.User._id_User)
  
  
  const blog=userblogs.map((blog)=>{

      let blogUrl=`/blogs/details/${blog._id}`


          return <div className='content-box'>
          <Link key={blog._id} to={blogUrl}>
            
            <div className='blog-card'>
            
            <h1>{blog.title}</h1>
            <p>{blog.body}</p>
            

          </div>
          </Link>

          <br/>
        <br/>
        
        </div>
        
        } )
    
         

    return(<div>
          <div>{userblogs.length===0?"No blogs yet":blog}</div>
        </div>)
    
}

export default Showblogs