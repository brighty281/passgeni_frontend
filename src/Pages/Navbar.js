import React,{useContext, useEffect} from 'react'
import { useNavigate,Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import  { jwtDecode } from "jwt-decode";
import { UserContext } from '../Store/UserContext';
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_BASE_URL, REACT_APP_REDIRECT_URL } =process.env;
  const {setUsername,username}=useContext(UserContext)

  const onGoogleLoginSuccess = ()=>{
    const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
    // const REDIRECT_URI = 'api/users/auth/google/'

    const scope = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' ');
  
    
    const params = {
        response_type: 'code',
        client_id: REACT_APP_GOOGLE_CLIENT_ID,
        redirect_uri: REACT_APP_REDIRECT_URL,
        prompt: 'select_account',
        access_type: 'offline',
        scope
    };

    const urlParams = new URLSearchParams(params).toString();
    window.location = `${GOOGLE_AUTH_URL}?${urlParams}`;

}

useEffect(() => {
  const query = new URLSearchParams(location.search);
  const message = query.get('message')
  if (message) {
      toast.error('This account is no longer accessible', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          style: { backgroundColor: 'red', color: 'black' },
      })
      setTimeout(() => {
          navigate('/loginfail')
      }, 2000);
  }

}, [location])

useEffect(()=>{
    const query = new URLSearchParams(location.search);
    const access = query.get('access');
    const refresh = query.get('refresh');
    if (access && refresh){

        console.log('access token is given by...',access)
        console.log('access token is given by...',refresh)
        
        const decodeToken = jwtDecode(access);
        console.log('username.....',decodeToken.username)
        console.log('user_id is.....',decodeToken.user_id) 

        setUsername(decodeToken.username)
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh); 
        localStorage.setItem('userid',decodeToken.user_id)
        localStorage.setItem('username',decodeToken.username)
        toast.success("logged in successfully!");
        navigate('/')

    }
},[location])

const handleLogout=()=>{
  localStorage.removeItem('username');
  setUsername(null);
}
  return (
    <header className="bg-black text-white py-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      {/* App Name */}
      <div className="text-2xl font-bold">
        PassGenie
      </div>

      <nav className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="text-white hover:text-gray-400 mx-4">Home</Link>
          <Link to="/passwords" className="text-white hover:text-gray-400 mx-4">Passwords</Link>
        </nav>

      {/* Sign In Button */}
      <div className='flex-1 flex justify-end space-x-4 items-center'>
        {(username)?(
          <>
            <h3>{username}</h3>
            <button onClick={handleLogout} className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-100 transition">logout</button>
          </>
        ):(
          <button onClick={onGoogleLoginSuccess} className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-100 transition">
            Sign In
          </button>
        )}
      </div>
    </div>
  </header>
  )
}

export default Navbar
