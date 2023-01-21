import { AppDispatch, RootState } from "../store"
import { loginUser, setErrorMessage, toggleLoading } from "../slices/authSlice"
import axiosApp from "../axios-app"
import { User } from "../../types"
import { AxiosError } from "axios"

export const signUp = (name: string, email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(toggleLoading())
  try {
    const user = (await axiosApp.post<User>('/api/auth/signup', { name, email, password })).data
    localStorage.setItem('token', user.token)
    dispatch(loginUser(user))
    dispatch(toggleLoading())
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(setErrorMessage(error.response?.data.error))
    } else {
      dispatch(setErrorMessage('Unknown error'))
    }
    console.log(error)
    dispatch(toggleLoading())
  }
}

export const logIn = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(toggleLoading())
  try {
    const user = (await axiosApp.post<User>('/api/auth/login', { email, password })).data
    localStorage.setItem('token', user.token)
    dispatch(loginUser(user))
    dispatch(toggleLoading())
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(setErrorMessage(error.response?.data.error))
    } else {
      dispatch(setErrorMessage('Unknown error'))
    }
    console.log(error)
    dispatch(toggleLoading())
  }
}

export const autoLogin = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(toggleLoading(true))
  const {currentUser} = getState().auth
  const token = localStorage.getItem('token')
  if ((currentUser.id && currentUser.email) || !token) return dispatch(toggleLoading(false))
  try {
    const user = (await axiosApp.post<User>('/api/auth/autologin', { token })).data
    if (user.id && user.email) {
      dispatch(loginUser(user))
    } else {
      localStorage.removeItem('token')
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(setErrorMessage(error.response?.data.error))
    } else {
      dispatch(setErrorMessage('Unknown error'))
    }
    console.log(error)
  } finally {
    dispatch(toggleLoading(false))
  }
}
