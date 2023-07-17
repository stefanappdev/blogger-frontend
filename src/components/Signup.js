import React,{useState} from 'react'
import { UseAuth } from './protected_view/Auth'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import "../styles/signup.css"
 const Signup = () => {
    const Auth=UseAuth();
    const navigate=useNavigate();
    const[formdata,setformdata]=useState({User:null,Password:null});


    const handleChange=(event)=>{
        setformdata(prevformdata=>{
                return{
                    ...prevformdata,[event.target.name]:event.target.value
                }})
        }

    const HandleSignup=()=>{
        Validate(formdata)
    }

    const Validate=(formdata)=>{
        if(formdata.User===null||formdata.User.length===0){
      
          let username_message=document.getElementById('username_message')
          username_message.setAttribute('class','error')
          username_message.textContent='A username is required'
        }
      
        else if(formdata.Password===null||formdata.Password.length===0){
          let password_message=document.getElementById('password_message')
          password_message.setAttribute('class','error')
          password_message.textContent='A password is required'
        }
      
        else{
            /*code to connect to backend will go here */ 
        navigate('/')
        }
      }



  return (
    <React.Fragment>
     

        <form className='signup-form'>
            <h1 className='signup-elements'>Signup Page</h1>

            <div className='signup-elements' id='username-container'>
                <label for='User'>Username:</label>
                
                <input id='username' name='User'
                 value={formdata.User} 
                 className='signup-elements'
                 type="text" 
                 onChange={handleChange}
                 />

                <div id='username_message'></div>
            </div>


            <div className='signup-elements' id='password-container'>
                <label for='Password'>Password:</label>
                
                <input 
                id='password' 
                name='Password' 
                value={formdata.Password} 
                type="password"
                className='signup-elements'  
                onChange={handleChange}
                />

                <div id='password_message'></div>
            </div>

            <div className='signup-elements'>
            <Button variant='contained'    onClick={HandleSignup} color='primary'>Signup</Button>
            </div>

        </form>




    </React.Fragment>
  )
}


export default Signup