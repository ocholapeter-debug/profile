import React,{useEffect,useState} from 'react'
// Import Firebase authentication functions and Google Provider
import { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider, onAuthStateChanged } from './firebase'
// useNavigate hook for redirecting to different pages after authentication
import { useNavigate } from 'react-router-dom'
import "./Login.css"

function Login() {

  // State management for the login form
  const [email,setEmail]=useState('')           // Stores user's email input
  const [password,setPassword]=useState('')     // Stores user's password input
  const [error,setError]=useState('')           // Stores error messages to display to user
  const [loading,setLoading]=useState(false)    // Tracks if form submission is in progress
  const navigate = useNavigate()                 // Navigation hook to redirect after login

  // Check if user is already logged in
  // This hook runs when component mounts and whenever 'navigate' changes
  // If user is already authenticated (logged in), redirect them to home page
  useEffect(() => {
    // onAuthStateChanged listens for changes in user authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // If a user is logged in, navigate to the dashboard
      if (user) {
        navigate('/dashboard')
      }
    })
    // Cleanup function to unsubscribe from listener when component unmounts
    return unsubscribe
  }, [navigate])

  // Email and Password Login Function
  // This function handles user login with email and password
  const loginUser = async (e) => {
    e.preventDefault()  // Prevents form from reloading the page when submitted
    setError('')        // Clear any previous error messages
    setLoading(true)    // Show loading state while authenticating

    try {
      // Call Firebase function to sign in user with email and password
      await signInWithEmailAndPassword(auth, email, password)
      alert('Logged in successfully')
      // Redirect to the dashboard after successful login
      navigate('/dashboard')
    } catch (err) {
      // Handle different Firebase authentication errors
      switch(err.code){
        case 'auth/user-not-found':
          setError('user not found')
          break;
        case 'auth/invalid-email':
          setError('invalid email')
          break;
        case 'auth/invalid-password':
          setError('incorrect password')
          break;
        case 'auth/wrong-password':
          setError('incorrect password')
          break;
        default:
          setError('login failed: ' + err.message)
      }
    } finally {
      setLoading(false)  // Stop loading state
    }
  }

  // Google Sign In Function
  // This function handles user login/signup using Google OAuth
  const handleGoogleSignIn = async () => {
    setError('')        // Clear any previous error messages
    setLoading(true)    // Show loading state while authenticating
    try {
      // signInWithPopup opens a Google login window for the user to authenticate
      // googleProvider is configured to use Google OAuth 2.0
      // This returns user credentials if authentication is successful
      // If user exists, they are logged in; if new, their account is created
      await signInWithPopup(auth, googleProvider)
      alert('Logged in with Google successfully')
      // Redirect to the dashboard after successful Google login
      navigate('/dashboard')
    } catch (err) {
      // Handle any errors that occurred during Google authentication
      setError('Google sign in failed: ' + err.message)
    } finally {
      setLoading(false)  // Stop loading state
    }
  }

  return (
    <div className='login-page'>
      <div className='login-card'>
        {/* Header section with branding and title */}
        <div className='login-header'>
          <span className='login-brand'> <a href='/'>Choltech</a></span>
          <h2>Welcome Back </h2>
          <p>sign in continue ...</p>
        </div>
        
        {/* Main login form for email/password authentication */}
        <form className='login-form' onSubmit={loginUser}>
          {/* Display error message if there's any error during login */}
          {error && <p className='error'>{error}</p>}
          
          <div className='login-form-group'>
            {/* Email input field */}
            <label className='label'> Enter Your Email Address</label>
            <input 
              placeholder='mark@gmail.com' 
              type='email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            
            {/* Password input field */}
            <label className='label'> Enter Your Password</label>
            <input 
              placeholder='********' 
              type='password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          
          {/* Submit button for email/password login - disabled while loading */}
          <button className='login-buttom' type='submit' disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Divider line with "or" text between email and Google auth options */}
        <div className='divider'>
          <span>or</span>
        </div>

        {/* Google Sign In button - Opens Google OAuth popup */}
        <button className='google-btn' onClick={handleGoogleSignIn} disabled={loading} type='button'>
          <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/>
            <path d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/>
            <path d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/>
            <path d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/>
          </svg>
          Sign in with Google
        </button>

        {/* Link to signup page for new users */}
        <p className='login-switch'>Don't Have an Account <a href='/signup'>SignUp</a></p>
      </div>
    </div>
  )
}

export default Login
