import { User } from "../../types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface TableState {
  users: User[]
  checkboxState: {
    [id: string]: boolean
  }
  allIsChecked: boolean
  loading: boolean
}

const initialState: TableState = {
  users: [],
  checkboxState: {},
  allIsChecked: false,
  loading: false
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    checkboxToggle: (state, { payload }: PayloadAction<{ id: number }>) => {
      state.checkboxState[payload.id] = !state.checkboxState[payload.id]
      state.allIsChecked = state.users.reduce((acc, user) => acc && !!state.checkboxState[user.id], true)
    },
    checkboxAllToggle: (state, { payload: checkboxState }: PayloadAction<undefined | boolean>) => {
      const checked = checkboxState !== undefined ? checkboxState : !state.allIsChecked
      state.users.forEach(user => {
        state.checkboxState[user.id] = checked
      })
      state.allIsChecked = checked
    },
    setUsers: (state, { payload: users }: PayloadAction<User[]>) => {
      state.users = users

    },

    toggleLoading: state => {
      state.loading = !state.loading
    }
  }
})

export const { checkboxToggle, checkboxAllToggle, setUsers, toggleLoading } = tableSlice.actions

export default tableSlice.reducer
