import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: "",
    orderid:"",
  },
  reducers: {
    decrement: (state, action) => {
        state.value = action.payload;  // Set the value to the payload string
      },
    increment: (state, action) => {
        state.orderid = action.payload;  // Set the value to the payload string
      }
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer