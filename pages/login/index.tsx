import React from 'react'
import Login from '@/components/login/Login'
import Navbar from '@/components/Navbar'

const page = () => {
    return (
        <div className='w-screen h-screen scrollBar overflow-y-scroll lg:overflow-y-hidden select-none'>
            <Navbar />
            <Login />
        </div>
    )
}

export default page