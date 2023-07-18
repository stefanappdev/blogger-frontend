
import React,{ useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import {v4} from 'uuid';

import '../../src/styles/forms.css';
import '../../src/styles/signup.css';

function Signup(){
  const navigate=useNavigate();
  const[formdata,setFormData]=useState({Password:'',_id_User:v4(),Username:'',isRegistered:true});
  const[message,setmessage]=useState(false);

  

  const handleChange=(e)=>{
    setFormData({...formdata,[e.target.name]:e.target.value});
  }

  
  

  const handleSubmit=(e)=>{

    e.preventDefault();
    let url=`${process.env.REACT_APP_SERVER_URL}/users`;
    //validation goes here
    /* */

       try{ 
       fetch(url,{method:'POST',headers: {
           'Content-Type': 'application/json;charset=utf-8'
       },
       body:JSON.stringify(formdata)
    })
       .then(resp=>resp.json())
       .then(result=>{console.log(result)
       
       });
      

       }
       
       catch(err){
           console.log('Something went wrong',err.message)
   }

    setmessage('User registered successfully...redirecting to home page');
    setTimeout(()=>{
      navigate('/');
    },5000)
    
  }
  
  return(
      <div className='content-box'>

          <h1>Signup Here</h1>

        <form className='forms' onSubmit={handleSubmit} >
            <div className='form-group-container'>
            <label>Username:
                
               

                <input
                className='form-group'
                type="text" 
                name="Username" 
                id="Username"
                value={formdata.Username} 
                onChange={handleChange} 
                placeholder="Enter your username" 

                
              />
            </label>

            <div id='username_message' className='message'></div>
            <label>Password:
            <input
                className='form-group'
                id='Password'
                name='Password'
                type="password" 
                value={formdata.Password} 
                placeholder='Enter your Password' 
                onChange={handleChange}
                />




            </label>

            <div id='password_message' className='message'></div>
           
            

            <Button  className='form-group' color='primary'  variant='contained' type='submit'>submit</Button>

            </div>
            
        </form>
        <br/>
        <br/>

        <div>{message}</div>

        </div>

    )
}


export default Signup