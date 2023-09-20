import React, { useContext } from 'react'
import Loader from '@/components/loader/loader'
import { AuthContext } from "@/context/AuthContext"

function PLoader({children}: {children: JSX.Element}) {
    const { user, loading } = useContext(AuthContext);
    if(loading) return <Loader />
    return children
}

export default PLoader
