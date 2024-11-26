import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './user/userslice'
export default configureStore({
    reducer: {
        counter: counterReducer
      }})