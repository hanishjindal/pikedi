import React from 'react'
import Login from '@/components/login/Login'
import Navbar from '@/components/Navbar'
import ToasterContext from '@/context/ToasterContext'

const page = () => {
    return (
        <div className='w-screen h-screen scrollBar overflow-y-scroll lg:overflow-y-hidden select-none'>
            <ToasterContext />
            <Navbar />
            <Login />
        </div>
    )
}

export default page