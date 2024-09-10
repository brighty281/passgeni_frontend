import React,{ createContext, useState,useEffect }  from 'react'

export const UserContext=createContext();
export const UserProvider=({children})=>{
    const [username,setUsername]=useState(null);
    useEffect(()=>{
        const storedusername=localStorage.getItem('username')
        if (storedusername){
            setUsername(storedusername);
        }
    },[])

    return (
        <UserContext.Provider value={{username,setUsername}}>
            {children}
        </UserContext.Provider>
    )
}