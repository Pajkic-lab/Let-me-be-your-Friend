import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import profileReducer from '../features/profile/profileSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer
  },
});
