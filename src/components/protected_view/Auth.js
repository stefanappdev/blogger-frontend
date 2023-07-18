import React,{useState,createContext,useContext} from 'react'

//global context for App

const AuthContext=createContext(null);

export const AuthProviderWrapper=({children})=>{
    const [User,setUser]=useState(null);
    const [isloggedin,setisloggedin]=useState(false);
    const  [isRegistered,setisRegistered]=useState(false);

    const login=(User)=>{
        setUser(User)
        setisloggedin(true)
    }

    const logout=()=>{
        setUser(null)
        setisloggedin(false)
    }

    return <AuthContext.Provider value={{User,login,logout,isloggedin,isRegistered,setisRegistered}}>
                {children}
    </AuthContext.Provider>
    
}


export const UseAuth=()=>{
    return useContext(AuthContext);
}



