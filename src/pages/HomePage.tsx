import { UsersTable } from "../components/UsersTabe/UsersTable"
import { TableToolbar } from "../components/TableToolbar"
import { useEffect } from "react"
import { RootState, useAppDispatch, useAppSelector } from "../store/store"
import { getUsers } from "../store/actions/tableActions"
import { Button } from "../components/UI/Button"
import LogoutIcon from '../assets/logout_white.svg'
import { logoutUser } from "../store/slices/authSlice"

export function HomePage() {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div className="mx-auto w-min mt-4">
      <div className="flex justify-end">
        <p className="font-bold capitalize text-lg mr-4">{currentUser.name}</p>
        <Button color="lite" onClick={() => dispatch(logoutUser())}>
          <img className="w-5 mx-auto" src={LogoutIcon} alt="logout"/>
        </Button>
      </div>
      <TableToolbar/>
      <UsersTable/>
    </div>
  )
}
