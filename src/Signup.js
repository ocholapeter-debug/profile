
import React,{useEffect,useState} from 'react'
import { auth } from './firebase' // fixed import path from ../firebase to ./firebase
import { createUserWithEmailAndPassword, updateProfile } from './firebase'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

function Signup() {
 
  //jS RUN FROM HERE
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
    const [userName,setuserName]=useState('')
const [error,setError]=useState('')
const [loading,setLoading]=useState(false)
const navigate = useNavigate()



//function to create a user
 const createUser = async (e) => {
  e.preventDefault()//its prevents the form from reloading again when you click btn
      setError('')
      if(password.length < 6){
        setError('Password must be atleast 6 characters')
        return;
      }
      setLoading(true)
      //create a user in the trycatch 
      try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        const user = userCredential.user;
        await updateProfile(user, {displayName: userName})
        alert('User has been created sucessfully')
        navigate('/Dashboard')

      } catch(err) {
        switch(err.code){
        case 'auth/email-already-in-use':
          setError('email already is in use')
          break;
        case 'auth/invalid-email': // fixed typo in Firebase auth error code
          setError('invalid email')
          break;
        case 'auth/weak-password':
          setError('password is too weak, use a stronger password')
          break;
        default:
          setError('signup failed try again')
        }

      } finally {
        setLoading(false)
      }
 }


  return (
        <div className='signup-page'>
      <div className='signup-card'>
        <div className='signup-header'>
          <span className='signup-brand'><a href='/'>Stratcom</a></span>
          <h2>Create Account </h2>
          <p>Create to continue ...</p>
        </div>
        <form className='signup-form'>

          <p className='error'></p>
          <div className='signup-form-group'>
            <label  className='label'> Enter Your Username</label>
            <input placeholder='name' type='text'  value={userName} onChange={(e)=>setuserName(e.target.value)}/>
          </div>  

          <div className='signup-form-group'>
            <label  className='label'> Enter Your Email Address</label>

            {/* adding eventlisteners on the email  */}
            <input placeholder='chol@gmail.com' type='email'  value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div> 

               <div className='signup-form-group'>
                <label  className='label'> Enter Your Password</label>
                {/* adding eventlisteners on the password  */}
            <input placeholder='********' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            
          
          <button className='signup-buttom' onClick={createUser}>Create Account</button>
        </form>
        <p className='signup-switch'>Already Have an Account <a href='/Login'>Signin</a></p>
      </div>
    </div>
  )
}

export default Signup
