import './UsersTable.css'
import { FC } from "react"
import { RootState, useAppDispatch, useAppSelector } from "../../store/store"
import { useAuth } from "../../hooks/auth-hook"
import { checkboxAllToggle, checkboxToggle } from "../../store/slices/tableSlice"


export const UsersTable: FC = () => {
  const dispatch = useAppDispatch()
  const { users, checkboxState, allIsChecked } = useAppSelector((state: RootState) => state.table)
  const { currentUser } = useAuth()

  const dateFormat = (timestamp: string) => {
    const date = new Date(+timestamp)
    return `${date.toLocaleTimeString()}  ${date.toLocaleDateString()}`
  }
  const sortedUsers = [...users].sort((a, b) => a.id - b.id)
  return (
    <div className={"table-container"}>
      <table>
        <thead>
        <tr>
          <td className="checkbox-select-all">
            <p>select all</p>
            <input
              className="checkbox"
              type="checkbox"
              checked={allIsChecked}
              onChange={() => dispatch(checkboxAllToggle())}/>
          </td>
          <td>id</td>
          <td>name</td>
          <td>email</td>
          <td>date of registration</td>
          <td>last login date</td>
          <td>status</td>
        </tr>
        </thead>

        <tbody>

        {sortedUsers.map(({ id, name, email, registrationTimestamp, lastLoginTimestamp, status }) => (
          <tr key={id} className={currentUser.id === id ? 'bg-gray-100' : ''}>
            <td>
              <input
                className="checkbox"
                type="checkbox"
                checked={!!checkboxState[id]}
                onChange={() => dispatch(checkboxToggle({ id }))}/>
            </td>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{dateFormat(registrationTimestamp)}</td>
            <td>{dateFormat(lastLoginTimestamp)}</td>
            <td>
              <p className={status === 'active' ? 'active' : 'blocked'}>
                {status}
              </p>
            </td>
          </tr>
        ))}

        </tbody>
      </table>
    </div>
  )
}
