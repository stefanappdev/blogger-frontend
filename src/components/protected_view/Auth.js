import React,{useState,createContext,useContext} from 'react'

//global context for App

const AuthContext=createContext(null);

export const AuthProviderWrapper=({children})=>{
    const [Username,setUsername]=useState(null);
    const [User,setUser]=useState(null);
    const [isloggedin,setisloggedin]=useState(false);
    const  [isRegistered,setisRegistered]=useState(false);

    const login=(Username)=>{
        setUsername(Username)
        setisloggedin(true)
    }

    const logout=()=>{
        setUser(null)
        setUsername(null)
        setisloggedin(false)
    }

    return <AuthContext.Provider value={{setUser,User,Username,login,logout,isloggedin,isRegistered,setisRegistered}}>
                {children}
    </AuthContext.Provider>
    
}


export const UseAuth=()=>{
    return useContext(AuthContext);
}



