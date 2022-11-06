import React,{useState} from 'react'
import ButtonNextStep from '../Register/ButtonNextStep/ButtonNextStep'
import PhoneInputSms from '../Register/SectionPhone/PhoneInputSms'
import { useNavigate } from 'react-router-dom'
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import InfoSectionLogin from './InfoSectionLogin'
import { getPhoneNumber } from '../../Redux/features/Phone/PhoneNum'
import { useSelector } from 'react-redux'
import { axiosInstance } from '../../../config';
import 'react-phone-input-2/lib/style.css'

const Login = ({setAuth}) => {
    const navigate = useNavigate()
    const [TypeInput, setTypeInput] = useState("Password")
    const [passInput, setpassInput] = useState("")
    const Phone = useSelector(getPhoneNumber)

    const login = ()=>{
        // user details
        const User ={
        "phone":"+"+ Phone,
        "passwordUser": passInput
      }
      axiosInstance.post("/api/user/Login",{User})
      .then(res => { 
          localStorage.setItem("token",res.data.tokenMessage)
          setAuth(true)
          navigate('/store')
      }).catch((error) => {
          console.log(error.message)
      }) 
    }
    
  return (
    <div>
        <InfoSectionLogin/>
        <div className='flex-col'>
            <div className='width-70'>

                <PhoneInputSms/>
                <div className='password-div'>
                    <input className = 'Password' type={TypeInput} value={passInput} onChange={(event)=>{setpassInput(event.target.value)}} />
                    {TypeInput == "Password" ? <AiFillEye className='eye-svg' onClick={()=>{setTypeInput("Text")}}/> : <AiFillEyeInvisible className='eye-svg' onClick={()=>{setTypeInput("Password")}}/>}
                </div>
                <p><a className='forget-password' href="./ForgetPassword">Forget Password</a></p> 

            </div>
         

        </div>

        <ButtonNextStep text= "Login" func = {login}/>
       <p className='flex'>Don't have an acount? <a className='register-href' href='./Register'> Sign Up</a></p>
    </div>
  )
}

export default Login
