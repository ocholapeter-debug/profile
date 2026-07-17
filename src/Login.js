import React,{useEffect,useState} from 'react'
import { auth } from './firebase' // fixed import path from ../firebase to ./firebase
import { signInWithEmailAndPassword, updateProfile } from './firebase'
import { useNavigate } from 'react-router-dom'

import "./Login.css"

function Login() {

   //jS RUN FROM HERE
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
      const [userName,setuserName]=useState('')
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate()


  const loginUser = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/Dashboard')
    } catch (err) {
        switch(err.code){
        case 'auth/user-not-found':
          setError('user not found')
          break;
        case 'auth/invalid-email': // fixed typo in Firebase auth error code
          setError('invalid email in use')
          break;
        case 'auth/weak-password':
          setError('password is too weak, use a stronger password')
          break;
        default:
          setError('login  failed')
        }

      } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className='login-page'>
      <div className='login-card'>
        <div className='login-header'>
          <span className='login-brand'> <a href='/'>Stratcom</a></span>
          <h2>Welcome Back </h2>
          <p>sign in continue ...</p>
        </div>
        <form className='login-form' onSubmit={loginUser}>

          <p className='error'></p>
                    <div className='login-form-group'>
            <label  className='label'> Enter Your Email Address</label>
            <input placeholder='chol@gmail.com' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
             

          
             <label  className='label'> Enter Your Password</label>
            <input placeholder='********' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className='login-buttom' type='submit'>{loading ? 'Signing in...' : 'Sign in'}</button>
        </form>
        <p className='login-switch'>Don't Have an Account <a href='/Signup'>SignUp</a></p>
      </div>
    </div>
  )
}
export default Login
