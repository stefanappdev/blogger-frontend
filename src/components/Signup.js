
import React,{ useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import {v4} from 'uuid';
import FrontendSignupValidation from './protected_view/validations/SignupValidation';

import '../../src/styles/forms.css';
import '../../src/styles/signup.css';

function Signup(){
  const navigate=useNavigate();
  const[formdata,setFormData]=useState({Password:'',_id_User:v4(),Username:'',isRegistered:true});
  const [err,seterr]=useState(null);
  const[message,setmessage]=useState(false);

  

  const handleChange=(e)=>{
    setFormData({...formdata,[e.target.name]:e.target.value});
  }

  const submitdata=()=>{

    let url=`${process.env.REACT_APP_SERVER_URL}/users`;

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


    const Errors=({feedback})=>{
        let password_message=document.getElementById('password_message');
        let username_message=document.getElementById('username_message');

        let errors=null
        seterr(feedback)

        errors=err==='Username must be at least 8 characters'?
        username_message.textContent=err:"";

        errors=err==='Password must be at least 8 characters'?
        password_message.textContent=err :"";

        errors=err==='Username is a required field'?
        username_message.textContent=err :"";


        errors=err==='Password is a required field'?
        password_message.textContent=err :"";

      

    }



  
  

  const handleSubmit=(e)=>{

    e.preventDefault();
   
    //validation goes here
    
     let validate=FrontendSignupValidation(formdata.Username,formdata.Password);
     if(validate.status===true){
       submitdata();
     }
     else{
       Errors(validate)
       setmessage('Invalid input...try again');
     }


    }
  
  return(
      <div className='content-box'>

          <h1>Signup Here</h1>

        <form className='forms' onSubmit={handleSubmit} >
            <div className='form-group-container'>

                <label for='Username'>Username:</label>
               
                <input
                className='form-group'
                type="text" 
                name="Username" 
                id="Username"
                value={formdata.Username} 
                onChange={handleChange} 
                placeholder="Enter your username"  
              />
          
            <div id='username_message' className='errors'></div>
            

              <label for='Password'>Password: </label>

              <input
                  className='form-group'
                  id='Password'
                  name='Password'
                  type="password" 
                  value={formdata.Password} 
                  placeholder='Enter your Password' 
                  onChange={handleChange}
                  />

              <div id='password_message' className='errors'></div>
           
            

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