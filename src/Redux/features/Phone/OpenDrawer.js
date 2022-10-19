import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    open:false,

}

const OpenDrawer = createSlice({
    name:'OpenDrawer',
    initialState,
    reducers:{
       setOpen(state,action){
        state.open = action.payload
       }
    },
})

// ---------------------------------------------------------------------

export const getOpen = (state) => state.OpenDrawer.open

export const {setOpen} = OpenDrawer.actions

export default OpenDrawer.reducer