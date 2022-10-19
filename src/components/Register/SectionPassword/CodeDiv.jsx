import React,{useState} from 'react'
import { useRef } from 'react'
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { setInputPassword } from '../../../Redux/features/Phone/PhoneNum'

const CodeDiv = () => {
  const dispatch = useDispatch()
  const [Password, setPassword] = useState("")
  const PasswordRef = useRef()
  const [TypeInput, setTypeInput] = useState("Password")

  const [PasswordInstructions,setPasswordInstructions] =useState([
    {name:"8+ charcters",isOn: false},
    {name: "1 uppercaase",isOn: false},
    {name:"1 number",isOn: false},
    {name:"1 special character",isOn: false}
])

  // password Instruction. cheeck if type password is includes this . if so isOn: true , else isOn: false
  // we'll change that at useEffect Password by checking the Password from input text . indicated if password is strong enough

function containsNumbers(str) {
  return /\d/.test(str);
}

function checkUppercase(str){
  for (var i=0; i<str.length; i++){
    if (str.charAt(i) == str.charAt(i).toUpperCase() && str.charAt(i).match(/[a-z]/i)){
      return true;
    }
  }
  return false;
};

function checkSpecialCharcter(str){
  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return format.test(str);
}

  return (
    <div className='flex-col'>
      <div className='password-div'>
      <div className='width-80 relative'>
        <input
        ref={PasswordRef}
        className = 'Password'
        type={TypeInput}
        value={Password}
        onChange = {(event)=>{
          let pass = event.target.value;
          setPassword(pass);
          dispatch(setInputPassword(pass))

          // check if password includes 8+ charcters
          let boolLength =  pass.length >= 8 ? true : false;
         setPasswordInstructions([
          {...PasswordInstructions[0],
            isOn: boolLength,
          },
          {
            ...PasswordInstructions[1],
            isOn:  containsNumbers(pass),
          },
          {
            ...PasswordInstructions[2],
            isOn: checkUppercase(pass),
          },
          {
            ...PasswordInstructions[3],
            isOn: checkSpecialCharcter(pass),
          },
        ])
      }}/>

         {/* eye see/hide password*/}
        {TypeInput == "Password" ? <AiFillEye className='eye-svg' onClick={()=>{setTypeInput("Text")}}/> : <AiFillEyeInvisible className='eye-svg' onClick={()=>{setTypeInput("Password")}}/>}
      </div>
      </div>

      {/* 4 div indicates if password is strong enough - PasswordInstructions */}
      <div className='grid-col'>
        {PasswordInstructions.map((object,index)=>(
          <div className={'rectangle-string-password ' + (object.isOn ? 'colored' :'')} key={index}></div>
        ))}
      </div>

      <div className='flex'>
        <ul>
          {PasswordInstructions.map((object,index)=>(
            <li key={index}>{object.name}</li>
          ))}
          </ul>
      </div>
  </div> 
  )
}

export default CodeDiv