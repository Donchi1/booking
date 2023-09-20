import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import Loader from '@/components/loader/loader'
import { AuthContext } from '@/context/AuthContext'

function Protected({children}:{children: JSX.Element}) {
    const router = useRouter()
   
    
    const {user, loading, dispatch} = useContext(AuthContext)
   
     useEffect(() => {
        if(!loading){
            if(!user){
             router.push("/login")
            }
           

        }
        
     }, [router, loading, user])

     if(loading && !user){
         return  <Loader />
      
     }
   
    return children
}

export default Protected
