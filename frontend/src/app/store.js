import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../features/loginAuth/loginAuthSlice"

export const store=configureStore({
    reducer:{
      user:userReducer
    }
})