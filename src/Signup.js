
import React,{useEffect,useState} from 'react'
// Import Firebase authentication functions and Google Provider
import { auth, createUserWithEmailAndPassword, updateProfile, signInWithPopup, googleProvider, onAuthStateChanged } from './firebase'
// useNavigate hook for redirecting to different pages after authentication
import { useNavigate } from 'react-router-dom'
import './Signup.css'

function Signup() {
 
  // State management for the signup form
  const [email,setEmail]=useState('')           // Stores user's email input
  const [password,setPassword]=useState('')     // Stores user's password input
  const [userName,setuserName]=useState('')     // Stores user's name/username
  const [error,setError]=useState('')           // Stores error messages to display to user
  const [loading,setLoading]=useState(false)    // Tracks if form submission is in progress
  const navigate = useNavigate()                 // Navigation hook to redirect after signup

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

  //function to create a user with email and password
  const createUser = async (e) => {
    e.preventDefault()  // Prevents form from reloading the page when submitted
    setError('')        // Clear any previous error messages
    
    // Validate that password is at least 6 characters long
    if(password.length < 6){
      setError('Password must be atleast 6 characters')
      return;
    }
    
    setLoading(true)    // Show loading state while creating user
    
    //create a user in the try-catch block 
    try{
      // Call Firebase function to create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;
      
      // Update the user's profile with their display name
      await updateProfile(user, {displayName: userName})
      
      alert('User has been created sucessfully')
      // Redirect to the dashboard after successful signup
      navigate('/dashboard')
    } catch(err) {
      // Handle different Firebase authentication errors
      switch(err.code){
        case 'auth/email-already-in-use':
          setError('email already is in use')
          break;
        case 'auth/invalid-email':
          setError('invalid email')
          break;
        case 'auth/weak-password':
          setError('password is too weak, use a stronger password')
          break;
        default:
          setError('signup failed try again')
      }
    } finally {
      setLoading(false)  // Stop loading state
    }
  }

  // Google Sign Up Function
  // This function handles user signup using Google OAuth
  const handleGoogleSignUp = async () => {
    setError('')        // Clear any previous error messages
    setLoading(true)    // Show loading state while authenticating
    try {
      // signInWithPopup opens a Google login window for the user to authenticate
      // googleProvider is configured to use Google OAuth 2.0
      // This returns user credentials if authentication is successful
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      
      // If user provided a custom username AND Google didn't provide a display name, update it
      if (!user.displayName && userName) {
        await updateProfile(user, { displayName: userName })
      }
      
      alert('Account created with Google successfully')
      // Redirect to the dashboard after successful Google signup
      navigate('/dashboard')
    } catch (err) {
      // Handle any errors that occurred during Google authentication
      setError('Google sign up failed: ' + err.message)
    } finally {
      setLoading(false)  // Stop loading state
    }
  }

  return (
    <div className='signup-page'>
      <div className='signup-card'>
        {/* Header section with branding and title */}
        <div className='signup-header'>
          <span className='signup-brand'><a href='/'>Choltech</a></span>
          <h2>Create Account </h2>
          <p>Create to continue ...</p>
        </div>
        
        {/* Main signup form for email/password authentication */}
        <form className='signup-form' onSubmit={createUser}>
          {/* Display error message if there's any error during signup */}
          {error && <p className='error'>{error}</p>}
          
          {/* Username input field */}
          <div className='signup-form-group'>
            <label className='label'> Enter Your Username</label>
            <input 
              placeholder='name' 
              type='text' 
              value={userName} 
              onChange={(e)=>setuserName(e.target.value)}
            />
          </div>  

          {/* Email input field */}
          <div className='signup-form-group'>
            <label className='label'> Enter Your Email Address</label>
            <input 
              placeholder='chol@gmail.com' 
              type='email' 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)} 
            />
          </div> 

          {/* Password input field */}
          <div className='signup-form-group'>
            <label className='label'> Enter Your Password</label>
            <input 
              placeholder='********' 
              type='password' 
              value={password} 
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          
          {/* Submit button for email/password signup - disabled while loading */}
          <button className='signup-buttom' type='submit' disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider line with "or" text between email and Google auth options */}
        <div className='divider'>
          <span>or</span>
        </div>

        {/* Google Sign Up button - Opens Google OAuth popup */}
        <button className='google-btn' onClick={handleGoogleSignUp} disabled={loading} type='button'>
          <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/>
            <path d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/>
            <path d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/>
            <path d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/>
          </svg>
          Sign up with Google
        </button>

        {/* Link to login page for existing users */}
        <p className='signup-switch'>Already Have an Account <a href='/login'>Signin</a></p>
      </div>
    </div>
  )
}

export default Signup
