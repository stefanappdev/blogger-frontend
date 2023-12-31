
import React,{ useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { UseAuth } from '../protected_view/Auth';
import { TextField } from '@mui/material';
import '../../styles/forms.css';

function Createblog(){
  const Auth=UseAuth();
  const navigate=useNavigate();
  const[formdata,setFormData]=useState({title:'',snippet:'',body:'',_id_User:Auth.User._id_User});
  const[validate,setValidate]=useState(false);
  const[message,setmessage]=useState(false);
  

  const handleChange=(e)=>{
    setFormData({...formdata,[e.target.name]:e.target.value});
  }

  const validateForm=()=>{
    if (formdata.title === '' || formdata.snippet === '' || formdata.body === '') {
      setValidate(false);
      alert('Please fill all fields');
      return false;

    }
    else{
      setValidate(true);
      return true;
    }
  }

  const handleSubmit=(e)=>{

    e.preventDefault();
    let url=`${process.env.REACT_APP_SERVER_URL}/blogs`;
    const data=formdata

      if (validateForm()){
      
       try{ 
       fetch(url,{method:'POST',headers: {
           'Content-Type': 'application/json;charset=utf-8'
       },
       body:JSON.stringify(data)
    })
       .then(resp=>resp.json())
       .then(result=>console.log(result));
       }catch(err){
           console.log('Something went wrong',err.message)
    }

    setmessage('Blog created successfully...redirecting to blogs page');
    setTimeout(()=>{
      navigate('/blogs/view');
    },5000)
    
    
  }
     

     }
    return(
      <div className='content-box'>

          <h1>Create a new blog</h1>

        <form className='forms' onSubmit={handleSubmit} >
            <div className='form-group-container'>
            <label>Title:
                
               

                <input
                className='form-group'
                type="text" 
                name="title" 
                id="title"
                value={formdata.title} 
                onChange={handleChange} 
                placeholder="Enter a title" 
              />

            </label>

            <label>snippet:
            <input
                className='form-group'
                id='snippet'
                name='snippet'
                type="text" 
                value={formdata.snippet} 
                placeholder='Enter a snippet' 
                onChange={handleChange}
                />

            


            </label>

            <label>
                Body:
                <textarea
              
                className='form-group'
                type="text" 
                id='body'
                name="body" 
                value={formdata.body} 
                onChange={handleChange} 
                placeholder='Enter a body' 
                />

           
            </label>

            <Button  className='form-group' color='success'  variant='contained' type='submit'>submit</Button>

            </div>
            
        </form>
        <br/>
        <br/>

        <div>{message}</div>

        </div>

    )
}


export default Createblog