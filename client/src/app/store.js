import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import profileReducer from '../features/profile/profileSlice'
import contactReducer from '../features/contact/contactSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    contact: contactReducer
  }
});
