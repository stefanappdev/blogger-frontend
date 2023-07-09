import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import Editblog from './editblog';
import '../../styles/App.css';
import '../../styles/details.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';




function Blogdetails() {

  const[shouldEdit,setshouldEdit]=useState(false);
  const [message,setmessage]=useState();
  const [Status,setStatus]=useState();
  const {id}=useParams();
  const navigate=useNavigate();
  const [blog,setblog]=useState({
    title:'',
    snippet:'',
    body:''
                         });

  let API=`https://sample-blogger-api.onrender.com/${id}`;
 
  
  const deleteblog=async()=>{
    try{
      fetch(API,{
        method:'DELETE', 
        'Content-Type':'application/json',
      })
      .then(resp=>{
        resp.status()
        setStatus(resp.status())
      })
      
        delay();
      
    }
    catch(err){
      console.log('Something went wrong',err.message)
    }
  }

  const delay=()=>{
    if(Status===200){

      setmessage("Blog Deleted,Redirecting to blogs page...")
      setTimeout(()=>{
      
      navigate('/blogs/view')
    },5000)

  }else if (Status===404){
    setmessage("Something went wrong,Redirecting to blogs page...")
    setTimeout(()=>{
    navigate('/blogs/view')
  },5000)

}}

  const fetchBlog=async(api)=>
  {
    
   let resp=await fetch(api,{
    method:'GET', 
    'Content-Type':'application/json',
  })
    
   let Data=await resp.json();

   for(let property in Data)
   {
     Data[property].toString();
   }
   


   setblog(result=>{
     return{
       title:Data.title,
       snippet:Data.snippet,
       body:Data.body
     }
     
   })
  }

  useEffect(()=>{
     fetchBlog(API)
     },[])


  const edit=()=>{
    setshouldEdit(true);   
    
  }


  return (
    
    shouldEdit===false?(<div className='blog-details-group'>

      <h1>Blog Details </h1>

      <div className='blog-details'>
        Title:{blog.title}
      </div>

      <div className='blog-details' >
        
        Body:{blog.body}

        <div className='blog-details'>{message}</div>
      
      </div>

      <DeleteIcon  variant='contained' color='error' onClick={deleteblog} />
      <EditIcon  color='primary'  onClick={edit} />

      
    </div>):(<Editblog title={blog.title} snippet={blog.snippet} body={blog.body} shouldEdit={shouldEdit}/>)
    
    )
}
 

export default Blogdetails
  