import { configureStore } from '@reduxjs/toolkit'
import OpenDrawer from '../features/Phone/OpenDrawer'
import PhoneNum from '../features/Phone/PhoneNum'
import DashBoardDB from '../features/DashBoard/DashBoardDB'

export const store = configureStore({
    reducer:{ PhoneNum: PhoneNum, OpenDrawer: OpenDrawer, DashBoardDB: DashBoardDB}
})
