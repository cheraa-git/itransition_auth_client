import { RootState, useAppSelector } from "../store/store"

export const useAuth = () => {
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser)
  let isAuth = Boolean(currentUser.id && currentUser.email)
  return { isAuth, currentUser }
}
