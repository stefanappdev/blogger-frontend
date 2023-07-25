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
  const [message,setmessage]=useState();
  
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
      let message=document.getElementById('message');
      message.setAttribute('class','success');
      setmessage('User logged in successfully');
      Auth.login(targetUser.Username);
      setTimeout(()=>{
        navigate('/')
      },5000)
      
    }
    const falseactions=()=>{ 
      Auth.setisRegistered(false);
      let message=document.getElementById('message');
      message.setAttribute('class','errors');
      setmessage('incorrect username or password');
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
          <div id='message'>{message}</div>
          <br/>
          <br/>

          <div>
          <Button   variant={'contained'}  onClick={()=>navigate(-1)}>Go Back</Button>
          </div>


        </div> 
  
  )
}

export default Login