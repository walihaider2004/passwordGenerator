import React, { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length , setLength] = useState(8);
  const [numberAllowed , setNumberAllowed] = useState(false);
  const [charAllowed , setCharAllowed] = useState(false);
  const [password , setpassword] = useState("");

// useRef hook 
const passwordRef = useRef(null);

  // useCallback hook        
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefgfigklmnopqrstuvwxyz";
    if(numberAllowed) str += "0123456789"
    if(numberAllowed) str += "!@#$%^&*-[]{}?><~`" 
    for (let i = 1; i <= length; i++) {
       let char = Math.floor(Math.random() * str.length +1);
       pass += str.charAt(char)
    }
    setpassword(pass);
  }, [length, numberAllowed, charAllowed , setpassword]);

  // useEffect hook
  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])
  
  const copypasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
      window.navigator.clipboard.writeText(password)
  }, [password]);

  return (
  <div className='w-full max-w-md mx-auto shadow-md rouded-lg px-4 my-8 text-orange-50 bg-gray-700'>
    <h1 className='text-white text-center my-3'>Password genertor</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
     <input type="text"
     value={password}
     className='outline-none w-full py-1 px-3 text-black'
     placeholder='password'
     readOnly
     ref={passwordRef}
     />
     <button onClick={copypasswordToClipboard} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'>copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input
        type='range'
        min={6}
        max={100}
        value={length}
        className='cursor-pointer '
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label>length :{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
         <input
         type='checkbox'
         defaultChecked={numberAllowed}
         id='numberInput'
         onChange={()=>{
          setNumberAllowed((prev)=> !prev)}}
         />
         <label htmlFor='nmuberInput'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
         <input
         type='checkbox'
         defaultChecked={charAllowed}
         id='characterInput'
         onChange={()=>{
          setCharAllowed((prev)=> !prev)}}
         />
         <label htmlFor='characterInput'>Character</label>
      </div>
    </div>
  </div>
  );
}

export default App;
