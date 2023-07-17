import React,{useState,useContext} from 'react'
import '../../styles/login.css'
import {UseAuth} from './Auth';
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom'
function Login() {
  const Auth=UseAuth();
  const navigate=useNavigate()
  const[formdata,setformdata]=useState({User:null,Password:null});
  
 function handleLogin(){
  validate(formdata)
  
}

function handleLogout(){
  Auth.logout()
  navigate('/')
}


const handleChange=(event)=>{
  setformdata({...formdata,[event.target.name]:event.target.value})
}

const validate=(formdata)=>{
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
  Auth.login(formdata.User)
  navigate('/')
  }
}


  return (
  
        
       <div className="login">
          <h1>Login page</h1> 

          
          {!Auth.isloggedin?<div>
           
            <form>

            <div id='username-container'>
   
              <label for='User'>Username:</label>

              <input id='username' 
              className="login-elements" 
              type='text'  
              placeholder='enter a username' 
              name='User' 
              onChange={handleChange}
              value={formdata.User} 
              />
               
              <div id='username_message'></div>

            </div>

            <div id='password-container'>

                <label for='password'>Password:</label>

                <input id='password' 
                className="login-elements" 
                type='password' 
                placeholder='enter a password' 
                name='Password' 
                onChange={handleChange} 
                value={formdata.Password}/>

                <div id='password_message'></div>
            </div>

                 <br/>

                <div>
                    <Button variant={'contained'}  onClick={handleLogin}>Login</Button>
                </div>
            </form>


         
          </div>:null}


          <br/>

          <div>
          {Auth.isloggedin&&<Button   variant={'contained'}  onClick={handleLogout}>Logout?</Button>}
          </div>


          <br/>
          <br/>
          <br/>

          <div>
          <Button   variant={'contained'}  onClick={()=>navigate(-1)}>Go Back</Button>
          </div>


        </div> 
  
  )
}

export default Login