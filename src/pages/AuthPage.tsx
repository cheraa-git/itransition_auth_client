import SignInIcon from '../assets/signin_orange.svg'
import UserPlusIcon from '../assets/user-plus_orange.svg'
import { Button } from "../components/UI/Button"
import { Input } from "../components/UI/Input"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { RootState, useAppDispatch, useAppSelector } from "../store/store"
import { logIn, signUp } from "../store/actions/authActions"
import { setErrorMessage } from "../store/slices/authSlice"
import { Loader } from "../components/UI/Loader/Loader"


export function AuthPage() {
  const dispatch = useAppDispatch()
  const { mode } = useParams()
  const errorMessage = useAppSelector((state: RootState) => state.auth.errorMessage)
  const loading = useAppSelector((state: RootState) => state.auth.loading)


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    dispatch(setErrorMessage(''))
  }, [mode, dispatch])

  const sighUpHandler = () => {
    if (!name || !email || !password || !confirmPassword) {
      return alert('Enter all fields')
    }
    if (!email.includes('@')) {
      return alert('Email is invalid')
    }
    if (confirmPassword !== password) {
      return alert('The password is not equal to the confirm password')
    }
    dispatch(signUp(name, email, password))
  }

  const logInHandler = () => {
    if (!email || !password) {
      return alert('Enter all fields')
    }
    dispatch(logIn(email, password))
  }

  const icon = mode === 'signup' ? UserPlusIcon : SignInIcon

  const loginContent = (
    <>
      <div className="text-center mb-4">

        <h1 className="text-3xl font-bold mb-2">Welcome!</h1>
        <p className="text-gray-400">Sign in to your account</p>
      </div>

      <Input label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <Input label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>

      <Button onClick={logInHandler}>Login</Button>

      <div className="flex mt-4">
        <p>Don`t have an account?</p>
        <Link className="text-orange-600 ml-2" to="/auth/signup">Sign up!</Link>
      </div>
    </>
  )

  const signUpContent = (
    <>
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">Create Account!</h1>
      </div>

      <Input label="Name" value={name} onChange={(e) => setName(e.target.value)}/>
      <Input label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <Input label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
      <Input label="Confirm your password" value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)} type="password"/>

      <Button onClick={sighUpHandler}>Create</Button>
      <div className="flex mt-4">
        <p>Already have an account?</p>
        <Link className="text-orange-600 ml-2" to="/auth/login">Login!</Link>
      </div>
    </>
  )

  return (
    <div className="bg-white w-min p-7 mx-auto mt-16 rounded">
      <p className="w-full bg-red-100 rounded text-center">{errorMessage ? errorMessage : ''}</p>
      <div className="text-center h-[28px]">
        {loading ? <Loader/> : <img src={icon} alt="auth-icon" className="w-7 mx-auto"/>}
      </div>
      {mode === 'signup' ? signUpContent : loginContent}
    </div>


  )
}
