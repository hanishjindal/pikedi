import React from 'react'
import Login from '@/components/login/Login'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const page = () => {
    return (
        <div className='min-h-screen flex flex-col justify-between scrollBar overflow-y-auto lg:overflow-y-scroll select-none bg-gradient-to-b from-lighest-theme to-white relative'>
            <Navbar />
            <Login />
            <Footer />
        </div>
    )
}

export default page