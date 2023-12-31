import React, { useContext } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import Toast from '@/utils/Alert'

function GoogleLoginBtn() {
  const {dispatch} = useContext(AuthContext)
  const router = useRouter()

  const handleLogin = (googleId: any) => {
    
   axios
      .post('/auth/googleLogin', {tokenId: googleId.credential })
      .then((res) => {
        const {message, data} = res.data
        dispatch({ type: "LOGIN_SUCCESS", payload:data })
        Toast.success.fire({text: message}).then(() => router.push('/') )
        
      })
      .catch((err) => {
        const { message } = err.response.data
         Toast.error.fire({text: message})
      })
  }

  const handleError = () => {
    console.log()
    //dispatch({ type: "LOGIN_ERROR", error: message })
  }

  return (
    <GoogleLogin
      onSuccess={(e) => handleLogin(e)}
      onError={() => handleError()}
      text="signin_with" 
      width='2000px'
      logo_alignment='left'
    ></GoogleLogin>
  )
}

export default GoogleLoginBtn
