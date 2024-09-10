import React,{useState} from 'react'
import axios from 'axios'
function Home() {
  const [password,setPassowrd]=useState('')
  const [lowercase,setLowercase]=useState(false)
  const [uppercase,setUppercase]=useState(false)
  const [numeric,setNumeric]=useState(false)
  const [symbols,setSymbols]=useState(false)
  const [passwordLength, setpasswordLength] = useState(6);
  const token = localStorage.getItem('access');
  //handling password length
  const handleLengthChange=(event)=>{
    setpasswordLength(event.target.value)
  }

const handleSave=async()=>{
  console.log('worjihdfvoeujfbo')
  try {
      
      const response = await axios.post(
      'http://127.0.0.1:8000/password_app/save_get_password/', // Update this URL to match your API endpoint
      {
        password: password, // This is the generated password to save
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token for authentication
        },
      }
    );
    console.log(response.data); // The saved data response from the backend
  } catch (error) {
    console.error('Error saving password:', error.response?.data);
  }
  
}

  const handleGeneratePassword=()=>{
    const selectedfields=[
      lowercase,
      uppercase,
      numeric,
      symbols
    ].filter(Boolean).length;

    if(selectedfields<2){
      alert('please select at least two fields')
      return
    }

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numericChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characterPool = '';
      if (lowercase) characterPool +=lowerCaseChars;
      if (uppercase) characterPool+=upperCaseChars;
      if (numeric) characterPool+=numericChars;
      if (symbols) characterPool+=symbolChars;
      let generatedPassword = '';

      console.log('hellooo......',characterPool)

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }
    console.log('helloo...heyy')
    console.log(generatedPassword)

    setPassowrd(generatedPassword)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
    <h1 className="text-3xl font-bold mb-6">Password Generator</h1>
    <div className="w-full max-w-xs">
      <input
        type="text"
        className="w-full p-2 mb-4 text-xl text-black font-semibold rounded border border-gray-400"
        placeholder="Generated password"
        value={password}
        readOnly
      />
      <div className="flex justify-between mb-4">
        <button
          onClick={handleGeneratePassword}
          className="bg-white text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-gray-200 hover:text-black"
        >
          Generate Password
        </button>
        <button
          onClick={() =>setPassowrd('')}
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-gray-700"
        >
          Clear
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(password)}
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-gray-700"
        >
          Copy
        </button>
        <button
          onClick={handleSave}
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-gray-700"
        >
          Save
        </button>

      </div>
      <div className="flex flex-col mb-4">
        <label className="inline-flex items-center mb-2">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            className="form-checkbox text-black border-gray-400 rounded"
          />
          <span className="ml-2">Lowercase Letters</span>
        </label>
        <label className="inline-flex items-center mb-2">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="form-checkbox text-black border-gray-400 rounded"
          />
          <span className="ml-2">Uppercase Letters</span>
        </label>
        <label className="inline-flex items-center mb-2">
          <input
            type="checkbox"
            checked={numeric}
            onChange={(e) => setNumeric(e.target.checked)}
            className="form-checkbox text-black border-gray-400 rounded"
          />
          <span className="ml-2">Numbers</span>
        </label>
        <label className="inline-flex items-center mb-2">
          <input
            type="checkbox"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
            className="form-checkbox text-black border-gray-400 rounded"
          />
          <span className="ml-2">Symbols</span>
        </label>
      </div>
      <div className="mb-4">
        <input
          type="range"
          min="6"
          max="13"
          value={passwordLength}
          onChange={handleLengthChange}
          className="w-full"
        />
        <label className="block text-center mt-2">Password Length: {passwordLength}</label>
      </div>
    </div>
  </div>
  )
}

export default Home
