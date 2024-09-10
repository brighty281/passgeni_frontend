import React,{useEffect} from 'react'
import axios from 'axios'

function Passwords() {
    const token=localStorage.getItem('access')
    const baseURL = "http://127.0.0.1:8000";
    const user_id = localStorage.getItem('userid');

    const fetchPasswords=async()=>{
       try{
        const response=await axios.get(`${baseURL}/password_app/save_get_password/${user_id}/`)
        console.log('data is......',response.data)
       }catch(error){
            console.error('Error fetching passwords:', error);
       }

    }

    useEffect(()=>{
        fetchPasswords()
    },[])
  return (
    <div>
      <h3>this is the list of passwords</h3>
    </div>
  )
}

export default Passwords
