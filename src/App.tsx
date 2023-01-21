import React, { useEffect } from 'react'
import { Route, Routes } from "react-router-dom"
import { AuthPage } from "./pages/AuthPage"
import { HomePage } from "./pages/HomePage"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { NotFoundPage } from "./pages/NotFoundPage"
import { useAuth } from "./hooks/auth-hook"
import { useAppDispatch } from "./store/store"
import { autoLogin } from "./store/actions/authActions"

function App() {
  const dispatch = useAppDispatch()
  const { isAuth } = useAuth()

  useEffect(() => {
    dispatch(autoLogin())
  })

  return (
    <>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute isAllowed={isAuth}>
            <HomePage/>
          </ProtectedRoute>
        }/>
        <Route path="auth/:mode" element={
          <ProtectedRoute isAllowed={!isAuth} redirectPath="/">
            <AuthPage/>
          </ProtectedRoute>
        }/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </>
  )
}

export default App
