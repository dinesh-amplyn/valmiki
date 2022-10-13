import { createSlice } from '@reduxjs/toolkit'
import { setUserInfo } from '../../providers/global/global'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {}
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload
      setUserInfo(action.payload)
      console.log("##################action.payload", action.payload)
    },

  }
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer