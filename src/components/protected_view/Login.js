import React,{useState,useContext,useEffect} from 'react'
import '../../styles/login.css'
import {UseAuth} from '../protected_view/Auth';
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom'

function Login() {
  const Auth=UseAuth();
  const navigate=useNavigate()
  const[formdata,setformdata]=useState({Username:null,Password:null});
  const[Users,setUsers]=useState([]);
  
  async function  FetchUsers(url){
    
    await fetch (url,{method:"GET"})
    .then(res=>res.json())
    .then(users=>{
      //console.log(users);
      setUsers(users);
      //console.log(Users)
      
    })
    .catch(err=>{
      console.log(err.message)
      })
    }
  
    useEffect(()=>{
      FetchUsers(`${process.env.REACT_APP_SERVER_URL}/users`)
      .catch(err=>{
        console.log(err.message)
      })
    },[])


 function Handlelogin(event){

  event.preventDefault();



  const targetUser=Users.find(user=>user.Username===formdata.Username);
  if(targetUser){
    
    const trueactions=()=>{ 
      Auth.setisRegistered(true);
      Auth.setUser(targetUser);
      console.log('User logged in successfully');
      Auth.login(targetUser.Username);
      navigate('/')
    }
    const falseactions=()=>{ 
      Auth.setisRegistered(false);
      console.log('incorrect username or password');
    }
    
    targetUser.Password===formdata.Password?
     trueactions (): falseactions();
      
  }

  else{
    console.log('Unable to find user');
  }
  
  
  


}

function Handlelogout(){
  Auth.logout()
  navigate('/')
}


const Handlechange=(event)=>{
  setformdata({...formdata,[event.target.name]:event.target.value})
}

const validate=(formdata)=>{
  if(formdata.Username===null||formdata.User.length===0){

    let username_message=document.getElementById('username_message')
    username_message.setAttribute('class','error')
    username_message.textContent='A username is required'
  }

  else if(formdata.Password===null||formdata.Password.length===0){
    let password_message=document.getElementById('password_message')
    password_message.setAttribute('class','error')
    password_message.textContent='A password is required'
  }

  
  
}


  return (
  
        
       <div className="login">
          <h1>Login page</h1> 

          
          {!Auth.isloggedin?<div>
           
            <form onSubmit={Handlelogin}  >

            <div id='username-container'>
   
              <label for='User'>Username:</label>

              <input id='Username' 
              className="login-elements" 
              type='text'  
              placeholder='enter a username' 
              name='Username' 
              onChange={Handlechange}
              value={formdata.Username} 
              />
               
              <div id='username_message'></div>

            </div>

            <div id='password-container'>

                <label for='Password'>Password:</label>

                <input id='Password' 
                className="login-elements" 
                type='password' 
                placeholder='enter a password' 
                name='Password' 
                onChange={Handlechange} 
                value={formdata.Password}/>

                <div id='password_message'></div>
            </div>

                 <br/>

                <div>
                    <Button variant={'contained'} color='primary' type='submit' >Login</Button>
                </div>
            </form>


         
          </div>:null}


          <br/>

          <div>
          {Auth.isloggedin&&<Button   variant={'contained'}  onClick={Handlelogout}>Logout?</Button>}
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