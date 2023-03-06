import React,{useState,useEffect } from 'react'
import {Controller } from "react-hook-form";
import startsWith from 'lodash.startswith';
import {useSelector,useDispatch} from 'react-redux'
import {getPhoneNumber,setPhoneNumber} from '../../../Redux/features/Phone/PhoneNum'
import Input, {
    getCountries,
    getCountryCallingCode,
  } from "react-phone-number-input/input";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-number-input/style.css'

const PhoneInputSms = ({ value, onChange, labels, ...rest }) => {
    const [onFocuseInput, setOnFocuseInput] = useState("");
    // const [phoneNumber, setPhoneNumber] = useState();
    const [country, setCountry] = useState();


    const Phone = useSelector(getPhoneNumber)
    const dispatch = useDispatch()

//     const CountrySelect = ({ value, onChange, labels, ...rest }) => (
//         <ul
//             className='select-country'
//           {...rest}
//           role="listbox"
//           value={value}
//           onChange={(event) => {
//             onChange(event.target.value || undefined);
//           }}>
//           <li value="" role="option">Choose a country</li>

//           {getCountries().map((country) => (
//             <>
//             <li role="option" key={country} value={country}>
//                 {labels[country]}
//                 ({getCountryCallingCode(country)})
                
//             </li>
//             </>
// ))}
//         </ul>
//       );

      useEffect(() => {
        console.log(Phone)

      }, [Phone])
      
  return (
 <div className="flex">
 {/* <Controller
    name="phone-input"
    control={control}
    rules={{
        validate: (value) => isValidPhoneNumber(value)
    }}
    render={({ field: { onChange, value } }) => (
        <PhoneInput
        limitMaxLength
        // onCountryChange={(v) => setCountryCode(v)}
        value={value}
        onChange={onChange}
        defaultCountry="DE"
        id="phone-input"
        />
    )}
    /> */}
    <PhoneInput
    country='il'
    countryCodeEditable={false}
    enableSearch={true}
    value={Phone}
    onChange={(event)=>{dispatch(setPhoneNumber(event))}}
    isValid={(inputNumber, country, countries) => {
        return countries.some((country) => {
          return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
        });
      }}
      />

 {/* <CountrySelect
   labels={en}
   value={country}
   onChange={setCountry}
   name="countrySelect"
   onFocus={() => setOnFocuseInput("country")}
 />
 <Input
   placeholder="phoneNumber"
   dir="ltr"
   country={country}
   value={phoneNumber}
   onChange={setPhoneNumber}
   name="phoneNumber"
   onFocus={() => setOnFocuseInput("phoneNumber")}
   required
 /> */}
</div>

  )
}

export default PhoneInputSms
