import React,{useState,createContext,useContext} from 'react'


const AuthContext=createContext(null);

export const AuthProviderWrapper=({children})=>{
    const [User,setUser]=useState(null);
    const [isloggedin,setisloggedin]=useState(false);
    const  [isregistered,setisregistered]=useState(false);

    const login=(User)=>{
        setUser(User)
        setisloggedin(true)
    }

    const logout=()=>{
        setUser(null)
        setisloggedin(false)
    }

    return <AuthContext.Provider value={{User,login,logout,isloggedin,isregistered,setisregistered}}>
                {children}
    </AuthContext.Provider>
    
}


export const UseAuth=()=>{
    return useContext(AuthContext);
}



