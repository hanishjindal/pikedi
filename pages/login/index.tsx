import React from 'react'
import Login from '@/components/login/Login'
import Navbar from '@/components/Navbar'

const page = () => {
    return (
        <div className='w-screen h-screen overflow-y-scroll'>
            <Navbar />
            <Login />
        </div>
    )
}

export default page