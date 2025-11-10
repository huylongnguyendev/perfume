import { createSlice } from '@reduxjs/toolkit'

interface ChangeState {
  id: string
}

const initialState = {
  id: ""
} satisfies ChangeState as ChangeState

const changProductSlice = createSlice({
  name: "changeProduct",
  initialState,
  reducers: {
    setIdToChange: (state, action) => {
      state.id = action.payload
    }
  }
})

const changeProductReducer = changProductSlice.reducer
export default changeProductReducer
export const { setIdToChange } = changProductSlice.actions