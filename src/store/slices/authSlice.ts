import { User } from "../../types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthState {
  currentUser: User
  errorMessage: string
  loading: boolean
}

const initialState: AuthState = {
  currentUser: {
    id: NaN,
    name: '',
    email: '',
    lastLoginTimestamp: '',
    registrationTimestamp: '',
    status: 'active',
    token: ''
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
      localStorage.removeItem('token')
    },
    setErrorMessage: (state, { payload: message }: PayloadAction<string>) => {
      state.errorMessage = message
    },
    toggleLoading: (state, { payload }: PayloadAction<boolean | undefined>) => {
      if (payload !== undefined) {
        state.loading = payload
      } else {
        state.loading = !state.loading
      }
    }
  }
})

export const { loginUser, logoutUser, toggleLoading, setErrorMessage } = authSlice.actions

export default authSlice.reducer
