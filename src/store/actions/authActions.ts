import { AppDispatch, RootState } from "../store"
import { loginUser, setErrorMessage, toggleLoading } from "../slices/authSlice"
import axiosApp from "../axios-app"
import { User } from "../../types"
import { AxiosError } from "axios"

export const signUp = (name: string, email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(toggleLoading())
  try {
    const user = (await axiosApp.post<User>('/api/auth/signup', { name, email, password })).data
    console.log(user)
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
    console.log(user)
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
