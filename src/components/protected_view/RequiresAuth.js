import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UseAuth } from './Auth'

function RequiresAuth({children}) {
    const navigate=useNavigate()
    const Auth=UseAuth()

    if (!Auth.User){
        navigate('/login')
    }
    else{
        return children
    
    }


  
}

export default RequiresAuth