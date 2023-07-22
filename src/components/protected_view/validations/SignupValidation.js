import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'

function FrontendSignupValidation(Uname,Pword,Users) {
  
  

    const CheckifUserExists=(Username,Users)=>{

      let msg=''
      
      const Result=Users.find(user=>user.Username===Username)
      return Result||Username.length===0?true:false
      
    }

     const ValidateUser=(Username,Password)=>{

           //checks for blank username and password
      
          let msg=""

          if(Username.length===0){
            msg="Username is a required field"
            return {status:false,feedback:msg} 
        }

          if(Password.length===0){
            msg="Password is a required field"
            return {status:false,feedback:msg}
          } 

          if ((Username.length===0&&Password.length===0)){
            return {status:false,feedback:''} 
          }


            //checks if new password and username are both less than 8 characters
          if ((Username.length>0&&Password.length>0)){
                let msg=""

                if (Username.length>=8&&Password.length<8){
                  msg="Password must be at least 8 characters"
                  return {status:false,feedback:msg} 
                }

                else if (Username.length<8&&Password.length>=8){
                  msg="Username must be at least 8 characters"
                  return {status:false,feedback:msg} 
                }

                else if (Username.length<8&&Password.length<8){
                  return {status:false,feedback:""}

                } 
                
                else{
                  return {feedback:"",status:true} 
                }
                
              }
            //creates new user if username and password are valid
            
             
        }
  
    if(CheckifUserExists(Uname,Users)){
      return{status:false,feedback:"Username is unavailable"}
    }
    
    return ValidateUser(Uname,Pword)
}

export default FrontendSignupValidation