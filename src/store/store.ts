import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './slices/authSlice'
import TableReducer from './slices/tableSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    table: TableReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
