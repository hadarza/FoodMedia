import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {axiosInstance} from '../../../../config';

const initialState = {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed
    ListsImages : [],
    currentRestaruant:''
}

export const fetchImages = createAsyncThunk('/api/DashBoard/allImages',async () =>{
    const response = await axiosInstance.get('/api/dashboard/allImages')
    return [...response.data];
})

const DashBoardDB = createSlice({
    name:'DashBoardDB',
    initialState,
    reducers:{
        setRestaruant(state,action){
            state.currentRestaruant = action.payload
           },
    },

        extraReducers:(builder) =>{
            builder.addCase(fetchImages.pending,(state,action)=>{
                state.status = 'loading';
            })
            builder.addCase(fetchImages.fulfilled,(state,action)=>{
                state.status = 'succeeded';

                const loadedFolders = action.payload.map(folder => {
                    return folder;
                });
                state.ListsImages = loadedFolders;
            })
            builder.addCase(fetchImages.rejected,(state,action)=>{
                state.status = 'failed';
            })

            //------------------------------------------------------
            // builder.addCase(fetchRestaruantsByTag.pending,(state,action)=>{
            //     state.status = 'loading';
            // })
            // builder.addCase(fetchRestaruantsByTag.fulfilled,(state,action)=>{
            //     state.status = 'succeeded';

            //     const loadedFolders = action.payload.map(folder => {
            //         return folder;
            //     });
            //     state.ListRestaruantsByTag = loadedFolders;
            // })
            // builder.addCase(fetchRestaruantsByTag.rejected,(state,action)=>{
            //     state.status = 'failed';
            // })

    },
})

// ---------------------------------------------------------------------

export const getImageHeader = (state) => state.DashBoardDB.ListsImages
export const getstatusFolders = (state) => state.DashBoardDB.status
export const getcurrentRestaruant = (state) => state.DashBoardDB.currentRestaruant
// export const getAllRestaurantsByTag = (state) => state.DashBoardDB.ListRestaruantsByTag

export default DashBoardDB.reducer