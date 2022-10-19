import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    PhoneToCall:'',
    Code:'',
    enterPassword:'',
    settings: {}
}

const PhoneNum = createSlice({
    name:'PhoneNum',
    initialState,
    reducers:{
       setPhoneNumber(state,action){
        state.PhoneToCall = action.payload
       },
       setCode(state,action){
        state.Code = action.payload
       },
       setInputPassword(state,action){
        state.enterPassword = action.payload
       },
       setSetting(state,action){
        state.settings = action.payload
       }
    },
})

    // ---------------------------------------------------------------------

export const getPhoneNumber = (state) => state.PhoneNum.PhoneToCall
export const getCode = (state) => state.PhoneNum.Code
export const getInputPassword = (state) => state.PhoneNum.enterPassword
export const getSettings = (state) => state.PhoneNum.settings
export const {setPhoneNumber,setCode,setInputPassword,setSetting} = PhoneNum.actions

export default PhoneNum.reducer