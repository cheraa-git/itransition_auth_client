import { FC } from "react"
import UnlockIcon from '../assets/lock-open_white.svg'
import DeleteIcon from '../assets/trash_white.svg'
import { Button } from "./UI/Button"
import { RootState, useAppDispatch, useAppSelector } from "../store/store"
import { deleteUsers, setUsersStatus } from "../store/actions/tableActions"
import { checkboxAllToggle } from "../store/slices/tableSlice"
import { logoutUser } from "../store/slices/authSlice"
import { Loader } from "./UI/Loader/Loader"

interface TableToolbarProps {
  className?: string
}

export const TableToolbar: FC<TableToolbarProps> = () => {
  const dispatch = useAppDispatch()
  const checkboxState = useAppSelector((state: RootState) => state.table.checkboxState)
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser)
  const loading = useAppSelector((state: RootState) => state.table.loading)

  const getCheckedUsersIds = () => {
    return Object.entries(checkboxState).reduce((acc, [id, state]) => {
      if (state) acc.push(+id)
      return acc
    }, [] as number[])
  }

  const blockHandler = () => {
    const checkedUsers = getCheckedUsersIds()
    const confirmMessage = 'Your account will be blocked. Do you want to continue?'
    if (checkedUsers.includes(currentUser.id)) {
      if (window.confirm(confirmMessage)) {
        dispatch(setUsersStatus(checkedUsers, 'blocked'))
        dispatch(logoutUser())
        dispatch(checkboxAllToggle(false))
      }
    } else {
      dispatch(setUsersStatus(checkedUsers, 'blocked'))
      dispatch(checkboxAllToggle(false))
    }
  }

  const unBlockHandler = () => {
    dispatch(setUsersStatus(getCheckedUsersIds(), 'active'))
    dispatch(checkboxAllToggle(false))
  }

  const deleteHandler = () => {
    const checkedUsers = getCheckedUsersIds()
    const confirmMessage = 'Your account will be deleted. Do you want to continue?'
    if (checkedUsers.includes(currentUser.id)) {
      if (window.confirm(confirmMessage)) {
        dispatch(deleteUsers(checkedUsers))
        dispatch(logoutUser())
        dispatch(checkboxAllToggle(false))
      }
    } else {
      dispatch(deleteUsers(checkedUsers))
      dispatch(checkboxAllToggle(false))
    }
  }


  return (
    <div className="flex bg-orange-600 rounded text-white mb-2 p-2 mx-auto w-[50%]">
      <div className="flex mr-auto">
        <h1 className="mr-auto text-2xl font-extralight mr-3">USERS</h1>
        {loading ? <Loader/> : ''}
      </div>

      <div className="flex">
        <p className="items-center my-auto ml-2 font-thin">selected: {getCheckedUsersIds().length}</p>
        <Button color="lite" className="ml-2" onClick={blockHandler}>block</Button>
        <Button color="lite" className="ml-2" onClick={unBlockHandler}>
          <img className="w-5" src={UnlockIcon} alt="unlock"/>
        </Button>
        <Button color="lite" className="ml-2" onClick={deleteHandler}>
          <img className="w-5" src={DeleteIcon} alt="delete"/>
        </Button>
      </div>
    </div>
  )
}
