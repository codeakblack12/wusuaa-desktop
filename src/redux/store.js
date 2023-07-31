import { configureStore } from '@reduxjs/toolkit'

import UserReducer from "./slices/userSlice"
import CartSlice from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    user: UserReducer,
    cart: CartSlice
  },
})