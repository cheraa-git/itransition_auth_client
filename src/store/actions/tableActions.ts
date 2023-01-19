import { AppDispatch, RootState } from "../store"
import axiosApp from "../axios-app"
import { User } from "../../types"
import { setUsers, toggleLoading } from "../slices/tableSlice"
import { logoutUser } from "../slices/authSlice"

const checkUser = (users: User[]) => (dispatch: AppDispatch, getState: () => RootState) => {
  const currentUser = getState().auth.currentUser
  const findUser = users.find(user => user.id === currentUser.id)
  if (!findUser || findUser.status === 'blocked') {
    dispatch(logoutUser())
  }
}

export const getUsers = () => async (dispatch: AppDispatch) => {
  dispatch(toggleLoading())
  try {
    let users = (await axiosApp.get<User[]>('/api/users')).data
    dispatch(checkUser(users))
    dispatch(setUsers(users))
    dispatch(toggleLoading())
  } catch (error) {
    console.log('Error', error)
    dispatch(toggleLoading())
  }
}


export const setUsersStatus = (ids: number[], status: 'blocked' | 'active') => {
  return async (dispatch: AppDispatch) => {
    dispatch(toggleLoading())
    try {
      let users = (await axiosApp.put<User[]>('/api/users', { ids, status })).data
      dispatch(checkUser(users))
      dispatch(setUsers(users))
      dispatch(toggleLoading())
    } catch (error) {
      console.log('Error', error)
      dispatch(toggleLoading())
    }
  }
}

export const deleteUsers = (ids: number[]) => async (dispatch: AppDispatch) => {
  dispatch(toggleLoading())
  try {
    let users = (await axiosApp.delete<User[]>('/api/users', { data: { ids } })).data
    dispatch(checkUser(users))
    dispatch(setUsers(users))
    dispatch(toggleLoading())
  } catch (error) {
    console.log('Error', error)
    dispatch(toggleLoading())
  }
}
