import React,{useState,useRef} from 'react'
import {useParams,useNavigate, Outlet} from 'react-router-dom'
import { Button } from '@mui/material';
import '../../styles/forms.css';
function Editblog({title,snippet,body,shouldEdit,}) {
  const [Edit,setEdit]=useState(shouldEdit);  
  const {id}=useParams();
  const navigate=useNavigate();
  const[formdata,setFormData]=useState({title:title,snippet:snippet,body:body});
  const [message,setmessage]=useState();
  const inputRef=useRef();

    const handleChange=(e)=>{
        setFormData({...formdata,[e.target.name]:e.target.value});
      }
     
      const handleSubmit=(e)=>{
        e.preventDefault();
        let url=`http://localhost:5000/blogs/${id}`;
        
          
          const data=formdata
           try{ 
           fetch(url,{method:'PUT',headers: {
               'Content-Type': 'application/json;charset=utf-8'
           },
           body:JSON.stringify(data)
        })
           .then(resp=>{
                if(resp.status===200)
                {
                    
                    setmessage('Blog updated successfully...redirecting to blogs page');
                    setTimeout(()=>{
                    setEdit(false);
                    navigate(`/blogs/view`)
                    },5000)
                    
                    
                }
        })
           }catch(err){
               setmessage('Something went wrong',err.message)
        }
        
         
    
         }

         


  return (
    <div className='content-box'>
       <h1>Edit your blog</h1> 
        
        <form className='forms' onSubmit={handleSubmit} >
            <div className='form-group-container'>
            <label>Title:
                <input type="text" 
                name="title" 
                id="title"
                className='form-group'
                value={formdata.title} 
                onChange={handleChange} 
                placeholder="Enter a title" 
                ref={inputRef}
                />

            </label>

            <label>snippet:
                <input 
                id='snippet'
                className='form-group'
                type="text" 
                name="snippet" 
                value={formdata.snippet}
                ref={inputRef} 
                placeholder=' Enter a snippet' 
                onChange={handleChange}
                
                />
            </label>

            <label>
                Body:
                <input 
                type="text" 
                id='body'
                name="body" 
                value={formdata.body}
                ref={inputRef} 
                className='form-group'
                onChange={handleChange} 
                placeholder='Enter a body' 
                />
            </label>

            <Button color='success' variant='contained' className='form-group'  type='submit'>submit</Button>
            </div>
        </form>
    
        <div>{message}</div>

        <br/>
        <br/>
    </div>

  
  )
}

export default Editblog