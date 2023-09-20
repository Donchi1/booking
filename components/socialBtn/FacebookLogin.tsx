import React from 'react'
import FacebookLogin from "@greatsumini/react-facebook-login"

function FacebookLogins() {



    
//   const handleLogin = (googleId) => {
//     axios
//        .post('/auth/googleLogin', { googleId })
//        .then((res) => {
//          const userCred = res.data
//          dispatch({ type: "LOGIN_SUCCESS", data: userCred })
//          window.location.assign('/user/dashboard')
//        })
//        .catch((err) => {
//          const { message } = err.response.data
//          dispatch({ type: "LOGIN_ERROR", error: message })
//        })
//    }

  return (
    <FacebookLogin
      appId="1088597931155576"

      onSuccess={(res) => {
       console.log(res)
      }}

      onFail={(res) => {
       console.log(res)
      }}

      onProfileSuccess={(res) => {
       console.log(res)
      }}
      
      className=" bg-white
      w-full
      py-[10px] px-[20px]
      rounded-[5px]
      mt-[10px]
      border border-[#dadce0]
    text-[#3c4043]
      relative

  before:content-[url(/assets/svg/facebook-2870.svg)]
  before:absolute
  before:w-[20px]
  before:block
  before:h-[20px]
  before:left-[10px]
  before:text-center
  before:bg-no-repeat
     "
     />
  )
}

export default FacebookLogins