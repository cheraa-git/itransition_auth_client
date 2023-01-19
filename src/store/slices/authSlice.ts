import { User } from "../../types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthState {
  currentUser: User
  errorMessage: string
  loading: boolean
}


const initialState: AuthState = {
  // currentUser: {
  //   id: 2,
  //   name: 'Alex',
  //   email: 'alex@mail.ru',
  //   lastLoginTimestamp: '1673965260317',
  //   registrationTimestamp: '1673965260317',
  //   status: 'active'
  // },
  currentUser: {
    id: NaN,
    name: '',
    email: '',
    lastLoginTimestamp: '',
    registrationTimestamp: '',
    status: 'active'
  },
  errorMessage: '',
  loading: false

}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, { payload: user }: PayloadAction<User>) => {
      if (user.status !== 'blocked') {
        state.currentUser = user
      }
    },
    logoutUser: state => {
      state.currentUser = initialState.currentUser
    },
    setErrorMessage: (state, {payload: message}: PayloadAction<string>) => {
      state.errorMessage = message
    },
    toggleLoading: state => {
      state.loading = !state.loading
    }
  }
})

export const { loginUser, logoutUser, toggleLoading, setErrorMessage } = authSlice.actions

export default authSlice.reducer
